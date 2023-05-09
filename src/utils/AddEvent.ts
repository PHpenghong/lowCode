import { onMounted, onUnmounted } from 'vue'

export function useEvent(type: string, fn: any) {
  console.log('in===')

  onMounted(() => {
    console.log('in-------o')

    if (type) window.addEventListener(type, fn)
  })
  onUnmounted(() => {
    if (type) window.removeEventListener(type, fn)
  })
}
