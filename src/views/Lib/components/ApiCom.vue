<template>
  <div class="api_page">
    <section
      v-for="(item, index) in props.apiData"
      :key="index"
      class="api_items"
    >
      <section>
        <article :class="{ api_title: true, 'item-color': item.light }">
          {{ item.title }}
        </article>
        <article class="api_text">{{ item.text }}</article>
      </section>
      <section>
        <component :is="components[item.type]" :data-list="item.grid" />
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, markRaw, reactive } from 'vue'
import { ApiData } from '../types/interface'

const props = withDefaults(
  defineProps<{
    apiData: ApiData[]
  }>(),
  {
    apiData: () => []
  }
)

const components = reactive<any>({})

onMounted(() => {
  init()
})

const init = () => {
  const modules = import.meta.glob('./**/**.vue')
  Object.keys(modules).forEach((key) => {
    const nameMatch = key.match(/^\.\/(.+)\.vue/)
    if (!nameMatch) return
    const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
    let name = indexMatch ? indexMatch[1] : nameMatch[1]
    ;[name] = name.split('/').splice(-1)
    components[name] = markRaw(
      defineAsyncComponent(
        modules[key] as () => Promise<typeof import('*.vue')>
      )
    )
  })
}
</script>

<style lang="scss" scoped>
.api_page {
  .api_items {
    margin-bottom: 20px;
    .item-color {
      color: #c41d7f !important;
    }
    .api_title {
      color: #262626;
      text-align: left;
      font-size: 18px;
      margin: 10px;
    }
    .api_text {
      color: #262626;
      font-size: 14px;
      margin: 10px;
    }
  }
}
</style>
