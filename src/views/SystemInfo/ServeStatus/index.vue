<template>
  <div class="ServeStatus_page">
    <Status />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const Status = defineAsyncComponent(() => import('./components/Status.vue'))
</script>

<style lang="scss" scoped>
.ServeStatus_page {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
