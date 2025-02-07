<script lang="ts">
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
  </div>
  <button class="modal-btn" onclick={onClose} aria-label={t('global.close')}>⨯</button>
</div>
