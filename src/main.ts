import { createApp } from 'vue'
import hljs from 'highlight.js'
import './permission'
import 'ant-design-vue/dist/antd.css'
import AntUI from './antdUI'
import App from './App.vue'
import pinia from '@/store'
import 'virtual:svg-icons-register'
import 'highlight.js/styles/color-brewer.css'
import SvgIcon from '@/components/SvgIcon/index.vue'
import router from './router'

const app = createApp(App)

app
  .component('SvgIcon', SvgIcon)
  .use(pinia)
  .use(router)
  .use(AntUI)
  .mount('#app')
app.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block)
  })
})
