
import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';
import { setupRouterGuards } from './guard';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: setupLayouts(routes)
})


export function setupRouter(app: App) {
    app.use(router);
    setupRouterGuards(router);
}
