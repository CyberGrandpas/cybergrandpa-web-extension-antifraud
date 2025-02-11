const onInstalledHandler = async ({ reason }: { reason: string }) => {
  if (reason !== 'install') return;

  // Open a tab on install
  await browser.tabs.create({
    url: browser.runtime.getURL('/wizard.html'),
    active: true,
  });
};

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(onInstalledHandler);

  browser.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
    if (message.type === 'loadContentScript') {
      // Returning a promise will send a response back to the sender
      const response = await browser.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ['/content-scripts/content.js'],
      });

      return sendResponse(response);
    }

    // MESSAGES FORWARDED TO CONTENT SCRIPTS and ALL TABS
    // Grab tabs matching content scripts
    const allTabs = await browser.tabs.query({});
    const contentScriptMatches = new MatchPattern('*://*/*');
    const contentScriptTabs = allTabs.filter(
      (tab) => tab.id != null && tab.url != null && contentScriptMatches.includes(tab.url)
    );

    // Forward message to tabs, collecting the responses
    const responses = await Promise.all(
      contentScriptTabs.map(async (tab) => {
        const response = await browser.tabs.sendMessage(tab.id!, message);
        return { tab: tab.id, response };
      })
    );

    // Return an array of all responses back to popup.
    return sendResponse(responses);
  });
});
