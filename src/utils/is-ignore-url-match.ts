import { CONFIG_LOCAL_URL_MATCHES } from '@/config';

export const isIgnoreUrlMatch = (url: string) => {
  return new RegExp(CONFIG_LOCAL_URL_MATCHES).test(url);
};
