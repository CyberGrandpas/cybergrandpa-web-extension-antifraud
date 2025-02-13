import App from '@/components/modal.svelte';
import { storeScanning } from '@/lib/store';
import '@/styles/style.scss';
import { SendMessageParams, getLog } from '@/utils';
import { mount, unmount } from 'svelte';
import { ContentScriptContext } from 'wxt/client';

const overlayLoadingApp = (container: HTMLElement) => {
  return mount(App, {
    target: container,
    props: {
      accessors: true,
      autoShow: true,
      loader: true,
      logo: true,
      onClose: () => {
        // Send a request to forward to contentScript
        browser.runtime.sendMessage({ type: 'scanPage', command: 'destroy' });
      },
    },
    events: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onMount: (evt) => {
        // eslint-disable-next-line no-debugger
        debugger;
      },
    },
  });
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
  console.log('Bootstrap mainContentScript');

  // Instantiate the UI
  // TODO: make it modular for different apps in content script's page.
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

  const addListeners = () => {
    browser.runtime.onMessage.addListener(addListenerHandler);
    ctx.addEventListener(window, 'beforeunload', beforeUnloadHandler);
  };

  const removeInvalidatedListener = ctx.onInvalidated(() => {
    browser.runtime.onMessage.removeListener(addListenerHandler);
  });

  removeInvalidatedListener();

  const beforeUnloadHandler = () => {
    ctx.abort();
    ui.remove();
  };

  addListeners();
};

export default defineContentScript({
  registration: 'runtime',
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main: mainContentScript,
});
