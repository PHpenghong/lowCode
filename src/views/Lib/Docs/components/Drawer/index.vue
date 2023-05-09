<template>
  <div>
    <Preview :docs-data="docsData" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { ApiData, ComData } from '../../../types/interface'
import docs from './ViewCode/code'

interface State {
  comData: ComData[]
  gridData: ApiData[]
}

const Preview = defineAsyncComponent(
  () => import('../../../components/PreView.vue')
)

const docsData = ref<State>({
  comData: [
    {
      title: '基本用法',
      name: 'Drawer',
      fileName: 'index',
      content: docs.index
    }
  ],
  gridData: [
    {
      title: '属性',
      type: 'Attr',
      grid: [
        {
          label: 'title',
          explain: '标题',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'visible',
          explain: '显示对象',
          type: '{[key: string]: boolean}',
          default: '() => ({})',
          version: ''
        },
        {
          label: 'visibleStr',
          explain: '显示对象字符串',
          type: 'string',
          default: 'visible',
          version: ''
        },
        {
          label: 'width',
          explain: '宽度',
          type: 'string | number',
          default: '500',
          version: ''
        },
        {
          label: 'zIndex',
          explain: '层级',
          type: 'number',
          default: '1000',
          version: ''
        },
        {
          label: 'placement',
          explain: '打开位置',
          type: 'top | right | bottom | left',
          default: 'right',
          version: ''
        },
        {
          label: 'style',
          explain: '样式',
          type: '{[key: string]: string | number}',
          default: '() => ({})',
          version: ''
        },
        {
          label: 'closable',
          explain: '点击右上角按钮关闭',
          type: 'boolean',
          default: 'true',
          version: ''
        },
        {
          label: 'keyboard',
          explain: '点击esc关闭',
          type: 'boolean',
          default: 'true',
          version: ''
        },
        {
          label: 'maskClosable',
          explain: '点击蒙层关闭',
          type: 'boolean',
          default: 'true',
          version: ''
        }
      ]
    },
    {
      title: '插槽',
      type: 'Slot',
      grid: [
        {
          label: 'body',
          explain: '主体',
          text: '<template #body"></template>',
          version: ''
        },
        {
          label: 'other',
          explain: '其他',
          text: '<template #other"></template>',
          version: ''
        },
        {
          label: 'btns',
          explain: '按钮',
          text: '<template #btns"></template>',
          version: ''
        }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped></style>
