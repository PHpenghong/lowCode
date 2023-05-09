const index = `<template>
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

const PModel = defineAsyncComponent(() => import('@without_end/ph-ui/lib/model'))

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

<style lang="scss" scoped></style>`

const noBorder = `<template>
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

const PModel = defineAsyncComponent(() => import('@without_end/ph-ui/lib/model'))

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
</style>`

const full = `<template>
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

const PModel = defineAsyncComponent(() => import('@without_end/ph-ui/lib/model'))

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

<style lang="scss" scoped></style>`

export default {
  index,
  noBorder,
  full
}
