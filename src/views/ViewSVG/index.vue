<template>
  <div id="viewSVG">
    <article
      v-for="(item, index) in state.svgNameList"
      :key="index"
      class="svgCard"
    >
      <SvgIcon class="icon" :size="2" :name="item" />
      <span class="label">
        {{ item }}
      </span>
      <span class="copy" @click="doCopy(item)"> 复制 </span>
    </article>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'

interface State {
  svgNameList: string[]
}

export default defineComponent({
  setup() {
    const state = ref<State>({
      svgNameList: []
    })
    onMounted(() => {
      const req: { [key: string]: any } = import.meta.globEager(
        '@/icons/svg/*.svg'
      )
      requireAll(req)
    })
    const doCopy = (item: string) => {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', item)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      document.body.removeChild(input)
      message.success('复制成功！')
    }
    const requireAll = (requireContext: any) => {
      state.value.svgNameList = Object.keys(requireContext).map(
        (item: string) => item.slice(item.lastIndexOf('/') + 1, item.length - 4)
      )
    }
    return {
      state,
      doCopy,
      requireAll
    }
  }
  // data() {
  //   return {
  //     svgNameList: []
  //   }
  // },
  // created() {
  //   const req: { [key: string]: any } = import.meta.globEager(
  //     '@/icons/svg/*.svg'
  //   )
  //   console.log(req)
  // },
  // methods: {

  // }
})
</script>

<style lang="scss" scoped>
#viewSVG {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: #efeeee;
  .svgCard {
    width: 100px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #929191;
    margin: 5px;
    overflow: hidden;
    .label {
      width: 100%;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .copy {
      color: #3c93fd;
      cursor: pointer;
    }
  }
}
</style>
