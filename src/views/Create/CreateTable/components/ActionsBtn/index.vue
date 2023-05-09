<template>
  <div class="table_info">
    <section class="actionsBtn">
      <section class="text_title">表格列：</section>
      <section>
        <a-checkbox-group
          v-model:value="colVal"
          name="checkboxActions"
          :options="colArr"
          @change="changeCol"
        />
      </section>
    </section>
    <section v-show="~colVal.indexOf('checked')" class="actionsBtn">
      <section class="text_title">批量操作：</section>
      <section>
        <a-checkbox-group
          v-model:value="batchVal"
          name="checkboxActions"
          :options="batchArr"
          @change="changeBatch"
        />
      </section>
    </section>
    <section class="actionsBtn">
      <section class="text_title">操作按钮：</section>
      <section>
        <a-checkbox-group
          v-model:value="btnVal"
          name="checkboxActions"
          :options="btnArr"
          @change="changeBtn"
        />
      </section>
    </section>
    <article class="tips_art">
      先将表格列数据缓存，到创建Form页面读取Table缓存，生成新增、编辑、详情弹窗文件
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['update:actionsBtn'])

const colArr: any[] = [
  { value: 'checked', label: '多选' },
  { value: 'number', label: '序号' },
  { value: 'actions', label: '操作' }
]
const batchArr: any[] = [
  { value: 'batchDel', label: '批量删除' },
  { value: 'batchRow', label: '批量选择返回数据行' }
]

const btnArr: any[] = [
  { value: 'add', label: '新增&编辑按钮' },
  { value: 'details', label: '详情按钮' },
  { value: 'del', label: '删除按钮' }
]
const btnVal = ref<string[]>([])
const batchVal = ref<string[]>([])
const colVal = ref<string[]>([])

const changeCol = () => {
  if (!~colVal.value.indexOf('actions')) {
    btnVal.value.length = 0
  }
  if (!~colVal.value.indexOf('checked')) {
    batchVal.value.length = 0
  }
  changeArr()
}
const changeBtn = () => {
  if (btnVal.value.length > 0 && !~colVal.value.indexOf('actions')) {
    colVal.value.push('actions')
  } else if (btnVal.value.length < 0 && ~colVal.value.indexOf('actions')) {
    colVal.value.splice(colVal.value.indexOf('actions'), 0)
  }
  changeArr()
}
const changeBatch = () => {
  changeArr()
}

const changeArr = () => {
  emits('update:actionsBtn', [
    ...btnVal.value,
    ...batchVal.value,
    ...colVal.value
  ])
}
</script>

<style lang="scss" scoped>
.table_info {
  .actionsBtn {
    height: 30px;
    display: flex;
    align-items: center;
    .text_title {
      margin-right: 10px;
      width: 100px;
    }
  }
  .tips_art {
    padding-left: 20px;
    color: red;
  }
}
</style>
