<script lang="ts">
  import { get } from 'svelte/store';
  import { CONFIG_WWW_HELP } from '@/config';
  import { storeRealtimeEnabled, storeScanning } from '@/lib/store';
  import { getActiveTab, activateTab, sendMessage } from '@/utils';
  import Header from '@/components/header.svelte';
  import Button from '@/components/button.svelte';
  import Status from '@/components/status.svelte';

  let realtime = $state(get(storeRealtimeEnabled));
  let scanning = $state(get(storeScanning));

  const setupListeners = () => {
    const unsubscribeRealtime = storeRealtimeEnabled.subscribe((value) => {
      realtime = value;
    });

    const unsubscribeScanning = storeScanning.subscribe((value) => {
      scanning = value;
      console.log(`scanning = ${value}`);
    });

    console.log(`setupListeners`);

    return [unsubscribeRealtime, unsubscribeScanning];
  };

  const isBusyScanning = (value: string) => Number(value) > 0;

  const scanPageOnClickHandler = async () => {
    if (isBusyScanning(scanning)) {
      return activateTab(Number(scanning));
    }

    const { id, url } = await getActiveTab();

    if (!url || url?.startsWith('about') || url?.startsWith('chrome') || url?.startsWith('firefox')) {
      return;
    }

    const response = await sendMessage({ type: 'loadContentScript', tabId: id });

    storeScanning.set(String(id));

    console.log('loadContentScript', { response });
    console.log(`tabId = ${id}`);
  };

  let t = i18n.t;

  $effect(() => {
    const [unsubscribeRealtime, unsubscribeScanning] = setupListeners();

    return () => {
      storeRealtimeEnabled.unwatch();
      storeScanning.unwatch();
      unsubscribeRealtime();
      unsubscribeScanning();
    };
  });
</script>

<main>
  <div class="container">
    <Header logoSize={72} twoRows={true} />

    <p class="slogan">
      <em>{t('extension.slogan')}</em>
    </p>

    <div class="settings">
      <h4>{t('popup.tools')}</h4>
      <ul>
        <li>
          <span class="feature">{t('popup.scanPage')}</span>
          <span class="feature-link">
            <Button
              onClick={scanPageOnClickHandler}
              size="small"
              disabled={realtime}
              loading={isBusyScanning(scanning)}
            >
              {isBusyScanning(scanning) ? t('global.scanning') : t('popup.scan')}
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

    <div class="inner-container settings">
      <h4>{t('popup.protectionStatus')}</h4>
      <Status floatingUpdate />
    </div>
  </div>
</main>

<style lang="scss">
  :global(html) {
    // This controls the minimum popup width
    min-width: 24.5rem;
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
