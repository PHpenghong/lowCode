<template>
  <div class="">
    <div class="formDiv">
      <a-form layout="inline">
        <a-form-item label="关键字">
          <a-input
            v-model:value="props.form.filter"
            placeholder=""
            allow-clear
          />
        </a-form-item>

        <a-form-item>
          <a-button class="btns" type="primary" @click="search">查询</a-button>
          <a-button class="btns" @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue'

const emits = defineEmits(['search'])
const props = defineProps({
  form: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const search = () => {
  emits('search', true)
}

const reset = () => {
  Object.keys(props.form).map((i: string) => {
    props.form[i] = ''
    return i
  })
}
</script>

<style lang="scss" scoped>
.formDiv {
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  :deep .btns {
    margin-left: 10px;
  }
}
</style>
