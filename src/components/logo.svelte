<script lang="ts">
  interface Props {
    size?: number;
    alt?: string;
  }

  let { size = 128, alt = '' }: Props = $props();
</script>

<img src="/icon/{size}.png" width={size} height={size} {alt} />

<style lang="scss">
  img {
    display: block;
    margin: 0 auto;
  }
</style>
