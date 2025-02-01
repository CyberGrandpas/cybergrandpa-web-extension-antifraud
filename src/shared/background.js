// Shared background script logic
const browserAPI = chrome; // Will be replaced with browser-specific API during build

// Example of browser API usage
browserAPI.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Add your background script logic here
