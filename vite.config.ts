import { getPluginList } from "./build/plugins";
import { include, exclude } from "./build/optmize";
import { defineConfig, type ConfigEnv, loadEnv } from "vite";
import { root, wrapperEnv, __APP_INFO__ } from "./build/utils";

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const { VITE_PORT, VITE_PUBLIC_PATH } = wrapperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      port: VITE_PORT,
      host: "0.0.0.0",
      proxy: {},
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    //插件
    plugins: getPluginList(),
    // 预构件 提高开发环境下启动速度与热更新性能 node_modules生成.vite包用于缓存，避免每次重新构建提高加载速度
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: "./index.html"
        },
        // 静态资源分类打包
        output: {
          dir: "dist",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          manualChunks: id => {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0];
            }
          }
        }
      }
    },
    // 全局变量定义
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
});
