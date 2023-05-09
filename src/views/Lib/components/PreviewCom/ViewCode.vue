<template>
  <div class="pre_code">
    <span v-if="showCode" class="copy">
      <SvgIcon class="icon_copy" name="copy" @click="copyCode" />&nbsp;
      <SvgIcon
        class="icon_copy"
        :name="showCode ? 'code-open' : 'code-close'"
        @click="showOrhideCode"
      />
    </span>
    <transition name="slide-fade">
      <pre v-if="showCode" v-highlight class="language-html">
        <code>{{ codeStr }}</code>
      </pre>
    </transition>
    <div class="showCode" @click="showOrhideCode">
      <span>{{ showCode ? '隐藏代码' : '显示代码' }}</span>
      <SvgIcon
        class="caret_icon"
        :name="showCode ? 'caret-up' : 'caret-down'"
      />
    </div>
    <textarea id="inputCopy" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'

const props = withDefaults(
  defineProps<{
    content: string
  }>(),
  {
    content: ''
  }
)

onMounted(() => {
  viewCode()
})

const codeStr = ref<string>('')
const showCode = ref(false)
const border = ref('1px solid rgba(0,0,0,.06)')

const showOrhideCode = () => {
  showCode.value = !showCode.value
  if (showCode.value) {
    border.value = '0'
  } else {
    border.value = '1px solid rgba(0,0,0,.06)'
  }
}

const viewCode = async () => {
  codeStr.value = props.content
  // codeStr.value =
  //   import.meta.env.MODE === 'development'
  //     ? (
  //         await import(
  //           /* @vite-ignore */ `../../views/Lib/CodeView/${props.name}/${props.fileName}.vue?raw`
  //         )
  //       ).default
  //     : await fetch(
  //         `../../views/Lib/CodeView/${props.name}/${props.fileName}.vue`
  //       ).then((res) => res.text())
}

const copyCode = () => {
  const input: any = document.getElementById('inputCopy')
  input.value = codeStr.value
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    message.success('复制成功！')
  }
}
</script>

<style lang="scss" scoped>
#inputCopy {
  opacity: 0;
  border: 0;
  outline: none;
  height: 0;
  position: fixed;
  z-index: -99999999;
}
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0.5;
}
.pre_code {
  border: 1px solid #f0f0f0;
  .language-html {
    text-align: left;
    padding: 0;
    margin: 0;
  }
  .copy {
    cursor: pointer;
    .icon_copy {
      color: #b7b3b3;
      &:hover {
        color: #000;
        transform: scale(1.2);
      }
    }
  }
  .showCode {
    width: 100%;
    // line-height: 10px;
    font-size: 14px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;
    box-shadow: 0px 16px 15px -16px rgb(0 0 0 / 10%);
    color: #505050;
    cursor: pointer;
    .caret_icon {
      margin-left: 10px;
      &:hover {
        transform: scale(1.2);
      }
    }
    &:hover {
      background: #f9f9f9;
      color: #0e80eb;
      .caret_icon {
        transform: scale(1.2);
      }
    }
  }
  &:hover {
    box-shadow: 0px 16px 15px -16px rgb(0 0 0 / 10%);
  }
}
</style>
