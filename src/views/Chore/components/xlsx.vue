<template>
  <div class="readXlsx">
    <article class="card_icon">
      <SvgIcon class="icons" :size="1.2" name="delete" @click="del" />
    </article>
    <article>
      <a-form
        ref="formRef"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :model="form"
        layout="horizontal"
        label-align="right"
      >
        <a-form-item label="关键字列名" name="colKey">
          <a-input
            v-model:value="form.colKey"
            placeholder="请输入"
            :allow-clear="true"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="关键字" name="key">
          <a-input
            v-model:value="form.key"
            placeholder="请输入"
            :allow-clear="true"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="截取位置" name="keyStart">
          <a-input-number
            v-model:value="form.keyStart"
            :min="0"
            :max="10"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="截取长度" name="keyLength">
          <a-input-number
            v-model:value="form.keyLength"
            :min="1"
            :max="40"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="读取的列" name="readCol">
          <a-select
            v-model:value="form.readCol"
            mode="tags"
            :max-tag-count="1"
            :max-tag-text-length="10"
            style="width: 100%"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </article>
    <article>
      <a-upload-dragger
        name="file"
        :multiple="false"
        @change="handleFileSelected"
      >
        <p class="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p class="ant-upload-text">单击或拖动文件到此区域以上传</p>
      </a-upload-dragger>
    </article>
  </div>
</template>

<script setup lang="ts">
import { InboxOutlined } from '@ant-design/icons-vue'
import * as XLSX from 'xlsx/xlsx.mjs'

const emits = defineEmits([
  'update:data',
  'update:keyArr',
  'update:keyObj',
  'update:other',
  'update:fileName',
  'del'
])
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  form: {
    type: Object,
    default: () => ({})
  }
})

// const formState = reactive<any>({ colKey: '', readCol: [] })

const handleFileSelected = (e: any) => {
  // 实例化读取文件对象 https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
  const reader = new FileReader()
  // 已二进制的形式读取文件
  const { name } = e.file
  emits('update:fileName', name)
  reader.readAsBinaryString(e.file.originFileObj)
  const data: any = {}
  reader.onload = () => {
    const fileData = reader.result
    const wb = XLSX.read(fileData, { type: 'binary', cellDates: true })
    // console.log('🚀 ~ file: xlsx.vue:32 ~ handleFileSelected ~ wb', wb)
    // {header:1}取消标题列.
    const rowObj: any = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) // { header: 1 }
    const { res, key, keyObj, other } = dealWithRow(rowObj)
    emits('update:data', res)
    emits('update:keyArr', key)
    emits('update:keyObj', keyObj)
    emits('update:other', other)
  }
  // 导入标识改为true
  data.exportSign = true
}

const dealWithRow = (rowArr: any[]) => {
  const res: any[] = []
  const key: string[] = []
  const keyObj: any = {}
  const other: any[] = []
  rowArr.map((item: any) => {
    let r: any = {}
    let k = ''
    const str = item[props.form.colKey]
    const startIndex = str ? str.indexOf(props.form.key) : -1
    if (props.form.key) {
      if (~startIndex) {
        k = str.substr(startIndex + props.form.keyStart, props.form.keyLength)
        key.push(k)
      } else {
        other.push(r)
      }
    }
    if (props.form.readCol.length > 0) {
      props.form.readCol.map((i: string) => {
        r[i] = item[i]
        return i
      })
    } else {
      r = item
    }
    if (k) {
      if (keyObj[k] === undefined) {
        keyObj[k] = []
      }
      keyObj[k].push(r)
    }
    if (str && ~startIndex) {
      res.push({ ...r, key: k })
    }
    return item
  })
  return { res, key, keyObj, other }
}

const del = () => {
  emits('del', props.id)
}
</script>

<style scoped lang="scss">
.readXlsx {
  width: 400px;
  padding: 20px;
  grid-area: 20px;
  background-color: #ffffff;
  .card_icon {
    text-align: right;
    .icons {
      cursor: pointer;
    }
  }
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .d_btn {
    height: 40px;
    padding: 0 21px;
    border: 0;
    outline: 0;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
