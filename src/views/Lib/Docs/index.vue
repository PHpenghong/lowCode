<template>
  <div class="docs_page">
    <section class="com_menu">
      <article class="com_menu-title">组件菜单</article>
      <ul class="com_menu-ul" @click.stop="selectMenu">
        <li
          v-for="(menu, index) in state.comMenuList"
          :key="menu"
          :class="[
            'com_menu-li',
            'flexClass',
            { 'com_menu-li--select': state.comName === menu }
          ]"
          :data-index="index"
        >
          {{ menu }}
        </li>
      </ul>
    </section>
    <section class="com_body">
      <component :is="components[state.comName]" :key="state.comName" />
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  reactive,
  ref,
  defineAsyncComponent,
  markRaw,
  watchEffect
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface State {
  comName: string
  comMenuList: string[]
}

onMounted(() => {
  init()
})

const route = useRoute()
const router = useRouter()
const state = ref<State>({
  comName: '',
  comMenuList: []
})

const components = reactive<any>({})

const init = () => {
  const modules = import.meta.glob('./components/*/index.vue')
  Object.keys(modules).forEach((key) => {
    const nameMatch = key.match(/^\.\/components\/(.+)\.vue/)
    if (!nameMatch) return
    const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
    let name = indexMatch ? indexMatch[1] : nameMatch[1]
    ;[name] = name.split('/').splice(-1)
    components[name] = markRaw(
      defineAsyncComponent(
        modules[key] as () => Promise<typeof import('*.vue')>
      )
    )
    state.value.comMenuList.push(name)
  })
  if (route.params?.type !== ':type') {
    state.value.comName = route.params.type as string
  } else {
    const name = state.value.comMenuList[0]
    router.push({
      path: `/Lib/Docs/${name}`
    })
    state.value.comName = name
  }
}

watchEffect(() => {
  console.log(state.value.comName)
})

const selectMenu = (e: any) => {
  if (state.value.comMenuList.length === 0) {
    return
  }
  let { target } = e
  while (target.nodeType === 1 && target.tagName !== 'LI') {
    target = target.parentNode
  }
  if (target && target.dataset && target.dataset.index) {
    const name = state.value.comMenuList[parseInt(target.dataset.index, 10)]
    router.push({
      path: `/Lib/Docs/${name}`
    })
    state.value.comName = name
  }
}
</script>

<style lang="scss" scoped>
.docs_page {
  width: 100%;
  height: 100%;
  display: flex;
  grid-gap: 15px;
  .com_menu {
    width: 200px;
    background-color: #ffffff;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    padding: 20px;
    .com_menu-title {
      height: 30px;
      border-bottom: 1px solid #dadce0;
      margin-bottom: 5px;
    }
    .com_menu-ul {
      margin: 0;
      padding: 0;
      .com_menu-li {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 30px;
        cursor: pointer;
        &:hover {
          background-color: #bae7ff;
        }
      }
      .com_menu-li--select {
        background-color: #1890ff !important;
        color: #ffffff !important;
      }
    }
  }
  .com_body {
    flex: 1;
    background-color: #ffffff;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
