<script lang="ts">
  import { browser } from 'wxt/browser';
  import type { ButtonProps } from '@/utils';

  let { children, url, onClick, size, disabled, loading = false }: ButtonProps = $props();

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

<button class="button {loading && 'running'}" onclick={onClick} {style} disabled={disabled || loading}>
  {@render children()}
</button>

<style lang="scss">
  .button {
    min-width: 6rem;
    font-size: var(--font-size, 1rem);
    font-family: Arial;
    padding: 0.3rem 0.5rem;
    border-width: 0.0625rem;
    color: #424526;
    border-color: #ffaa22;
    font-weight: bold;
    cursor: pointer;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    box-shadow: 0rem 0.0625rem 0rem 0rem #fff6af;
    text-shadow: 0rem 0.0625rem 0rem #ffee66;
    background: linear-gradient(#ffec64, #ffab23);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.running {
      cursor: progress;
    }
  }

  .button:hover {
    background: linear-gradient(#ffab23, #ffec64);
  }
</style>
