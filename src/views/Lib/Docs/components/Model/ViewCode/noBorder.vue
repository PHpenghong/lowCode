<template>
  <div>
    <a-button type="primary" @click="open">打开无边框弹框</a-button>
    <p-model :visible="state.visible" visible-str="visibleStr" no-border>
      <template #body>
        <section class="noBorder_sec">无边框弹框Body插槽内容</section>
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
  title: '无边框弹框展示'
})

const open = () => {
  state.value.visible.visibleStr = true
}
</script>

<style lang="scss" scoped>
.noBorder_sec {
  width: 400px;
  height: 200px;
}
</style>
