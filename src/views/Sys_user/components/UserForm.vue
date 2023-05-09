<template>
  <div class="">
    <div class="formDiv">
      <a-form layout="inline">
        <a-form-item label="状态">
          <a-select v-model:value="props.form.disable" style="width: 220px">
            <a-select-option value="0">启用</a-select-option>
            <a-select-option value="1">禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="用户名">
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
      <section class="right-btns">
        <a-button class="btns" @click="add">新增</a-button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue'

const emits = defineEmits(['add', 'search'])
const props = defineProps({
  form: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const add = () => {
  emits('add')
}
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
