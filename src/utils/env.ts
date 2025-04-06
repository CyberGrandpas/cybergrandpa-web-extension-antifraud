import pkg from '../../package.json';

export const ENV_APP_VERSION = pkg.version;

export const ENV_LANGUAGE_FULL = browser.i18n ? browser.i18n.getUILanguage() : '';

export const ENV_LANGUAGE = ENV_LANGUAGE_FULL?.substring(0, 2);
