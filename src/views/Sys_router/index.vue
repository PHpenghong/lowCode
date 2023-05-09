<template>
  <div id="sys_router">
    <section class="router_edit">
      <article class="copy_art">
        <a-button type="link" @click.stop="addRouter({ id: 0 })"
          >新增路由</a-button
        >
      </article>
      <p-tree
        :selects-val="state.selectsVal"
        :tree-data="state.treeData"
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
            <span>
              <a-button type="link" size="mini" @click.stop="editRouter(node)">
                编辑
              </a-button>
              <a-button type="link" size="mini" @click.stop="addRouter(node)">
                新增子路由
              </a-button>
              <a-button
                v-if="!node.children || node.children.length === 0"
                type="link"
                danger
                size="mini"
                @click.stop="delRouter(node.id)"
              >
                删除
              </a-button>
            </span>
          </section>
        </template>
      </p-tree>
    </section>
    <AddRouter
      :visible="state.visible"
      :actions-type="state.actionsType"
      :edit-form="state.editForm"
      :p-node="state.pNode"
      @add-router="addRouterItem"
      @edit-router="editRouterItem"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { listToTree, clone } from '@/utils/tools'
import { save, edit, getList, del } from '@/api/router'
import '@without_end/ph-ui/style/tree'

const PTree = defineAsyncComponent(() => import('@without_end/ph-ui/lib/tree'))
// const Tree = defineAsyncComponent(() => import('@/components/Tree/index.vue'))

const AddRouter = defineAsyncComponent(
  () => import('./componeents/AddRouter.vue')
)

const state = ref<any>({
  treeData: [],
  checked: false,
  selectsVal: [],
  visible: {
    visibleAdd: false
  },
  pid: '',
  pNode: {},
  editForm: {},
  actionsType: 'add',
  lastId: 0
})

onMounted(() => {
  dealWithTree()
})

const dealWithTree = async () => {
  const res: any = await getList()
  if (res) {
    state.value.lastId = Math.max(...res.data.map((i: any) => i.id))
    state.value.treeData = routerSort(dealWithRouterSort(listToTree(res.data)))
  }
}

// const onclickNode = () => {
//   console.log(state.value.selectsVal)
// }

const addRouter = (node: any) => {
  state.value.pNode = clone(node)
  state.value.editForm = {}
  state.value.actionsType = 'add'
  state.value.pid = node.id
  state.value.visible.visibleAdd = true
}

const editRouter = (node: any) => {
  state.value.actionsType = 'edit'
  ;({
    name: state.value.editForm.name,
    component: state.value.editForm.component,
    path: state.value.editForm.path,
    redirect: state.value.editForm.redirect,
    sort: state.value.editForm.sort,
    id: state.value.editForm.id
  } = node)
  ;({
    title: state.value.editForm.title,
    title2: state.value.editForm.title2,
    hidden: state.value.editForm.hidden,
    isEdit: state.value.editForm.isEdit,
    disable: state.value.editForm.disable,
    keepAlive: state.value.editForm.keepAlive,
    icon: state.value.editForm.icon,
    parentRoute: state.value.editForm.parentRoute
  } = node.meta)
  state.value.pid = node.id
  state.value.visible.visibleAdd = true
}

const editRouterItem = async (item: any) => {
  delete item.meta.permission
  const res = await edit({ list: [item] })
  if (res) {
    message.success('修改成功')
    await dealWithTree()
  }
}

const delRouter = async (id: string | number) => {
  const res = await del({ ids: [id] })
  if (res) {
    message.success('删除成功')
    await dealWithTree()
  }
}

const addRouterItem = async (item: any) => {
  delete item.id
  const res = await save({ list: [item] })
  if (res) {
    message.success('新增成功')
    await dealWithTree()
  }
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
</script>

<style lang="scss" scoped>
#sys_router {
  width: 100%;
  height: 100%;
  .router_edit {
    background-color: #ffffff;
    width: 500px;
    .copy_art {
      cursor: pointer;
      padding: 10px;
      height: 30px;
      display: flex;
      align-items: center;
    }
    .treeSlots_sec {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
