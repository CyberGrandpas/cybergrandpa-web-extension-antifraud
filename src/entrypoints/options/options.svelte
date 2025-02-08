<script lang="ts">
  import { CONFIG_WWW_HELP } from '@/config';
  import Button from '@/components/button.svelte';
  import Header from '@/components/header.svelte';
  import Status from '@/components/status.svelte';

  let t = i18n.t;
</script>

<main>
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
