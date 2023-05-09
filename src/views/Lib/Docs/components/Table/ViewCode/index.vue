<template>
  <div>
    <p-table
      ref="searchTable"
      :slot-list="['actions']"
      :form="formState"
      title="Table标题"
      :file-module="module"
      row-key="dataId"
      :is-row-select="false"
      :page-size="10"
      :page-size-arr="['10', '20', '30', '40', '50']"
      :req="search"
      columns-key="demoCol"
      param-name="demoParam"
      res-name="demoRes"
    >
      <template #form>
        <Form :form="formState" @search="searchFunc" />
      </template>
      <template #actions="{ row }">
        <a-button type="link" @click="btn(row)">编辑</a-button>
        <a-button type="link" danger @click="btn(row)">删除</a-button>
      </template>
    </p-table>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue'
import PTable from '@without_end/ph-ui/lib/table' // Table组件初始化搜索的情况下不能异步加载
import { search } from '@/api/user' // 接口对象
import '@without_end/ph-ui/style/table'

const Form = defineAsyncComponent(() => import('./Form.vue'))

const searchTable = ref()

const formState = reactive<any>({
  filter: ''
})

let module = reactive<any>(null)

onMounted(() => {
  module = import.meta.globEager('/src/assets/table/demo/index.ts')[ // table 文件地址 （建议: /src/assets/table/*/index.ts ）
    '/src/assets/table/demo/index.ts'
  ]
  // searchFunc()
})

const searchFunc = (is = false) => {
  searchTable.value.search && searchTable.value.search(is)
}

const btn = (row: any) => {
  console.log(row)
}
</script>

<style lang="scss" scoped></style>
