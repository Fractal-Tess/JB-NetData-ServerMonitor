<script lang="ts">
  import { fade } from 'svelte/transition';

  import Header from '$lib/example/header/Header.svelte';
  import Footer from '$lib/example/footer/Footer.svelte';
  import Unavailable from '$lib/example/Unavailable.svelte';

  document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.classList.value = 'dark';

  const resource = 'https://server-monitor.app.jet-black.xyz';
</script>

<div
  class="bg-base-100 text-base-content min-h-screen flex flex-col overflow-x-hidden"
>
  <Header />
  {#await fetch(resource) then result}
    {#if result.status === 200}
      <main
        class="flex flex-col flex-1"
        in:fade={{ delay: 300, duration: 1000 }}
      >
        <iframe class="flex-1" title="Netdata iframe" src={resource} />
      </main>
    {:else}
      <Unavailable />
    {/if}
  {:catch error}
    <Unavailable />
  {/await}

  <Footer />
</div>
