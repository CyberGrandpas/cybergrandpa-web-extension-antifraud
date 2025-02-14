import { storeProtectionEnabled } from '@/lib/store';
import '@/styles/style.scss';
import { languageUpdates, setTitle } from '@/utils';
import { mount } from 'svelte';
import App from './options.svelte';

languageUpdates();
setTitle(i18n.t('options.title') + ' | ' + i18n.t('extension.name') + ' ' + i18n.t('extension.subname'));

storeProtectionEnabled.ready().then(() => {
  mount(App, {
    target: document.getElementById('app')!,
  });
});
