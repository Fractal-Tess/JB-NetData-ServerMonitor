<script lang="ts">
  import { appWindow } from '@tauri-apps/api/window';
  import { Rive } from 'rive-js';
  import accent_tree from '$assets/accent_tree.riv';
  import { onMount } from 'svelte';

  export let showBackArrow = true;
  export let backArrowOnClick = () => {};

  let canvas;

  onMount(() => {
    new Rive({
      canvas,
      src: accent_tree,
      autoplay: true,
    });
  });
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

  <div class="h-full">
    <canvas class="inline-block h-full pb-2" bind:this={canvas} />

    <a
      target="_blank"
      href="https://github.com/Fractal-Tess/URL-Loader"
      class="hover:text-secondary"
    >
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
