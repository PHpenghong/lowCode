<template>
  <div class="createForm">
    <section class="left_form_drag">
      <section class="page_header">
        <Head
          @cache="cache"
          @read-cache="readCache"
          @empty="empty"
          @download="download"
          @read-table-cache="readTableCache"
          @clear-cache="clearCache"
        />
      </section>
      <div class="page_body">
        <section class="drag_type">
          <ComponentType @select-component-type="selectComponentType" />
        </section>
        <section class="edit_body">
          <DragArea
            :form-data="state.formData"
            :form-obj="state.formObj"
            :select-form-item="state.selectFormItem"
            @click-component="clickComponent"
            @del-form-item="delFormItem"
            @copy-form-item="copyFormItem"
          />
        </section>
      </div>
    </section>
    <section class="formInfo">
      <FormInfo
        :select-form-item="state.selectFormItem"
        :form-obj="state.formObj"
        @change-tag-type="changeTagType"
      />
    </section>
    <DownloadMode
      :visible="state.visible"
      visible-str="visibleDown"
      :form-data="state.formData"
      :form-obj="state.formObj"
      :page-info="state.pageInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { getCode } from '@/utils/random'
import { inputComponents, selectComponents } from './tools/config'

const DownloadMode = defineAsyncComponent(
  () => import('./components/DownloadMode.vue')
)
const Head = defineAsyncComponent(() => import('./components/Header.vue'))
const ComponentType = defineAsyncComponent(
  () => import('./components/ComponentType.vue')
)
const DragArea = defineAsyncComponent(() => import('./components/DragArea.vue'))
const FormInfo = defineAsyncComponent(() => import('./components/FormInfo.vue'))

const state = ref<any>({
  formData: [],
  pageInfo: {
    filename: '',
    filetype: 'model',
    details: false,
    form: true
  },
  formObj: {
    layout: 'horizontal',
    labelAlign: 'right',
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  },
  selectFormItem: {},
  visible: {
    visibleDown: false
  }
})

// 选择组件
const selectComponentType = (item: any) => {
  state.value.formData.push(item)
  clickComponent(item.id)
}

const clickComponent = (id: string) => {
  state.value.formData.some((i: any) => {
    state.value.selectFormItem = i
    return i.id === id
  })
}
const delFormItem = (id: string) => {
  state.value.formData = state.value.formData.filter((i: any) => i.id !== id)
  if (state.value.selectFormItem.id === id) {
    state.value.selectFormItem = {}
  }
}

const copyFormItem = (item: any) => {
  const formObj = { ...item }
  formObj.id = getCode()
  formObj.name = getCode()
  state.value.formData.push(formObj)
  clickComponent(formObj.id)
}

const cache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '如果存在缓存，将被覆盖，是否继续？',
    centered: true,
    onOk() {
      window.localStorage.setItem(
        'formData',
        JSON.stringify(state.value.formData)
      )
    }
    // onCancel() {}
  })
}
const readCache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '如果当前存在编辑数据，将被覆盖，是否继续？',
    centered: true,
    onOk() {
      state.value.formData = [
        ...JSON.parse(window.localStorage.getItem('formData') || '[]')
      ]
    }
    // onCancel() {}
  })
}
const readTableCache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '如果当前存在编辑数据，将被覆盖，是否继续？',
    centered: true,
    onOk() {
      const tableArr = JSON.parse(localStorage.getItem('tableCache') || '[]')
      if (tableArr.length > 0) {
        state.value.formData = [
          ...tableArr.map((i: any) => {
            const obj = { ...inputComponents[0] }
            obj.id = getCode()
            obj.name = i.key
            obj.label = i.title
            return obj
          })
        ]
      }
    }
    // onCancel() {}
  })
}
const clearCache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '确定清空缓存？',
    centered: true,
    onOk() {
      window.localStorage.removeItem('formData')
    }
    // onCancel() {}
  })
}
const empty = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '你确定要清空吗？',
    centered: true,
    onOk() {
      state.value.formData.splice(0)
      state.value.selectFormItem = {}
    }
    // onCancel() {}
  })
}
const changeTagType = (value: string) => {
  const arr = [...inputComponents, ...selectComponents]
  let changeObj: any = {}
  arr.some((i: any) => {
    const is = i.tagIcon === value
    if (is) changeObj = i
    return is
  })
  state.value.formData.some((i: any) => {
    const is = i.id === state.value.selectFormItem.id
    if (is) {
      Object.keys(i).map((s: string) => {
        if (!~['id', 'name', 'label'].indexOf(s)) {
          delete i[s]
        }
        return s
      })
      Object.keys(changeObj).map((s: string) => {
        if (!~['id', 'name', 'label'].indexOf(s)) {
          i[s] = changeObj[s]
        }
        return s
      })
    }
    return is
  })
}

const download = () => {
  if (state.value.formData.length === 0) return
  state.value.visible.visibleDown = true
}
</script>

<style lang="scss" scoped>
.createForm {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  .left_form_drag {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .page_header {
      height: 42px;
      width: 100%;
      border: 1px solid #cecece;
    }
    .page_body {
      flex: 1;
      display: flex;
      .drag_type {
        width: 260px;
        height: 100%;
        border: 1px solid #cecece;
      }
      .edit_body {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
  .formInfo {
    width: 350px;
    height: 100%;
    border: 1px solid #cecece;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
