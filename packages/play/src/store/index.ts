import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const store = createPinia();

export function setupStore(app: App) {
  store.use(createPersistedState());
  app.use(store);
}
