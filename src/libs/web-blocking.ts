import { CONFIG_LOCAL_URL_MATCHES } from '@/config';

export const initWebBlocking = () => {
  browser.webNavigation.onCommitted.addListener(
    (details) => {
      console.log('This is my favorite website!', details.url);
    },
    { url: [{ urlMatches: CONFIG_LOCAL_URL_MATCHES }] }
  );
};
