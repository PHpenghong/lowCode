const index = `
### Table.vue

<template>
<div>
  <p-table
    ref="searchTable"
    :slot-list="['actions']"
    :form="formState"
    title="Table标题"
    :file-module="module"
    row-key="dataId"
    :is-row-select="false"
    :page-size="10"
    :page-size-arr="['10', '20', '30', '40', '50']"
    :req="reqName"
    columns-key="userCol"
    param-name="userParam"
    res-name="userRes"
  >
    <template #form> 表单组件插槽 </template>
    <template #actions="{ row }">
      <a-button type="link" @click="btn(row)">编辑</a-button>
      <a-button type="link" danger @click="btn(row)">删除</a-button>
    </template>
  </p-table>
</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue'
import { reqName } from '@/api/reqFile' // 接口对象
import '@without_end/ph-ui/style/table'

const PTable = defineAsyncComponent(() => import('@without_end/ph-ui/lib/table'))
const searchTable = ref()

const formState = reactive<any>({
  filter: ''
})

let module = reactive<any>(null)

onMounted(() => {
  module = import.meta.globEager('/src/assets/demo/index.ts')[ // table 文件地址 （建议: /src/assets/table/*/index.ts ）
    '/src/assets/demo/index.ts'
  ]
  // searchFunc()
})

const searchFunc = (is = false) => {
  searchTable.value.search && searchTable.value.search(is)
}

const btn = (row: any) => {
  console.log(row)
}
</script>

<style lang="scss" scoped></style>




### Form.vue

<template>
  <div class="">
    <div class="formDiv">
      <a-form layout="inline">
        <a-form-item label="关键字">
          <a-input
            v-model:value="props.form.filter"
            placeholder=""
            allow-clear
          />
        </a-form-item>

        <a-form-item>
          <a-button class="btns" type="primary" @click="search">查询</a-button>
          <a-button class="btns" @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue'

const emits = defineEmits(['search'])
const props = defineProps({
  form: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const search = () => {
  emits('search', true)
}

const reset = () => {
  Object.keys(props.form).map((i: string) => {
    props.form[i] = ''
    return i
  })
}
</script>

<style lang="scss" scoped>
.formDiv {
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  :deep .btns {
    margin-left: 10px;
  }
}
</style>




### demo/index.ts

export const demoCol = [
  {
    title: '序号',
    dataIndex: 'index',
    ellipsis: true,
    width: 80,
    key: 'index',
    align: 'center'
  },
  {
    key: 'name',
    title: '昵称',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'name'
  },
  {
    key: 'email',
    title: '邮箱',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'email'
  },
  {
    key: 'phone',
    title: '手机',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'phone'
  },
  {
    key: 'actions',
    title: '操作',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'actions'
  }
]

export const demoParam = (page: number, pageSize: number, param: any) => ({
  page,
  page_size: pageSize,
  ...param
})

export const demoRes = (res: any) => {
  let data = []
  let total = 0
  if (res.code == 0) {
    data = res.data.data || []
    total = res.data.total || 0
  } else {
    // codeErr(res)
  }
  return [data, total]
}`

export default { index }
