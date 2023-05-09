<template>
  <div>
    <p-tree
      v-model:checked-val="state.checkedVal"
      v-model:default-checked-val="state.defaultCheckedVal"
      is-checkbox
      :default-expand-val="state.defaultExpandVal"
      :tree-data="treeData"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import '@without_end/ph-ui/style/tree'

/**
 *  isCheckbox 可勾选
 *  isExpand   全部展开
 *  disabled   禁用
 */

const PTree = defineAsyncComponent(() => import('@without_end/ph-ui/lib/tree'))

const state = ref<{
  checkedVal: number[] // 勾选的集合
  defaultCheckedVal: number[] // 默认勾选的集合
  defaultExpandVal: number[] // 默认展开的集合
}>({
  checkedVal: [],
  defaultCheckedVal: [5],
  defaultExpandVal: [1, 2]
})

const treeData = ref([
  {
    label: 'title1',
    id: 1,
    children: [
      { label: 'child-title1-1', id: 6, children: [] },
      { label: 'child-title1-2', id: 4, children: [] },
      { label: 'child-title1-3', id: 5, children: [] }
    ]
  },
  {
    label: 'title2',
    id: 2,
    children: [
      { label: 'child-title2-1', id: 7, children: [] },
      { label: 'child-title2-2', id: 8, disabled: true, children: [] },
      { label: 'child-title2-3', id: 9, children: [] }
    ]
  },
  {
    label: 'title3',
    id: 3,
    children: [{ label: 'child-title3-1', id: 10, children: [] }]
  }
])
</script>

<style lang="scss" scoped></style>
