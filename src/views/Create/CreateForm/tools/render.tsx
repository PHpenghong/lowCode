import { defineComponent, h, PropType } from 'vue'

const attrStr = `placeholder,disabled,value,class,style`

const componentsChild: { [key: string]: any } = {
  'a-select': {
    options: (element: any) => {
      const list: any[] = []
      element.options.map((i: any) => {
        list.push(
          <a-select-option value={i.key} disabled={element.disabled}>
            {i.label}
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
    element: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const tagObj: any = {
      slot: <slot></slot>,
      'a-input': <a-input />,
      'a-textarea ': <a-textarea />,
      'a-select': <a-select />,
      'a-tree-select': <a-tree-select />,
      'a-switch': <a-switch />,
      'a-range-picker': <a-range-picker />,
      'a-date-picker': <a-date-picker />,
      'a-radio-group': <a-radio-group />,
      'a-checkbox-group': <a-checkbox-group />
    }

    const propObj: any = {}
    const children: any[] = []
    const childObj: any = componentsChild[props.element.tag]
    if (childObj) {
      Object.keys(childObj).map((i: any) => {
        const childFunc = childObj[i]
        if (props.element[i]) {
          children.push(childFunc(props.element, i))
        }
        return i
      })
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

    const attrsArr = attrStr.split(',')
    Object.keys(props.element).map((i: any) => {
      if (~attrsArr.indexOf(i)) {
        propObj[i] = props.element[i]
      }
      return i
    })

    if (props.element.event && props.element.event.length > 0) {
      props.element.event.map((i: any) => {
        propObj[i] = eventObj[i]
        return i
      })
    }

    const dealWithEl = (el: any, key: string) =>
      el[key] !== undefined ? { [key]: el[key] } : {}

    console.log(props.element)

    return () =>
      h(tagObj[props.element.tag], {
        ...propObj,
        ...dealWithEl(props.element, 'value'),
        ...dealWithEl(props.element, 'checked'),
        ...dealWithEl(props.element, 'placeholder'),
        ...dealWithEl(props.element, 'disabled'),
        ...dealWithEl(props.element, 'allowClear'),
        ...dealWithEl(props.element, 'mode'),
        ...dealWithEl(props.element, 'showTime'),
        ...dealWithEl(props.element, 'showNow'),
        ...dealWithEl(props.element, 'showToday'),
        ...dealWithEl(props.element, 'optionType'),
        ...dealWithEl(props.element, 'options'),
        ...dealWithEl(props.element, 'autoSize'),
        ...dealWithEl(props.element, 'maxlength'),
        ...dealWithEl(props.element, 'treeCheckable'),
        ...dealWithEl(props.element, 'showCount'),
        ...dealWithEl(props.element, 'valuePropName'),
        ...dealWithEl(props.element, 'checkedChildren'),
        ...dealWithEl(props.element, 'unCheckedChildren')
      })
  }
})
