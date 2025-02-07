import { writable } from 'svelte/store';
import { type StorageItemKey, storage } from 'wxt/storage';

// In theory, it should be possible to remove the storageItem.watch call
// and only listen to changes in the svelte store,
// but then the changes don't propagate from popup to content/background.
// Improvements welcome!
export function createStore<T>(value: T, storageKey: StorageItemKey) {
  const { subscribe, set } = writable(value);

  const storageItem = storage.defineItem<T>(storageKey, {
    fallback: value,
  });

  storageItem.getValue().then(set);

  const unwatch = storageItem.watch(set);

  return {
    ready: () => storageItem.getValue(),
    subscribe,
    set: (value: T) => {
      storageItem.setValue(value);
    },
    destroy: () => {
      unwatch();
    },
  };
}
