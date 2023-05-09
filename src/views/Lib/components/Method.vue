<template>
  <div class="grid_com">
    <section class="grid_border">
      <section class="grid_title">
        <article class="grid_item item-method">方法名称</article>
        <article class="grid_item item-explain textOmit">说明</article>
        <article class="grid_item item-version">版本</article>
      </section>
      <section
        v-for="(item, index) in props.dataList"
        :key="index"
        class="grid_method"
      >
        <article class="grid_item item-method">{{ item.label }}</article>
        <article class="grid_item item-explain">
          {{ item.explain }}
        </article>
        <article class="grid_item item-version">{{ item.version }}</article>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
// import { withDefaults, defineProps } from 'vue'
import { GridMethod } from '../types/interface'

interface PropsInter {
  dataList: GridMethod[]
}

const props = withDefaults(defineProps<PropsInter>(), {
  dataList: () => []
})
</script>

<style lang="scss" scoped>
.grid_com {
  width: 100%;
  .grid_border {
    width: 100%;
    border: 1px solid #f0f0f0;
    .grid_title,
    .grid_method {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .grid_item {
        text-align: left;
      }
      .item-method {
        width: 200px;
      }
      .item-explain {
        flex: 1;
      }
      .item-callback {
        width: 300px;
      }
      .item-version {
        width: 100px;
      }
      .item-color {
        color: #c41d7f;
      }
    }
    .grid_title {
      height: 40px;
      background-color: #fafafa;
      border-bottom: 1px solid #f0f0f0;
    }
    .grid_method {
      min-height: 40px;
      padding: 10px;
      background-color: #ffffff;
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>
