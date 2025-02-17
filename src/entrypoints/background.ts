import { storeScanning } from '@/lib/store';
import { forwardMessageToCss, getStreamArray, registerUrlService } from '@/utils';

const onInstalledHandler = async ({ reason }: { reason: string }) => {
  if (reason !== 'install' && reason !== 'startup' && reason !== 'update') return;

  storeScanning.set('0');

  // Open a tab on install
  await browser.tabs.create({
    url: browser.runtime.getURL('/wizard.html'),
    active: true,
  });
};

const onMessageHandler = async (
  request: globalThis.SendMessageParams,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (
    arg0: chrome.scripting.InjectionResult<unknown>[] | { tab: number | undefined; response: unknown }[]
  ) => void
) => {
  if (request.type === 'loadContentScript' && request.tabId) {
    // Returning a promise will send a response back to the sender
    const response = await browser.scripting.executeScript({
      target: { tabId: request.tabId },
      files: ['/content-scripts/content.js'],
    });

    sendResponse(response);

    return Promise.resolve(response);
  }

  const responses = await forwardMessageToCss(request);

  // Send responses back to sender
  sendResponse(responses);

  // Return an array of all responses back to popup.
  return true;
};

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(onInstalledHandler);

  browser.runtime.onStartup.addListener(() => onInstalledHandler({ reason: 'startup' }));

  browser.runtime.onSuspend.addListener(() => onInstalledHandler({ reason: 'suspend' }));

  browser.runtime.onMessage.addListener(onMessageHandler);

  // Register proxy-service so other JS context's can get or insert favicons
  const urlService = registerUrlService();

  let syncUrlsIsBusy = false;

  const syncUrls = async () => {
    if (syncUrlsIsBusy) return;

    syncUrlsIsBusy = true;
    console.log({ syncUrlsIsBusy });

    const response = await getStreamArray('https://hblock.molinero.dev/hosts');

    // console.dir(response);

    urlService.upsertBulk(response);

    syncUrlsIsBusy = false;
    console.log({ syncUrlsIsBusy, responseRows: response.length });
  };

  setTimeout(async () => {
    try {
      const res = await urlService.count();

      console.dir(res);
    } catch (error) {
      console.error(error);
    }
  }, 1000);

  syncUrls();
  setInterval(syncUrls, 50000);
});
