<template>
  <div>
    <section v-show="tagType" class="form_info">
      <a-select
        v-model:value="tagType"
        class="select_component"
        @change="onChange"
      >
        <a-select-option
          v-for="item in inputOptions"
          :key="item.type"
          :value="item.type"
          >{{ item.title }}</a-select-option
        >
      </a-select>
      <a-button type="primary" danger @click="del">删除</a-button>
    </section>
    <section>
      <EditFormInfo :form-info-obj="props.formInfoObj" />
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  defineProps,
  defineAsyncComponent,
  ref,
  watch,
  defineEmits
} from 'vue'
// import { Format } from '../../ts/formCode'

const EditFormInfo = defineAsyncComponent(
  () => import('./components/EditForm.vue')
)

const emits = defineEmits(['changeTag', 'delItem'])
const props = defineProps({
  formTypeArr: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  formInfoObj: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

watch(
  () => props.formInfoObj,
  () => {
    tagType.value = props.formInfoObj.tag
  }
)

let tagType = ref<string>('')
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

const del = () => {
  emits('delItem', props.formInfoObj.key)
}

const onChange = (tag: string) => {
  emits('changeTag', tag)
}
</script>

<style lang="scss" scoped>
.form_info {
  margin: 20px;
  .select_component {
    width: 220px;
    margin-right: 15px;
  }
}
</style>
