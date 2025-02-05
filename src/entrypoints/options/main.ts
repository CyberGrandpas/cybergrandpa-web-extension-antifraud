import '@/styles/style.scss';
import { languageUpdates, setTitle } from '@/utils/bootstrap';
import { mount } from 'svelte';
import App from './options.svelte';

languageUpdates();
setTitle(i18n.t('options.title'));

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
