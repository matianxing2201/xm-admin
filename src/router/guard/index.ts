import type { Router } from 'vue-router'
import nProgress from 'nprogress';
export function setupRouterGuards(router: Router) {
    createPageGuard(router);
    createProgressGuard(router);
    createRouteChangeGuard(router);
}

// 用于记录路由初次加载状态
const createPageGuard = (router: Router) => {
    const loadedPage = new Map<string, boolean>();

    router.beforeEach(async to => {
        to.meta.loaded = loadedPage.has(to.path);
        return true;
    });
    
    router.afterEach(to => {
        loadedPage.set(to.path, true);
    });
}

// 第一次加载时显示进度条
const createProgressGuard = (router: Router) => {
    router.beforeEach(async to => {
        if (to.meta.loaded) {
          return true;
        }
        nProgress.start();
        return true;
    });
    
    router.afterEach(async () => {
        nProgress.done();
        return true;
    });
}

// 默认跳转路由
const createRouteChangeGuard = (router: Router) => {
    router.beforeEach(async to => {
        if (to.path === '/') {
          return '/home';
        }
    });
}