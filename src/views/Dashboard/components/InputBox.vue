<template>
  <div>
    <DivEditable
      ref="inputBox"
      v-model="state.inputContent"
      @enterEvent="enterEvent"
      @inputText="changeInput"
      @inputFunc="inputFunc"
    />
    <!-- <input v-model="state.inputContent" type="text" /> -->
    <!-- <div @click="changeValue">父组件修改子组件的值</div> -->
    <!-- <AtPop
      v-if="state.isShowAt"
      :list-data="state.listData"
      @onSelect="onSelect"
    ></AtPop> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'
import DivEditable from './DivEditable.vue'
// import AtPop from './AtPop.vue'

interface State {
  inputContent: string
  // model1: string
  // isShowAt: boolean
  listData: any[]
  tagColor: any
  atIndex: number
}

export default defineComponent({
  components: {
    DivEditable
    // AtPop
  },
  setup() {
    const refCurr = getCurrentInstance()
    const refs = ref()
    const state = ref<State>({
      inputContent: '',
      // model1: '',
      // isShowAt: false, // 是否显示@弹窗
      listData: [
        { name: '张三', userName: 'zhangs' },
        { name: '李四', userName: 'lis' },
        { name: '王五', userName: 'wangw' },
        { name: '周六', userName: 'zhoul' }
      ],
      tagColor: { '&&': 'red', '==': '#1890FF', '|': '#f36c0d' },
      atIndex: 0
    })
    const dealWithRefs = () => {
      if (!refs.value || Object.keys(refs.value).length === 0) {
        refs.value = refCurr?.proxy?.$refs
      }
      return refs.value
    }
    const changeInput = (text: string) => {
      state.value.inputContent = text
    }
    const enterEvent = () => {
      const text = 'test'
      const htmlStr = '=='
      dealWithRefs().inputBox.handleBlur()
      state.value.atIndex++
      const tag = `${text}<a name="at" tabindex="-1" id="${state.value.atIndex}" contenteditable="false" style="color: ${state.value.tagColor[htmlStr]};font-weight: bold;" href="javascript:void(0)">${htmlStr}</a>`
      dealWithRefs().inputBox.insertContent(
        tag,
        state.value.atIndex,
        'te',
        text,
        null
      )
    }
    // 输入框输入时回调函数
    const inputFunc = (area: any) => {
      // const strSlice = state.value.inputContent.slice(
      //   state.value.inputContent.lastIndexOf('</a>') + 4
      // )
      // console.log(strSlice)
      // console.log(area.endOffset)

      // console.log(strSlice.slice(area.endOffset - 2, 2))

      const input = state.value.inputContent.replace(/&amp;&amp;/g, '&&')
      if (input && input.slice(-2) === '&&') {
        insertKey('&&', '', area)
      } else if (input && input.slice(-2) === '==') {
        insertKey('==', '', area)
      } else if (input && input.slice(-1) === '|') {
        // state.value.isShowKey = false
        insertKey('|', '', area)
      }
    }
    // 插入 && == | 等关键字并变色
    const insertKey = (htmlStr: string, text = '', area: any) => {
      dealWithRefs().inputBox.handleBlur()
      state.value.atIndex++
      const tag = `${text}<a name="at" tabindex="-1" id="${state.value.atIndex}" contenteditable="false" style="color: ${state.value.tagColor[htmlStr]};font-weight: bold;" href="javascript:void(0)">${htmlStr}</a>`
      dealWithRefs().inputBox.insertContent(
        tag,
        state.value.atIndex,
        htmlStr === '&&' ? '&amp;&amp;' : htmlStr,
        text,
        area
      )
    }

    // 选择成员时插入数据，并关闭弹窗
    // const onSelect = (item: any) => {
    //   state.value.atIndex++
    //   // 使用a标签表示@的成员
    //   const at = `<a name="at" value="${item.userName}" tabindex="-1" id="${state.value.atIndex}" contenteditable="false" href="javascript:void(0)">@${item.name}</a>&#x200B;`
    //   dealWithRefs().inputBox.insertContent(at, state.value.atIndex)
    //   state.value.isShowAt = false
    // }
    // const blurFunc = () => {
    //   // 失焦时延时关闭弹窗，避免还未拿到数据
    //   if (state.value.isShowAt) {
    //     setTimeout(() => {
    //       state.value.isShowAt = false
    //     }, 500)
    //   }
    // }
    // const changeValue = () => {
    //   state.value.inputContent = state.value.model1
    // }
    return {
      state,
      // changeValue,
      // blurFunc,
      inputFunc,
      insertKey,
      // onSelect,
      changeInput,
      enterEvent
    }
  }
})
</script>

<style lang="scss" scoped></style>
