import browser from 'webextension-polyfill';
import './popup.scss';

document.addEventListener('DOMContentLoaded', async () => {
  // Example: Get data from storage
  const data = await browser.storage.local.get('settings');
  console.log('Settings:', data.settings);

  // Example: Send message to content script
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]?.id) {
    browser.tabs.sendMessage(tabs[0].id, {
      type: 'POPUP_OPENED',
      timestamp: new Date().toISOString(),
    });
  }
});
