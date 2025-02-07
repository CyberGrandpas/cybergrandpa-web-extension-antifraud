<script lang="ts">
  import { browser } from 'wxt/browser';
  import type { ButtonProps } from '@/utils';

  let { children, url, onClick, size }: ButtonProps = $props();

  if (!!url && !!onClick) {
    console.error('Either url or onClick should be defined, not both');
  } else if (!url && !onClick) {
    console.error('Either only url or only onClick should be defined');
  } else {
    if (!!url && !onClick) {
      onClick = () => browser.tabs.create({ url, active: true });
    }
  }

  let style = `--font-size: ${size === 'small' ? '0.8rem' : size === 'large' ? '1.3rem' : '1rem'}`;
</script>

<button class="button" onclick={onClick} {style}>
  {@render children()}
</button>

<style lang="scss">
  .button {
    font-size: var(--font-size, 1rem);
    font-family: Arial;
    padding: 0.3rem 0.5rem;
    border-width: 1px;
    color: #424526;
    border-color: #ffaa22;
    font-weight: bold;
    cursor: pointer;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    box-shadow: 0px 1px 0px 0px #fff6af;
    text-shadow: 0px 1px 0px #ffee66;
    background: linear-gradient(#ffec64, #ffab23);
  }

  .button:hover {
    background: linear-gradient(#ffab23, #ffec64);
  }
</style>
