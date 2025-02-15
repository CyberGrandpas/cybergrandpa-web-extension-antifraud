import { SendMessageParams } from './types';

// MESSAGES FORWARDED TO CONTENT SCRIPTS and ALL TABS
export const forwardMessageToCss = async (request: SendMessageParams) => {
  // Grab tabs matching content scripts
  const allTabs = await browser.tabs.query({});
  const contentScriptMatches = new MatchPattern('*://*/*');
  const contentScriptTabs = allTabs.filter((tab) => {
    return (
      typeof tab.id !== 'undefined' &&
      typeof tab.url !== 'undefined' &&
      tab.id !== null &&
      tab.url !== null &&
      tab.url.length > 0 &&
      !tab.url.startsWith('about:') &&
      !tab.url.startsWith('chrome') &&
      !tab.url.startsWith('firefox') &&
      contentScriptMatches.includes(tab.url)
    );
  });

  // Forward request to tabs, collecting the responses
  const responses = await Promise.all(
    contentScriptTabs.map(async (tab) => {
      let response;

      try {
        response = await browser.tabs.sendMessage(tab.id!, request);
      } catch (error) {
        response = error;
      }

      return { tab: tab.id, response };
    })
  );

  return responses;
};
