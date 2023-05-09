import { onUnmounted } from 'vue'

export function useDebounce(fn: any, wait = 1000) {
  let timer: any = null
  const clear = () => {
    clearTimeout(timer)
    timer = null
  }

  const res = () => {
    if (timer) {
      clear()
    }
    timer = setTimeout(() => {
      fn()
      clear()
    }, wait)
  }

  onUnmounted(() => {
    clear()
  })

  return res
}
