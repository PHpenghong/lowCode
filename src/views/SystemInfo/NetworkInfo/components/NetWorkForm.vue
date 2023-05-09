<template>
  <div class="NetWorkForm">
    <a-spin :spinning="state.spinning">
      <a-form
        ref="formRef"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :model="state.formState"
        :rules="rules"
        layout="horizontal"
        label-align="right"
      >
        <a-form-item name="ip">
          <template #label>
            <span class="info_title">IP</span>
          </template>
          <a-input
            v-if="state.isEdit"
            v-model:value="state.formState.ip"
            placeholder="请输入IP"
            :allow-clear="true"
            style="width: 100%"
          />
          <span v-else class="info_text">{{ state.networkInfo.ip }}</span>
        </a-form-item>
        <a-form-item name="netmask">
          <template #label>
            <span class="info_title">子网掩码</span>
          </template>
          <a-input
            v-if="state.isEdit"
            v-model:value="state.formState.netmask"
            placeholder="请输入子网掩码"
            :allow-clear="true"
            style="width: 100%"
          />
          <span v-else class="info_text">{{ state.networkInfo.netmask }}</span>
        </a-form-item>
        <a-form-item name="gateway">
          <template #label>
            <span class="info_title">网关</span>
          </template>
          <a-input
            v-if="state.isEdit"
            v-model:value="state.formState.gateway"
            placeholder="请输入网关"
            :allow-clear="true"
            style="width: 100%"
          />
          <span v-else class="info_text">{{ state.networkInfo.gateway }}</span>
        </a-form-item>
        <a-form-item name="dns">
          <template #label>
            <span class="info_title">DNS服务器</span>
          </template>
          <a-input
            v-if="state.isEdit"
            v-model:value="state.formState.dns"
            placeholder="请输入DNS服务器，多个用,(英文逗号)隔开"
            :allow-clear="true"
            dffdf
            style="width: 100%"
          />
          <span v-else class="info_text">{{ state.networkInfo.dns }}</span>
        </a-form-item>
      </a-form>
      <section>
        <a-button v-show="!state.isEdit" type="primary" @click="edit"
          >编辑</a-button
        >
        <a-button v-show="state.isEdit" type="primary" @click="onSubmit"
          >保存</a-button
        >&nbsp;
        <a-button v-show="state.isEdit" @click="cancel">取消</a-button>
      </section>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { getNet, setNet } from '@/api/bgConf'
import { clone } from '@/utils/tools'

const formRef = ref<any>(null)

const state = ref<any>({
  isEdit: false,
  pattern:
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  networkInfo: { ip: '', netmask: '', gateway: '', dns: '' },
  formState: { ip: '', netmask: '', gateway: '', dns: '' },
  spinning: false
})

const validateDns = async () => {
  if (!state.value.formState.dns) {
    return Promise.resolve()
  }
  if (
    state.value.formState.dns
      .split(',')
      .some((i: string) => state.value.pattern.test(i))
  ) {
    return Promise.resolve()
  }
  return Promise.reject(Error('请输入正确的IP格式'))
}

const rules = {
  ip: [
    {
      required: true,
      message: 'IP不能为空'
    },
    {
      pattern: state.value.pattern,
      message: '请输入正确的Ip地址'
    }
  ],
  netmask: [
    {
      required: true,
      message: '子掩码地址不能为空'
    },
    {
      pattern: state.value.pattern,
      message: '请输入正确的子掩码地址'
    }
  ],
  gateway: [
    {
      required: true,
      message: '网关地址不能为空'
    },
    {
      pattern: state.value.pattern,
      message: '请输入正确的网关地址'
    }
  ],
  dns: [{ validator: validateDns, trigger: 'bulr' }]
}

onMounted(() => {
  getNetInfo()
})

const edit = () => {
  state.value.isEdit = true
  state.value.formState = clone(state.value.networkInfo)
}

const onSubmit = async () => {
  formRef.value.validate().then(async () => {
    const param: any = {}
    Object.keys(state.value.formState).map((i: any) => {
      param[i] =
        i === 'dns'
          ? state.value.formState.dns.split(',')
          : state.value.formState[i]
      return i
    })
    const res = await setNet(param)
    if (res) {
      message.success('操作成功')
      state.value.networkInfo = clone(state.value.formState)
      state.value.isEdit = false
    }
  })
}

const cancel = () => {
  state.value.isEdit = false
  Object.keys(state.value.formState).map((i: string) => {
    state.value.formState[i] = ''
    return i
  })
  resetFields()
}

const getNetInfo = async () => {
  state.value.spinning = true
  const res: any = await getNet({})
  if (res) {
    Object.keys(res).map((i: string) => {
      state.value.networkInfo[i] =
        typeof res[i] !== 'string'
          ? (res[i] && res[i] && res[i].length > 0 && res[i].join(',')) || ''
          : res[i] || ''
      return i
    })
  }
  state.value.spinning = false
}

const resetFields = () => {
  formRef.value.resetFields()
}
</script>

<style lang="scss" scoped>
.NetWorkForm {
  background-color: #ffffff;
  width: 600px;
  :deep .ant-form-item-control-input-content {
    text-align: left;
  }
  .info_title {
    font-size: 17px;
    font-weight: bold;
    color: #333333;
  }
  .info_text {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
}
</style>
