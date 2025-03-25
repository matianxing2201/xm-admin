import { createRouter, type Router, type RouteRecordRaw } from "vue-router";
import { getHistoryMode, ascending } from "./utils";

//  自动导入全部静态路由 匹配 src/router/modules 及其子目录 排除other.ts
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/other.ts"],
  {
    eager: true //立即加载匹配的模块
  }
);

// init router data
const routes = [];

Object.keys(modules).forEach(item => {
  routes.push(modules[item].default);
});

export const constantRoutes: Array<RouteRecordRaw> = ascending(
  routes.flat(Infinity)
);

console.log(constantRoutes);

export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: routes.flat(Infinity),
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
