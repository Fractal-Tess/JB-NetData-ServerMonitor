import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: [
    sveltePreprocess({
      postcss: true,
      scss: {
        prependData: '@use "./src/variables.scss" as *;',
      },
      sourceMap: !!process.env.TAURI_DEBUG,
    }),
  ],
};
