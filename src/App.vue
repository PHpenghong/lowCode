<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export default defineComponent({
  name: 'App',
  setup() {
    const icoUrl = ref<any>(null)
    onMounted(() => {
      init()
    })
    const getIcon = async () => {
      // await getIcon()
      icoUrl.value = '/test.ico'
    }
    const init = async () => {
      await getIcon()
      document.title = '测试系统'
      const link: any =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = icoUrl.value
      document.getElementsByTagName('head')[0].appendChild(link)
    }
    return { zhCN }
  }
})
</script>

<style lang="scss">
@import '@/style/pul.scss';
#app {
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// public start

.textAlignLeft {
  min-height: 32px;
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
}
.flexClass {
  display: flex;
  justify-content: center;
  align-items: center;
}

.textOmit {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.flexClass {
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  word-wrap: break-word !important;
  margin: 0 !important;
  padding: 0 !important;
}

// public end

/* 谷歌浏览器 */
/* width: 0px; */
/*滚动条整体样式*/
::-webkit-scrollbar {
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
/*滚动条里面小方块*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #bababa;
}
/*滚动条里面轨道*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
/* 火狐浏览器 */
* {
  scrollbar-color: #e5e5e5 #f7f7f9; /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
}
</style>
