<template>
  <div class="preview_com">
    <section
      v-for="(item, index) in props.comData"
      :key="index"
      class="preview_item"
    >
      <section class="com_title">
        {{ item.title }}
      </section>
      <section class="preview_body">
        <ViewCom :name="item.name" :file-name="item.fileName" />
      </section>
      <section class="preview_code">
        <ViewCode :content="item.content" />
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { ComData } from '@/views/Lib/types/interface'

const ViewCom = defineAsyncComponent(() => import('./ViewCom.vue'))
const ViewCode = defineAsyncComponent(() => import('./ViewCode.vue'))

const props = withDefaults(
  defineProps<{
    comData: ComData[]
  }>(),
  {
    comData: () => []
  }
)
</script>

<style lang="scss" scoped>
.preview_com {
  .preview_item {
    margin-bottom: 20px;
    .com_title {
      color: #000000d9;
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      text-align: left;
      margin: 0 0 10px 20px;
    }
    .preview_body {
      border: 1px solid #f0f0f0;
      padding: 30px;
    }
    .preview_code {
    }
  }
}
</style>
