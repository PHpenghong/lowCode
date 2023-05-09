<template>
  <div class="page_head">
    <a-button type="link" @click="cache">缓存</a-button>
    <a-button type="link" @click="readCache">读取缓存</a-button>
    <a-button type="link" @click="readTableCache">读取Tabel缓存</a-button>
    <a-button type="link" @click="download">下载</a-button>
    <a-button type="link" danger @click="clearCache">清除缓存</a-button>
    <a-button type="link" danger @click="empty">清空</a-button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits([
  'cache',
  'readCache',
  'empty',
  'download',
  'readTableCache',
  'clearCache'
])

const cache = () => {
  emits('cache')
}

const readTableCache = () => {
  emits('readTableCache')
}

const readCache = () => {
  emits('readCache')
}

const download = () => {
  emits('download')
}

const empty = () => {
  emits('empty')
}

const clearCache = () => {
  emits('clearCache')
  window.localStorage.removeItem('formData')
}
</script>

<style lang="scss" scoped>
.page_head {
  width: 1005;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
