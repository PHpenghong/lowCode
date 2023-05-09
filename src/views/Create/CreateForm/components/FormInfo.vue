<template>
  <div class="formInfo">
    <a-tabs v-model:activeKey="state.type">
      <a-tab-pane key="components" tab="组件属性">
        <ComponentsAttrs
          v-show="Object.keys(props.selectFormItem).length > 0"
          :select-form-item="props.selectFormItem"
          @change-tag-type="changeTagType"
        />
      </a-tab-pane>
      <a-tab-pane key="form" tab="表单属性" force-render
        ><FormAttrs :form-obj="props.formObj"
      /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  defineProps,
  ref,
  defineAsyncComponent,
  defineEmits
} from 'vue'

const ComponentsAttrs = defineAsyncComponent(
  () => import('./components/ComponentsAttrs.vue')
)
const FormAttrs = defineAsyncComponent(
  () => import('./components/FormAttrs.vue')
)

const emits = defineEmits(['changeTagType'])
const props = defineProps({
  selectFormItem: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  formObj: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const state = ref<any>({
  type: 'components'
})
const changeTagType = (value: string) => {
  emits('changeTagType', value)
}
</script>

<style lang="scss" scoped>
.formInfo {
  width: 100%;
  height: 100%;
  :deep .ant-tabs-nav-list {
    width: 100%;
  }
  :deep .ant-tabs-tab {
    width: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>
