import { resolve } from 'node:path';
import { includes } from 'lodash-es';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import vueRouter from 'unplugin-vue-router/vite'
import layouts from 'vite-plugin-vue-layouts'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueRouter({
      exclude: ['**/components/*.vue'],
    }),
    layouts({
        layoutsDirs: 'src/layouts',
        pagesDirs: 'src/pages',
        defaultLayout: 'default',
    }),
    components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    }),
    autoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        VueRouterAutoImports
      ]
    }),
    VitePWA()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // 分包 根据模块路径将代码拆分为不同的 chunk。
        manualChunks(id) {
          if (includes(id, 'node_modules')) return 'vendor';
          if (includes(id, '/packages/hooks')) return 'hooks';
          if (includes(id, '/packages/utils')) return 'utils';
          if (includes(id, '/packages/layout')) return 'layout';
          if (includes(id, '/packages/play')) return 'play';
          return 'default';
        }
      }
    }
  }
})
