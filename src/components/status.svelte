<script lang="ts">
  import { get } from 'svelte/store';
  import { storeProtectionEnabled, storeRealtimeEnabled, storeLatestUpdate } from '@/lib/store';
  import Toggle from '@/components/toggle.svelte';

  let enabled = $state(get(storeProtectionEnabled));
  let realtime = $state(get(storeRealtimeEnabled));
  let latestUpdate = $state(get(storeLatestUpdate));

  storeProtectionEnabled.subscribe((value) => {
    enabled = value;
  });

  storeRealtimeEnabled.subscribe((value) => {
    realtime = value;
  });

  storeLatestUpdate.subscribe((value) => {
    latestUpdate = value;
  });

  let t = i18n.t;
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
    <span><Toggle checked={enabled} onClick={() => storeProtectionEnabled.set(!enabled)} /></span>
  </li>
  <li>
    <span class="feature">{t('popup.realTimeProtection')}</span>
    <span><Toggle checked={realtime} onClick={() => storeRealtimeEnabled.set(!realtime)} /></span>
  </li>
  <li>
    <span class="feature">{t('popup.latestUpdate')}</span>
    <span>{latestUpdate || '-'}</span>
  </li>
</ul>
