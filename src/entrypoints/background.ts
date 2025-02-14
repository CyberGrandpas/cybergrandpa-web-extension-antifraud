import { storeScanning } from '@/lib/store';
import { forwardMessageToCss } from '@/utils';

const onInstalledHandler = async ({ reason }: { reason: string }) => {
  if (reason !== 'install' && reason !== 'startup' && reason !== 'update') return;

  storeScanning.set('0');

  // Open a tab on install
  await browser.tabs.create({
    url: browser.runtime.getURL('/wizard.html'),
    active: true,
  });
};

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(onInstalledHandler);

  browser.runtime.onStartup.addListener(() => onInstalledHandler({ reason: 'startup' }));

  browser.runtime.onSuspend.addListener(() => onInstalledHandler({ reason: 'suspend' }));

  browser.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
    if (request.type === 'loadContentScript') {
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
  });
});
