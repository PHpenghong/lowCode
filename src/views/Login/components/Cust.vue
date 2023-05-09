<template>
  <div>
    <section>
      <span>欢迎您！</span>
      <span>{{ getUserInfo.name }}</span>
      <a-button type="link" @click="logout">退出</a-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const { logout, getUserInfo } = useUserStore()

// getUser()
</script>

<style lang="scss" scoped></style>
