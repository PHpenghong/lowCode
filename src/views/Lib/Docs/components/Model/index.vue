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
      name: 'Model',
      fileName: 'index',
      content: docs.index
    },
    {
      title: '无边框',
      name: 'Model',
      fileName: 'noBorder',
      content: docs.noBorder
    },
    {
      title: '全屏',
      name: 'Model',
      fileName: 'full',
      content: docs.full
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
        },
        {
          label: 'noBorder',
          explain: '无边框 - 无边框模式没有btns插槽，没有右上角 × 号关闭',
          type: 'boolean',
          default: 'false',
          version: ''
        },
        {
          label: 'fullModel',
          explain: '全屏 - 全屏模式没有btns插槽',
          type: 'boolean',
          default: 'false',
          version: ''
        }
      ]
    },
    {
      title: '方法',
      type: 'Method',
      grid: [
        {
          label: 'destroyModal',
          explain: '销毁弹窗',
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
