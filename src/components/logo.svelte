<script lang="ts">
  import type { LogoProps } from '@/utils';

  let { size = 128, alt = '' }: LogoProps = $props();
</script>

<img src="/icon/{size}.png" width={size} height={size} {alt} />

<style lang="scss">
  img {
    display: block;
    margin: 0 auto;
  }
</style>
