import App from '@/components/modal.svelte';
import '@/styles/style.scss';
import { mount, unmount } from 'svelte';
import { ContentScriptContext } from 'wxt/client';

const overlayLoadingApp = (container: HTMLElement) => {
  return mount(App, {
    target: container,
    props: {
      loader: true,
      show: true,
      logo: true,
      onClose: async () => {
        // Send a message to forward to contentScript
        browser.runtime.sendMessage({ type: 'scanPage', command: 'destroy' });
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
    // onRemove: (app) => unmount(app!, { outro: true }),
    onRemove: (app) => {
      // console.log('onRemove', app);

      // Destroy the app when the UI is removed
      if (app) {
        unmount(app, { outro: true });
      }
    },
  });
};

const getLog = (message: { command: string; type: string }) => {
  return `[${message.command}] of "${message.type}" executed`;
};

const mainContentScript = async (ctx: ContentScriptContext) => {
  console.log('Bootstrap ContentScript');

  // Instantiate the UI
  const ui = await createUi(ctx, overlayLoadingApp);

  // auto mount
  // ui.mount();
  ui.autoMount();

  // Setup listener for one-time messages
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (ui && message.type === 'scanPage') {
      // Returning a promise will send a response back to the sender
      if (message.command === 'open') {
        ui.mount();
      }

      // Returning a promise will send a response back to the sender
      if (message.command === 'reload') {
        ui.remove();

        setTimeout(() => {
          ui!.mount();
        }, 500);
      }

      // Only respond to close command
      if (message.command === 'destroy') {
        ui.remove();
      }

      // Returning a promise will send a response back to the sender
      return sendResponse(getLog(message));
    }

    throw Error('Unknown message');
  });
};

export default defineContentScript({
  registration: 'runtime',
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main: mainContentScript,
});
