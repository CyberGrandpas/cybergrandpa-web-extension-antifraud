<script lang="ts">
  import { type Snippet } from 'svelte';

  import { browser } from 'wxt/browser';

  interface Props {
    children: Snippet;
    url?: string;
  }

  let { children, url }: Props = $props();
</script>

<button class="button" onclick={() => browser.tabs.create({ url })}>
  {@render children()}
</button>

<style lang="scss">
  .button {
    font-size: 14px;
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
