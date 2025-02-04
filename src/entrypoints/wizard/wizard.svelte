<script lang="ts">
  import Header from '../../components/header.svelte';
  // import Button from "../../components/button.svelte";
  // import Toggle from "../../components/toggle.svelte";
  import './wizard.scss';
</script>

<main>
  <div class="container">
    <Header logoSize={128} />

    <div class="settings first">
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
    width: 50%;
    max-width: 50rem;
  }
</style>
