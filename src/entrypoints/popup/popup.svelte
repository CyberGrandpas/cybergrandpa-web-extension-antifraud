<script lang="ts">
  import { CONFIG_WWW_HELP } from '@/config';
  import Header from '@/components/header.svelte';
  import Button from '@/components/button.svelte';
  import Status from '@/components/status.svelte';

  let t = i18n.t;
</script>

<main>
  <div class="container">
    <Header logoSize={64} twoRows={true} />

    <p class="slogan">
      <em>{t('extension.slogan')}</em>
    </p>

    <div class="inner-container settings">
      <h4>{t('popup.protectionStatus')}</h4>
      <Status />
    </div>

    <div class="settings">
      <h4>{t('popup.tools')}</h4>
      <ul>
        <li>
          <span class="feature">{t('popup.scanPage')}</span>
          <span class="feature-link">
            <Button url="wizard.html" size="small">{t('popup.scan')}</Button>
          </span>
        </li>
        <li>
          <span class="feature">{t('global.support')}</span>
          <span class="feature-link">
            <a href={CONFIG_WWW_HELP} target="_blank">{t('global.wwwHelp')}</a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</main>

<style lang="scss">
  :global(html) {
    // This controls the minimum popup width
    min-width: 26rem;
    // This controls the minimum popup height
    min-height: 31.25rem;
  }

  main {
    width: auto;
  }

  .slogan {
    margin-bottom: 0.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    margin: 0 -0.9rem;
  }
</style>
