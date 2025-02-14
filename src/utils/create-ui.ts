import { storeScanning } from '@/lib/store';
import { unmount } from 'svelte';
import { ContentScriptContext } from 'wxt/client';
import { bootstrapApp } from './bootstrap-app';
import { SvelteApp } from './types';

export const createUi = (name: string, svelteApp: SvelteApp, ctx: ContentScriptContext) => {
  return createShadowRootUi(ctx, {
    name,
    position: 'modal',
    zIndex: 99999999,
    anchor: 'body',
    append: 'first',
    onMount: (container) => {
      return bootstrapApp(svelteApp, container);
    },
    onRemove: (app) => {
      // Set the scanning state to 0
      storeScanning.set('0');

      // Unmount the SvelteApp when the ShadowRootUi is removed
      if (app) {
        unmount(app, { outro: true });
      }
    },
  });
};
