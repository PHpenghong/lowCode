<template>
  <div>
    <section class="edit_head">
      <h3>表格条件查询设置</h3>
      <article>
        <a-popover placement="bottom">
          <template #content>
            <p
              v-for="item in inputOptions"
              :key="item.type"
              class="inputP"
              @click="select(item.type)"
            >
              {{ item.title }}
            </p>
          </template>
          <template #title>
            <span>选择类型</span>
          </template>
          <a-button>添加</a-button>
        </a-popover>
        <a-button
          class="editable-add-btn"
          style="margin-bottom: 8px"
          @click="readCache"
        >
          读取缓存
        </a-button>
        <a-button @click="handleCache">缓存</a-button>
        <a-button
          class="editable-add-btn"
          style="margin-bottom: 8px"
          @click="download"
        >
          下载
        </a-button>
        <a-button danger @click="clearCache">清除缓存</a-button>
      </article>
    </section>
    <section class="edit_form_sec">
      <Form :form-data="props.formData" @select-form-item="selectFormItem" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, PropType, defineProps, defineEmits } from 'vue'
import { saveAs } from 'file-saver'
import { Modal } from 'ant-design-vue'
import { formatObj } from '@/views/Create/CreateTable/ts/formCode'
import { Format } from '../../ts/formCode'
import { downFormVue } from '../../ts/download'
import { clone } from '@/utils/tools'

const inputOptions = [
  {
    type: 'a-input',
    title: '输入框 Input'
  },
  {
    type: 'a-select',
    title: '选择框 Select'
  },
  {
    type: 'a-range-picker',
    title: '时间选择器 Date'
  },
  {
    type: 'slot',
    title: '插槽 slot'
  }
]

const Form = defineAsyncComponent(() => import('./components/Form.vue'))

const emits = defineEmits([
  'update:formData',
  'update:formObj',
  'selectFormItem'
])
const props = defineProps({
  formData: {
    type: Array as PropType<Format[]>,
    default: () => []
  }
})

const handleCache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '如果存在缓存，将被覆盖，是否继续',
    centered: true,
    onOk() {
      localStorage.setItem('FormCache', JSON.stringify(props.formData))
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
      window.localStorage.removeItem('FormCache')
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
      emits(
        'update:formData',
        JSON.parse(localStorage.getItem('FormCache') || '[]')
      )
    }
    // onCancel() {}
  })
}

const select = (type: string) => {
  emits('update:formData', [
    ...clone(props.formData),
    ...[clone(formatObj[type])]
  ])
}

const selectFormItem = (item: Format) => {
  emits('selectFormItem', item)
}

const download = () => {
  const codeStr = downFormVue(props.formData, [])
  const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'Form.vue')
}
</script>

<style lang="scss">
.edit_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
.edit_form_sec {
  padding: 10px 20px;
}
.inputP {
  cursor: pointer;
  padding: 5px;
}
.formItemClass:hover {
  cursor: pointer;
  background-color: #efefef;
}
</style>
