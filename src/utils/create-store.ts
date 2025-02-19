import { writable } from 'svelte/store';
import { type StorageItemKey, storage } from 'wxt/storage';

export function createStore<T>(value: T, storageKey: StorageItemKey) {
  const { subscribe, set } = writable(value);

  const storageItem = storage.defineItem<T>(storageKey, {
    fallback: value,
  });

  const unwatch = storageItem.watch(set);

  storageItem.getValue().then(set);

  return {
    ready: storageItem.getValue,
    subscribe,
    unwatch,
    set: (value: T) => {
      return storageItem.setValue(value);
    },
  };
}
