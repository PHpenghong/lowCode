<template>
  <div>
    <a-table
      row-key="id"
      :pagination="false"
      :custom-row="customRow"
      :data-source="props.tableData"
      :columns="props.editTableColumn"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="['title', 'key', 'width'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              :placeholder="column.dataIndex === 'width' ? '非必填' : '必填'"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ record[column.dataIndex] }}
            </template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'align'">
          <div>
            <a-select
              v-if="editableData[record.id]"
              ref="select"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="width: 120px"
            >
              <a-select-option value="center">居中</a-select-option>
              <a-select-option value="left">靠左</a-select-option>
              <a-select-option value="right">靠右</a-select-option>
            </a-select>
            <template v-else>
              {{ record[column.dataIndex] }}
            </template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'ellipsis'">
          <div>
            <a-switch
              v-if="editableData[record.id] && editableData[record.id] != null"
              v-model:checked="editableData[record.id][column.dataIndex]"
              checked-children="是"
              un-checked-children="否"
            />
            <template v-else>
              {{ record[column.dataIndex] ? '是' : '否' }}
            </template>
          </div>
        </template>
        <template v-if="column.dataIndex == 'actions'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.id]">
              <a @click="save(record.id)">保存</a>
              &nbsp;
              <a-popconfirm
                title="确定取消吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="cancel(record.id)"
              >
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.id)">编辑</a>
              &nbsp;
              <a class="delClass" @click="del(record.id)">删除</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { PropType, reactive, defineProps, defineEmits } from 'vue'
import { EditTableColumn } from '../../../ts/tableColumn'

const emits = defineEmits(['del'])
const props = defineProps({
  tableData: {
    type: Array as PropType<EditTableColumn[]>,
    default: () => []
  },
  editTableColumn: {
    type: Array as PropType<EditTableColumn[]>,
    default: () => []
  }
})

let change1: any = null // 源目标数据序号
let change2: any = null // 目标数据序号
const editableData: any = reactive({})

const edit = (id: string) => {
  editableData[id] = {
    ...props.tableData.filter((item: any) => id === item.id)[0]
  }
}
const save = (id: string) => {
  if (!editableData[id].key || !editableData[id].title) {
    message.warning('标题和Key必填')
    return
  }
  Object.assign(
    props.tableData.filter((item: any) => id === item.id)[0],
    editableData[id]
  )
  delete editableData[id]
}
const cancel = (id: string) => {
  delete editableData[id]
}
const del = (id: string) => {
  emits(
    'del',
    props.tableData.filter((i: any) => !(id === i.id))
  )
}
const customRow = (record: any, index: number) => ({
  props: {
    // draggable: 'true'
  },
  style: {
    cursor: 'pointer'
  },
  // 鼠标移入
  onMouseenter: (event: any) => {
    // 兼容IE
    const ev = event || window.event
    ev.target.draggable = true // 让你要拖动的行可以拖动，默认不可以
  },
  // 开始拖拽
  onDragstart: (event: any) => {
    // 兼容IE
    const ev = event || window.event
    // 阻止冒泡
    ev.stopPropagation()
    // 得到源目标数据序号
    change1 = index
  },
  // 拖动元素经过的元素
  onDragover: (event: any) => {
    // 兼容 IE
    const ev = event || window.event
    // 阻止默认行为
    ev.preventDefault()
  },
  // 鼠标松开
  onDrop: (event: any) => {
    // 兼容IE
    const ev = event || window.event
    // 阻止冒泡
    ev.stopPropagation()
    // 得到目标数据序号
    change2 = index
    // 这里就是让数据位置互换，让视图更新 你们可以看record，index的输出，看是什么
    ;[props.tableData[change1], props.tableData[change2]] = [
      props.tableData[change2],
      props.tableData[change1]
    ]
  }
})
</script>

<style lang="scss" scoped></style>
