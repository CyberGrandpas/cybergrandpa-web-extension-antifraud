<script lang="ts">
  import Modal from '@/components/modal.svelte';

  let { onClose } = $props();

  let t = i18n.t;
</script>

<Modal autoShow loader logo {onClose}>
  <p>
    {t('global.scanning')}
  </p>
</Modal>

<style lang="scss">
  :global(body) {
    overflow: hidden;
    background-image: none !important;
    background-color: transparent !important;
  }
</style>
