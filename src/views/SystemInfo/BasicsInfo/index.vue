<template>
  <div class="basics_page">
    <CardInfo
      v-for="item in pageInfoArr"
      :key="item.key"
      v-model:data-obj="state.dataObj"
      :type="item.key"
      :page-info="item"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { getConf } from '@/api/bgConf/index'

interface PageInfo {
  title: string
  logoText: string
  titleText: string
  key: string
  px: string
  maxlength: number
}

const state = ref<any>({
  dataObj: {}
})

const pageInfoArr = reactive<PageInfo[]>([
  {
    title: '登录页面信息',
    logoText: '登录页logo',
    titleText: '登录页面标题',
    px: '200 X 200',
    key: 'login_page',
    maxlength: 14
  },
  {
    title: '系统页面信息',
    logoText: '系统页面logo',
    titleText: '系统页面标题',
    key: 'sys_page',
    px: '200 X 200',
    maxlength: 11
  },
  {
    title: '网页标签标题',
    logoText: '页面标签icon',
    titleText: '网页标签信息',
    key: 'label',
    px: '',
    maxlength: 10
  }
])

const CardInfo = defineAsyncComponent(() => import('./components/CardInfo.vue'))

onMounted(() => {
  // getFileImg()
  getConfInfo()
})

const getConfInfo = async () => {
  getConf({}).then((res: any) => {
    state.value.dataObj = { ...res }
  })
}

// const getFileImg = async () => {
//   getFiles({}).then((res: any) => {
//     console.log(res)
//   })
// }
</script>

<style lang="scss" scoped>
.basics_page {
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
