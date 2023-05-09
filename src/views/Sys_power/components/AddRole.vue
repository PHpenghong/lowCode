<template>
  <div class="">
    <p-model
      :visible="props.visible"
      :visible-str="props.visibleStr"
      :title="actionsType === 'add' ? '新增角色' : '编辑角色'"
    >
      <template #body>
        <a-form
          ref="formRef"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          :model="formState"
          :rules="rules"
          layout="horizontal"
          label-align="right"
        >
          <a-form-item label="角色名称" name="label">
            <a-input
              v-model:value="formState.label"
              placeholder="请输入"
              :allow-clear="true"
              :maxlength="10"
              style="width: 100%"
            />
          </a-form-item>
        </a-form>
      </template>

      <template #btns>
        <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
        <a-button @click="close">取消</a-button>
      </template>
    </p-model>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  watchEffect,
  defineAsyncComponent,
  PropType,
  defineProps
  // defineEmits
} from 'vue'
import { message } from 'ant-design-vue'
import '@without_end/ph-ui/style/model'
import codeErr from '@/utils/codeErr'
import { add, edit } from '@/api/role'

const PModel = defineAsyncComponent(
  () => import('@without_end/ph-ui/lib/model')
)

const emits = defineEmits(['submitSucc'])
const props = defineProps({
  visible: {
    type: Object,
    default: () => ({})
  },
  visibleStr: {
    type: String,
    default: 'visibleStr'
  },
  actionsType: {
    type: String,
    default: 'add'
  },
  editData: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const formRef = ref<any>(null)

const rules = {
  label: [
    {
      required: true,
      message: '值不能为空'
    }
  ]
}

const formState = reactive<any>({ label: '' })

watchEffect(() => {
  if (props.editData) {
    ;({ label: formState.label } = props.editData)
  }
})

const onSubmit = async () => {
  formRef.value.validate().then(async () => {
    const req = props.actionsType === 'add' ? add : edit
    const res = await req({
      ...formState,
      ...(props.actionsType === 'add' ? {} : { id: props.editData.id })
    })
    if (res) {
      message.success('操作成功')
      close()
      emits('submitSucc')
    } else {
      codeErr(res)
    }
  })
}

const resetFields = () => {
  formRef.value && formRef.value.resetFields()
}
const close = () => {
  Object.keys(formState).forEach((key: string) => {
    formState[key] = ''
  })
  props.visible[props.visibleStr] = false
}

watchEffect(() => {
  if (!props.visible[props.visibleStr]) {
    resetFields()
    close()
  }
})
</script>

<style lang="scss" scoped></style>
