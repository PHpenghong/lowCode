<template>
  <div class="dragArea_div">
    <a-form
      :model="props.formData"
      :layout="props.formObj.layout"
      :label-col="props.formObj.labelCol"
      :wrapper-col="props.formObj.wrapperCol"
    >
      <Draggable item-key="id" class="drawing-board" :list="props.formData">
        <template #item="{ element }">
          <DraggableItem
            :element="element"
            :select-id="props.selectFormItem.id"
            @click="selectItem(element.id)"
            @del-form-item="delFormItem"
            @copy-form-item="copyFormItem"
          />
        </template>
      </Draggable>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, defineEmits, defineAsyncComponent } from 'vue'
import Draggable from 'vuedraggable'

const DraggableItem = defineAsyncComponent(
  () => import('../tools/DraggableItem')
)

const emits = defineEmits(['clickComponent', 'delFormItem', 'copyFormItem'])
const props = defineProps({
  formData: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  formObj: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  selectFormItem: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const selectItem = (id: string) => {
  emits('clickComponent', id)
}
const delFormItem = (id: string) => {
  emits('delFormItem', id)
}

const copyFormItem = (item: any) => {
  emits('copyFormItem', item)
}
</script>

<style lang="scss">
$selectedColor: #f6f7ff;
$lighterBlue: #409eff;
.dragArea_div {
  margin: 20px;
  .formItemSec {
    display: flex;
    justify-content: space-between;
  }
  .actionsIcon {
    // position: relative;
    // top: -50px;
    // right: -45%;
    width: 40px;
    cursor: pointer;
    color: #aaaaaa;
  }
  .drawing-board {
    height: 100%;
    position: relative;
    .iconClass {
      color: #aaaaaa;
    }
    .components-body {
      padding: 0;
      margin: 0;
      font-size: 0;
    }
    .sortable-ghost {
      position: relative;
      display: block;
      overflow: hidden;
      &::before {
        content: ' ';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 3px;
        background: rgb(89, 89, 223);
        z-index: 2;
      }
    }
    .components-item,
    .sortable-ghost {
      width: 100%;
      min-height: 60px;
      background-color: $selectedColor;
    }
    .active-from-item {
      & > .ant-form-item {
        background: $selectedColor;
        border-radius: 6px;
      }
      & > .drawing-item-copy,
      & > .drawing-item-delete {
        display: initial;
      }
      & > .component-name {
        color: $lighterBlue;
      }
    }
    .ant-form-item {
      margin-bottom: 15px;
      padding: 10px;
    }
    .ant-form-item:hover {
      background-color: $selectedColor;
    }
  }
}
</style>
