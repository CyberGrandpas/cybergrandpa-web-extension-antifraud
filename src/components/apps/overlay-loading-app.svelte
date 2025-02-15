<script lang="ts">
  import Modal from '@/components/modal.svelte';

  let loader = $state(true);
  let hasIssues = $state(false);
  let { onClose } = $props();
  let t = i18n.t;

  $effect(() => {
    setTimeout(() => {
      loader = false;
    }, 3000);
  });
</script>

<Modal logo autoShow {loader} {onClose}>
  <h4>{t('overlay.title')}</h4>
  <p>{hasIssues ? t('overlay.truthyMessage') : t('overlay.falsyMessage')}</p>
</Modal>

<style lang="scss">
  :global(body) {
    overflow: hidden;
    background-image: none !important;
    background-color: transparent !important;
  }

  h4 {
    margin: 0;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  p {
    margin-bottom: 1rem;
  }
</style>
