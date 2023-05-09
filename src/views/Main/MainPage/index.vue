<template>
  <div>
    <h4>主页面</h4>
    <a-button type="primary" @click="toDetails">去详情页面</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toDetails = () => {
  router.push({ name: 'MainDetails' })
}
</script>

<style lang="scss" scoped></style>
