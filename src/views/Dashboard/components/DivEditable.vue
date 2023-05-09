<template>
  <div
    ref="editor"
    class="input-box"
    contenteditable="true"
    @input="inputChange"
    @blur="inputBlur"
    @keyup.enter.exact="submit"
    @keydown.enter.exact="handleKeydown"
    @focus="inputFocus"
  ></div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch, nextTick } from 'vue'

export default defineComponent({
  name: 'InputBox',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup(props, emit) {
    const timer: any = ref()
    const refCurr = getCurrentInstance()
    const refs = ref()
    const state = ref({
      isBlur: true,
      selection: null
    })
    watch(
      () => props.value,
      (newVal: string) => {
        if (state.value.isBlur) {
          dealWithRefs().editor.innerHTML = newVal
        }
      }
    )
    const dealWithRefs = () => {
      if (!refs.value || Object.keys(refs.value).length === 0) {
        refs.value = refCurr?.proxy?.$refs
      }
      return refs.value
    }
    const debounce = (fn: any, wait: any = 0) => {
      if (timer.value) {
        clearTimeout(timer.value)
        timer.value = null
      }
      timer.value = setTimeout(() => {
        fn()
        clearTimeout(timer.value)
        timer.value = null
      }, wait)
    }
    const inputChange = () => {
      debounce(inputText)
    }
    const inputText = (event: any) => {
      const refsEdit = dealWithRefs()
      emit.emit('inputText', refsEdit.editor.innerHTML)
      let range: any = {}
      if (window.getSelection) {
        const selectRange: any = window.getSelection() // 获取当前光标
        range = selectRange.getRangeAt(0)
      }
      // const position = range.getBoundingClientRect() // 获取当前光标的位置
      emit.emit('inputFunc', range, event)
    }
    const insertContent = (
      value: any,
      id = '',
      type = '',
      text = '',
      area: any
    ) => {
      dealWithRefs().editor.focus()
      restoreSelection(area || state.value.selection) // 还原失焦前的光标位置
      let range: any = {}
      if (window.getSelection) {
        const selectRange: any = window.getSelection() // 获取当前光标
        range = selectRange.getRangeAt(0)
      }
      range.collapse(false) // 光标移动到最后
      const node = range.createContextualFragment(value)
      const child: any = node.lastChild
      range.insertNode(node)
      // 将光标的起始位置设置在当前插入的元素后面
      if (child) {
        range.setEndAfter(child)
        range.setStartAfter(child)
      }
      let sel: any = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)

      nextTick(() => {
        const re = new RegExp(
          `${type === '|' ? '\\|' : type}${text}<a name="at"`,
          'g'
        )
        if (re.test(dealWithRefs().editor.innerHTML)) {
          // 使用正则替换，将已经输入的@替换掉
          // 如果直接赋值修改innerHTML，则光标默认会回到开头。因此需要额外处理光标
          dealWithRefs().editor.innerHTML =
            dealWithRefs().editor.innerHTML.replace(re, `${text}<a`)
          const el = document.getElementById(id)
          range = document.createRange()
          sel = window.getSelection()
          // 将光标重新定位到自定义的a标签后面
          range.setStartAfter(el)
          range.setEndAfter(el)

          sel.removeAllRanges()
          sel.addRange(range)
        }
      })
      emit.emit('input', dealWithRefs().editor.innerHTML)
    }
    // 聚焦
    const inputFocus = () => {
      state.value.isBlur = false
      emit.emit('inputFocus')
    }
    // 失焦
    const inputBlur = (event: any) => {
      state.value.isBlur = true
      state.value.selection = saveSelection()
      emit.emit('blurFunc', event)
    }
    // 失焦时保存光标
    const saveSelection = () => {
      if (!window.getSelection) {
        return null
      }
      const sel: any = window.getSelection()
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0)
      }
      return null
    }
    // 恢复光标
    const restoreSelection = (range: any) => {
      if (range) {
        const sel: any = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
    const submit = () => {
      emit.emit('enterEvent')
      // dealWithRefs().editor.blur()
    }
    const handleKeydown = (event: any) => {
      event.preventDefault()
      return false
    }
    const handleBlur = () => {
      dealWithRefs().editor.blur()
    }
    return {
      state,
      inputText,
      inputFocus,
      inputBlur,
      submit,
      handleKeydown,
      insertContent,
      handleBlur,
      inputChange
    }
  }
})
</script>

<style lang="scss" scoped>
.input-box {
  width: 400px;
  height: 250px;
  border: 1px solid #6e6e6e;
  outline: none; /* 隐藏聚焦时外边框 */
  /* padding: 10px; */
  white-space: pre-wrap;
  overflow: hidden;
  overflow-y: auto;
  word-break: break-all;
}
</style>
<style>
a {
  color: #6878f3;
  text-decoration: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.2s ease;
}
</style>
