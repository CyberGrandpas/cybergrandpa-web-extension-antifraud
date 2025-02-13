<script lang="ts">
  import { Jumper } from 'svelte-loading-spinners';
  import { type ModalProps } from '@/utils';
  import UiMessage from './ui-message.svelte';

  const defaultModalOnClose = () => {
    show = false;
  };

  let { show = false, autoShow = false, text, src, onClose = defaultModalOnClose, loader, logo }: ModalProps = $props();

  const onCloseHandler = async () => {
    defaultModalOnClose();

    setTimeout(() => {
      onClose();
    }, 500);
  };

  let t = i18n.t;

  $effect(() => {
    if (autoShow) {
      setTimeout(() => {
        show = true;
      }, 100);
    }
  });
</script>

<div class="modal {show ? 'modal--show' : ''}">
  <div class="modal-wrap">
    {#if loader}
      <Jumper size="10" color="#f6ff00" unit="rem" duration="1s" />
    {:else}
      <div class="modal-content">
        {#if src}
          <img {src} alt={src} />
        {/if}

        {#if text}
          <p>{text}</p>
        {/if}
      </div>
    {/if}
    <button class="modal-btn" onclick={onCloseHandler} aria-label={t('global.close')}>⨯</button>

    {#if logo}
      <div class="modal-logo">
        <UiMessage text={t('global.scanning')} />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  :global(body) {
    overflow: hidden;
    background-image: none !important;
    background-color: transparent !important;
  }

  .modal {
    z-index: 1;
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: rgba(31, 32, 41, 0.7);
    transition: opacity 250ms ease;
    pointer-events: none;
    opacity: 0;

    &.modal--show {
      pointer-events: auto;
      opacity: 1;
    }
  }

  .modal-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(1.6);
    transition:
      opacity 250ms 250ms ease,
      transform 300ms 250ms ease;

    .modal--show & {
      opacity: 1;
      transform: scale(1);
      transition:
        opacity 250ms 500ms ease,
        transform 350ms 500ms ease;
    }
  }

  .modal-content {
    display: block;
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border-radius: 0.25rem;
    overflow: hidden;
    padding-bottom: 1.25rem;
    background-color: light-dark(var(--background-color-light), var(--background-color-dark));
    -ms-flex-item-align: center;
    align-self: center;
    box-shadow: 0 0.75rem 1.5625rem 0 rgba(199, 175, 189, 0.25);
  }

  .modal-wrap img {
    display: block;
    width: 100%;
    height: auto;
  }

  .modal-wrap p {
    padding: 1.25rem 1.875rem 0 1.875rem;
  }

  @media screen and (max-width: 31.25rem) {
    .modal-wrap {
      width: calc(100% - 2.5rem);
      padding-bottom: 0.9375rem;
    }
    .modal-wrap p {
      padding: 0.9375rem 1.25rem 0 1.25rem;
    }
  }

  .modal-btn {
    position: fixed;
    top: 2rem;
    right: 2rem;
    text-align: center;
    line-height: 0rem;
    font-size: 5rem;
    color: #f6ff00;
    box-shadow: 0 0.75rem 1.5625rem 0 rgba(16, 39, 112, 0.25);
    cursor: pointer;
    appearance: none;
    border: none;
    background: none;
  }

  .modal-logo {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
  }
</style>
