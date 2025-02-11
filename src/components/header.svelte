<script lang="ts">
  import { CONFIG_WWW_MAIN } from '@/config';
  import type { HeaderProps } from '@/utils';
  import Logo from './logo.svelte';

  let { logoSize = 96, twoRows = false }: HeaderProps = $props();
  let t = i18n.t;
</script>

<div class="header">
  <div>
    <h1 class="app-title">
      <span class="extension-name">
        {t('extension.name')}
      </span>

      {#if !!twoRows}
        <br />
      {/if}

      <rem>{t('extension.subname')}</rem>
    </h1>

    {#if logoSize > 96}
      <p class="slogan">
        <rem>{t('extension.slogan')}</rem>
      </p>
    {/if}
  </div>
  <div class="logo-container">
    <a href={CONFIG_WWW_MAIN} target="_blank" title={t('global.visit', [t('extension.name')])}>
      <Logo alt={`${t('extension.name')}} ${t('global.logo')}} `} size={logoSize} />
    </a>
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

  .app-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .logo-container {
    margin-left: 0.75rem;
  }

  .slogan {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    line-height: 1.5rem;
    font-size: 1.1rem;
  }

  .extension-name {
    font-size: 125%;
    font-weight: 900;
  }
</style>
