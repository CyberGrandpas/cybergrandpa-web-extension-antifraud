<script lang="ts">
  import type { LogoProps } from '@/utils';

  let { size = 128, alt = '' }: LogoProps = $props();

  const src = browser.runtime.getURL(`/icon/${size}.png` as `/icon/128.png`);
</script>

<div class="logo">
  <img {src} width={size} height={size} {alt} />
</div>

<style lang="scss">
  .logo {
    background-color: var(--background-color-light);
    border-radius: 100%;
    display: block;

    img {
      display: block;
      margin: 0 auto;
    }
  }
</style>
