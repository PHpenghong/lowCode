<template>
  <div style="width: 100px; height: 100px">
    {{ props.test1 }}
    <a-button @click="click">点击1</a-button>
    <a-button @click="click2">点击2</a-button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  test1: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:test1', 'func'])

const click = () => {
  emit('func', '函数修改')
}
const click2 = () => {
  emit('update:test1', 'test')
}

defineExpose({
  click
})
</script>

<style lang="scss" scoped></style>
