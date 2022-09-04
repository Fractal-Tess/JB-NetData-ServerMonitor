<script lang="ts">
  import { fade } from 'svelte/transition';

  import Header from '$lib/Header.svelte';

  import { WindowMode, ws } from '$lib/stores/windowStore';
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
    showBackArrow={$ws.windowMode === WindowMode.iFrameMode}
  />

  <main class="flex-1 flex-col flex items-center ">
    {#if $ws.windowMode === WindowMode.InputMode}
      <h1 class="text-secondary font-bold text-3xl my-16">URL Loader</h1>
      {#if $ws.history.length}
        <h2 class="text-secondary font-bold text-3xl mb-8">History</h2>
        <div
          class="w-80 flex flex-col space-y-2 border-2 border-secondary rounded-xl p-2"
        >
          {#each $ws.history as endpoint}
            <div class="flex justify-between w-full px-4">
              <button
                on:click={() => {
                  ws.deleteFromHistory(endpoint);
                }}
              >
                <i class="fa-solid fa-xmark" />
              </button>
              <span> {endpoint}</span>
              <button
                on:click={() => {
                  $ws.endpoint = endpoint;
                  ws.showIFrame();
                }}
                class="btn btn-outline btn-xs btn-secondary">Load</button
              >
            </div>
          {/each}
        </div>
      {/if}

      <form
        on:submit|preventDefault={() => {
          if ($ws.endpoint.length) ws.showIFrame();
        }}
        class="form-control space-y-4 text-center my-20"
      >
        <label class="input-group relative">
          <span class="shadow-md shadow-secondary ">URL</span>
          <input
            bind:value={$ws.endpoint}
            type="text"
            placeholder="http://localhost:3000"
            class="input input-group-lg input-bordered border-secondary focus:border-secondary focus:outline-none focus:ring-0 shadow-md shadow-secondary"
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
