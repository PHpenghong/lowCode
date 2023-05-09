<template>
  <div>
    <section v-show="state.role" class="router_head">
      <a-button v-show="state.treeDisabled" type="primary" @click="edit"
        >编辑</a-button
      >&nbsp;
      <a-button v-show="!state.treeDisabled" type="primary" @click="saveRole"
        >保存</a-button
      >&nbsp;
      <a-button v-show="!state.treeDisabled" @click="cancel">取消</a-button>
    </section>
    <section class="router_tree">
      <p-tree
        v-model:selects-val="state.selectsVal"
        v-model:checked-val="state.checkedVal"
        v-model:default-checked-val="state.defaultCheckedVal"
        :tree-data="state.treeData"
        is-checkbox
        :disabled="state.treeDisabled"
        width="500px"
        height="500px"
        :field-names="{
          label: 'name',
          id: 'id',
          children: 'children'
        }"
      >
        <template #default="{ node }">
          <section class="treeSlots_sec">
            <span>{{ node.meta.title }}</span>
            <span
              >路由状态：<span
                :class="[`router_status-${node.meta.hidden ? 'hide' : 'show'}`]"
              >
                {{ node.meta.hidden ? '隐藏' : '显示' }}
              </span>
            </span>
          </section>
        </template>
      </p-tree>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import '@without_end/ph-ui/style/tree'
import { listToTree } from '@/utils/tools'
import { getList } from '@/api/router'
import { getRouterRole, save } from '@/api/role'
import codeErr from '@/utils/codeErr'

interface State {
  treeData: any[]
  selectsVal: (string | number)[]
  checkedVal: (string | number)[]
  defaultCheckedVal: (string | number)[]
  treeDisabled: boolean
  role: string | number
}

const PTree = defineAsyncComponent(() => import('@without_end/ph-ui/lib/tree'))

const state = ref<State>({
  treeData: [],
  selectsVal: [],
  checkedVal: [],
  defaultCheckedVal: [],
  treeDisabled: true,
  role: ''
})

onMounted(() => {
  getAllRouter()
})

const getRouterRoleList = async (role: string | number) => {
  cancel()
  state.value.checkedVal.length = 0
  state.value.role = role
  const res = await getRouterRole({ role })
  if (res.code == 0) {
    state.value.defaultCheckedVal = res.data
  }
}

const getAllRouter = async () => {
  const res: any = await getList()
  state.value.treeData = routerSort(dealWithRouterSort(listToTree(res.data)))
}

const dealWithRouterSort = (list: any[]) =>
  list.map((i: any) => {
    if (i?.children?.length > 0) {
      dealWithRouterSort(i.children)
      i.children = routerSort(i.children)
    }
    return i
  })

const routerSort = (arr: any) => {
  const arrHave: any[] = []
  const arrNo: any[] = []
  arr.map((i: any) => {
    i.sort ? arrHave.push(i) : arrNo.push(i)
    return i
  })
  return [...arrHave.sort((a: any, b: any) => a.sort - b.sort), ...arrNo]
}

const saveRole = async () => {
  if (state.value.checkedVal.length > 0) {
    const res = await save({
      role: state.value.role,
      role_list: state.value.checkedVal
    })
    if (res.code == 0) {
      getRouterRoleList(state.value.role)
      message.success('编辑成功！')
    } else {
      codeErr(res)
    }
  } else {
    cancel()
  }
}

const edit = () => {
  if (state.value.role) {
    state.value.treeDisabled = false
  }
}

const cancel = () => {
  state.value.treeDisabled = true
}

defineExpose({
  getRouterRoleList
})
</script>

<style lang="scss" scoped>
.router_tree {
  margin: 20px;
}
.router_head {
  height: 50px;
  margin: 0 40px;
  display: flex;
  align-items: flex-end;
}
.treeSlots_sec {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.router_status-show {
  color: #008cff;
}
.router_status-hide {
  color: #bfbfbf;
}
</style>
