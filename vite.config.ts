import { resolve } from 'node:path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import componetns from 'unplugin-vue-components/vite'
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
    componetns({
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
})
