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
      name: 'Checkbox',
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
          label: 'name',
          explain: 'name属性',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'value',
          explain: '指定选中的选项',
          type: 'boolean',
          default: 'false',
          version: ''
        },
        {
          label: 'disabled',
          explain: '禁用',
          type: 'boolean',
          default: 'false',
          version: ''
        },
        {
          label: 'indeterminate',
          explain: '设置 indeterminate 状态',
          type: 'boolean',
          default: 'false',
          version: ''
        }
      ]
    },
    {
      title: '插槽',
      type: 'Slot',
      grid: [
        {
          label: 'default',
          explain: '默认',
          text: '',
          version: ''
        }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped></style>
