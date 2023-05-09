<template>
  <div class="components_body">
    <section>
      <article class="comp_title">输入型组件</article>
      <section class="comp_sec">
        <Draggable
          item-key="tagIcon"
          class="components-draggable"
          :list="inputComponents"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
          draggable=".comp_item"
          :sort="false"
          :clone="cloneComponent"
          @end="onEnd"
        >
          <template #item="{ element }">
            <section class="comp_item" @click="addComponent(element)">
              <article class="comp_body">
                {{ element.label }}
              </article>
            </section>
          </template>
        </Draggable>
      </section>
    </section>
    <section>
      <article class="comp_title">选择型组件</article>
      <section class="comp_sec">
        <Draggable
          item-key="tagIcon"
          class="components-draggable"
          :list="selectComponents"
          draggable=".comp_item"
          :sort="false"
          :clone="cloneComponent"
          @end="onEnd"
        >
          <template #item="{ element }">
            <section class="comp_item" @click="addComponent(element)">
              <article class="comp_body">
                {{ element.label }}
              </article>
            </section>
          </template>
        </Draggable>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Draggable from 'vuedraggable'
import { inputComponents, selectComponents } from '../tools/config'
import { getCode } from '@/utils/random'

const emits = defineEmits(['selectComponentType'])

const tempActiveData = ref<any>({})

const cloneComponent = (item: any) => {
  const clone = { ...item }
  clone.id = getCode()
  clone.name = getCode()
  tempActiveData.value = clone
  return tempActiveData
}

const onEnd = () => {
  emits('selectComponentType', tempActiveData.value)
}

const addComponent = (item: any) => {
  emits('selectComponentType', cloneComponent(item).value)
}
</script>

<style lang="scss" scoped>
.components_body {
  width: 100%;
  height: 100%;
  .comp_title {
    font-size: 14px;
    color: #222;
    margin: 6px 2px;
  }
  .comp_sec {
    // display: flex;
    // flex-wrap: wrap;
    .components-draggable {
      display: flex;
      flex-wrap: wrap;
    }
    .comp_item {
      display: inline-block;
      width: 48%;
      margin: 1%;
      transition: transform 0ms !important;
      .comp_body {
        padding: 8px 10px;
        background: #f6f7ff;
        font-size: 12px;
        cursor: move;
        border: 1px dashed #f6f7ff;
        border-radius: 3px;
        &:hover {
          border: 1px dashed #787be8;
          color: #787be8;
          .svg-icon {
            color: #787be8;
          }
        }
      }
    }
  }
}
</style>
