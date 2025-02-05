import { mount } from 'svelte';
import App from './options.svelte';
import '../../styles/style.scss';

const app = mount(App, {
  target: document.getElementById('app')!,
});

document.documentElement.lang = browser.i18n.getUILanguage();

export default app;
