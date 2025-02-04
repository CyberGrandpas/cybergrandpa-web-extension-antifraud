<script lang="ts">
  import Logo from './logo.svelte';

  interface Props {
    logoSize?: number;
  }

  let { logoSize = 96 }: Props = $props();
</script>

<div class="header">
  <div class="text">
    <h1>CyberGrandpa <em>AntiVirus</em></h1>

    {#if logoSize > 96}
      <p class="description">
        <em>Protecting you online, just like a caring grandpa would!</em>
      </p>
    {/if}
  </div>
  <div class="logo">
    <Logo alt="CyberGrandpa Logo" size={logoSize} />
  </div>
</div>
