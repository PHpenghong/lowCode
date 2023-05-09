<template>
  <div>
    <Preview :docs-data="docsData" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { ApiData, ComData } from '../../../types/interface'
import docs from './ViewCode/code'

interface State {
  comData: ComData[]
  gridData: ApiData[]
}

const Preview = defineAsyncComponent(
  () => import('../../../components/PreView.vue')
)

const docsData = ref<State>({
  comData: [
    {
      title: '基本用法',
      name: 'Echarts',
      fileName: 'index',
      content: docs.index
    }
  ],
  gridData: []
})
</script>

<style lang="scss" scoped></style>
