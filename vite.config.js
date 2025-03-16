import { getPluginList } from "./build/plugins";
import { include, exclude } from "./build/optmize";
import { defineConfig, loadEnv } from 'vite';
import { root, wrapperEnv, __APP_INFO__ } from './build/utils';
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
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
        plugins: getPluginList(), //插件
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
                    chunkFileNames: "static/js/[name]-[hash].js",
                    entryFileNames: "static/js/[name]-[hash].js",
                    assetFileNames: "static/[ext]/[name]-[hash].[ext]",
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0];
                        }
                    }
                }
            }
        },
        define: {
            __INTLIFY_PROD_DEVTOOLS__: false,
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        }
    };
});
