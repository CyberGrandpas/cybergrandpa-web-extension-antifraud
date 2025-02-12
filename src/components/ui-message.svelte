<script lang="ts">
  import Logo from './logo.svelte';

  let { text }: { text: string } = $props();

  let t = i18n.t;
</script>

<div class="ui-message">
  <div class="ui-message__logo">
    <Logo size={72} alt={t('global.logo')} />
  </div>

  <div class="ui-message__message">
    {text}
    <div class="ui-message__dots"></div>
  </div>
</div>

<style lang="scss">
  .ui-message {
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    &__logo {
      z-index: 2;
      background: light-dark(var(--background-color-light), var(--background-color-dark));
      border-radius: 100%;
      padding: 0.1875rem;
    }

    &__message {
      z-index: 1;
      font-size: 1rem;
      font-weight: 500;
      padding-left: 1.75rem;
      margin-left: -1rem;
      line-height: 2.5rem;
      padding-right: 1rem;
      border-radius: 0 1rem 1rem 0;
      background: light-dark(var(--background-color-light), var(--background-color-dark));
    }

    &__dots {
      margin-left: -0.2rem;
      display: inline-block;
      width: 0.875rem;
      aspect-ratio: 6;
      background: radial-gradient(circle closest-side, var(--background-color-light) 90%, var(--background-color-dark))
        0 / calc(100% / 3) 100% space;
      clip-path: inset(0 100% 0 0);
      animation: l1 1s steps(4) infinite;
    }

    @keyframes l1 {
      to {
        clip-path: inset(0 -34% 0 0);
      }
    }
  }
</style>
