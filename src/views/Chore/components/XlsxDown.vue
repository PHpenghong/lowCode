<template>
  <div>
    <section class="card_sec_xlsx">
      <Xlsx
        v-for="item in state.cardList"
        :key="item.id"
        v-model:data="item.data"
        v-model:key-arr="item.key"
        v-model:key-obj="item.keyObj"
        v-model:other="item.other"
        v-model:fileName="item.fileName"
        :form="item.form"
        @del="delCard"
      />
    </section>
    <section>
      <a-button type="primary" @click="addCard">新增</a-button>&nbsp;
      <a-button type="primary" @click="cache">缓存</a-button>&nbsp;
      <a-button type="primary" @click="readCache">读取缓存</a-button>&nbsp;
      <a-button type="primary" @click="download">下载</a-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue'
import * as XLSX from 'xlsx/xlsx.mjs'
import { getCode } from '@/utils/random'
// import { clone } from '@/utils/tools'

const Xlsx = defineAsyncComponent(() => import('./xlsx.vue'))

const state = ref<any>({
  cardList: [],
  header: []
})

onMounted(() => {
  addCard()
})

const workbook2blob = (workbook: any) => {
  // 生成excel的配置项
  const wopts = {
    // 要生成的文件类型
    bookType: 'xlsx',
    // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: 'binary'
  }
  const wbout = XLSX.write(workbook, wopts)
  // 将字符串转ArrayBuffer
  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  const buf = s2ab(wbout)
  const blob = new Blob([buf], {
    type: 'application/octet-stream'
  })
  return blob
}

// 将blob对象 创建bloburl,然后用a标签实现弹出下载框
const openDownloadDialog = (blob: any, fileName: string) => {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = blob
  // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
  aLink.download = fileName || ''
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  //   移动端
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
  }
  aLink.dispatchEvent(event)
}

const download = () => {
  // down(he())
  turnKey()
}

const turnKey = () => {
  state.value.cardList.map((i: any) => {
    down([...i.data, ...i.other], i.fileName)
    return i
  })
}

const down = (data: any, fileName = '统计.xlsx') => {
  const sheet1 = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, sheet1, 'Sheet1')
  const workbookBlob = workbook2blob(wb)
  openDownloadDialog(workbookBlob, fileName)
}

// const keyName = (str: string, strArr: string[], num = 1): string => {
//   const title = `${str}${num > 1 ? num : ''}`
//   if (~strArr.indexOf(title)) {
//     return keyName(`${str}`, strArr, num + 1)
//   }
//   return title
// }

const addCard = () => {
  state.value.cardList.push({
    id: getCode(),
    data: [],
    keyObj: {},
    key: [],
    other: [],
    fileName: '',
    form: {
      colKey: '',
      key: '',
      keyStart: 0,
      keyLength: 1,
      readCol: []
    }
  })
}

const cache = () => {
  localStorage.setItem('xlsxData', JSON.stringify(state.value.cardList))
}

const readCache = () => {
  state.value.cardList = JSON.parse(localStorage.getItem('xlsxData') || '[]')
  console.log(
    '🚀 ~ file: index.vue:153 ~ readCache ~ state.value.cardList',
    state.value.cardList
  )
}

// const assignObj = (obj2: any, obj1: any) => {
//   const set = new Set()
//   const res: any = {}
//   Object.keys(obj1).map((i: string) => {
//     if (i !== 'key') {
//       const title = keyName(i, Object.keys(res))
//       set.add(title)
//       res[title] = obj1[i] || ''
//     }
//     return i
//   })
//   Object.keys(obj2).map((i: string) => {
//     if (i !== 'key') {
//       const title = keyName(i, Object.keys(res))
//       set.add(title)
//       res[title] = obj2[i] || ''
//     }
//     return i
//   })
//   return res
// }

// const dealWithRow = (obj: any, arr: any) => {
//   const res: any[] = []
//   arr.map((i: any) => {
//     res.push(assignObj(obj, i))
//     return i
//   })
//   return res
// }

// const he = () => {
//   const keyObj1 = clone(state.value.cardList[0]).keyObj
//   const keyObj2 = clone(state.value.cardList[1]).keyObj
//   // const mapArr = state.value.cardList[0].data

//   let res: any[] = []
//   Object.keys(clone(keyObj2)).map((str: string) => {
//     if (keyObj1[str]) {
//       res = [...res, ...dealWithRow(keyObj2[str][0], keyObj1[str])]
//       delete keyObj1[str]
//       delete keyObj2[str]
//     }
//     return str
//   })
//   Object.keys(keyObj1).map((i: string) => {
//     res = [...res, ...keyObj1[i]]
//     return i
//   })
//   Object.keys(keyObj2).map((i: string) => {
//     res = [...res, ...keyObj2[i]]
//     return i
//   })

//   return res
// }

const delCard = (id: string) => {
  if (state.value.cardList.length === 1) return
  state.value.cardList = state.value.cardList.filter((i: any) => i.id != id)
}
</script>

<style lang="scss" scoped>
.card_sec_xlsx {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
}
</style>
