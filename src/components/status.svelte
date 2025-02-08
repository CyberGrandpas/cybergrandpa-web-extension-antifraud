<script lang="ts">
  import { get } from 'svelte/store';
  import { CONFIG_WWW_MAIN } from '@/config';
  import { storeProtectionEnabled, storeRealtimeEnabled, storeLatestUpdate, storePackageType } from '@/lib/store';
  import Toggle from '@/components/toggle.svelte';

  let { floatingUpdate = false } = $props();

  let enabled = $state(get(storeProtectionEnabled));
  let realtime = $state(get(storeRealtimeEnabled));
  let latestUpdate = $state(get(storeLatestUpdate));
  let packageType = $state(get(storePackageType));

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

  storePackageType.subscribe((value) => {
    packageType = value;
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
    <span class="feature"
      >{t('popup.package')} <em>({packageType === '0' ? t('popup.packageFree') : t('popup.packagePaid')})</em></span
    >
    <span class="feature-link">
      <a href={CONFIG_WWW_MAIN} target="_blank">{packageType === '0' ? t('popup.upgrade') : t('popup.billing')}</a>
    </span>
  </li>
  {#if !floatingUpdate}
    <li>
      <span class="feature">{t('popup.latestUpdate')}</span>
      <span>{latestUpdate || '-'}</span>
    </li>
  {/if}
</ul>

{#if floatingUpdate}
  <section class="latest-update-floating">
    {t('popup.latestUpdate')}: <span>{latestUpdate || '-'}</span>
  </section>
{/if}

<style lang="scss">
  .latest-update-floating {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-background);
    padding: 0.5rem var(--padding-horizontal) 0.3rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    text-align: center;
    transition: opacity 0.25s ease-in-out;
    opacity: 0.7;

    &:hover {
      opacity: 1;

      span {
        background: rgba(255, 255, 255, 0.8);
      }
    }

    span {
      transition: background-color 0.1s ease-in-out;
      display: inline-block;
      color: red;
      padding: 0 0.35rem 0 0.2rem;
      border-radius: 0.2rem;
    }
  }
</style>
