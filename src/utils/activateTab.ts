export const activateTab = (tabId: number, cb?: (tab: unknown) => void) => {
  browser.tabs.update(tabId, { active: true }, (tab) => cb?.(tab));
};
