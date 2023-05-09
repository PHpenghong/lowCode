<template>
  <div>
    <section>
      <PreviewCom :com-data="docsData.comData" />
    </section>
    <section>
      <ApiCom :api-data="docsData.gridData" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { ApiData, ComData } from '../types/interface'

interface State {
  comData: ComData[]
  gridData: ApiData[]
}

const PreviewCom = defineAsyncComponent(() => import('./PreviewCom/index.vue'))
const ApiCom = defineAsyncComponent(() => import('./ApiCom.vue'))

withDefaults(
  defineProps<{
    docsData: State
  }>(),
  {
    docsData: () => ({} as State)
  }
)
</script>

<style lang="scss" scoped></style>
