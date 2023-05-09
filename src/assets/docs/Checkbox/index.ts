const index = `<template>
<div>
  <!-- 建议使用ant-design-vue的复选框 -->
  <p-checkbox>Checkbox</p-checkbox>
</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import '@without_end/ph-ui/style/checkbox'

const PCheckbox = defineAsyncComponent(() => import('@without_end/ph-ui/lib/checkbox'))
</script>

<style lang="scss" scoped></style>
`
export default {
  index
}
