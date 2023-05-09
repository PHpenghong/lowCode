<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{ width: size + 'em', height: size + 'em' }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

/**
 * 使用
 * <SvgIcon name="add"></SvgIcon>
 */

export default defineComponent({
  name: 'SvgIcon',
  props: {
    // 使用的svg图标名称，也就是svg文件名
    name: {
      type: String,
      required: true
    },
    prefix: {
      type: String,
      default: 'icon'
    },
    size: {
      type: Number,
      default: 1
    }
    // color: {
    //   type: String,
    //   default: '#ffffff'
    // }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  }
})
</script>
<style scope>
.svg-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
