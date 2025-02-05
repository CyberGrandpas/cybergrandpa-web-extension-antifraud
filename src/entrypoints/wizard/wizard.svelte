<script lang="ts">
  import Header from '../../components/header.svelte';
</script>

<main>
  <div class="container">
    <Header logoSize={128} />

    <div class="settings inner-container">
      <h2>Settings wizard</h2>
      <ul>
        <li>
          <span class="feature">Latest Update</span>
          <span>13 January 2025</span>
        </li>
      </ul>
    </div>
  </div>
</main>

<style lang="scss">
  main {
    min-width: 50%;
    max-width: 50rem;
  }
</style>
