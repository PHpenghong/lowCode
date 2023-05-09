let timeout: any = null

let lastTime: any
let timer: any

// 防抖  debounce
export function debounce(fn: any, wait: any = 500) {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}

// 节流  throttle
export function throttle(fn: any, wait = 200) {
  const now = +new Date()
  if (lastTime && lastTime - now < 2000) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    fn()
    lastTime = +new Date()
    clearTimeout(timer)
  }, wait)
}
