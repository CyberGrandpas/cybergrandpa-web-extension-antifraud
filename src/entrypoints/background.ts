const onInstalledHandler = async ({ reason }: { reason: string }) => {
  if (reason !== 'install' && reason !== 'startup') return;

  // Open a tab on install
  await browser.tabs.create({
    url: browser.runtime.getURL('/wizard.html'),
    active: true,
  });
};

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(onInstalledHandler);

  browser.runtime.onStartup.addListener(() => onInstalledHandler({ reason: 'startup' }));

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

    // MESSAGES FORWARDED TO CONTENT SCRIPTS and ALL TABS
    // Grab tabs matching content scripts
    const allTabs = await browser.tabs.query({});
    const contentScriptMatches = new MatchPattern('*://*/*');
    const contentScriptTabs = allTabs.filter(
      (tab) => tab.id != null && tab.url != null && contentScriptMatches.includes(tab.url)
    );

    // Forward request to tabs, collecting the responses
    // const responses =
    await Promise.all(
      contentScriptTabs.map(async (tab) => {
        let response;

        try {
          response = await browser.tabs.sendMessage(tab.id!, request);
        } catch (error) {
          // console.error(error);
          response = error;
        }

        // sendResponse(String(response));

        return { tab: tab.id, response };
      })
    );

    // Send responses back to sender
    // sendResponse(responses);

    // Return an array of all responses back to popup.
    return true;
  });
});
