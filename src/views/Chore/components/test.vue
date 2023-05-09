<template>
  <div class="">
    <a-form
      ref="formRef"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      :model="formState"
      :rules="rules"
      layout="horizontal"
      label-align="right"
    >
      <a-form-item label="多行文本" name="T3tFQ4">
        <a-textarea
          v-model:value="formState.T3tFQ4"
          placeholder="请输入"
          :allow-clear="true"
          :maxlength="100"
          style="width: 100%"
          :auto-size="{
            minRows: 3,
            maxRows: 6
          }"
        />
      </a-form-item>
      <a-form-item label="树选择" name="iueVHN">
        <a-tree-select
          v-model:value="formState.iueVHN"
          :tree-data="state.iueVHNTreeData"
          name="undefined"
          placeholder="请选择"
          :allow-clear="true"
          :max-tag-count="1"
        />
      </a-form-item>
      <a-form-item label="开关" name="KVQ8Hv">
        <a-switch v-model:checked="formState.KVQ8Hv" />
      </a-form-item>

      <a-form-item>
        <section>
          <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
          <a-button>取消</a-button>
        </section>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
// import { codeErr } from '@/utils/codeErr'
// import { addReq, editReq } from '@/api/req'

const formRef = ref<any>(null)

const rules = {
  T3tFQ4: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  iueVHN: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  KVQ8Hv: [
    {
      required: true,
      message: '值不能为空'
    }
  ]
}

const state = ref<any>({ iueVHNTreeData: [] })
const formState = reactive<any>({ T3tFQ4: '', iueVHN: [], KVQ8Hv: false })

const onSubmit = async () => {
  formRef.value.validate().then(() => {
    // const req = props.actionsType === 'add' ? addReq : editReq
    // const res = await req({...formState,...props.actionsType === 'add' ? {} : {id: props.editData.id}})
    // if (res) {
    message.success('操作成功')

    //
    // } else {
    //  codeErr(res)
    // }
  })
}

// const resetFields = () => {
//  formRef.value && formRef.value.resetFields()
// }
</script>

<style lang="scss" scoped>
:deep .ant-form-item-control-input-content {
  text-align: left;
}
</style>
