import { writable } from 'svelte/store';
import { store } from './tauriStore';

export enum WindowState {
  ShowInput,
  ShowIframe,
}

type Config = {
  endpoint: string;
  winState: WindowState;
};

const createWindowStore = () => {
  const defaultConfig: Config = {
    endpoint: '',
    winState: WindowState.ShowInput,
  };

  const { subscribe, set, update } = writable<Config>(defaultConfig);

  return {
    subscribe,
    set: (ws: Config) => {
      // This is not working for some reason

      store.set('config', ws);
      set(ws);
    },
    load: async () => {
      // ^^ Same
      const config = await store.get<Config>('config');
      if (config) set(config);
    },
    showIFrame: () => {
      update((ws: Config) => {
        ws.winState = WindowState.ShowIframe;
        return ws;
      });
    },

    goBack: () => {
      update((ws: Config) => {
        ws.winState = WindowState.ShowInput;
        return ws;
      });
    },
  };
};

export const ws = createWindowStore();
