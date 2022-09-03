<script lang="ts">
  import { fade } from 'svelte/transition';

  import Header from '$lib/Header.svelte';

  import { WindowState, ws } from '$lib/stores/windowStore';
  ws.load();

  document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.classList.value = 'dark';
</script>

<div
  class="bg-base-100 text-base-content min-h-screen flex flex-col overflow-x-hidden"
  in:fade
>
  <Header
    backArrowOnClick={ws.goBack}
    showBackArrow={$ws.winState === WindowState.ShowIframe}
  />

  <main class="flex-1 flex-col flex items-center justify-center">
    {#if $ws.winState === WindowState.ShowInput}
      <form
        on:submit|preventDefault={() => {
          if ($ws.endpoint.length) ws.showIFrame();
        }}
        class="form-control space-y-4 text-center"
      >
        <h1 class="text-secondary font-bold text-3xl mb-8">URL Loader</h1>
        <label class="input-group">
          <span>URL</span>
          <input
            bind:value={$ws.endpoint}
            type="text"
            placeholder="example.com"
            class="input input-group-lg input-bordered border-secondary focus:border-secondary focus:outline-none focus:ring-0"
          />
        </label>
        <button class="btn btn-outline btn-secondary">Load!</button>
      </form>
    {:else}
      <iframe
        src={$ws.endpoint}
        frameborder="0"
        title="embeded url"
        class="flex-1 w-full"
      />
    {/if}
  </main>
</div>
