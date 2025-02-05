import { mount } from 'svelte';
import App from './wizard.svelte';
import '../../styles/style.scss';

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
