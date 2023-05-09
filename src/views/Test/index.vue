<template>
  <div class="testTree">
    <section class="child_sec" />
    <section class="child_sec">
      <Tree :nodes="treeData" direction="horizontal" />
    </section>
    <section class="child_sec">
      <Tree :nodes="treeData" direction="vertical" />
    </section>
    <section class="child_sec" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'

interface TreeObj {
  id: string | number
  label: string
  children: TreeObj[]
}

const Tree = defineAsyncComponent(() => import('./components/Tree.vue'))

const treeData = reactive<TreeObj[]>([
  {
    id: '1',
    label: 'label1',
    children: [
      {
        id: '4',
        label: 'label4',
        children: []
      },
      {
        id: '5',
        label: 'label5',
        children: []
      }
    ]
  },
  {
    id: '2',
    label: 'label2',
    children: [
      {
        id: '6',
        label: 'label6',
        children: []
      },
      {
        id: '7',
        label: 'label7',
        children: []
      }
    ]
  },
  {
    id: '3',
    label: 'label3',
    children: [
      {
        id: '6',
        label: 'label6',
        children: []
      },
      {
        id: '7',
        label: 'label7',
        children: []
      },
      {
        id: '6',
        label: 'label6',
        children: []
      },
      {
        id: '7',
        label: 'label7',
        children: []
      },
      {
        id: '6',
        label: 'label6',
        children: []
      },
      {
        id: '7',
        label: 'label7',
        children: []
      },
      {
        id: '6',
        label: 'label6',
        children: []
      },
      {
        id: '7',
        label: 'label7',
        children: []
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.testTree {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .child_sec {
    width: 50%;
    height: 50%;
    overflow: auto;
  }
}
</style>
