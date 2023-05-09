<template>
  <div v-if="show" class="msgDiv">
    <article class="textArt">{{ props.text }}</article>
    <span @click="closeMessage">close</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MessageType } from './types'

const props = withDefaults(
  defineProps<{ text?: string; type?: MessageType }>(),
  {
    type: 'info'
  }
)

const show = ref<boolean>(false)

onMounted(() => {
  show.value = true
})

const closeMessage = () => {
  show.value = false
}

defineExpose({ closeMessage })
</script>

<style lang="scss" scoped>
.msgDiv {
  width: 100px;
  height: 50px;
  background-color: #666666;
  position: fixed;
  top: 100px;
  .textArt {
    color: #ffffff;
  }
}
</style>
