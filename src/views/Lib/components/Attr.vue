<template>
  <div class="grid_com">
    <section class="grid_border">
      <section class="grid_title">
        <article class="grid_item item-attr">属性属性</article>
        <article class="grid_item item-explain textOmit">说明</article>
        <article class="grid_item item-type">类型</article>
        <article class="grid_item item-default">默认值</article>
        <article class="grid_item item-version">版本</article>
      </section>
      <section
        v-for="(item, index) in props.dataList"
        :key="index"
        class="grid_attr"
      >
        <article class="grid_item item-attr">{{ item.label }}</article>
        <article class="grid_item item-explain">
          {{ item.explain }}
        </article>
        <article class="grid_item item-type item-color">
          {{ item.type }}
        </article>
        <article class="grid_item item-default">{{ item.default }}</article>
        <article class="grid_item item-version">{{ item.version }}</article>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
// import { withDefaults, defineProps } from 'vue'
import { GridAttr } from '../types/interface'

interface PropsInter {
  dataList: GridAttr[]
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
    .grid_attr {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .grid_item {
        text-align: left;
      }
      .item-attr {
        width: 200px;
      }
      .item-explain {
        flex: 1;
      }
      .item-type {
        width: 200px;
      }
      .item-default {
        width: 150px;
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
    .grid_attr {
      min-height: 40px;
      background-color: #ffffff;
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>
