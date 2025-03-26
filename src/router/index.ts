import { createRouter, type Router } from "vue-router";
import { getHistoryMode } from "./utils";
import { staticRouter, errorRouter } from "./modules/staticRouter";

export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: [...staticRouter, ...errorRouter],
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return resolve(savedPosition);
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

/**
 *  路由拦截
 */
router.beforeEach((to, from, next) => {
  console.log(to, from, next);
});

export default router;
