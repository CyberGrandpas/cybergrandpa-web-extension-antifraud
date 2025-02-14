<script lang="ts">
  import Modal from '@/components/modal.svelte';
  import '@/styles/style.scss';

  let { onClose } = $props();

  let t = i18n.t;
</script>

<Modal show autoShow loader logo {onClose}>
  <p>
    {t('global.scanning')}
  </p>
</Modal>
