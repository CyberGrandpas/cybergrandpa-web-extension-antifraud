<script lang="ts">
  import Header from '../../components/header.svelte';

  let t = i18n.t;
</script>

<main>
  <div class="container">
    <Header logoSize={128} />

    <div class="settings inner-container">
      <h2>{t('wizard.title')}</h2>
      <ul>
        <li>
          <span class="feature">{t('popup.latestUpdate')}</span>
          <span>-</span>
        </li>
      </ul>
    </div>
  </div>
</main>

<style lang="scss">
  :root {
    --padding-horizontal: 2.25rem;
    --padding-vertical: 2.25rem;
  }

  main {
    min-width: 50%;
    max-width: 50rem;
  }

  h2 {
    margin: 0 0 0.5rem;
  }
</style>
