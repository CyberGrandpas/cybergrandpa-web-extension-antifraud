import Popup from './popup/popup.svelte';

const app = new Popup({
  target: document.querySelector('#app')!,
});

export default app;
