<template>
  <div class="AntForm">
    <a-form
      ref="formRef"
      :model="form"
      :name="name"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :layout="layout"
      :rules="rules"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        v-for="item in formItemArr"
        :key="item.name"
        class="formItemClass"
        :name="item.name"
        :rules="item?.rules || []"
      >
        <template v-if="item.name" #label>
          <span :style="{ color: labelColor || '#666666' }">{{
            item.label
          }}</span>
        </template>
        <section v-if="item.name" :style="{ color: textColor || '#333333' }">
          <slot v-if="item.slot" :name="item.slotName" :item="form"></slot>
          <section v-else>
            <article
              v-if="item.itemType === 'view'"
              class="textOmit"
              :title="form[item.name] + ''"
            >
              {{ form[item.name] }}
            </article>
            <a-input
              v-else-if="item.itemType === 'input'"
              v-model:value="form[item.name]"
              :style="{ width: item.width }"
              allow-clear
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            />
            <section
              v-else-if="item.itemType === 'select' && item.selectOption"
              style="display: flex"
            >
              <a-select
                ref="select"
                v-model:value="form[item.name]"
                :disabled="item.disabled"
                allow-clear
                :placeholder="item.placeholder"
                :style="{ flex: '1', width: item.width }"
              >
                <a-select-option
                  v-for="f in item.selectOption.options"
                  :key="f[item.selectOption.key]"
                  :value="f[item.selectOption.key]"
                  >{{ f[item.selectOption.label] }}</a-select-option
                >
              </a-select>
            </section>
            <section
              v-else-if="item.itemType === 'selects' && item.selectOption"
              style="display: flex"
            >
              <a-select
                ref="selects"
                v-model:value="form[item.name]"
                :disabled="item.disabled"
                mode="multiple"
                allow-clear
                :placeholder="item.placeholder"
                :style="{ flex: '1', width: item.width }"
              >
                <a-select-option
                  v-for="f in item.selectOption.options"
                  :key="f[item.selectOption.key]"
                  :value="f[item.selectOption.key]"
                  >{{ f[item.selectOption.label] }}</a-select-option
                >
              </a-select>
            </section>
            <a-textarea
              v-else-if="item.itemType === 'textarea'"
              v-model:value="form[item.name]"
              :style="{ width: item.width }"
              allow-clear
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              :rows="4"
            />
          </section>
        </section>
      </a-form-item>
      <a-form-item class="formItemClass">
        <slot name="formBtns" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, getCurrentInstance, ref } from 'vue'

interface Options {
  [key: string | number]: string | number | boolean | symbol
}

interface Select {
  key: string
  label: string
  options: Options[]
}

interface FormItem {
  label: string
  name: string
  slot?: boolean
  slotName?: string
  itemType: string // input select
  placeholder?: string
  selectOption?: Select
  rules?: any
  disabled?: boolean
  width?: string
}

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    },
    form: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    rules: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    formItemArr: {
      /** { name: 'o_system', label: '操作系统', itemType: 'select', slot: false, selectOption: {}, placeholder: '', rules: [] },
       * itemType : view input select selects
       * selectOption : { key: 'value', label: 'label', options: [{ value: 1, label: '一级' }] }
       */
      type: Array as PropType<FormItem[]>,
      default: () => []
    },
    labelCol: {
      // label 布局
      type: Object as PropType<any>,
      default: () => ({ span: 8 })
    },
    wrapperCol: {
      // wrapper 布局
      type: Object,
      default: () => ({ span: 16 })
    },
    layout: {
      // 表单布局  horizontal | vertical | inline
      type: String,
      default: 'horizontal'
    },
    labelColor: {
      type: String,
      default: '#666666'
    },
    textColor: {
      type: String,
      default: '#333333'
    }
  },
  setup(props, emit) {
    const refCurr = getCurrentInstance()
    const refs: any = ref()
    const dealWithRefs = () => {
      if (!refs.value || Object.keys(refs.value).length === 0) {
        refs.value = refCurr?.proxy?.$refs
      }
      return refs.value
    }
    const onFinish = (values: any) => {
      console.log('Success:', values)
      emit.emit('onFinish')
    }
    const onFinishFailed = (err: any) => {
      console.log('Failed', err)
      emit.emit('onFinishFailed')
    }
    const resetFields = () => {
      dealWithRefs() && dealWithRefs().formRef.resetFields()
    }
    const validate = async () => {
      dealWithRefs()
        .formRef.validate()
        .then(() => {
          emit.emit('submitForm')
        })
        .catch((err: any) => {
          console.log(`fail:${err}`)
        })
    }
    return {
      onFinishFailed,
      onFinish,
      resetFields,
      validate
    }
  }
})
</script>

<style lang="scss" scoped>
.AntForm {
  .formItemClass {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
