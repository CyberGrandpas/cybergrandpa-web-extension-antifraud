import { STORAGE_KEY_URLS, STREAM_URL } from '@/config';
import { checkAlarmState, GetStream, type UrlService } from '@/utils';

export const initDb = (urlService: UrlService) => {
  let syncUrlsIsBusy = false;

  const syncUrls = async () => {
    if (syncUrlsIsBusy) return;

    const startTime = performance.now();
    syncUrlsIsBusy = true;

    try {
      const base64string = await new GetStream(STREAM_URL).toBase64String();

      urlService.upsert(base64string);
    } catch (error) {
      console.error(error);
    }

    const endTime = performance.now();

    syncUrlsIsBusy = false;
    console.log('syncUrls took:', parseInt(String(endTime - startTime)) + 'ms');
  };

  // Set interval to sync urls
  checkAlarmState(STORAGE_KEY_URLS);

  // Listen to changes
  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === STORAGE_KEY_URLS) {
      syncUrls();
    }
  });

  // Self-start
  setTimeout(() => syncUrls(), 500);
};
