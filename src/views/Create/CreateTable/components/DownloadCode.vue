<template>
  <div>
    <p-model
      :visible="props.visible"
      :visible-str="props.visibleStr"
      title="请输入页面信息"
    >
      <template #body>
        <a-form
          ref="formRef"
          :model="props.pageInfo"
          class="form_box"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-item
            label="key"
            name="key"
            :rules="[{ required: true, message: 'Key不能为空' }]"
          >
            <a-input v-model:value="props.pageInfo.key" />
          </a-form-item>

          <a-form-item
            label="Title"
            name="title"
            :rules="[{ required: true, message: '标题不能为空' }]"
          >
            <a-input v-model:value="props.pageInfo.title" />
          </a-form-item>
          <a-form-item label="组件库版本">
            <a-radio-group v-model:value="props.pageInfo.lib">
              <a-radio-button value="3">3.0</a-radio-button>
              <a-radio-button value="2">2.0</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="构建工具">
            <a-radio-group v-model:value="props.pageInfo.tool">
              <a-radio-button value="vite">Vite</a-radio-button>
              <a-radio-button value="webpack">Webpack</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <!-- <a-form-item label="Table序号">
            <a-switch v-model:checked="props.pageInfo.isIndex" />
          </a-form-item> -->
        </a-form>
      </template>
      <template #btns>
        <a-button @click="downCode">下载</a-button>
      </template>
    </p-model>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import {
  defineAsyncComponent,
  watchEffect,
  defineProps,
  PropType,
  ref
} from 'vue'
import { downPackage } from '../ts/download'

const PModel = defineAsyncComponent(
  () => import('@without_end/ph-ui/lib/model')
)

const props = defineProps({
  visible: {
    type: Object,
    default: () => ({})
  },
  visibleStr: {
    type: String,
    default: ''
  },
  pageInfo: {
    type: Object,
    default: () => ({})
  },
  tableData: {
    type: Array,
    default: () => []
  },
  formData: {
    type: Array,
    default: () => []
  },
  actionsBtn: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})

const formRef = ref<any>()

watchEffect(() => {
  if (props.visible[props.visibleStr]) {
    props.pageInfo.key = ''
    props.pageInfo.title = ''
    props.pageInfo.lib = '3'
    props.pageInfo.isIndex = true
  } else {
    formRef.value && formRef.value.resetFields()
  }
})

const dealWithTableCol = (actionsBtn: string[]) => [
  ...(~actionsBtn.indexOf('number')
    ? [
        {
          title: '序号',
          dataIndex: 'index',
          ellipsis: true,
          width: 80,
          key: 'index',
          align: 'center'
        }
      ]
    : []),
  ...props.tableData,
  ...(~actionsBtn.indexOf('actions')
    ? [
        {
          key: 'actions',
          title: '操作',
          width: '',
          ellipsis: true,
          align: 'center',
          dataIndex: 'actions'
        }
      ]
    : [])
]

const downCode = () => {
  formRef.value.validate().then(() => {
    downPackage(
      props.pageInfo,
      dealWithTableCol(props.actionsBtn),
      props.formData,
      props.actionsBtn
    )
    message.success('下载成功')
    props.visible[props.visibleStr] = false
  })
}
</script>

<style lang="scss" scoped>
.form_box {
  width: 100%;
}
</style>
