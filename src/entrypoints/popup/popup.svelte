<script lang="ts">
  import Header from '@/components/header.svelte';
  import Button from '@/components/button.svelte';
  import Toggle from '@/components/toggle.svelte';
</script>

<main>
  <div class="container">
    <Header logoSize={64} />

    <p class="description">
      <em>Protecting you online, just like a caring grandpa would!</em>
    </p>

    <div class="inner-container settings">
      <h2>Protection Status</h2>
      <ul>
        <li>
          <span class="feature">Enabled</span>
          <span><Toggle checked={true} /></span>
        </li>
        <li>
          <span class="feature">Real-time Protection</span>
          <span><Toggle checked={false} /></span>
        </li>
        <li>
          <span class="feature">Latest Update</span>
          <span>13 January 2025</span>
        </li>
      </ul>
    </div>

    <div class="settings">
      <h2>Tools</h2>
      <ul>
        <li>
          <span class="feature">Scan the page</span>
          <span class="feature-link">
            <Button url="options.html">Scan</Button>
          </span>
        </li>
        <li>
          <span class="feature">Settings</span>
          <span class="feature-link">
            <Button url="wizard.html">Launch Wizard</Button>
          </span>
        </li>
        <li>
          <span class="feature">Support</span>
          <span class="feature-link">
            <a href="https://help.cybergrandpa.com" target="_blank">help.cybergrandpa.com </a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</main>

<style lang="scss">
  :global(html) {
    // This controls the minimum popup width
    min-width: 390px;
    // This controls the minimum popup height
    min-height: 550px;
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
</style>
