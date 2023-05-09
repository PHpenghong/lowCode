<template>
  <div class="role_div flexClass">
    <section class="role_sec_header" @click="add">
      <a-button type="link" class="add">新增角色</a-button>
    </section>
    <section class="role_sec_list">
      <article
        v-for="item in state.roleList"
        :key="item.id"
        @click="clickRole(item)"
        :class="{ selectItem: item.id === state.selectItem, role_item: true }"
      >
        {{ item.label }}
        <section class="btns">
          <a-button type="link" @click="edit(item)">编辑</a-button>
          <a-button type="link" danger @click="delRole(item.id)">删除</a-button>
        </section>
      </article>
    </section>
    <AddRole
      :visible="state.visible"
      visible-str="visibleAdd"
      :edit-data="state.editData"
      :actions-type="state.actionsType"
      @submit-succ="submitSucc"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { getRole, del } from '@/api/role'
import codeErr from '@/utils/codeErr'

const AddRole = defineAsyncComponent(() => import('./AddRole.vue'))

interface Role {
  id: string | number
  label: string
}
type ActionsType = 'add' | 'edit'

interface State {
  roleList: Role[]
  selectItem: string | number
  visible: {
    visibleAdd: boolean
  }
  actionsType: ActionsType
  editData: Role | {}
}

const emits = defineEmits(['getRouterRole'])

const state = ref<State>({
  roleList: [],
  selectItem: '',
  visible: {
    visibleAdd: false
  },
  actionsType: 'add',
  editData: {}
})

// const roleList = ref<Role[]>([])

onMounted(() => {
  getRoleList()
})

const add = () => {
  state.value.actionsType = 'add'
  state.value.visible.visibleAdd = true
}

const edit = (item: any) => {
  state.value.editData = item
  state.value.actionsType = 'edit'
  state.value.visible.visibleAdd = true
}

const delRole = async (id: string | number) => {
  Modal.confirm({
    title: () => '提示',
    content: () => '确定要删除吗？',
    centered: true,
    async onOk() {
      const res = await del({ id })
      console.log('🚀 ~ file: Role.vue:81 ~ del ~ res', res)
      if (res.code == 0) {
        message.success('删除成功')
        getRoleList()
      } else {
        codeErr(res)
      }
    },
    onCancel() {}
  })
}

const getRoleList = async () => {
  const res: any = await getRole()
  if (res.code == 0) {
    state.value.roleList = res.data
  } else {
    codeErr(res)
  }
}

const clickRole = (item: Role) => {
  state.value.selectItem = item.id
  emits('getRouterRole', item.id)
}

const submitSucc = () => {
  state.value.visible.visibleAdd = false
  getRoleList()
}
</script>

<style lang="scss" scoped>
.role_div {
  flex-direction: column;
  width: 100%;
  height: 100%;
  .role_sec_header {
    height: 50px;
  }
  .role_sec_list {
    width: 100%;
    padding: 0 20px;
    flex: 1;
    .role_item {
      width: 100%;
      padding: 0 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .selectItem {
      background-color: #bae7ff;
      color: #666666;
    }
    .btns {
    }
  }
}
</style>
