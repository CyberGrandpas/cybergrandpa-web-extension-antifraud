import { type StorageItemKey } from 'wxt/storage';

const defaultAlarmInterval = 11 * 60 * 60 * 1000; // 11 hours

const checkAlarmState = async (storageKey: StorageItemKey, milliseconds: number = defaultAlarmInterval) => {
  const periodInMinutes = milliseconds / 1000 / 60;

  let alarm = await browser.alarms.get(storageKey);

  if (!alarm) {
    await browser.alarms.create(storageKey, { periodInMinutes });

    alarm = await browser.alarms.get(storageKey);
  }

  return alarm;
};

export { checkAlarmState };
