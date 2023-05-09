<template>
  <div>
    <section class="edit_head">
      <h3>表格列设置</h3>
      <article>
        <a-button
          class="editable-add-btn"
          style="margin-bottom: 8px"
          @click="handleAdd"
        >
          添加列
        </a-button>
        <a-button
          class="editable-add-btn"
          style="margin-bottom: 8px"
          @click="readCache"
        >
          读取缓存
        </a-button>
        <a-button
          class="editable-add-btn"
          style="margin-bottom: 8px"
          @click="handleCache"
        >
          缓存
        </a-button>
        <a-button
          class="editable-add-btn"
          style="margin-bottom: 8px"
          @click="download"
        >
          下载
        </a-button>
        <a-button danger @click="clearCache">清除缓存</a-button>
      </article>
    </section>
    <EditTable
      ref="tableRefs"
      v-model:table-data="props.tableData"
      :edit-table-column="editTableColumn"
      @del="del"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, defineProps, defineEmits, PropType } from 'vue'
import { saveAs } from 'file-saver'
import { Modal } from 'ant-design-vue'
import { getCode } from '@/utils/random'
import { jsFormat } from '../../ts/download'
import { editTableColumn, EditTableColumn } from '../../ts/tableColumn'

const EditTable = defineAsyncComponent(
  () => import('./components/EditTable.vue')
)

const emits = defineEmits(['update:tableData'])
const props = defineProps({
  tableData: {
    type: Array as PropType<EditTableColumn[]>,
    default: () => []
  }
})

const handleAdd = () => {
  emits('update:tableData', [
    ...props.tableData,
    ...[
      {
        id: getCode(),
        key: '',
        title: '',
        width: '',
        ellipsis: true,
        align: 'center'
      }
    ]
  ])
}
const handleCache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '如果存在缓存，将被覆盖，是否继续',
    centered: true,
    onOk() {
      localStorage.setItem('tableCache', JSON.stringify(props.tableData))
    }
    // onCancel() {}
  })
}
const clearCache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '确定清空缓存？',
    centered: true,
    onOk() {
      window.localStorage.removeItem('FormCache')
    }
    // onCancel() {}
  })
}
const readCache = () => {
  Modal.confirm({
    title: () => '提示',
    content: () => '如果当前存在编辑数据，将被覆盖，是否继续？',
    centered: true,
    onOk() {
      emits(
        'update:tableData',
        JSON.parse(localStorage.getItem('tableCache') || '[]')
      )
    }
    // onCancel() {}
  })
}
const download = () => {
  const codeStr = jsFormat(props.tableData, 'testname')
  const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'test.ts')
}

const del = (arr: EditTableColumn[]) => {
  emits('update:tableData', arr)
}
</script>

<style lang="scss" scoped>
.edit_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
</style>
