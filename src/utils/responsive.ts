// 响应式storage
import type { App } from "vue";
import Storage from "responsive-storage";
import { routerArrays } from "@/layout/types";
import { responsiveStorageNameSpace } from "@/config";

export const injectResponsiveStorage = (app: App, config: PlatformConfigs) => {
  const nameSpace = responsiveStorageNameSpace();

  const configObj = Object.assign(
    {
      // layout模式以及主题
      layout: Storage.getData("layout", nameSpace) ?? {
        theme: config.Theme ?? "light",
        themeColor: config.Theme ?? "light" // 主题色（对应系统配置中的主题色，与theme不同的是它不会受到浅色、深色整体风格切换的影响，只会在手动点击主题色时改变）
      },
      // 系统配置-界面显示
      configure: Storage.getData("configure", nameSpace) ?? {}
    },
    config.MultiTagsCache
      ? {
          // 默认显示顶级菜单tag
          tags: Storage.getData("tags", nameSpace) ?? routerArrays
        }
      : {}
  );

  app.use(Storage, { nameSpace, memory: configObj });
};
