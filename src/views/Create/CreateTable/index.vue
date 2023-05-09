<template>
  <div class="CreateTablePage">
    <section class="create_page_left">
      <section class="btn_table">
        <ActionsBtn v-model:actions-btn="state.actionsBtn" />
        <a-button type="primary" class="down_btn" @click="downCode"
          >下载</a-button
        >
      </section>
      <section class="table_form">
        <TableForm
          v-model:formData="state.formData"
          @select-form-item="selectFormItem"
        />
      </section>
      <section class="edit_table">
        <EditTable v-model:table-data="state.tableData" />
      </section>
      <section class="data_table" />
    </section>
    <section class="create_page_right">
      <section class="info_form">
        <EditFormInfo
          :form-info-obj="state.storageFormObj"
          :form-type-arr="state.formTypeArr"
          @del-item="delItem"
          @change-tag="changeTag"
        />
      </section>
      <section class="edit_form" />
    </section>
    <DownloadCode
      :visible="state.visible"
      visible-str="visibleDown"
      :page-info="state.pageInfo"
      :table-data="state.tableData"
      :form-data="state.formData"
      :actions-btn="state.actionsBtn"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'
import { EditTableColumn } from './ts/tableColumn'
import { Format } from './ts/formCode'
import { formatObj } from '@/views/Create/CreateTable/ts/formCode'

const DownloadCode = defineAsyncComponent(
  () => import('./components/DownloadCode.vue')
)
const TableForm = defineAsyncComponent(
  () => import('./components/TableForm/index.vue')
)
const EditTable = defineAsyncComponent(
  () => import('./components/EditTable/index.vue')
)
const EditFormInfo = defineAsyncComponent(
  () => import('./components/InfoForm/index.vue')
)
const ActionsBtn = defineAsyncComponent(
  () => import('./components/ActionsBtn/index.vue')
)

interface PageInfo {
  key: string
  title: string
  lib: string
  isIndex: boolean
  tool: string
}

interface State {
  tableData: EditTableColumn[]
  formData: Format[]
  storageFormObj: any
  formTypeArr: string[]
  actionsBtn: string[]
  pageInfo: PageInfo
  visible: any
}

const state = reactive<State>({
  tableData: [],
  formData: [],
  formTypeArr: [],
  storageFormObj: {},
  actionsBtn: [],
  pageInfo: {
    key: '',
    title: '',
    lib: '3',
    isIndex: true,
    tool: 'vite'
  },
  visible: {
    visibleDown: false
  }
})

const selectFormItem = (item: Format) => {
  state.storageFormObj = item
}

const changeTag = (tag: string) => {
  const changeKey: string = state.storageFormObj.key
  const obj: Format = formatObj[tag]
  const newKey: string = obj.key

  state.formData = state.formData.map((i: Format) => {
    if (i.key === changeKey) {
      return obj
    }
    return i
  })
  for (let i = 0, len = state.formData.length; i < len; i++) {
    if (state.formData[i].key === newKey) {
      state.storageFormObj = state.formData[i]
      break
    }
  }
}

const downCode = () => {
  if (state.tableData.length === 0) return
  state.visible.visibleDown = true
}

const delItem = (key: string) => {
  state.formData = state.formData.filter((i: any) => i.key != key)
  state.storageFormObj = {}
}
</script>

<style lang="scss" scoped>
.CreateTablePage {
  height: 100%;
  width: 100%;
  display: flex;
  .create_page_left {
    width: 60%;
    .btn_table {
      background-color: #ffffff;
      margin: 0 5px 5px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .down_btn {
        align-self: end;
      }
    }
    .table_form {
      background-color: #ffffff;
      margin: 5px;
    }
    .edit_table {
      margin: 5px;
      background-color: #ffffff;
    }
    .view_table {
    }
    .data_table {
    }
  }
  .create_page_right {
    flex: 1;
    .info_form {
      background-color: #ffffff;
      padding: 20px;
      height: 100%;
    }
    .edit_form {
    }
  }
}
</style>
