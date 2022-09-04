import { writable } from 'svelte/store';
import { store } from './tauriStore';

export enum WindowState {
  ShowInput,
  ShowIframe,
}

type Config = {
  endpoint: string;
  winState: WindowState;
  history: string[];
};

const createWindowStore = () => {
  const defaultConfig: Config = {
    endpoint: '',
    winState: WindowState.ShowInput,
    history: [],
  };

  // store.set('config', defaultConfig);
  const { subscribe, set, update } = writable<Config>(defaultConfig);

  return {
    subscribe,
    set: (ws: Config) => {
      store.set('config', ws);
      set(ws);
    },
    load: async () => {
      const config = await store.get<Config>('config');

      if (config) set({ ...config, winState: WindowState.ShowInput });
    },
    showIFrame: () => {
      update((ws: Config) => {
        ws.winState = WindowState.ShowIframe;
        if (!ws.history.includes(ws.endpoint)) {
          ws.history.push(ws.endpoint);
          store.set('config', ws);
        }
        return ws;
      });
    },

    goBack: () => {
      update((ws: Config) => {
        ws.winState = WindowState.ShowInput;
        return ws;
      });
    },
    deleteFromHistory: (endpoint: string) => {
      update((ws: Config) => {
        ws.history = ws.history.filter(
          (endpointHistory) => endpointHistory !== endpoint
        );
        return ws;
      });
    },
  };
};

export const ws = createWindowStore();
