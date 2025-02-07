<script lang="ts">
  import { get } from 'svelte/store';
  import { CONFIG_WWW_MAIN } from '@/config';
  import { storeAlertsEnabled, storeNewsEnabled, storeOnBoardingCompleted, storeProtectionEnabled } from '@/lib/store';
  import Header from '@/components/header.svelte';
  import Button from '@/components/button.svelte';
  import Modal from '@/components/modal.svelte';

  let userOnboarded = $derived(get(storeOnBoardingCompleted));

  let showModal = $state(false);

  let t = i18n.t;

  let pin = $state('1');
  let alerts = $state('1');
  let news = $state('1');

  const saveSettings = () => {
    storeProtectionEnabled.set(true);
    storeOnBoardingCompleted.set(true);
    storeAlertsEnabled.set(alerts === '1' ? true : false);
    storeNewsEnabled.set(news === '1' ? true : false);

    if (pin === '1') {
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
            <input id="radioPinYes" type="radio" class="css-checkbox" checked bind:group={pin} value="1" />
            <label for="radioPinYes">{t('global.yes')}</label>
            <input id="radioPinNo" type="radio" class="css-checkbox" bind:group={pin} value="0" />
            <label for="radioPinNo">{t('global.no')}</label>
          </span>
        </li>
        <li>
          <span class="feature">{t('wizard.optional')}: {t('wizard.question2')}</span>
          <span>
            <input id="radioAlertsYes" type="radio" class="css-checkbox" checked bind:group={alerts} value="1" />
            <label for="radioAlertsYes">{t('global.yes')}</label>
            <input id="radioAlertsNo" type="radio" class="css-checkbox" bind:group={alerts} value="0" />
            <label for="radioAlertsNo">{t('global.no')}</label>
          </span>
        </li>
        <li>
          <span class="feature">{t('wizard.optional')}: {t('wizard.question3')}</span>
          <span>
            <input id="radioUpdatesYes" type="radio" class="css-checkbox" checked bind:group={news} value="1" />
            <label for="radioUpdatesYes">{t('global.yes')}</label>
            <input id="radioUpdatesNo" type="radio" class="css-checkbox" bind:group={news} value="0" />
            <label for="radioUpdatesNo">{t('global.no')}</label>
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
    src="/images/help/screenshot_omnibox_toolbar.png"
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
