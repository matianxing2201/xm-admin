import { createRouter, type Router } from "vue-router";
import { getHistoryMode } from "./utils";
import { staticRouter, errorRouter } from "./modules/staticRouter";
import { useUserStore } from "@/store/modules/user";
import { useAuthStore } from "@/store/modules/auth";
import NProgress from "@/config/npgrogress";

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
  const userStore = useUserStore();
  const authStore = useAuthStore();

  // 1. NProgress 开始
  NProgress.start();

  // 2. 设置动态标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 3. 判断是否访问登陆有，有token就在当前页面，没有token重制路由到登录页
  if (to.path.toLocaleLowerCase() === "/login") {
    if (userStore.token) return next(from.fullPath);
    return next();
  }

  console.log(to, from, next, authStore);
});

export default router;
