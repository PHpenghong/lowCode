export const inputComponents: any[] = [
  {
    label: '单行文本',
    value: '',
    tag: 'a-input',
    tagIcon: 'input',
    placeholder: '请输入',
    style: { width: '100%' },
    allowClear: true,
    maxlength: null,
    readonly: false,
    disabled: false,
    required: true,
    rules: [{ required: true, message: '值不能为空' }],
    changeTag: true
  },
  {
    label: '多行文本',
    name: 'textarea ',
    value: '',
    tag: 'a-textarea ',
    tagIcon: 'textarea ',
    placeholder: '请输入',
    style: { width: '100%' },
    allowClear: true,
    maxlength: null,
    autoSize: {
      minRows: 3,
      maxRows: 3
    },
    showCount: false,
    readonly: false,
    disabled: false,
    required: true,
    rules: [{ required: true, message: '值不能为空' }],
    changeTag: true
  }
]

export const selectComponents: any[] = [
  {
    label: '下拉选择',
    tag: 'a-select',
    value: '',
    tagIcon: 'select',
    placeholder: '请选择',
    style: { width: '100%' },
    allowClear: true,
    disabled: false,
    required: true,
    mode: '',
    maxTagCount: 1,
    options: [
      {
        label: '选项一',
        value: 1
      },
      {
        label: '选项二',
        value: 2
      }
    ],
    rules: [{ required: true, message: '值不能为空' }],
    changeTag: true
  },
  {
    label: '树选择',
    tag: 'a-tree-select',
    value: '',
    tagIcon: 'treeSelect',
    placeholder: '请选择',
    style: { width: '100%' },
    allowClear: true,
    disabled: false,
    required: true,
    multiple: false,
    maxTagCount: 1,
    listHeight: 256,
    rules: [{ required: true, message: '值不能为空' }],
    changeTag: true,
    fieldNames: { children: 'children', label: 'title', value: 'value' },
    treeCheckable: false
  },
  {
    label: '日期选择',
    tag: 'a-date-picker',
    value: '',
    placeholder: '选择日期',
    style: { width: '100%' },
    allowClear: true,
    showTime: true,
    showNow: true,
    showToday: true,
    tagIcon: 'date',
    disabled: false,
    required: true,
    rules: [{ required: true, message: '值不能为空' }],
    changeTag: true
  },
  {
    label: '开关',
    tag: 'a-switch',
    valuePropName: 'checked',
    checked: false,
    tagIcon: 'switch',
    disabled: false,
    changeTag: true,
    required: true,
    rules: [{ required: true, message: '值不能为空' }],
    checkedChildren: '',
    unCheckedChildren: ''
  },
  {
    label: '单选框组',
    tag: 'a-radio-group',
    style: { width: '100%' },
    value: '',
    tagIcon: 'radio ',
    optionType: 'default ',
    disabled: false,
    changeTag: true,
    required: true,
    options: [
      {
        label: '选项一',
        value: 'one'
      },
      {
        label: '选项二',
        value: 'two'
      }
    ],
    rules: [{ required: true, message: '值不能为空' }]
  },
  {
    label: '多选框组',
    tag: 'a-checkbox-group',
    value: [],
    checkboxName: 'checkboxName',
    style: { width: '100%' },
    tagIcon: 'checkbox ',
    disabled: false,
    changeTag: true,
    required: true,
    options: [
      {
        label: '选项一',
        value: 'one'
      },
      {
        label: '选项二',
        value: 'two'
      }
    ],
    rules: [{ required: true, message: '值不能为空' }]
  }
]
