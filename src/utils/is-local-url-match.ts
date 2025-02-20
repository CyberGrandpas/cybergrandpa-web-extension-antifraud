import { CONFIG_LOCAL_URL_MATCHES } from '@/config';

export const isLocalUrlMatch = (url: string) => {
  return new RegExp(CONFIG_LOCAL_URL_MATCHES).test(url);
};
