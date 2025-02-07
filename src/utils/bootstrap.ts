export const languageUpdates = () => {
  console.log(browser.i18n.getUILanguage());
  document.documentElement.lang = browser.i18n.getUILanguage();
};

export const setTitle = (title: string) => {
  document.title = title;
};
