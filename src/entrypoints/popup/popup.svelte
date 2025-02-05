<script lang="ts">
  import Header from '@/components/header.svelte';
  import Button from '@/components/button.svelte';
  import Toggle from '@/components/toggle.svelte';

  let t = i18n.t;
</script>

<main>
  <div class="container">
    <Header logoSize={64} twoRows={true} />

    <p class="slogan">
      <em>{t('extension.slogan')}</em>
    </p>

    <div class="inner-container settings">
      <h2>{t('popup.protectionStatus')}</h2>
      <ul>
        <li>
          <span class="feature">{t('global.enabled')}</span>
          <span><Toggle checked={true} /></span>
        </li>
        <li>
          <span class="feature">{t('popup.realTimeProtection')}</span>
          <span><Toggle checked={false} /></span>
        </li>
        <li>
          <span class="feature">{t('popup.latestUpdate')}</span>
          <span>13 January 2025</span>
        </li>
      </ul>
    </div>

    <div class="settings">
      <h2>{t('popup.tools')}</h2>
      <ul>
        <li>
          <span class="feature">{t('popup.scanPage')}</span>
          <span class="feature-link">
            <Button url="wizard.html">{t('popup.scan')}</Button>
          </span>
        </li>
        <li>
          <span class="feature">{t('popup.settings')}</span>
          <span class="feature-link">
            <Button url="wizard.html">{t('popup.wizard')}</Button>
          </span>
        </li>
        <li>
          <span class="feature">{t('global.support')}</span>
          <span class="feature-link">
            <a href={`https://${t('global.wwwHelp')}`} target="_blank">{t('global.wwwHelp')}</a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</main>

<style lang="scss">
  :global(html) {
    // This controls the minimum popup width
    min-width: 370px;
    // This controls the minimum popup height
    min-height: 520px;
  }

  :global(.title) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  main {
    width: auto;
  }

  .feature {
    color: #495057;
  }

  .feature-link {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 50%;
    text-decoration: underline;
  }

  ul li > span:last-child {
    text-align: right;
  }

  .slogan {
    margin-bottom: 0.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    margin: 0 -0.9rem;
  }
</style>
