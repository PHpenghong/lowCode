<template>
  <div class="options_div">
    <LineTitle>treeNode Key</LineTitle>
    <section class="body_sec">
      <section class="field_item">
        <article class="field_label">Value</article>
        <article class="field_Value">
          <a-input v-model:value="fieldNames.value" placeholder="请输入Value" />
        </article>
      </section>
      <section class="field_item">
        <article class="field_label">Label</article>
        <article class="field_Value">
          <a-input v-model:value="fieldNames.label" placeholder="请输入Label" />
        </article>
      </section>
      <section class="field_item">
        <article class="field_label">Children</article>
        <article class="field_Value">
          <a-input
            v-model:value="fieldNames.children"
            placeholder="请输入Children"
          />
        </article>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const LineTitle = defineAsyncComponent(() => import('./LineTitle.vue'))

withDefaults(
  defineProps<{
    fieldNames: {
      children: string
      label: string
      value: string
    }
  }>(),
  {
    fieldNames: () => ({ children: 'children', label: 'title', value: 'value' })
  }
)
</script>

<style lang="scss" scoped>
.options_div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .body_sec {
    background-color: #f6f7ff;
    padding: 5px;
    .field_item {
      display: flex;
      align-items: center;
      margin: 5px;
      padding: 5px;
      .field_label {
        width: 100px;
        font-weight: bold;
        font-size: 15px;
      }
    }
  }
}
</style>
