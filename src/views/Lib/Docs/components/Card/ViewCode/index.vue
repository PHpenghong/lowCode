<template>
  <div>
    <p-card
      :card-list="cardList"
      info-icon="warn"
      info-icon-color="#999999"
      @handle-card="handleCard"
    >
      <template #cardKey1="{ item }">
        {{ item.title }}
      </template>
    </p-card>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'
import '@without_end/ph-ui/style/card'

const PCard = defineAsyncComponent(() => import('@without_end/ph-ui/lib/card'))

const cardList = reactive([
  {
    title: '卡片标题1',
    value: 999,
    icon: 'analysis',
    iconColor: '#FF9D43',
    iconBg: '#FFF5EC',
    key: 'cardKey1',
    info: '这里是描述文本这里是描述文本',
    slot: true
  },
  {
    title: '卡片标题2',
    value: 56,
    icon: 'code-close',
    iconColor: '#3FBF8D',
    iconBg: '#ECF9F4',
    key: 'cardKey2',
    info: '这里是描述文本这里是描述文本'
  },
  {
    title: '卡片标题3',
    value: 39,
    icon: 'copy',
    iconColor: '#427EF1',
    iconBg: '#ECF4FF',
    key: 'cardKey3',
    info: '这里是描述文本这里是描述文本'
  },
  {
    title: '卡片标题4',
    value: 3,
    icon: 'edit',
    iconColor: '#F42E46',
    iconBg: '#FEEAED',
    key: 'cardKey4',
    info: '这里是描述文本这里是描述文本'
  }
])

const handleCard = (key: string | number) => {
  console.log(key)
}
</script>

<style lang="scss" scoped></style>
