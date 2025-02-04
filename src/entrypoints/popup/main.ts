import { mount } from 'svelte';
import App from './popup.svelte';
import '../../styles/style.scss';

const app = mount(App, {
  target: document.getElementById('app')!,
});

// document.title = i18n.t('popup.title');

// declare const messageH1: HTMLHeadingElement;
// messageH1.textContent = i18n.t('popup.hello', ['John Smith']);

export default app;
