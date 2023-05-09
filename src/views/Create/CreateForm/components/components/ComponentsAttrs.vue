<template>
  <div>
    <a-form
      :model="props.selectFormItem"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <LineTitle>字段信息</LineTitle>
      <a-form-item v-if="props.selectFormItem.changeTag" label="组件类型">
        <a-select
          v-model:value="props.selectFormItem.tagIcon"
          style="width: 220px"
          @change="changeTagType"
        >
          <a-select-opt-group label="输入型组件">
            <a-select-option
              v-for="item in inputComponents"
              :key="item.tagIcon"
              :value="item.tagIcon"
              >{{ item.label }}</a-select-option
            >
          </a-select-opt-group>
          <a-select-opt-group label="选择型组件">
            <a-select-option
              v-for="item in selectComponents"
              :key="item.tagIcon"
              :value="item.tagIcon"
              >{{ item.label }}</a-select-option
            >
          </a-select-opt-group>
        </a-select>
      </a-form-item>
      <a-form-item v-if="props.selectFormItem.label !== undefined" label="标题">
        <a-input v-model:value="props.selectFormItem.label" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.name !== undefined"
        label="字段名"
      >
        <a-input v-model:value="props.selectFormItem.name" />
      </a-form-item>
      <LineTitle>基础属性</LineTitle>
      <a-form-item
        v-if="
          props.selectFormItem.placeholder !== undefined &&
          props.selectFormItem.tag !== 'a-range-picker'
        "
        label="占位提示"
      >
        <a-input v-model:value="props.selectFormItem.placeholder" />
      </a-form-item>
      <a-form-item
        v-if="
          props.selectFormItem.placeholder !== undefined &&
          props.selectFormItem.tag === 'a-range-picker'
        "
        label="占位提示"
      >
        <a-input
          v-model:value="props.selectFormItem.placeholder[0]"
          placeholder="开始占位提示"
        />&nbsp;
        <a-input
          v-model:value="props.selectFormItem.placeholder[1]"
          placeholder="结束占位提示"
        />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem?.style?.width !== undefined"
        label="组件宽度"
      >
        <a-input v-model:value="props.selectFormItem.style.width" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.checkboxName !== undefined"
        label="Name属性"
      >
        <a-input v-model:value="props.selectFormItem.checkboxName" />
      </a-form-item>
      <!-- <a-form-item label="前缀"></a-form-item>
      <a-form-item label="后缀"></a-form-item> -->
      <a-form-item
        v-if="props.selectFormItem.maxlength !== undefined"
        label="最多输入"
      >
        <a-input-number
          v-model:value="props.selectFormItem.maxlength"
          addon-before=""
          addon-after="个字符"
        />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.autoSize !== undefined"
        label="最低行数"
      >
        <a-input-number
          v-model:value="props.selectFormItem.autoSize.minRows"
          addon-before=""
          addon-after="行"
        />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.autoSize !== undefined"
        label="最高行数"
      >
        <a-input-number
          v-model:value="props.selectFormItem.autoSize.maxRows"
          addon-before=""
          addon-after="行"
        />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.listHeight !== undefined"
        label="滚动高度"
      >
        <a-input-number
          v-model:value="props.selectFormItem.listHeight"
          addon-before=""
          addon-after="px"
        />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.mode !== undefined"
        label="选择模式"
      >
        <a-radio-group
          v-model:value="props.selectFormItem.mode"
          name="radioGroupMode"
          @change="valueChange(props.selectFormItem)"
        >
          <a-radio value="">默认</a-radio>
          <a-radio value="multiple">多选</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.optionType !== undefined"
        label="类型"
      >
        <a-radio-group
          v-model:value="props.selectFormItem.optionType"
          name="radioGroupMode"
        >
          <a-radio value="default">默认</a-radio>
          <a-radio value="button">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-if="
          props.selectFormItem.tag == 'a-date-picker' ||
          props.selectFormItem.tag == 'a-range-picker'
        "
        label="选择模式"
      >
        <a-radio-group
          v-model:value="props.selectFormItem.tag"
          name="radioGroupMode"
          @change="dateModeChange"
        >
          <a-radio value="a-date-picker">日期</a-radio>
          <a-radio value="a-range-picker">日期范围</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.multiple !== undefined"
        label="是否多选"
      >
        <a-switch
          v-model:checked="props.selectFormItem.multiple"
          @change="valueChange(props.selectFormItem)"
        />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.showCount !== undefined"
        label="是否显示字数"
      >
        <a-switch v-model:checked="props.selectFormItem.showCount" />
      </a-form-item>
      <a-form-item
        v-if="
          (props.selectFormItem.mode || props.selectFormItem.multiple) &&
          props.selectFormItem.maxTagCount !== undefined
        "
        label="显示Tag数"
      >
        <a-input-number
          v-model:value="props.selectFormItem.maxTagCount"
          addon-before=""
          addon-after="个"
        />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.showTime !== undefined"
        label="时间选择"
      >
        <a-switch v-model:checked="props.selectFormItem.showTime" />
      </a-form-item>
      <a-form-item
        v-if="
          props.selectFormItem.showNow !== undefined &&
          props.selectFormItem.showTime !== undefined &&
          props.selectFormItem.showTime &&
          props.selectFormItem.tag === 'a-date-picker'
        "
        label="快选“此刻”"
      >
        <a-switch v-model:checked="props.selectFormItem.showNow" />
      </a-form-item>
      <a-form-item
        v-if="
          props.selectFormItem.showToday !== undefined &&
          props.selectFormItem.showTime !== undefined &&
          !props.selectFormItem.showTime &&
          props.selectFormItem.tag === 'a-date-picker'
        "
        label="快选“今天”"
      >
        <a-switch v-model:checked="props.selectFormItem.showToday" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.treeCheckable !== undefined"
        label="显示多选框"
      >
        <a-switch v-model:checked="props.selectFormItem.treeCheckable" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.checkedChildren !== undefined"
        label="打开时内容"
      >
        <a-input v-model:value="props.selectFormItem.checkedChildren" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.unCheckedChildren !== undefined"
        label="关闭时内容"
      >
        <a-input v-model:value="props.selectFormItem.unCheckedChildren" />
      </a-form-item>
      <LineTitle>公共属性</LineTitle>
      <a-form-item
        v-if="props.selectFormItem.allowClear !== undefined"
        label="能否清空"
      >
        <a-switch v-model:checked="props.selectFormItem.allowClear" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.readonly !== undefined"
        label="是否只读"
      >
        <a-switch v-model:checked="props.selectFormItem.readonly" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.disabled !== undefined"
        label="是否禁用"
      >
        <a-switch v-model:checked="props.selectFormItem.disabled" />
      </a-form-item>
      <a-form-item
        v-if="props.selectFormItem.required !== undefined"
        label="是否必填"
      >
        <a-switch
          v-model:checked="props.selectFormItem.required"
          @change="requiredChange"
        />
      </a-form-item>
      <TreeSelect
        v-if="props.selectFormItem.fieldNames !== undefined"
        :field-names="props.selectFormItem.fieldNames"
      />
      <SelectVal
        v-if="props.selectFormItem.options !== undefined"
        :options="props.selectFormItem.options"
      />
      <Regular
        v-if="props.selectFormItem.rules !== undefined"
        :rules="props.selectFormItem.rules"
      />
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, defineProps, PropType, defineEmits } from 'vue'
import { inputComponents, selectComponents } from '../../tools/config'

const LineTitle = defineAsyncComponent(() => import('./LineTitle.vue'))
const TreeSelect = defineAsyncComponent(() => import('./TreeSelect.vue'))
const Regular = defineAsyncComponent(() => import('./Regular.vue'))
const SelectVal = defineAsyncComponent(() => import('./SelectVal.vue'))

const emits = defineEmits(['changeTagType'])
const props = defineProps({
  selectFormItem: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const requiredChange = (checked: boolean) => {
  if (checked) {
    props.selectFormItem.rules.push({ required: true, message: '值不能为空' })
  } else {
    props.selectFormItem.rules = props.selectFormItem.rules.filter(
      (i: any) =>
        JSON.stringify(i) !==
        JSON.stringify({ required: true, message: '值不能为空' })
    )
  }
}
const changeTagType = (value: string) => {
  emits('changeTagType', value)
}

const dateModeChange = () => {
  if (props.selectFormItem.tag === 'a-range-picker') {
    props.selectFormItem.value = []
    props.selectFormItem.placeholder = ['选择开始日期', '选择结束日期']
  } else {
    props.selectFormItem.value = ''
    props.selectFormItem.placeholder = '选择日期'
  }
}

const valueChange = (item: any) => {
  console.log(typeof item.value)

  item.value = typeof item.value === 'string' ? [] : ''
}
</script>

<style lang="scss" scoped>
.line_art {
  background-color: #dcdfe6;
  position: relative;
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
}
:deep .ant-form-item-control-input-content {
  text-align: left;
}
</style>
