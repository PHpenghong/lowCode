<template>
  <div
    class="HandleBorder flexClass"
    unselectable="on"
    onselectstart="return false"
    :style="{
      height: height + 'px'
    }"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <article
      class="handleArt"
      :style="{
        height: height - 30 + 'px'
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, PropType } from 'vue'

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 50
    },
    widthObj: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    }
  },
  setup(props, emit) {
    const state = ref({
      lastX: 0,
      isDown: false
    })
    onMounted(() => {
      document.addEventListener('mouseup', mouseUp)
    })
    const mouseDown = (event: any) => {
      state.value.isDown = true
      document.addEventListener('mousemove', mouseMove)
      state.value.lastX = event.screenX
    }
    const mouseMove = (event: any) => {
      if (!state.value.isDown) {
        mouseUp()
        return
      }
      const num = state.value.lastX - event.screenX
      const is = num > 0
      emit.emit(
        'update:leftWidth',
        is ? reduceNum(props.leftWidth, num) : addNum(props.leftWidth, -num)
      )
      emit.emit('changeWidth', state.value.lastX - event.screenX)
      state.value.lastX = event.screenX
    }
    const addNum = (width: number, num: number) => width + num
    const reduceNum = (width: number, num: number) => {
      const n = width - num
      return n <= 50 ? 50 : n
    }
    const mouseUp = () => {
      state.value.isDown = false
      state.value.lastX = 0
      document.removeEventListener('mousemove', mouseMove)
    }
    onBeforeUnmount(() => {
      document.addEventListener('mouseup', mouseUp)
    })
    return { mouseDown, mouseUp }
  }
})
</script>

<style lang="scss" scoped>
.HandleBorder {
  cursor: w-resize;
  width: 8px;
  z-index: 99999;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  .handleArt {
    width: 2px;
    margin: 10px 3px;
    background: #ccc;
  }
}
</style>
