<script lang="ts">
  import { get } from 'svelte/store';
  import { CONFIG_WWW_HELP } from '@/config';
  import { storeRealtimeEnabled, storeScanning } from '@/lib/store';
  import { getTabId } from '@/utils';
  import Header from '@/components/header.svelte';
  import Button from '@/components/button.svelte';
  import Status from '@/components/status.svelte';

  let realtime = $state(get(storeRealtimeEnabled));
  let scanning = $state(get(storeScanning));

  storeRealtimeEnabled.subscribe((value) => {
    realtime = value;
  });

  storeScanning.subscribe((value) => {
    scanning = value;
  });

  const scanPageOnClickHandler = async () => {
    storeScanning.set(true);

    const tabId = await getTabId();
    const response = await browser.runtime.sendMessage({ type: 'loadContentScript', tabId });

    console.log('loadContentScript', { response });
  };

  let t = i18n.t;
</script>

<main>
  <div class="container">
    <Header logoSize={72} twoRows={true} />

    <p class="slogan">
      <em>{t('extension.slogan')}</em>
    </p>

    <div class="inner-container settings">
      <h4>{t('popup.protectionStatus')}</h4>
      <Status floatingUpdate />
    </div>

    <div class="settings">
      <h4>{t('popup.tools')}</h4>
      <ul>
        <li>
          <span class="feature">{t('popup.scanPage')}</span>
          <span class="feature-link">
            <Button onClick={scanPageOnClickHandler} size="small" disabled={realtime} loading={scanning}>
              {t('popup.scan')}
            </Button>
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
    min-width: 26rem;
    // This controls the minimum popup height
    min-height: 27rem;
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
