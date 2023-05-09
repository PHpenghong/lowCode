<template>
  <div class="NetworkInfo">
    <article class="network_title">网络信息</article>
    <NetWorkForm />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const NetWorkForm = defineAsyncComponent(
  () => import('./components/NetWorkForm.vue')
)
</script>

<style lang="scss" scoped>
.NetworkInfo {
  padding: 20px;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  .network_title {
    text-align: left;
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    text-align: left;
    padding: 10px 20px;
  }
}
</style>
