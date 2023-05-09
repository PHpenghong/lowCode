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
          <a-form-item label="页面类型">
            <a-checkbox v-model:checked="props.pageInfo.form">表单</a-checkbox>
            <a-checkbox v-model:checked="props.pageInfo.details"
              >详情</a-checkbox
            >
          </a-form-item>
          <a-form-item
            label="生成类型"
            name="filetype"
            :rules="[{ required: true, message: '生成类型不能为空' }]"
          >
            <a-radio-group v-model:value="props.pageInfo.filetype">
              <a-radio-button value="page">页面</a-radio-button>
              <a-radio-button value="model">弹窗</a-radio-button>
              <a-radio-button value="drawer">抽屉</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="文件名"
            name="filename"
            :rules="[{ required: true, message: '文件名不能为空' }]"
          >
            <a-input
              v-model:value="props.pageInfo.filename"
              addon-after=".vue"
            />
          </a-form-item>
        </a-form>
      </template>
      <template #btns>
        <a-button @click="downCode">下载</a-button>
      </template>
    </p-model>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, defineProps, ref, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import { downAll } from '../tools/download'

const PModel = defineAsyncComponent(
  () => import('@without_end/ph-ui/lib/model')
)

const formRef = ref<any>()

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
  formObj: {
    type: Object,
    default: () => ({})
  },
  formData: {
    type: Array,
    default: () => []
  }
})

watchEffect(() => {
  if (props.visible[props.visibleStr]) {
    props.pageInfo.filetype = 'page'
    props.pageInfo.filename = ''
    props.pageInfo.form = false
    props.pageInfo.details = false
  } else {
    formRef.value && formRef.value.resetFields()
  }
})

const downCode = () => {
  if (!props.pageInfo.form && !props.pageInfo.details) {
    message.warning('至少要选择一种页面类型')
    return
  }
  formRef.value.validate().then(() => {
    downAll(props.formData, props.formObj, props.pageInfo)
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
