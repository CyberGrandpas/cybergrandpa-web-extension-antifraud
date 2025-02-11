export const getTabId = async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  return tab.id;
};
