<script lang="ts">
  import Modal from '@/components/modal.svelte';

  let loader = $state(true);
  let { onClose } = $props();
  let t = i18n.t;

  $effect(() => {
    setTimeout(() => {
      loader = false;
    }, 1500);
  });
</script>

<Modal logo autoShow {loader} {onClose}>
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
