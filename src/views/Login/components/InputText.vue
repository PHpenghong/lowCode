<template>
  <div class="input-component" :style="{ margin: margin || '40px 0' }">
    <section :class="['inputSec', state.isFocus ? 'focusStyle' : '']">
      <svg-icon class="icons" :name="icon" />
      <input
        v-model="inputVal"
        :type="state.isHide ? inputType : 'text'"
        class="input"
        :placeholder="placeholder"
        autocomplete="new-password"
        @focus="state.isFocus = true"
        @blur="state.isFocus = false"
        @keyup.enter="login"
      />
      <svg-icon
        v-if="inputType === 'password'"
        class="icons hideIcon"
        :name="state.isHide ? 'hide' : 'show'"
        @click="state.isHide = !state.isHide"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    margin: {
      type: String,
      default: '40px 0'
    }
  },
  setup(props, content) {
    const state = ref({
      isHide: true,
      isFocus: false
    })
    const inputType = computed(() =>
      props.type === 'password' ? 'password' : 'text'
    )
    const inputVal = computed({
      get() {
        return props.value
      },
      set(value) {
        content.emit('update:value', value)
      }
    })
    const login = () => {
      // console.log('in----login===')
    }
    return {
      state,
      inputVal,
      inputType,
      login
    }
  }
})
</script>

<style lang="scss" scoped>
.input-component {
  width: 100%;
  .focusStyle {
    border-bottom-color: #0a96de !important;
  }
  .inputSec {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e5e7;
    .hideIcon {
      cursor: pointer;
    }
    .icons {
      // position: absolute;
      font-size: 18px;
      color: #999999;
    }
    .input {
      width: 100%;
      padding: 14px 24px 14px 24px;
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 16px;
      letter-spacing: 0.1em;
      color: #666666;
      // border-bottom: 1px solid #e2e5e7;
      transition: border-color 0.2s linear;
      // &:focus {
      //     border-bottom-color: #0a96de;
      // }
      &::placeholder {
        color: #999999;
      }
    }
  }
}
</style>
