import request from '@/utils/request'

const maxLimit = 6
const requestQueue: any[] = []
let currentConcurrent = 0

export default async function requestDecorator(param: any, config = {}) {
  if (currentConcurrent >= maxLimit) {
    await startBlocking()
  }
  try {
    currentConcurrent++
    const result: any = await request(param, config)
    return Promise.resolve(result)
  } catch (err) {
    return Promise.reject(err)
  } finally {
    currentConcurrent--
    next()
  }
}

function startBlocking() {
  let _resolve
  const promise2: any = new Promise((resolve) => {
    _resolve = resolve
  })
  requestQueue.push(_resolve)
  return promise2
}

function next() {
  if (requestQueue.length <= 0) return
  const _resolve = requestQueue.shift()
  _resolve()
}
