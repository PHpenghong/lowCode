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
      name: 'Table',
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
          label: 'form',
          explain: '请求参数对象',
          type: 'any',
          default: '() => ({})',
          version: ''
        },
        {
          label: 'slotList',
          explain: '插槽集合',
          type: 'string[]',
          default: '() => []',
          version: ''
        },
        {
          label: 'rowKey',
          explain: 'table数据id',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'req',
          explain: '接口',
          type: 'any',
          default: '() => ({})',
          version: ''
        },
        {
          label: 'fileModule',
          explain: 'table 列数据，请求参数对象处理函数，接口数据处理函数',
          type: 'any',
          default: '() => ({})',
          version: ''
        },
        {
          label: 'columnsKey',
          explain: '列名对象集合',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'paramName',
          explain: '参数对象处理函数',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'resName',
          explain: '接口数据处理函数',
          type: 'string',
          default: '',
          version: ''
        },
        {
          label: 'pageSizeArr',
          explain: '指定每页可以显示多少条',
          type: 'string[]',
          default: `() => ['10', '20', '30', '40', '50']`,
          version: ''
        },
        {
          label: 'padding',
          explain: '内边距',
          type: 'string',
          default: '20px 40px',
          version: ''
        },
        {
          label: 'isPage',
          explain: '是否分页',
          type: 'boolean',
          default: 'true',
          version: ''
        },
        {
          label: 'isRowSelect',
          explain: '选择行，全选',
          type: 'boolean',
          default: 'true',
          version: ''
        },
        {
          label: 'returnRow',
          explain:
            'true: 多选返回选中的整行数据集合，false: 多选返回选中的id集合',
          type: 'boolean',
          default: 'false',
          version: ''
        },
        {
          label: 'hideForm',
          explain: '隐藏Form，会占高度',
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
          label: 'pageSizeChange',
          explain: '修改每页显示条数',
          callback:
            'function(page, pageSize) // page：第几页, pageSize：每页条数',
          version: ''
        }
      ]
    },
    {
      title: '方法',
      type: 'Method',
      grid: [
        {
          label: 'search',
          explain:
            '搜索 // search(is=false) true: page = 1 搜索  false: 切换分页搜索',
          version: ''
        },
        {
          label: 'clearTable',
          explain: '清除Table数据',
          version: ''
        }
      ]
    },
    {
      title: '插槽',
      type: 'Slot',
      grid: [
        {
          label: 'form',
          explain: '默认插槽',
          text: '<template #form"></template>',
          version: ''
        },
        {
          label: 'alertFunc',
          explain: '多选，批量操作按钮集',
          text: '<template #alertFunc="{ selectedRowKeys }"></template>',
          version: ''
        },
        {
          label: 'slotList: () => []',
          explain: 'slotList 集合中的的插槽名称',
          text: '<template #slotName="{ row }"></template>',
          version: ''
        }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped></style>
