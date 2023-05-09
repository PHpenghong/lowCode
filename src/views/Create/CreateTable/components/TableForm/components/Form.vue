<template>
  <div>
    <a-form layout="inline" :model="formState">
      <FormItem
        v-for="item in props.formData"
        :key="item.key"
        :item="item"
        @on-click="onClick"
      />
      <!-- <a-form-item v-for="item in props.formData" :key="item.key">
        
      </a-form-item> -->
      <a-form-item v-show="props.formData.length > 0">
        <a-button type="primary"> 搜索 </a-button>&nbsp;
        <a-button> 重置 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  defineProps,
  PropType,
  defineAsyncComponent,
  defineEmits
} from 'vue'
import { Format } from '../../../ts/formCode'

const FormItem = defineAsyncComponent(() => import('./Form'))

const emits = defineEmits(['selectFormItem'])
const props = defineProps({
  formData: {
    type: Array as PropType<Format[]>,
    default: () => []
  }
})

const onClick = (el: any, item: any) => {
  emits('selectFormItem', item)
}

const formState = reactive<any>({})
</script>

<style lang="scss" scoped>
.width200 {
  min-width: 200px;
}
</style>
