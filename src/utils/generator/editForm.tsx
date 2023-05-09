import { defineComponent, h } from 'vue'

const attrStr = `placeholder,disabled,value`

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    console.log(props.item)

    const tagObj: any = {
      'a-input': <a-input></a-input>
    }
    const eventObj: any = {
      onInput: (e: any) => {
        emit('update:value', e.target.value)
        emit('input', e.target.value)
      }
    }

    const propObj: any = {}
    const children: any = []

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
    console.log(propObj)

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
            : {})
        },
        { default: () => children }
      )
    return dom
  }
})
