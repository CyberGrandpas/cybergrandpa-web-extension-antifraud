<script lang="ts">
  import Header from '../../components/header.svelte';

  let t = i18n.t;
</script>

<main>
  <div class="container">
    <Header logoSize={64} />

    <div class="inner-container settings">
      <h2>Options</h2>
      <ul>
        <li>
          <span class="feature">Latest Update</span>
          <span>{t('popup.hello')}</span>
        </li>
      </ul>
    </div>
  </div>
</main>
