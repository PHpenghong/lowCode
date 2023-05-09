<template>
  <div>
    <a-form
      :model="props.formObj"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="排列方式">
        <a-radio-group v-model:value="props.formObj.layout">
          <a-radio-button value="horizontal">水平</a-radio-button>
          <a-radio-button value="vertical">垂直</a-radio-button>
          <a-radio-button value="inline">内联</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="标题方式">
        <a-radio-group v-model:value="props.formObj.layout">
          <a-radio-button value="left">左对齐</a-radio-button>
          <a-radio-button value="right">右对齐</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="标题栅格">
        <a-input-number
          v-model:value="props.formObj.labelCol.span"
          :min="1"
          :max="24"
        />
      </a-form-item>
      <a-form-item label="表单栅格">
        <a-input-number
          v-model:value="props.formObj.wrapperCol.span"
          :min="1"
          :max="24"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'

const props = defineProps({
  formObj: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
:deep .ant-form-item-control-input-content {
  text-align: left;
}
</style>
