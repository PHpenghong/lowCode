<template>
  <div class="user">
    <p-table
      ref="searchTable"
      :slot-list="[
        'index',
        'name',
        'email',
        'phone',
        'disable',
        'role_id',
        'actions'
      ]"
      :form="formState"
      title="用户"
      :file-module="state.module"
      row-key="dataId"
      :is-row-select="false"
      :page-size="10"
      :page-size-arr="['10', '20', '30', '40', '50']"
      :req="search"
      columns-key="userCol"
      param-name="userParam"
      res-name="userRes"
    >
      <template #form>
        <Form :form="formState" @search="searchFunc" @add="add" />
      </template>
      <template #index="{ row }">
        <article class="textOmit">
          {{ row.index }}
        </article>
      </template>
      <template #name="{ row }">
        <article class="textOmit">
          {{ row.name }}
        </article>
      </template>
      <template #email="{ row }">
        <article class="textOmit">
          {{ row.email }}
        </article>
      </template>
      <template #phone="{ row }">
        <article class="textOmit">
          {{ row.phone }}
        </article>
      </template>
      <template #disable="{ row }">
        <article class="textOmit">
          {{ state.disableObj[row.disable] }}
        </article>
      </template>
      <template #role_id="{ row }">
        <article class="textOmit">
          {{ state.roleObj[row.role_id] }}
        </article>
      </template>
      <template #actions="{ row }">
        <a-button type="link" @click="edit(row)">编辑</a-button>
        <a-button type="link" danger @click="del([row.id])">删除</a-button>
      </template>
    </p-table>
    <Add
      :visible="state.visible"
      visible-str="visibleMode"
      :role-list="state.roleList"
      :actions-type="state.actionsType"
      :edit-data="state.editData"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue'
import { PTable } from '@without_end/ph-ui'
import '@without_end/ph-ui/style/table'
import { search } from '@/api/user'
import { getRole } from '@/api/role'
// import { message, Modal } from 'ant-design-vue'
import codeErr from '@/utils/codeErr'

interface Role {
  id: string | number
  label: string
}
type ActionsType = 'add' | 'edit'

interface State {
  visible: {
    visibleMode: boolean
  }
  editData: any
  actionsType: ActionsType
  disableObj: { [key: string]: string }
  roleObj: { [key: string]: string }
  module: any
  roleList: Role[]
}

const Add = defineAsyncComponent(() => import('./AddUser.vue'))
const Form = defineAsyncComponent(() => import('./UserForm.vue'))

const searchTable = ref()

const state = reactive<State>({
  visible: {
    visibleMode: false
  },
  editData: {},
  actionsType: 'add',
  disableObj: {
    '0': '启用',
    '1': '禁用'
  },
  roleObj: {
    '0': '超级管理员',
    '1': '管理员',
    '2': '普通用户'
  },
  module: null,
  roleList: []
})

const formState = reactive<any>({
  disable: '',
  filter: ''
})

onMounted(() => {
  state.module = import.meta.globEager('/src/assets/table/user/index.ts')[
    '/src/assets/table/user/index.ts'
  ]
  searchFunc()
  getRoleList()
})

const getRoleList = async () => {
  const res: any = await getRole()
  if (res.code == 0) {
    state.roleList = res.data
    res.data.map((i: Role) => {
      state.roleObj[`${i.id}`] = i.label
      return i
    })
  } else {
    codeErr(res)
  }
}

const searchFunc = (is = false) => {
  searchTable.value.search && searchTable.value.search(is)
}
const del = (ids: string[]) => {
  console.log('🚀 ~ file: UserTable.vue:105 ~ del ~ ids', ids)
  // Modal.confirm({
  //   title: () => '提示',
  //   content: () => '确定要删除吗？',
  //   centered: true,
  //   onOk() {
  //  reqDel({ ids })
  //    .then((res: any) => {
  //      if (res.code == 1000) {
  //        message.success('删除成功', 2)
  //        search(true)
  //      } else {
  // codeErr(res)
  //      }
  //    })
  // }
  // onCancel() {}
  // })
}
const edit = (row: any) => {
  state.actionsType = 'edit'
  state.editData = row
  state.visible.visibleMode = true
}
const add = () => {
  state.actionsType = 'add'
  state.visible.visibleMode = true
}
</script>

<style lang="scss" scoped></style>
