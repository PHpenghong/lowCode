<template>
  <div class="regular_div">
    <LineTitle>正则校验</LineTitle>
    <section
      v-for="(item, index) in props.rules"
      v-show="
        JSON.stringify(item) !==
        JSON.stringify({ required: true, message: '值不能为空' })
      "
      :key="index"
      class="regular_sec"
    >
      <section class="regular_item">
        <article class="regular_label">表达式</article>
        <article class="regular_Value">
          <a-input v-model:value="item.pattern" placeholder="请输入正则" />
        </article>
      </section>
      <section class="regular_item">
        <article class="regular_label">错误提示</article>
        <article class="regular_Value">
          <a-input v-model:value="item.message" placeholder="请输入错误提示" />
        </article>
      </section>
      <SvgIcon
        class="rulesIconDel"
        :size="1.2"
        name="delete"
        @click="del(index)"
      />
    </section>
    <a-button class="addBtn" type="link" @click="add"
      ><SvgIcon class="addIcon" :size="1.2" name="add" />新增规则</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, defineAsyncComponent } from 'vue'

const LineTitle = defineAsyncComponent(() => import('./LineTitle.vue'))

const props = defineProps({
  rules: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

const del = (index: number) => {
  props.rules.splice(index, 1)
}

const add = () => {
  props.rules.push({
    pattern: '',
    message: ''
  })
}
</script>

<style lang="scss" scoped>
.regular_div {
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
.regular_sec {
  background-color: #f6f7ff;
  padding: 5px;
  .rulesIconDel {
    position: relative;
    top: -100px;
    right: -45%;
    cursor: pointer;
    color: #aaaaaa;
  }
  .regular_item {
    display: flex;
    align-items: center;
    margin: 5px;
    padding: 5px;
    .regular_label {
      width: 100px;
      font-weight: bold;
      font-size: 15px;
    }
  }
}
</style>
