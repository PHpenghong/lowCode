<template>
  <div class="edit_info form">
    <a-form
      :model="props.formInfoObj"
      :label-col="{ style: { width: '150px' } }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item v-if="props.formInfoObj.label !== undefined" label="标题">
        <a-input v-model:value="props.formInfoObj.label" />
      </a-form-item>
      <a-form-item v-if="props.formInfoObj.name !== undefined" label="名称">
        <a-input v-model:value="props.formInfoObj.name" />
      </a-form-item>
      <a-form-item v-if="props.formInfoObj.slot !== undefined" label="插槽">
        <a-checkbox v-model:checked="props.formInfoObj.slot"
          >启用插槽</a-checkbox
        >
      </a-form-item>
      <a-form-item v-if="props.formInfoObj.slot" label="插槽名称">
        <a-input v-model:value="props.formInfoObj.slotName" />
      </a-form-item>
      <a-form-item
        v-if="
          props.formInfoObj.tag !== 'a-range-picker' &&
          props.formInfoObj.placeholder !== undefined
        "
        label="输入提示"
      >
        <a-input v-model:value="props.formInfoObj.placeholder" />
      </a-form-item>
      <a-form-item
        v-if="props.formInfoObj.allowClear !== undefined"
        label="是否清除"
      >
        <a-checkbox v-model:checked="props.formInfoObj.allowClear"
          >是否清除</a-checkbox
        >
      </a-form-item>
      <a-form-item
        v-if="props.formInfoObj.enter !== undefined"
        label="是否回车触发"
      >
        <a-checkbox v-model:checked="props.formInfoObj.enter"
          >是否回车触发</a-checkbox
        >
      </a-form-item>
      <a-form-item v-if="props.formInfoObj.disabled !== undefined" label="禁用">
        <a-checkbox v-model:checked="props.formInfoObj.disabled"
          >禁用</a-checkbox
        >
      </a-form-item>
      <!-- 下拉数据设置 -->
      <a-form-item v-if="props.formInfoObj.mode !== undefined" label="模式">
        <a-radio-group v-model:value="props.formInfoObj.mode">
          <a-radio value="">普通</a-radio>
          <a-radio value="multiple">多选</a-radio>
          <a-radio value="tags">标签</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-if="props.formInfoObj.options !== undefined"
        label="数据类型"
      >
        <a-radio-group v-model:value="props.formInfoObj.options">
          <a-radio :value="true">静态数据</a-radio>
          <a-radio :value="false">动态数据</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="props.formInfoObj.options" label="静态数据">
        <Selects v-model:options="props.formInfoObj.selectOption.options" />
      </a-form-item>
      <a-form-item
        v-if="
          props.formInfoObj.tag !== 'a-range-picker' &&
          props.formInfoObj.rules !== undefined
        "
        label="表单校验"
      >
        <Regular v-model:rules="props.formInfoObj.rules" />
      </a-form-item>

      <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px">Cancel</a-button>
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, defineAsyncComponent } from 'vue'
// import { Format } from '../../../ts/formCode'

const Regular = defineAsyncComponent(() => import('./components/Regular.vue'))
const Selects = defineAsyncComponent(() => import('./components/Select.vue'))

const props = defineProps({
  formInfoObj: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.edit_info_form {
}
:deep .ant-form-item-control-input-content {
  text-align: left;
}
</style>
