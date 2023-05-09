import { getCode } from '@/utils/random'

interface selectOption {
  key: string
  label: string
  options: any[]
}

export interface Format {
  key: string
  name?: string
  label?: string
  value?: any
  itemType?: string
  tag: string
  allowClear?: boolean

  slot?: boolean
  slotName?: string
  disabled?: boolean
  placeholder?: string | string[]
  rules?: any[] | any

  style?: { [key: string]: any }
  event?: string[]
  // 输入框
  enter?: boolean
  // 下拉
  selectOption?: selectOption // 静态下拉数据
  options?: boolean // true 静态 false 动态
  mode?: string
  maxTagCount?: number
  maxTagTextLength?: number
  // 时间
  showTime?: any
  format?: string
}

export const formatObj: { [key: string]: Format } = {
  'a-input': {
    key: getCode(),
    name: '',
    label: '',
    value: '',
    itemType: 'input',
    tag: 'a-input',
    slot: false,
    slotName: '',
    disabled: false,
    placeholder: '',
    event: ['onInput'],
    allowClear: true,
    enter: true,
    rules: []
  },
  'a-select': {
    key: getCode(),
    name: '',
    label: '',
    value: '',
    itemType: 'select',
    tag: 'a-select',
    slot: false,
    slotName: '',
    disabled: false,
    allowClear: true,
    placeholder: '',
    options: true,
    style: { width: '200px' },
    event: ['onChange'],
    mode: '', // ‘’ multiple | tags
    maxTagCount: 1,
    maxTagTextLength: 1,
    rules: [],
    selectOption: {
      key: 'key',
      label: 'label',
      options: []
    }
  },
  'a-range-picker': {
    key: getCode(),
    name: '',
    label: '',
    value: [],
    itemType: 'range-picker',
    tag: 'a-range-picker',
    slot: false,
    style: { width: '300px' },
    // showTime: { format: 'defaultFormat' },
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: ['开始时间', '结束时间'],
    event: ['onChange'],
    rules: []
  },
  slot: {
    key: getCode(),
    name: '',
    label: '',
    value: '',
    tag: 'slot',
    slot: true,
    slotName: '',
    itemType: 'slot'
  }
  // date: {},
  // slot: {}
  // selects: {},
  // selects: {},
}
