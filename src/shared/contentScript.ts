import browser from 'webextension-polyfill';

console.log('CyberGrandpa content script loaded');

// Example: Send message to background script
browser.runtime.sendMessage({
  type: 'CONTENT_SCRIPT_LOADED',
  url: window.location.href,
});

// Example: Listen for messages from background script
browser.runtime.onMessage.addListener((message: unknown, sender: browser.Runtime.MessageSender, sendResponse: (response?: unknown) => void) => {
  console.log('Content script received message:', message);
  return undefined; // Explicitly return undefined since we're not sending a response
});
