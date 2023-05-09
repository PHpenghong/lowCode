<template>
  <div class="options_div">
    <LineTitle>下拉</LineTitle>
    <section
      v-for="(item, index) in props.options"
      :key="index"
      class="options_sec"
    >
      <section class="options_item">
        <article class="options_value">
          <a-input v-model:value="item.value" placeholder="选项value" />
        </article>
        <article class="options_label">
          <a-input v-model:value="item.label" placeholder="选项label" />
        </article>
        <SvgIcon
          class="iconDel"
          :size="1.2"
          name="delete"
          @click="del(index)"
        />
      </section>
    </section>
    <a-button class="addBtn" type="link" @click="add"
      ><SvgIcon class="addIcon" :size="1.2" name="add" />新增选项</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, defineAsyncComponent } from 'vue'

const LineTitle = defineAsyncComponent(() => import('./LineTitle.vue'))

const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

const del = (index: number) => {
  props.options.splice(index, 1)
}

const add = () => {
  props.options.push({
    value: '',
    label: ''
  })
}
</script>

<style lang="scss" scoped>
.options_div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.addBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  .addIcon {
    color: #1890ff;
  }
}

.options_sec {
  background-color: #f6f7ff;
  padding: 5px;

  .iconDel {
    cursor: pointer;
    color: #aaaaaa;
  }
  .options_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    .options_value,
    .options_label {
      width: 45%;
    }
  }
}
</style>
