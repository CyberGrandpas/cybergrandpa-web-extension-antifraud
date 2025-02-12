import App from '@/components/modal.svelte';
import { storeScanning } from '@/lib/store';
import '@/styles/style.scss';
import { SendMessageParams } from '@/utils';
import { mount, unmount } from 'svelte';
import { ContentScriptContext } from 'wxt/client';

const overlayLoadingApp = (container: HTMLElement) => {
  return mount(App, {
    target: container,
    props: {
      loader: true,
      show: true,
      logo: true,
      onClose: () => {
        // Send a request to forward to contentScript
        browser.runtime.sendMessage({ type: 'scanPage', command: 'destroy' });
      },
    },
  });
};

const getLog = (request: SendMessageParams) => {
  return `[${request.command}] of "${request.type}" executed`;
};

const createUi = (ctx: ContentScriptContext, app: { (container: HTMLElement): void }) => {
  return createShadowRootUi(ctx, {
    name: 'cybergrandpa-modal-shadow-root',
    position: 'modal',
    zIndex: 99999999,
    anchor: 'body',
    append: 'first',
    onMount: (container) => {
      return app(container);
    },
    onRemove: (app) => {
      // Set the scanning state to 0
      storeScanning.set('0');

      // Destroy the app when the UI is emoved
      if (app) {
        unmount(app, { outro: true });
      }
    },
  });
};

const mainContentScript = async (ctx: ContentScriptContext) => {
  console.log('Bootstrap ContentScript');

  // Instantiate the UI
  const ui = await createUi(ctx, overlayLoadingApp);

  // auto mount
  ui.mount();

  const addListenerHandler = (
    request: SendMessageParams,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: string) => void
  ) => {
    if (ui && request.type === 'scanPage') {
      // Returning a promise will send a response back to the sender
      if (request.command === 'open') {
        ui.mount();
      }

      // if (request.command === 'reload') {
      //   ui.remove();

      //   setTimeout(ui.mount, 2500);
      // }

      if (request.command === 'close') {
        ui.remove();
      }

      if (request.command === 'destroy') {
        beforeUnloadHandler();
      }

      sendResponse(getLog(request));

      return true;
    }

    throw Error('Unknown request');
  };

  const setupListeners = () => {
    // Setup listeners
    browser.runtime.onMessage.addListener(addListenerHandler);

    window.addEventListener('beforeunload', beforeUnloadHandler);
  };

  const removeListenerHandler = () => {
    browser.runtime.onMessage.removeListener(addListenerHandler);
    window.removeEventListener('beforeunload', beforeUnloadHandler);
  };

  const beforeUnloadHandler = () => {
    removeListenerHandler();

    ui.remove();
  };

  setupListeners();
};

export default defineContentScript({
  registration: 'runtime',
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main: mainContentScript,
});
