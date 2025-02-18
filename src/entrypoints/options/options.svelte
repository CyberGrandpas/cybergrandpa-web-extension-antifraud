<script lang="ts">
  import Button from '@/components/button.svelte';
  import Header from '@/components/header.svelte';
  import Status from '@/components/status.svelte';
  import { CONFIG_WWW_HELP } from '@/config';

  let t = i18n.t;
</script>

<main class="main">
  <div class="container">
    <Header logoSize={64} twoRows={true} />

    <div class="inner-container settings">
      <h4>{t('global.options')}</h4>
      <Status />
    </div>

    <div class="settings">
      <h4>{t('popup.tools')}</h4>
      <ul>
        <li>
          <span class="feature">{t('popup.settings')}</span>
          <span class="feature-link">
            <Button url="wizard.html" size="small">{t('popup.wizard')}</Button>
          </span>
        </li>
        <li>
          <span class="feature">{t('global.support')}</span>
          <span class="feature-link">
            <Button url={CONFIG_WWW_HELP} size="small">{t('popup.help')}</Button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</main>

<style lang="scss">
  :global(html) {
    // This controls the minimum popup width
    min-width: 30rem;
    // This controls the minimum popup height
    min-height: 35rem;
  }
</style>
