import { createRouter, type Router } from "vue-router";
import { getHistoryMode } from "./utils";
import staticRouter from "./ststic";

// init router data
const routes = [];

staticRouter.forEach(item => {
  routes.push(item);
});

export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes,
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

export default router;
