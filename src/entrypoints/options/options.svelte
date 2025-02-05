<script lang="ts">
  import { browser } from 'wxt/browser';
  import { i18n } from '#i18n';
  import Header from '../../components/header.svelte';

  console.log(browser.i18n.getUILanguage());

  let test = i18n.t('popup.title');
</script>

<main>
  <div class="container">
    <Header logoSize={64} />

    <div class="inner-container settings">
      <h2>Options</h2>
      <ul>
        <li>
          <span class="feature">Latest Update</span>
          <span>{test} 13 January 2025</span>
        </li>
      </ul>
    </div>
  </div>
</main>
