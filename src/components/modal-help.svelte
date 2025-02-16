<script lang="ts">
  import SvgCrossIcon from './icons/flat-cross-icon.svelte';
  import type { ModalProps } from '@/utils';

  let { show, text, src, onClose }: ModalProps = $props();

  let t = i18n.t;
</script>

<div class="modal {show ? 'modal--show' : ''}">
  <div class="modal-wrap">
    {#if src}
      <img {src} alt={src} />
    {/if}

    <p>{text}</p>

    <button class="modal-btn" onclick={onClose} aria-label={t('global.close')}>
      <SvgCrossIcon height="1.5rem" width="1.5rem" />
    </button>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    display: block;
    margin: 0 auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow-x: hidden;
    background-color: rgba(31, 32, 41, 0.75);
    transition: opacity 250ms 700ms ease;
    pointer-events: none;
    opacity: 0;

    &.modal--show {
      pointer-events: auto;
      opacity: 1;
    }
  }

  .modal-wrap {
    position: relative;
    display: block;
    width: 100%;
    max-width: 25rem;
    margin: 1.25rem 1.25rem 0 auto;
    border-radius: 0.25rem;
    padding-bottom: 1px;
    background-color: light-dark(var(--background-color-light), var(--background-color-dark));
    box-shadow: 0 0.75rem 1.5625rem 0 rgba(199, 175, 189, 0.25);
    opacity: 0;
    transform: scale(0.6);
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

  .modal-wrap img {
    display: block;
    width: 100%;
    height: auto;
  }

  .modal-wrap p {
    padding: 1.25rem 1.875rem 0 1.875rem;
  }

  @media screen and (max-width: 40rem) {
    .modal-wrap {
      width: calc(100% - 2.5rem);
      padding-bottom: 0.9375rem;
    }
    .modal-wrap p {
      padding: 0.9375rem 1.25rem 0 1.25rem;
    }
  }

  .modal-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
    display: block;
    text-align: center;
    line-height: 1.5rem;
    font-size: 1rem;
    color: var(--color-red);
    display: flex;
    align-items: center;
    justify-content: left;
    align-content: center;
    cursor: pointer;
    appearance: none;
    border: none;
    background: none;
  }
</style>
