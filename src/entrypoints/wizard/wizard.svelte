<script lang="ts">
  import { get } from 'svelte/store';
  import { CONFIG_WWW_MAIN, ENV_LANGUAGE } from '@/config';
  import { storeAlertsEnabled, storeNewsEnabled, storeOnBoardingCompleted, storeProtectionEnabled } from '@/lib/store';
  import Button from '@/components/button.svelte';
  import Header from '@/components/header.svelte';
  import Modal from '@/components/modal.svelte';
  import Radio from '@/components/radio.svelte';

  let userOnboarded = $derived(get(storeOnBoardingCompleted));

  let showModal = $state(false);

  let t = i18n.t;

  let pinned = $state('1');
  let alerts = $state('1');
  let news = $state('1');

  const saveSettings = () => {
    storeProtectionEnabled.set(true);
    storeOnBoardingCompleted.set(true);
    storeAlertsEnabled.set(alerts === '1' ? true : false);
    storeNewsEnabled.set(news === '1' ? true : false);

    if (pinned === '1') {
      showModal = true;
    } else {
      endPostInstall();
    }
  };

  const endPostInstall = () => {
    window.close();
  };
</script>

<main>
  <div class="container">
    <Header logoSize={128} />

    {#if !userOnboarded}
      <hr />
      <h2>{t('wizard.userWelcomeMessage')}</h2>
      <h3>{t('wizard.userWelcomeMessage2', [t('extension.name'), t('extension.subname')])}</h3>
      <h4>{t('wizard.userWelcomeMessage3')}</h4>
      <h5>{@html t('wizard.userWelcomeMessage4', [CONFIG_WWW_MAIN])}</h5>
    {/if}
    <hr />

    <div class="settings inner-container">
      <h4>{t('wizard.title')}</h4>
      <ul>
        <li>
          <span class="feature">
            <strong>{t('wizard.suggested')}</strong>: {t('wizard.question1')}
          </span>
          <span>
            <Radio label={t('global.yes')} bind:group={pinned} checked value="1" />
            <Radio label={t('global.no')} bind:group={pinned} value="0" />
          </span>
        </li>
        <li>
          <span class="feature">{t('wizard.optional')}: {t('wizard.question2')}</span>
          <span>
            <Radio label={t('global.yes')} bind:group={alerts} checked value="1" />
            <Radio label={t('global.no')} bind:group={alerts} value="0" />
          </span>
        </li>
        <li>
          <span class="feature">{t('wizard.optional')}: {t('wizard.question3')}</span>
          <span>
            <Radio label={t('global.yes')} bind:group={news} checked value="1" />
            <Radio label={t('global.no')} bind:group={news} value="0" />
          </span>
        </li>
        <li>
          <span class="feature"></span>
          <span><Button onClick={saveSettings} size="large">{t('global.saveAndClose')}</Button></span>
        </li>
      </ul>
    </div>
  </div>

  <Modal
    show={showModal}
    text={t('wizard.userModalMessage')}
    src={`/images/help/screenshot_omnibox_toolbar_${ENV_LANGUAGE}.png`}
    onClose={endPostInstall}
  />
</main>

<style lang="scss">
  :root {
    --padding-horizontal: 2.25rem;
    --padding-vertical: 2.25rem;
  }

  main {
    width: auto;
    min-width: 50%;
    max-width: 70rem;
  }

  .settings {
    font-size: 1.1rem;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 900;
    margin: 0 0 0.5rem;
    text-transform: uppercase;
  }

  h3 {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 300;
    margin: 0 0 2rem;
  }

  hr {
    margin: 2rem 0 1.5rem 0;
  }

  ul li {
    padding: 1.5rem 0;
  }
</style>
