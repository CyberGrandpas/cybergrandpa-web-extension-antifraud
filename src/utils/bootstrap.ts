import { ENV_LANGUAGE_FULL } from './env';

export const languageUpdates = () => {
  document.documentElement.lang = ENV_LANGUAGE_FULL;
};

export const setTitle = (title: string) => {
  document.title = title;
};
