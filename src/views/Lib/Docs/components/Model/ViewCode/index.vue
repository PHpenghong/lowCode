<template>
  <div>
    <a-button type="primary" @click="open">打开弹框</a-button>
    <p-model
      :visible="state.visible"
      visible-str="visibleStr"
      :title="state.title"
    >
      <template #body> 弹框Body插槽内容 </template>
      <template #btns>
        <section class="btn_sec">
          <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
          <a-button @click="close">取消</a-button>
        </section>
      </template>
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

const onSubmit = () => {
  close()
}

const close = () => {
  state.value.visible.visibleStr = false
}
</script>

<style lang="scss" scoped></style>
