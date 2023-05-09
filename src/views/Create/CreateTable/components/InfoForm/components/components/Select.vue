<template>
  <div class="select">
    <section class="btn_sec">
      <a-button v-show="!isEdit" @click="add">新增</a-button>
    </section>
    <section :class="[props.options.length > 0 ? 'view_option' : '']">
      <section v-for="item in props.options" :key="item.key" class="option_sec">
        <article class="option_art textOmit">
          {{ `${item.key}: ${item.label}` }}
        </article>
        <article class="del_icon flexClass">
          <SvgIcon :size="1.3" name="delete" @click="del(item.key)" />
        </article>
      </section>
    </section>
    <section v-show="isEdit" :class="[isEdit ? 'edit_sec' : '']">
      <a-form :model="state.option">
        <a-form-item label="Key">
          <a-input v-model:value="state.option.key" />
        </a-form-item>
        <a-form-item label="Lable">
          <a-input v-model:value="state.option.label" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">确定</a-button>
          <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps, defineEmits } from 'vue'

const emits = defineEmits(['update:options'])
const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

const isEdit = ref<boolean>(false)
const state = ref<any>({
  option: {
    key: '',
    label: ''
  }
})

const onSubmit = () => {
  emits('update:options', [...props.options, ...[state.value.option]])
  isEdit.value = false
}

const reset = () => {
  state.value.option = {
    key: '',
    label: ''
  }
}

const add = () => {
  isEdit.value = true
  reset()
}

const del = (key: string) => {
  emits(
    'update:options',
    props.options.filter((i: any) => i.key !== key)
  )
}

const cancel = () => {
  isEdit.value = false
  reset()
}
</script>

<style lang="scss" scoped>
.view_option {
  border: 1px solid #efefef;
}
.option_sec {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #efefef;
  height: 20px;
  margin: 5px;
  .option_art {
    flex: 1;
  }
  .del_icon {
    width: 20px;
    cursor: pointer;
  }
}
</style>
