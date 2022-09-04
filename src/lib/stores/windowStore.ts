import { writable } from 'svelte/store';
import { store } from './tauriStore';

export enum WindowMode {
  InputMode,
  iFrameMode,
}

type Config = {
  endpoint: string;
  windowMode: WindowMode;
  history: string[];
};

const createWindowStore = () => {
  const defaultConfig: Config = {
    endpoint: '',
    windowMode: WindowMode.InputMode,
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
      // Always start in input mode
      console.log(config);
      if (config)
        set({
          ...config,
          windowMode: WindowMode.InputMode,
          history: config.history ?? [],
        });
    },
    showIFrame: () => {
      update((ws: Config) => {
        ws.windowMode = WindowMode.iFrameMode;
        if (!ws.history.includes(ws.endpoint)) {
          ws.history.push(ws.endpoint);
          store.set('config', ws);
        }
        return ws;
      });
    },

    goBack: () => {
      update((ws: Config) => {
        ws.windowMode = WindowMode.InputMode;
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
