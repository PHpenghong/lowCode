const index = `<template>
<div>
  <section>
    <a-radio-group v-model:value="state.placement" style="margin-right: 8px">
      <a-radio value="top">top</a-radio>
      <a-radio value="right">right</a-radio>
      <a-radio value="bottom">bottom</a-radio>
      <a-radio value="left">left</a-radio>
    </a-radio-group>
    <a-button type="primary" @click="open">打开抽屉</a-button>
  </section>
  <p-drawer
    :visible="state.visible"
    visible-str="visibleStr"
    :title="state.title"
    :placement="state.placement"
  >
    <template #body> 抽屉Body插槽内容 </template>
    <template #other> 抽屉Other插槽内容 </template>
    <template #btns>
      <section class="btn_sec">
        <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
        <a-button @click="close">取消</a-button>
      </section>
    </template>
  </p-drawer>
</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const PDrawer = defineAsyncComponent(() => import('@without_end/ph-ui/lib/drawer'))

const state = ref<{
visible: {
  visibleStr: boolean
}
title: string
placement: string
}>({
visible: {
  visibleStr: false
},
title: '抽屉展示',
placement: 'right'
})

const open = () => {
state.value.visible.visibleStr = true
}

const onSubmit = () => {
close()
}

const close = () => {
state.value.visible.visibleStr = false
}
</script>

<style lang="scss" scoped></style>`

export default {
  index
}
