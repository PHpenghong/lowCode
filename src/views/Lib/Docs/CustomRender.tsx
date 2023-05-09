import { defineComponent, compile, VNode, h } from 'vue'

export default defineComponent({
  props: {
    html: { type: String, required: true }
  },
  computed: {
    template(): string {
      return this.html
    }
  },
  render(): VNode {
    return h(compile(this.template), { ...this.$attrs })
  }
})
