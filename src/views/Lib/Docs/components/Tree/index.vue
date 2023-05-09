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
      name: 'Tree',
      fileName: 'index',
      content: docs.index
    },
    {
      title: '展开&可勾选&禁用',
      name: 'Tree',
      fileName: 'checked',
      content: docs.checked
    },
    {
      title: '插槽',
      name: 'Tree',
      fileName: 'slot',
      content: docs.slot
    }
  ],
  gridData: [
    {
      title: '属性',
      type: 'Attr',
      grid: [
        {
          label: 'treeData',
          explain: '树结构数据',
          type: 'any[]',
          default: '() => []',
          version: ''
        },
        {
          label: 'fieldNames',
          explain:
            '替换 treeData 中 label,id,children 字段为 treeData 中对应的字段',
          type: `{
              label: string
              id: string
              children: string
              disabled?: boolean
            }`,
          default: `{
              label: 'label',
              id: 'id',
              children: 'children'
            }`,
          version: ''
        },
        {
          label: 'expandIcon',
          explain: '展开图标 - 项目SVG图标名称',
          type: 'string',
          default: 'caret-down',
          version: ''
        },
        {
          label: 'collapseIcon',
          explain: '收起图标 - 项目SVG图标名称',
          type: 'string',
          default: 'caret-right',
          version: ''
        },
        {
          label: 'width',
          explain: '宽度',
          type: 'string',
          default: '100%',
          version: ''
        },
        {
          label: 'height',
          explain: '高度',
          type: 'string',
          default: '100%',
          version: ''
        },
        {
          label: 'selectsVal',
          explain: '点击的节点',
          type: '(string | number)[]',
          default: '() => []',
          version: ''
        },
        {
          label: 'checkedVal',
          explain: '选择的节点',
          type: 'v-model:(string | number)[]',
          default: '() => []',
          version: ''
        },
        {
          label: 'defaultExpandVal',
          explain: '默认展开的节点',
          type: '(string | number)[]',
          default: '() => []',
          version: ''
        },
        {
          label: 'defaultCheckedVal',
          explain: '默认选择的节点',
          type: '(string | number)[]',
          default: '() => []',
          version: ''
        },
        {
          label: 'selectsColor',
          explain: '选择节点的背景色',
          type: 'string',
          default: '#BAE7FF',
          version: ''
        },
        {
          label: 'disabled',
          explain: '是否禁用禁用',
          type: 'boolean',
          default: 'false',
          version: ''
        },
        {
          label: 'isExpand',
          explain: '是否全部展开',
          type: 'boolean',
          default: 'false',
          version: ''
        },
        {
          label: 'isCheckbox',
          explain: '是否显示选择框',
          type: 'boolean',
          default: 'false',
          version: ''
        }
      ]
    },
    {
      title: '事件',
      type: 'Event',
      grid: [
        {
          label: 'clickNode',
          explain: '点击的节点',
          callback: 'function(node) // node: 节点数据',
          version: ''
        },
        {
          label: 'nodeExpand',
          explain: '展开的节点',
          callback: `function(node, type, e) // node: 节点数据，type: expand | collapse，e`,
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
          explain: '默认插槽',
          text: '<template #default="{ node }"></template>',
          version: ''
        }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped></style>
