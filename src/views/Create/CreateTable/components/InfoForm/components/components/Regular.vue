<template>
  <div class="regular_rule">
    <section class="btn_sec">
      <a-button v-show="!isEdit" @click="add">新增</a-button>
    </section>
    <section :class="[props.rules.length > 0 ? 'view_sec' : '']">
      <article
        v-for="item in props.rules"
        :key="item.id"
        class="rule_art textOmit"
      >
        <article class="msg_art">
          {{ item.message }}
        </article>
        <article class="del_icon flexClass">
          <SvgIcon :size="1.3" name="delete" @click="del(item.id)" />
        </article>
      </article>
    </section>
    <section v-show="isEdit" :class="[isEdit ? 'edit_sec' : '']">
      <a-form :model="rules">
        <a-form-item label="是否必填">
          <a-checkbox v-model:checked="rules.required">是否必填</a-checkbox>
        </a-form-item>
        <a-form-item label="自定义校验">
          <a-checkbox v-model:checked="rules.isCuster"
            >是否自定义校验</a-checkbox
          >
        </a-form-item>
        <a-form-item label="校验文案">
          <a-input v-model:value="rules.message" />
        </a-form-item>
        <a-form-item label="校验正则">
          <a-input v-model:value="rules.pattern" />
        </a-form-item>
        <a-form-item label="最小长度">
          <a-input v-model:value="rules.min" :max-length="25" />
        </a-form-item>
        <a-form-item label="最大长度">
          <a-input v-model:value="rules.max" :max-length="25" />
        </a-form-item>
        <a-form-item label="校验触发">
          <a-radio-group v-model:value="rules.trigger">
            <a-radio value="blur">失焦</a-radio>
            <a-radio value="change">修改</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">确定</a-button>
          <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, defineProps, defineEmits, ref } from 'vue'
import { getCode } from '@/utils/random'
/**
 * 是否自定义验证 isCuster
 * 是否必填 required
 * 正则    pattern
 * 最大长度  max
 * 最小长度	 min
 * 校验文案 message
 * 校验触发 trigger
 * 必选时，空格err     whitespace
 */

interface Rules {
  id: string
  isCuster: boolean
  required: boolean
  whitespace?: boolean
  pattern: any
  max: number | null
  min: number | null
  message: string
  trigger: string
}

const emits = defineEmits(['update:rules'])
const props = defineProps({
  rules: {
    type: Array as PropType<Rules[]>,
    default: () => []
  }
})

const isEdit = ref<boolean>(false)
const rules = reactive<Rules>({
  id: getCode(),
  isCuster: false,
  required: false,
  pattern: '',
  max: null,
  min: null,
  message: '',
  trigger: 'blur'
})

const onSubmit = () => {
  if (rules.pattern) {
    rules.pattern = turnReg(rules.pattern)
  }
  emits('update:rules', [...props.rules, ...[rules]])
  isEdit.value = false
}

const turnReg = (str: string) => new RegExp(`${str}`)

const reset = () => {
  rules.id = getCode()
  rules.isCuster = false
  rules.required = false
  rules.pattern = ''
  rules.max = null
  rules.min = null
  rules.message = ''
  rules.trigger = 'blur'
}

const add = () => {
  isEdit.value = true
  reset()
}

const del = (id: string) => {
  emits(
    'update:rules',
    props.rules.filter((i: Rules) => i.id !== id)
  )
}

const cancel = () => {
  isEdit.value = false
  reset()
}
</script>

<style lang="scss" scoped>
.view_sec {
  border: 1px solid #efefef;
}
.rule_art {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #efefef;
  height: 20px;
  margin: 5px;
  .msg_art {
    flex: 1;
  }
  .del_icon {
    width: 20px;
    cursor: pointer;
  }
}
.edit_sec {
}
</style>
