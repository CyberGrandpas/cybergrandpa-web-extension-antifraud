import '@/styles/style.scss';
import { SendMessageParams, getLog } from '@/utils';
import { createUi } from '@/utils/create-ui';
import { ContentScriptContext } from 'wxt/client';

const mainContentScript = async (ctx: ContentScriptContext) => {
  // Instantiate the UI
  const ui = await createUi('overlay-loading-app', ctx);

  // auto mount
  ui.mount();

  const addListeners = () => {
    browser.runtime.onMessage.addListener(addListenerHandler);
    ctx.addEventListener(window, 'beforeunload', beforeUnloadHandler);
  };

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
