<script lang="ts">
  import Logo from './logo.svelte';

  interface Props {
    logoSize?: number;
  }

  let { logoSize = 96 }: Props = $props();
  let t = i18n.t;
</script>

<div class="header">
  <div class="text">
    <h1>{t('extension.name')} <em>{t('extension.subname')}</em></h1>

    {#if logoSize > 96}
      <p class="description">
        <em>{t('extension.slogan')}</em>
      </p>
    {/if}
  </div>
  <div class="logo-container">
    <Logo alt="CyberGrandpa Logo" size={logoSize} />
  </div>
</div>

<style lang="scss">
  .header {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .logo-container {
    margin-left: 0.75rem;
  }
</style>
