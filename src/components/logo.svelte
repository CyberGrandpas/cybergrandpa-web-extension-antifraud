<script lang="ts">
  import type { LogoProps } from '@/utils';

  let { size = 128, alt = '' }: LogoProps = $props();

  const src = `/icon/${size}.png`;
</script>

<img {src} width={size} height={size} {alt} />

<style lang="scss">
  img {
    display: block;
    margin: 0 auto;
  }
</style>
