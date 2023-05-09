<template>
  <div class="at-pop-index">
    <div
      v-for="(item, index) in listData"
      :key="index"
      class="at-pop-item"
      @click.stop="clickItem(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    // 传入需要被@的成员数组
    listData: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, emit) {
    const clickItem = (item: any) => {
      emit.emit('onSelect', item) // 调用父组件处理成员选择的方法，并回传当前选择项
    }
    return { clickItem }
  }
})
</script>

<style lang="scss" scoped>
.at-pop-index {
  min-width: 140px;
  max-width: 180px;
  max-height: 108px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 6px;
  color: #000;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.at-pop-item {
  width: 100%;
  height: 27px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.at-pop-item:hover {
  color: #fff;
  background-color: #80b8ed;
}
::-webkit-scrollbar {
  display: none;
}
</style>
