import browser from 'webextension-polyfill';

// Initialize extension
browser.runtime.onInstalled.addListener((): void => {
  console.log('CyberGrandpa Extension installed');
});

// Listen for messages from content script
browser.runtime.onMessage.addListener((message: unknown, sender: browser.Runtime.MessageSender, sendResponse: (response?: unknown) => void) => {
  console.log('Received message:', message, 'from', sender);
  // No return value needed when we're not sending a response
  return undefined;
});

// Example of using storage
async function initializeStorage(): Promise<void> {
  const data = await browser.storage.local.get('settings');
  if (!data.settings) {
    await browser.storage.local.set({
      settings: {
        initialized: true,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

initializeStorage();
