import { isIgnoreUrlMatch } from './is-ignore-url-match';
import { SendMessageParams } from './types';

// MESSAGES FORWARDED TO CONTENT SCRIPTS and ALL TABS
export const forwardMessageToCss = async (request: SendMessageParams) => {
  // Grab tabs matching content scripts
  const allTabs = await browser.tabs.query({});

  // Filter out tabs that are not local
  const contentScriptTabs = allTabs.filter((tab) => {
    return (
      typeof tab.id !== 'undefined' &&
      typeof tab.url !== 'undefined' &&
      tab.id !== null &&
      tab.url !== null &&
      tab.url.length > 0 &&
      !isIgnoreUrlMatch(tab.url)
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
