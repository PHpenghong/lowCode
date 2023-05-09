import { defineComponent, h } from 'vue'

const attrStr = `placeholder,disabled,value`

const componentsChild: { [key: string]: any } = {
  'a-select': {
    options: (item: any) => {
      const list: any[] = []
      item.selectOption.options.map((i: any) => {
        list.push(
          <a-select-option
            value={i[item.selectOption.key]}
            disabled={item.disabled}
          >
            {i[item.selectOption.label]}
          </a-select-option>
        )
        return i
      })
      return list
    }
  }
}

export default defineComponent({
  props: {
    value: {
      type: [String, Array, Number],
      default: ''
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const tagObj: any = {
      slot: <slot></slot>,
      'a-input': <a-input></a-input>,
      'a-select': <a-select></a-select>,
      'a-range-picker': <a-range-picker></a-range-picker>
    }
    if (props.item.tag === 'slot') {
      return () => h(tagObj[props.item.tag], {}, { default: () => '插槽' })
    }
    const eventObj: any = {
      onInput: (e: any) => {
        emit('update:value', e.target.value)
        emit('input', e.target.value)
      },
      onChange: (val: any) => {
        emit('update:value', val)
        emit('change', val)
      }
    }

    const propObj: any = {}
    const children: any[] = []
    const childObj: any = componentsChild[props.item.tag]
    if (childObj) {
      Object.keys(childObj).map((i: any) => {
        const childFunc = childObj[i]
        if (props.item[i]) {
          children.push(childFunc(props.item, i))
        }
        return i
      })
    }

    const attrsArr = attrStr.split(',')
    Object.keys(props.item).map((i: any) => {
      if (~attrsArr.indexOf(i)) {
        propObj[i] = props.item[i]
      }
      return i
    })

    if (props.item.event && props.item.event.length > 0) {
      props.item.event.map((i: any) => {
        propObj[i] = eventObj[i]
        return i
      })
    }

    const dom: any = () =>
      h(
        tagObj[props.item.tag],
        {
          ...propObj,
          ...(props.item.value !== undefined
            ? { value: props.item.value }
            : {}),
          ...(props.item.placeholder !== undefined
            ? { placeholder: props.item.placeholder }
            : {}),
          ...(props.item.disabled !== undefined
            ? { disabled: props.item.disabled }
            : {}),
          ...(props.item.allowClear !== undefined
            ? { allowClear: props.item.allowClear }
            : {}),
          ...(props.item.mode !== undefined ? { mode: props.item.mode } : {}),
          ...(props.item.rules !== undefined ? { rules: props.item.rules } : {})
        },
        { default: () => children }
      )
    return dom
  }
})
