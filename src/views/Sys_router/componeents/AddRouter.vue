<template>
  <div class="">
    <p-drawer
      :visible="props.visible"
      visible-str="visibleAdd"
      :title="actionsType === 'add' ? '新增子路由' : '编辑路由'"
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
          <a-form-item label="Component" name="component">
            <a-input
              v-model:value="formState.component"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Name" name="name">
            <a-input
              v-model:value="formState.name"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Title" name="title">
            <a-input
              v-model:value="formState.title"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Title2">
            <a-input
              v-model:value="formState.title2"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Icon" name="icon">
            <a-input
              v-model:value="formState.icon"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="是否隐藏" name="hidden">
            <a-switch v-model:checked="formState.hidden" />
          </a-form-item>
          <a-form-item label="是否编辑" name="isEdit">
            <a-switch v-model:checked="formState.isEdit" />
          </a-form-item>
          <a-form-item label="KeepAlive" name="keepAlive">
            <a-switch v-model:checked="formState.keepAlive" />
          </a-form-item>
          <a-form-item label="是否禁用" name="disable">
            <a-switch v-model:checked="formState.disable" />
          </a-form-item>
          <a-form-item label="Path" name="path">
            <a-input
              v-model:value="formState.path"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="重定向" name="redirect">
            <a-input
              v-model:value="formState.redirect"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Sort" name="sort">
            <a-input
              v-model:value="formState.sort"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="父路由名称" name="parentRoute">
            <a-input
              v-model:value="formState.parentRoute"
              placeholder="请输入"
              :allow-clear="true"
              style="width: 100%"
            />
          </a-form-item>
        </a-form>
      </template>
      <template #btns>
        <section class="btn_sec">
          <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
          <a-button @click="close">取消</a-button>
        </section>
      </template>
    </p-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  defineAsyncComponent,
  defineProps,
  defineEmits,
  watchEffect,
  PropType,
  nextTick
} from 'vue'

const PDrawer = defineAsyncComponent(
  () => import('@without_end/ph-ui/lib/drawer')
)

const emits = defineEmits(['addRouter', 'editRouter'])
const props = defineProps({
  visible: {
    type: Object,
    default: () => ({})
  },
  actionsType: {
    type: String,
    default: ''
  },
  editForm: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  pNode: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const formRef = ref<any>()

const rules = {
  component: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  name: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  title: [
    {
      required: true,
      message: '值不能为空'
    }
  ],
  path: [
    {
      required: true,
      message: '值不能为空'
    }
  ]
}

const formState = reactive<any>({
  component: '',
  name: '',
  title: '',
  title2: '',
  icon: '',
  hidden: false,
  path: '',
  redirect: '',
  sort: '',
  isEdit: false,
  disable: false,
  keepAlive: false,
  parentRoute: ''
})

const resetForm = () => {
  Object.keys(formState).forEach((key: string) => {
    formState[key] = ~['hidden', 'isEdit', 'keepAlive', 'disable'].indexOf(key)
      ? false
      : ''
  })
}

watchEffect(() => {
  if (props.visible.visibleAdd && Object.keys(props.editForm).length > 0) {
    ;({
      name: formState.name,
      component: formState.component,
      path: formState.path,
      redirect: formState.redirect,
      sort: formState.sort,
      title: formState.title,
      title2: formState.title2,
      hidden: formState.hidden,
      isEdit: formState.isEdit,
      keepAlive: formState.keepAlive,
      disable: formState.disable,
      icon: formState.icon,
      parentRoute: formState.parentRoute,
      id: formState.id
    } = props.editForm)
    console.log(
      '🚀 ~ file: AddRouter.vue:221 ~ watchEffect ~  formState.component',
      formState.component
    )
    // if (formState.hidden == undefined) {
    //   formState.hidden = false
    // }
  } else {
    resetForm()
  }
})

const onSubmit = () => {
  formRef.value.validate().then(() => {
    const router: any = {}
    router.meta = {
      title: formState.title,
      title2: formState.title2,
      hidden: formState.hidden,
      isEdit: formState.isEdit,
      disable: formState.disable,
      keepAlive: formState.keepAlive,
      icon: formState.icon,
      parentRoute: formState.parentRoute
      // permission: []
    }
    ;({
      name: router.name,
      component: router.component,
      path: router.path,
      redirect: router.redirect,
      sort: router.sort
    } = formState)
    if (formState.id) {
      router.id = formState.id
    }
    if (props.pNode.id !== undefined) {
      router.parentId = props.pNode.id
    }
    emits(`${props.actionsType === 'add' ? 'addRouter' : 'editRouter'}`, router)
    close()
  })
}

const resetFields = () => {
  nextTick(() => {
    formRef.value && formRef.value?.resetFields && formRef.value.resetFields()
  })
}

const close = () => {
  props.visible.visibleAdd = false
  resetForm()
}

watchEffect(() => {
  if (props.visible.visibleAdd) {
    nextTick(() => {
      if (Object.keys(props.pNode).length > 0) {
        formState.path = `${props.pNode.path || ''}/`
        formState.parentRoute = `${props.pNode.name || ''}`
        formState.component = props.pNode.id == 0 ? 'Layout' : ''
      }
    })
  } else {
    resetFields()
  }
})
</script>

<style lang="scss" scoped>
.btn_sec {
  text-align: center;
}
</style>
