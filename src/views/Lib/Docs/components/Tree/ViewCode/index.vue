<template>
  <div>
    <p-tree :tree-data="treeData" :selects-val="selectVal" width="500px" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PTree } from '@without_end/ph-ui'
import '@without_end/ph-ui/style/tree'

const selectVal = ref<number[]>([])
const treeData = ref([
  {
    label: 'title1',
    id: 1,
    children: [
      { label: 'child-title1-1', id: 4 },
      { label: 'child-title1-2', id: 5 },
      { label: 'child-title1-3', id: 6 }
    ]
  },
  {
    label: 'title2',
    id: 2,
    children: [
      { label: 'child-title2-1', id: 7 },
      { label: 'child-title2-2', id: 8 },
      { label: 'child-title2-3', id: 9 }
    ]
  },
  {
    label: 'title3',
    id: 3,
    children: [{ label: 'child-title3-1', id: 10 }]
  }
])
</script>

<style lang="scss" scoped></style>
