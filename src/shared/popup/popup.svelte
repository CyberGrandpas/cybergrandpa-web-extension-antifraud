<script lang="ts">
  import { onMount } from 'svelte';
  import browser from 'webextension-polyfill';
  import './popup.scss';

  interface Settings {
    initialized: boolean;
    timestamp?: string;
  }

  let initialized = false;
  let settings: Settings = { initialized: false };

  onMount(async () => {
    // Get data from storage
    const data = await browser.storage.local.get('settings') as { settings?: Settings };
    settings = data.settings || { initialized: false };
    initialized = data.settings?.initialized || false;

    // Send message to content script
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]?.id) {
      browser.tabs.sendMessage(tabs[0].id, {
        type: 'POPUP_OPENED',
        timestamp: new Date().toISOString(),
      });
    }
  });
</script>

<main>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="../assets/cybergrandpa-128x128.png" width="96" height="96" alt="CyberGrandpa Logo">
      </div>
      <h1>CyberGrandpa <u>AntiVirus</u></h1>
      <p>Protecting you online, just like a caring grandparent would!</p>
    </div>
    
    {#if initialized}
      <div class="status safe">
        <span class="icon">✓</span>
        <span>Your browsing is protected</span>
      </div>
    {:else}
      <div class="status warning">
        <span class="icon">⚠</span>
        <span>Initializing protection...</span>
      </div>
    {/if}

    <div class="settings">
      <h2>Protection Status</h2>
      <ul>
        <li>
          <span class="feature">Real-time Protection</span>
          <span class="status-icon">{initialized ? '✓' : '⋯'}</span>
        </li>
        <li>
          <span class="feature">Updates Synced</span>
          <span class="status-icon">{initialized ? '✓' : '⋯'}</span>
        </li>
      </ul>
    </div>
  </div>
</main>

<style lang="scss">
  main {
    width: auto;
    height: var(--viewport-height);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .logo {
    margin-bottom: .5rem;
  }
  
  .container {
    height: 100%;
    padding: 1rem;
    background: #f8f9fa;
    text-align: center;
    border-radius: 0.5rem;
  }

  h1 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: 2rem;
  }

  h2 {
    color: #2c3e50;
    font-size: 1rem;
    margin: 1.5rem 0 1rem;
  }

  p {
    color: #6c757d;
    margin-bottom: 1.5rem;
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    border-radius: 8px;
    margin-top: 1rem;
    
    &.safe {
      background-color: #d4edda;
      color: #155724;
    }
    
    &.warning {
      background-color: #fff3cd;
      color: #856404;
    }

    .icon {
      font-size: 1.2rem;
      margin-right: 0.5rem;
    }
  }

  .settings {
    margin-top: 1.5rem;
    text-align: left;
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #dee2e6;

      &:last-child {
        border-bottom: none;
      }
    }

    .feature {
      color: #495057;
    }

    .status-icon {
      color: #28a745;
      font-size: 1.1rem;
    }
  }
</style>
