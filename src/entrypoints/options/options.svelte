<script lang="ts">
  import Header from '../../components/header.svelte';

  let t = i18n.t;
</script>

<main>
  <div class="container">
    <Header logoSize={64} twoRows={true} />

    <div class="inner-container settings">
      <h2>{t('global.options')}</h2>
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
  :global(html) {
    // This controls the minimum options popup width
    min-width: 370px;
  }

  :global(.title) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
</style>
