<script lang="ts">
  import { appWindow } from '@tauri-apps/api/window';

  export let showBackArrow = true;
  export let backArrowOnClick = () => {};
</script>

<div
  data-tauri-drag-region
  class="h-12 bg-base-100  shadow-lg items-center justify-between flex"
>
  <div>
    {#if showBackArrow}
      <button on:click={backArrowOnClick} class="p-2  hover:text-secondary">
        <i class="fa-solid fa-arrow-left-long h-8" />
      </button>
    {/if}
  </div>

  <div>
    <a target="_blank" href="https://github.com/Fractal-Tess/Avtoradio-Leacher">
      <i class="fa-brands fa-github h-6" />
    </a>
    <button
      on:click={appWindow.minimize}
      aria-live="polite"
      class="p-2 text-xl hover:text-secondary"
    >
      <i class="fa-solid fa-window-minimize w-6" />
    </button>
    <button
      on:click={appWindow.close}
      aria-live="polite"
      class="p-2 text-2xl hover:text-secondary"
    >
      <i class="fa-solid fa-xmark w-6" />
    </button>
  </div>
</div>
