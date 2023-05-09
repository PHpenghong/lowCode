<template>
  <div>
    <a-button type="primary" @click="open">打开弹框</a-button>
    <p-model
      :visible="state.visible"
      visible-str="visibleStr"
      :title="state.title"
      full-model
    >
      <template #body> 全屏弹框Body插槽内容 </template>
    </p-model>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import '@without_end/ph-ui/style/model'

const PModel = defineAsyncComponent(
  () => import('@without_end/ph-ui/lib/model')
)

const state = ref<{
  visible: {
    visibleStr: boolean
  }
  title: string
}>({
  visible: {
    visibleStr: false
  },
  title: '弹框展示'
})

const open = () => {
  state.value.visible.visibleStr = true
}
</script>

<style lang="scss" scoped></style>
