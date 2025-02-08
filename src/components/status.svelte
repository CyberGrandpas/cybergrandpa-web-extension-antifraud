<script lang="ts">
  import { get } from 'svelte/store';
  import { storeProtectionEnabled, storeRealtimeEnabled, storeLatestUpdate } from '@/lib/store';
  import Toggle from '@/components/toggle.svelte';

  let enabled = $state(get(storeProtectionEnabled));
  let realtime = $state(get(storeRealtimeEnabled));
  let latestUpdate = $state(get(storeLatestUpdate));

  storeProtectionEnabled.subscribe((value) => {
    enabled = value;

    if (!enabled) {
      storeRealtimeEnabled.set(false);
    }
  });

  storeRealtimeEnabled.subscribe((value) => {
    realtime = value;

    if (realtime) {
      storeProtectionEnabled.set(true);
    }
  });

  storeLatestUpdate.subscribe((value) => {
    latestUpdate = value;
  });

  let t = i18n.t;

  const toggleFnEnabled = () => {
    storeProtectionEnabled.set(!enabled);
  };

  const toggleFnRealtime = () => {
    storeRealtimeEnabled.set(!realtime);
  };
</script>

<ul>
  <li>
    <span class="feature">
      {#if enabled}
        {t('global.enabled')}
      {:else}
        {t('global.disabled')}
      {/if}
    </span>
    <span><Toggle checked={enabled} onClick={toggleFnEnabled} /></span>
  </li>
  <li>
    <span class="feature">{t('popup.realTimeProtection')}</span>
    <span><Toggle checked={realtime} onClick={toggleFnRealtime} color="yellow" /></span>
  </li>
  <li>
    <span class="feature">{t('popup.latestUpdate')}</span>
    <span>{latestUpdate || '-'}</span>
  </li>
</ul>
