import { createApp, defineAsyncComponent, h } from 'vue'
import type { MessageParams } from './types'

const MessageComponent = defineAsyncComponent(() => import('./message.vue'))

const Message = {
  open(params: MessageParams) {
    const div = document.createElement('div')
    const body = document.querySelector('body') as HTMLBodyElement
    let { duration } = params
    if (duration === undefined) {
      duration = 3000
    }
    body.appendChild(div)
    const msg = h(MessageComponent, { text: params.text, type: params.type })
    const app = createApp({
      render() {
        return msg
      }
    })
    app.mount(div)

    let timer: any | null = null
    const close = () => {
      msg?.component?.exposed?.closeMessage?.()
      setTimeout(() => {
        app.unmount()
        div.remove()
        clearTimeout(timer)
        timer = null
      }, 500)
    }
    if (duration > 0) {
      timer = setTimeout(() => {
        close()
      }, duration)
    }

    return {
      close: () => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        close()
      }
    }
  }
}

export default Message
