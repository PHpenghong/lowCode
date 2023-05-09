import { defineComponent, defineAsyncComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    element: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    selectId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const render = defineAsyncComponent(() => import('./render'))
    const SvgIcon = defineAsyncComponent(
      () => import('@/components/SvgIcon/index.vue')
    )
    const resFunc = () => (
      <a-form-item
        key={props.element.id}
        class={props.element.id === props.selectId ? 'components-item' : ''}
        rules={props.element.rules}
        label={props.element.label}
        name={props.element.name}
      >
        <section class="formItemSec">
          <section class="textAlignLeft">
            <render
              element={props.element}
              v-model:value={props.element.value}
            />
          </section>
          <section class="actionsIcon">
            <SvgIcon
              size={1.2}
              class="iconClass"
              name="copy"
              onClick={(event: any) => {
                emit('copyFormItem', props.element)
                event.stopPropagation()
              }}
            />
            <SvgIcon
              size={1.2}
              class="iconClass"
              name="delete"
              onClick={(event: any) => {
                emit('delFormItem', props.element.id)
                event.stopPropagation()
              }}
            />
          </section>
        </section>
      </a-form-item>
    )

    return () => resFunc()
  }
})
