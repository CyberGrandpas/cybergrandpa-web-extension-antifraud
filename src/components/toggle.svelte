<script lang="ts">
  interface Props {
    checked?: boolean;
  }

  let { checked }: Props = $props();
</script>

<label class="switch">
  <input type="checkbox" bind:checked />
  <span class="slider"></span>
</label>

<style lang="scss">
  /* From Uiverse.io by RaspberryBee */
  /* The switch - the box around the slider */
  .switch {
    font-size: 13px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 1.8em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(182, 182, 182);
    transition: 0.4s;
    border-radius: 10px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 8px;
    left: 0.15rem;
    bottom: 0.15rem;
    transform: rotate(270deg);
    background-color: rgb(255, 255, 255);
    transition: 0.4s;
  }

  .switch input:checked + .slider {
    background-color: #21cc4c;
  }

  .switch input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.35rem);
  }
</style>
