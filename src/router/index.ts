import {
  createRouter,
  type Router,
  type RouteRecordRaw,
  type RouteComponent
} from "vue-router";
import {
  getHistoryMode,
  ascending,
  buildHierarchyTree,
  formatFlatteningRoutes,
  formatTwoStageRoutes
} from "./utils";
import otherRouter from "./modules/other";

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
console.log(routes.flat(Infinity));

export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity))))
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(
  routes.flat(Infinity)
).concat(...otherRouter);

/** 不参与菜单的路由 */
export const otherPaths = Object.keys(otherRouter).map(v => {
  return otherRouter[v].path;
});

export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: constantRoutes.concat(...(otherRouter as any)),
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
