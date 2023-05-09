import { defineComponent, defineAsyncComponent } from 'vue'
// import { componentsChild } from '../../../ts/config'

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const render = defineAsyncComponent(
      () => import('@/views/Create/CreateTable/ts/render')
    )

    const onClick = (el: any) => {
      emit('onClick', el, props.item)
    }
    return () => (
      <a-form-item
        key={props.item.key}
        label={props.item.label}
        name={props.item.name}
        onClick={onClick}
        class={['width200', 'formItemClass']}
      >
        <render
          key={props.item.key}
          item={props.item}
          v-model:value={props.item.value}
        />
      </a-form-item>
    )
  }
})
