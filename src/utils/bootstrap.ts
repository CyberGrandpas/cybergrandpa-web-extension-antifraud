const languageUpdates = () => {
  document.documentElement.lang = browser.i18n.getUILanguage();
};

const setTitle = (title: string) => {
  document.title = title;
};

export { languageUpdates, setTitle };
