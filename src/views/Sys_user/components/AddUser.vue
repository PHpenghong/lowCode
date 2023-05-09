<template>
  <div class="">
    <p-model
      :visible="props.visible"
      :visible-str="props.visibleStr"
      :title="actionsType === 'add' ? '新增User' : '编辑User'"
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
          <a-form-item label="昵称" name="name">
            <a-input
              v-model:value="formState.name"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="邮箱" name="email">
            <a-input
              v-model:value="formState.email"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="手机" name="phone">
            <a-input
              v-model:value="formState.phone"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="状态" name="disable">
            <a-select
              v-model:value="formState.disable"
              placeholder="请选择"
              :allow-clear="true"
              :max-tag-count="1"
              style="width: 100%"
            >
              <a-select-option
                v-for="item in state.disableOptions"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item label="角色" name="role_id">
            <a-select
              v-model:value="formState.role_id"
              placeholder="请选择"
              :allow-clear="true"
              :max-tag-count="1"
              style="width: 100%"
            >
              <a-select-option
                v-for="item in roleList"
                :key="item.id"
                :value="item.id"
                >{{ item.label }}</a-select-option
              >
            </a-select>
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
  defineProps,
  defineEmits
} from 'vue'
import { message } from 'ant-design-vue'
// import { codeErr } from '@/utils/codeErr'
// import { reqName } from '@/api/reqFile/index'
interface Role {
  id: string | number
  label: string
}

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
  },
  roleList: {
    type: Array as PropType<Role[]>,
    default: () => []
  }
})

const formRef = ref<any>(null)

const rules = {
  name: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  email: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  phone: [
    {
      pattern:
        /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
      message: '请输入正确的手机号'
    }
  ],
  disable: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  role_id: [
    {
      required: true,
      message: '值不能为空'
    }
  ]
}

const state = reactive<any>({
  disableOptions: [
    { value: 0, label: '启用' },
    { value: 1, label: '禁用' }
  ],
  role_idOptions: [
    { value: 0, label: '超级管理员' },
    { value: 1, label: '管理员' },
    { value: 2, label: '普通用户' }
  ]
})
const formState = reactive<any>({
  name: '',
  email: '',
  phone: '',
  disable: '',
  role_id: ''
})
watchEffect(() => {
  if (props.editData) {
    ;({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      disable: formState.disable,
      role_id: formState.role_id
    } = props.editData)
  }
})

const onSubmit = () => {
  formRef.value.validate().then(() => {
    // reqName.then((res: any) => {
    //   if(res.code == 0) {
    message.success('操作成功')
    emits('submitSucc')
    //   } else{
    //      codeErr(res)
    //   }
    // })
    // .catch((err: any) => {
    //  codeErr(err)
    // })
  })
}
const close = () => {
  Object.keys(formState).forEach((key: string) => {
    formState[key] = ''
  })
  props.visible[props.visibleStr] = false
}
const resetFields = () => {
  formRef.value && formRef.value.resetFields()
}
watchEffect(() => {
  if (!props.visible[props.visibleStr]) {
    resetFields()
    close()
  }
})
</script>

<style lang="scss" scoped></style>
