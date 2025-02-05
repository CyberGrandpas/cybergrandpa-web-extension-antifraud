import { mount } from 'svelte';
import App from './popup.svelte';
import '../../styles/style.scss';

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
