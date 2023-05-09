import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
// import Markdown from 'vite-plugin-md'
// import md from 'vite-plugin-markdown'
// const md = require('vite-plugin-markdown')
// import MarkdownPreview from 'vite-plugin-markdown-preview'

const pathResolve = (pathStr: string) => path.resolve(__dirname, pathStr)

// https://esm.sh/
const cdn: { [key: string]: string } = {
  //   vue: 'https://esm.sh/vue@3.2.37',
  // axios: 'https://esm.sh/axios@0.27.2',
  // moment: 'https://esm.sh/moment@2.29.4'
  //   // vite: 'https://esm.sh/vite@3.0.9',
  //   'vite-plugin-svg-icons': 'https://esm.sh/vite-plugin-svg-icons@2.0.1',
  //   '@antv/g2plot': 'https://esm.sh/@antv/g2plot@2.4.20',
  //   '@ant-design/icons-vue': 'https://esm.sh/@ant-design/icons-vue@6.1.0'
}

const dealWithCDN = () =>
  // if (process.env.NODE_ENV == 'development') {
  //   Object.keys(cdn).map((i: string) => {
  //     cdn[i] = `${cdn[i]}?dev`
  //     return i
  //   })
  // }
  cdn

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.md$/, /\.vue$/]
    }),
    vueJsx(),
    viteCompression(),
    // ...plugins
    // md.plugin({
    //   mode: ['html', 'vue']
    // }),
    // MarkdownPreview(),
    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件夹，即需要识别的svg都应该放在这个文件夹下
      // iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
      // 或
      iconDirs: [pathResolve('./src/icons/svg')],
      // 指定symbolId格式（这里的配置与6.2步骤中的引入svg组件的name配置项写法有关）
      symbolId: 'icon-[dir]-[name]'
    }),
    importToCDN({
      modules: [
        // autoComplete('lodash'),
        // autoComplete('antd'),
        autoComplete('axios'),
        // autoComplete('Vuex'),
        // {
        //   name: 'ant-design-vue',
        //   var: 'antd',
        //   css: 'https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.11/dist/antd.css',
        //   path: 'https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.11/lib/index.min.js'
        // },
        // {
        //   name: 'vuex',
        //   var: 'Vuex',
        //   path: 'https://cdn.jsdelivr.net/npm/vuex@4.0.2/dist/vuex.global.prod.js'
        // },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://esm.sh/axios@0.27.2'
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      sass: {
        // \n 处理文件中多个引入报换行错误的问题
        additionalData: "@import './src/styles/color.sass'\n"
      }
    }
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
      ...dealWithCDN()
    },
    extensions: ['.js', '.json', '.ts', 'vue']
  },
  build: {
    outDir: 'dist/spa',
    assetsDir: 'static', // 指定生成静态资源的存放路径（相对于 build.outDir)
    cssCodeSplit: true, // 启用 CSS 代码拆分
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制（以 kbs 为单位）
    sourcemap: false, // 构建后是否生成 source map 文件
    terserOptions: {
      compress: {
        // 生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // 开发服务器配置
  server: {
    hmr: true,
    host: '0.0.0.0',
    port: 9425,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
        // target: 'http://172.16.39.136:9423'
      }
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'pinia',
      'vue-router',
      'axios',
      'ant-design-vue',
      'echarts/core',
      'echarts/components',
      'echarts/charts',
      'echarts/renderers',
      '@ant-design/icons-vue',
      'qs'
    ]
  }
})
