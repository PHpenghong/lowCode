<template>
  <div class="view_com">
    <component :is="component" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, markRaw, onMounted, ref } from 'vue'
// import CustomRender from '@/views/Lib/Docs/CustomRender';

const props = withDefaults(
  defineProps<{
    name: string
    fileName: string
  }>(),
  {
    name: '',
    fileName: 'index'
  }
)

const component = ref<any>(null)

onMounted(() => {
  if (props.name) {
    component.value = markRaw(
      defineAsyncComponent(
        () =>
          import(
            `../../Docs/components/${props.name}/ViewCode/${props.fileName}.vue`
          )
      )
    )
  }
})
</script>

<style lang="scss" scoped>
.view_com {
  text-align: left;
}
</style>
