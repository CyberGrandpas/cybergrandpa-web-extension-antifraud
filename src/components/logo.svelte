<script lang="ts">
  import type { LogoProps } from '@/utils';

  let { size = 128, alt = '' }: LogoProps = $props();

  const src = browser.runtime.getURL(`/icon/${size}.png` as `/icon/128.png`);
</script>

<img {src} width={size} height={size} {alt} />

<style lang="scss">
  img {
    display: block;
    margin: 0 auto;
  }
</style>
