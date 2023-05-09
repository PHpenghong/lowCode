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
      name: 'Card',
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
          label: 'cardList',
          explain: '卡片数据集合',
          type: 'CardObj',
          default: '() => []',
          version: ''
        },
        {
          label: 'infoIcon',
          explain: '描述文本svg图标',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'infoIconColor',
          explain: '描述文本svg图标颜色',
          type: 'string',
          default: '#e5e5e5',
          version: ''
        }
      ]
    },
    {
      title: 'CardObj',
      type: 'Attr',
      light: true,
      grid: [
        {
          label: 'key',
          explain: 'key',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'title',
          explain: '卡片标题',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'value',
          explain: '卡片数值',
          type: 'number',
          default: '0',
          version: ''
        },
        {
          label: 'unit',
          explain: '卡片数值单位',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'icon',
          explain: '卡片svg图标名称',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'iconColor',
          explain: '卡片svg图标颜色',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'iconBg',
          explain: '卡片svg图标背景颜色',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'info',
          explain: '描述文本 - 为空时不显示描述文本svg图标',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'slot',
          explain:
            '插槽 - 插槽名为 CardObj.key ,slot为true时，卡片图标变为 手 ',
          type: 'boolean',
          default: 'false',
          version: '0.0.20'
        }
      ]
    },
    {
      title: '事件',
      type: 'Event',
      grid: [
        {
          label: 'handleCard',
          explain: '点击图标触发',
          callback: 'function(key) // key: CardObj.key',
          version: '0.0.20'
        }
      ]
    },
    {
      title: '插槽',
      type: 'Slot',
      grid: [
        {
          label: 'alertFunc',
          explain: '点击图标打开 Popover',
          text: ' <template #keyName="{ item }"></template>',
          version: '0.0.20'
        }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped></style>
