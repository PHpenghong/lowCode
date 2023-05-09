import { saveAs } from 'file-saver'
// import beautifier from 'js-beautify'

/**
 * dealWithJs : 对象或数组类型 转 字符串
 *
 * jsFormat : table col param res 等模版
 *
 * downFormVue : Form.vue
 *
 * downTableVue : Table.vue
 *
 * downPackage  : 整套
 */

// table col param res 等模版
export const jsFormat = (
  data: any,
  info: any,
  isParam = true,
  isRes = true,
  isExport = true
) =>
  `${isExport ? 'export' : ''} const ${info.key}Col = ${dealWithJs(
    dealWithData(data, info.lib)
  )}
  
  ${isParam ? dealWithParam(info.key) : ''}
  
  ${isRes ? dealWithRes(info.key) : ''}`

const dealWithData = (data: any, lib: string) =>
  data.map((i: any) => {
    delete i.id
    i.dataIndex = i.key
    if (lib === '2') {
      i.slots = {
        customRender: i.key
      }
    }
    return i
  })

const isArray = (data: any | any[]) =>
  Object.prototype.toString.call(data) === '[object Array]'

const jsonType: { [key: string]: string } = { '{': '}', '[': ']' }

const dealWithParam = (name: string) => `
export const ${name}Param = (page: number, pageSize: number, param: any) => ({
    page,
    page_size: pageSize,
    ...param
})`

const dealWithRes = (name: string) => `
export const ${name}Res = (res: any) => {
    let data = []
    let total = 0
    if (res.code == 0) {
      data = res.data.data || []
      total = res.data.total || 0
    } else {
      // codeErr(res)
    }
    return [data, total]
}`

// 对象或数组类型 转 字符串
export const dealWithJs = (data: any | any[]) => {
  const type = typeof data
  if (type !== 'object') {
    return type === 'string' ? `'${data}'` : data
  }
  if (data == null) {
    return data
  }
  const isArr = isArray(data)
  const startStr = isArr ? '[' : '{'
  let centerStr = ''
  const endStr = jsonType[startStr]
  if (isArr) {
    data.map((item: any, index: number) => {
      centerStr = `${centerStr}${dealWithJs(item)}${
        index === data.length - 1 ? '' : ',\n'
      }`
      return item
    })
  } else {
    const arr = Object.keys(data)
    arr.map((item: any, index: number) => {
      centerStr = `${centerStr}${item}: ${dealWithJs(data[item])}${
        index === arr.length - 1 ? '' : ',\n'
      }`
      return item
    })
  }

  return `${startStr}\n\n${centerStr}\n\n${endStr}`
}

export const vueFormat = (str: string, className = '') => `<template>
  <div class="${className}">
    ${str}
  </div>
</template>`

export const scriptFormat = (str: string) => `
<script setup lang="ts">
${str}
</script>`

export const cssFormat = (str: string) => `
<style lang="scss" scoped>
${str}
</style>`

/**
 * Form.vue
 *
 * @param data FormData
 */
export const downFormVue = (data: any, actionsBtn: string[]) => {
  const formState: { [key: string]: any } = {}
  const dateTag: { [key: string]: any } = {}
  data.map((i: any) => {
    if (i.tag === 'a-range-picker') {
      dateTag[i.name] = false
    } else {
      formState[i.name] = ''
    }

    return i
  })
  const templateStr = vueFormat(
    inlineFormTemplateStr(data, dateTag, actionsBtn)
  )
  const vueSetupStr = scriptFormat(vueSetup(formState, dateTag, actionsBtn))
  const styleStr = formVueStyle()
  return `${templateStr}\n${vueSetupStr}\n${styleStr}`
}

const vueSetup = (
  formState: { [key: string]: any },
  dateTag: { [key: string]: any },
  actionsBtn: string[]
) => {
  const str = `import {  ${
    Object.keys(dateTag).length > 0 ? 'reactive,' : ''
  } ${
    Object.keys(dateTag).length > 0 ? 'onBeforeUnmount, ' : ''
  }defineEmits, defineProps, PropType } from 'vue'

  const emits = defineEmits([${
    ~actionsBtn.indexOf('add') ? `'add',` : ''
  }'search'])
  const props = defineProps({
    form: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  })

  ${
    Object.keys(dateTag).length > 0
      ? `let timer:any = null
        const formState = reactive({
          ${dateValueFunc(dateTag)}
        })`
      : ''
  }

  ${
    Object.keys(dateTag).length > 0
      ? `const disabledDate = (current: any) => current && new Date(current).getTime() > new Date().getTime()

      const turnNum = (time:any) => {
        if (time) {
          return Math.floor(((new Date(time)).getTime()) / 1000)
        }
        return 0
      }`
      : ''
  }
  ${
    ~actionsBtn.indexOf('add')
      ? `const add = () => {
    emits('add')
  }`
      : ''
  }
  const search = () => {
    ${dateSearchFormFunc(dateTag)}
    emits('search', true)
  }
  
  const reset = () => {
    ${ResetFormFunc(formState, dateTag)}
    ${
      Object.keys(dateTag).length > 0
        ? `timer = setTimeout(() => {
          search()
          clearTimeout(timer)
          timer = null
        }, 100)`
        : ''
    }
  }
  
  ${
    Object.keys(dateTag).length > 0
      ? `onBeforeUnmount(() => {
        clearTimeout(timer)
        timer = null
      })`
      : ''
  }
`
  return str
}

const dateValueFunc = (dateTag: { [key: string]: any }) => {
  let str = ''
  Object.keys(dateTag).map((s: string) => {
    str = `${str}${str ? '\n' : ''}${s}: []`
    return s
  })
  return str
}
const dateSearchFormFunc = (dateTag: { [key: string]: any }) => {
  let res = ''
  Object.keys(dateTag).map((s: string, index: number) => {
    res = `${res}${res ? '\n' : ''}if (formState.${s}.length > 0) {
      props.form.start_time${index} = turnNum(formState.${s}[0])
      props.form.end_time${index} = turnNum(formState.${s}[1])
    } else {
      props.form.start_time${index} = 0
      props.form.end_time${index} = 0
    }`
    return s
  })
  return res
}

const ResetFormFunc = (
  formState: { [key: string]: any },
  dateTag: { [key: string]: any }
) => {
  let str = ''
  const formKey = Object.keys(formState)
  const dateKey = Object.keys(dateTag)
  if (formKey.length > 0) {
    str = `Object.keys(props.form).map((i:string) => {
      props.form[i] = ''
      return i
    })`
  }
  dateKey.map((s: string, index: number) => {
    str = `${str}${str ? '\n' : ''}formState.${s}.splice(0)
    props.form.start_time${index} = 0
    props.form.end_time${index} = 0`
    return s
  })
  return str
}

// formItem children
const formChildEl: { [key: string]: any } = {
  'a-select': (option: any) => {
    let str = ''
    option.map((i: any) => {
      str = `${str}\n<a-select-option value="${i.key}">${i.label}</a-select-option>`
      return i
    })
    return str
  }
}

// formItem
const formEl: any = {
  'a-input': (item: any) =>
    `<a-input v-model:value="props.form.${item.name}" 
    placeholder="${item.placeholder}"
    ${item.disabled ? ' disabled' : ''}
    ${item.allowClear ? ' allowClear' : ''}
    ${item.enter ? '@keyup.enter="search"' : ''}/>`,
  'a-select': (item: any) =>
    `<a-select v-model:value="props.form.${item.name}" 
    ${item.disabled ? ' disabled' : ''}
    ${item.allowClear ? ' allowClear' : ''} 
    style="width: 220px">
      ${
        item.options
          ? formChildEl[item.tag](item.selectOption.options)
          : '<!-- <a-select-option v-for="item in dataArr" :key="item.value" :value="item.value">{{item.label}}</a-select-option> -->'
      }
    </a-select>`,
  'a-range-picker': (item: any) => `<a-range-picker 
    :disabled-date="disabledDate"
    v-model:value="formState.${item.name}"
    :show-time="{ format: 'HH:mm:ss' }"
    format="YYYY-MM-DD HH:mm:ss"
    :placeholder="['开始时间', '结束时间']">
  </a-range-picker>`
}

const formItemStr = (
  item: any,
  isRule: boolean,
  dateTag: { [key: string]: any }
) => `<a-form-item label="${item.label}"${
  isRule ? ` name="${item.name}" :rules="${item.rules}"` : ''
}>
    ${formEl[item.tag](item, dateTag)}
  </a-form-item>
  `

const inlineFormTemplateStr = (
  formData: any[],
  dateTag: { [key: string]: any },
  actionsBtn: string[]
) => {
  let itemStr = ''
  formData.map((i: any) => {
    itemStr = `${itemStr}${itemStr ? '\n' : ''}${formItemStr(
      i,
      i.rules.length > 0,
      dateTag
    )}`
    return i
  })
  return `<div class="formDiv">
    <a-form layout="inline">
      ${itemStr}
      <a-form-item>
        <a-button class="btns" @click="search" type="primary">查询</a-button>
        <a-button class="btns" @click="reset" >重置</a-button>
      </a-form-item>
    </a-form>
    ${
      ~actionsBtn.indexOf('add')
        ? `<section class="right-btns">
            <a-button class="btns" @click="add">新增</a-button>
          </section>`
        : ''
    }
  </div>`
}

const formVueStyle = () =>
  cssFormat(`.formDiv{
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    :deep .btns{
      margin-left: 10px;
    }
  }`)

export const downTableVue = (
  pageInfo: any,
  tableData: any[],
  formData: any[],
  actionsBtn: string[],
  isForm = false
) => {
  const vueTemplate: string = vueFormat(
    vueTemplateStr(pageInfo, tableData, actionsBtn, isForm),
    pageInfo.key
  )
  const setupStr: string = scriptFormat(
    jsSetupStr(formData, actionsBtn, pageInfo)
  )
  const cssStr: string = cssFormat('')
  return `${vueTemplate}\n${setupStr}\n${cssStr}`
}

const vueTemplateStr = (
  pageInfo: any,
  tableData: any[],
  actionsBtn: string[],
  isForm: boolean
) => {
  const res = `<p-table
  ref="searchTable"
  :slotList="[${tableData.map((i: any) => `'${i.key}'`).join(', ')}]"
  :form="formState"
  title="${pageInfo.title}"
  :file-module="state.module"
  rowKey="id"
  ${~actionsBtn.indexOf('checked') ? '' : ':isRowSelect="false"'}
  ${~actionsBtn.indexOf('batchRow') ? ':returnRow="true"' : ''}
  :pageSize="10"
  :pageSizeArr="['10', '20', '30', '40', '50']"
  :req="search"
  columnsKey="${pageInfo.key}Col"
  paramName="${pageInfo.key}Param"
  resName="${pageInfo.key}Res">
  ${
    isForm
      ? `<template #form>
  <Form :form="formState" @search="searchFunc" ${
    ~actionsBtn.indexOf('add') ? '@add="add"' : ''
  }/>
</template>`
      : ''
  }
  ${
    ~actionsBtn.indexOf('checked')
      ? `<template #alertFunc="{selectedRowKeys}">
        ${
          ~actionsBtn.indexOf('batchDel')
            ? `<a-button type="primary" danger style="margin-right: 20px" size="default" @click="batch(selectedRowKeys, 'del')">
                批量删除
              </a-button>`
            : ''
        }
        </template>`
      : ''
  }
  ${tableSlotStr(tableData)}
  ${
    actionsBtn.length > 0
      ? `<template #actions="{row}">
        ${
          ~actionsBtn.indexOf('details')
            ? `<a-button type="link" @click="details(row)">详情</a-button>`
            : ''
        }
        ${
          ~actionsBtn.indexOf('add')
            ? `<a-button type="link" @click="edit(row)">编辑</a-button>`
            : ''
        }
        ${
          ~actionsBtn.indexOf('del')
            ? `<a-button type="link" danger @click="del([row.id])">删除</a-button>`
            : ''
        }
        </template>`
      : ''
  }
  </p-table>
  ${
    ~actionsBtn.indexOf('add')
      ? `<!-- <Add
  :visible="state.visible"
  visible-str="visibleAdd"
  :actions-type="state.actionsType"
  :edit-data="state.editData"
/> -->`
      : ''
  }
  ${
    ~actionsBtn.indexOf('details')
      ? `<!-- <Details
  :visible="state.visible"
  visible-str="visibleDetails"
  :details-data="state.detailsData"
/> -->`
      : ''
  }`
  return res
}

const tableSlotStr = (tableData: any[]) => {
  let res = ''
  tableData.map((i: any) => {
    if (i.key !== 'actions') {
      res = `${res}${res ? '\n' : ''}${slotTemplate(i.key)}`
    }
    return i
  })
  return res
}

const slotTemplate = (slotName: string) =>
  slotName === 'actions'
    ? `<template #actions="{row}">
    <article>
      Actions
    </article>
  </template>`
    : `<template #${slotName}="{row}">
    <article class="textOmit">
      {{ row.${slotName} }}
    </article>
  </template>`

const jsSetupStr = (data: any[], actionsBtn: string[], pageInfo: any) => {
  const formState: { [key: string]: any } = {}
  const dateTag: { [key: string]: any } = {}
  data.map((i: any) => {
    if (i.tag === 'a-range-picker') {
      dateTag[i.name] = false
    } else {
      formState[i.name] = ''
    }
    return i
  })
  const res = `import { defineAsyncComponent, reactive, ref, onMounted } from 'vue'
  ${
    ~actionsBtn.indexOf('del')
      ? `import { message, Modal } from 'ant-design-vue'`
      : ''
  }
  //  import { search${
    ~actionsBtn.indexOf('del') ? ', reqDel' : ''
  } } from '@/api/req'
  import { PTable } from '@without_end/ph-ui'
  import '@without_end/ph-ui/style/table'
  
  ${
    ~actionsBtn.indexOf('add')
      ? `// const Add = defineAsyncComponent(() => import('./components/Add.vue'))`
      : ''
  }
  ${
    ~actionsBtn.indexOf('details')
      ? `// const Details = defineAsyncComponent(() => import('./components/Details.vue'))`
      : ''
  }
  const Form = defineAsyncComponent(() => import('./Form.vue'))
  
  const searchTable = ref()
  
  const state = reactive<any>({
    ${
      actionsBtn.some((s: string) => ~['add', 'details'].indexOf(s))
        ? `visible: {
      ${
        ~actionsBtn.indexOf('add')
          ? `
      visibleMode:false,`
          : ''
      }
      ${~actionsBtn.indexOf('details') ? `visibleDetails: false,` : ''}
      },`
        : ''
    }
    ${
      ~actionsBtn.indexOf('add')
        ? `editData:{},
          actionsType: 'add',`
        : ''
    }
    ${~actionsBtn.indexOf('details') ? `detailsData: {},` : ''}
    module: null
  })

  const formState = reactive<any>({
    ${formStateStr(formState, dateTag)}
  })
  
  onMounted(() => {
    state.module = ${
      pageInfo.tool === 'vite'
        ? ` import.meta.globEager('@/assets/user/index.ts')[
      '/src/assets/user/index.ts'
    ]`
        : `require('@/assets/user')`
    }
   
    searchFunc()
  })
  
  const searchFunc = (is = false) => {
  //  searchTable.value.search(is)
  }
  ${
    ~actionsBtn.indexOf('batchDel')
      ? `
        const batch = (ids: ${
          ~actionsBtn.indexOf('batchRow') ? 'any[]' : 'string[]'
        }, type: string) => {
          if(type === 'del') {
            del(ids)
          }
        }`
      : ''
  }
  ${
    ~actionsBtn.indexOf('batchDel') || ~actionsBtn.indexOf('del')
      ? `const del = async (ids: string[]) => {
        console.log('🚀 ~ file: UserTable.vue:105 ~ del ~ ids', ids)
        Modal.confirm({
            title: () => '提示',
            content: () => '确定要删除吗？',
            centered: true,
            onOk() {
          // const res = await reqDel({ ids })
          // if(res) {
            message.success('删除成功')
            // search(true)
          // }
          },
          onCancel() {}
          })
      }`
      : ''
  }
  ${
    ~actionsBtn.indexOf('add')
      ? `const edit = (row: any) => {
          state.actionsType = 'edit'
          state.editData = row
          state.visible.visibleAdd = true
        }
        const add = () => {
          state.editData = {}
          state.actionsType = 'add'
          state.visible.visibleAdd = true
        }`
      : ''
  }
  ${
    ~actionsBtn.indexOf('details')
      ? `const details = (row: any) => {
        state.detailsData = row
        state.visible.visibleDetails = true
        }`
      : ''
  }
  `
  return res
}

const formStateStr = (
  formState: { [key: string]: any },
  dateTag: { [key: string]: any }
) => {
  let res = ``
  Object.keys(formState).map((s: string) => {
    res = `${res}${res ? '\n' : ''}${s}: '',`
    return s
  })
  Object.keys(dateTag).map((s: string, index: number) => {
    res = `${res}${
      res ? '\n' : ''
    }start_time${index}: '',\nend_time${index}: '',`
    return s
  })
  return res
}

export const downPackage = (
  pageInfo: any,
  tableData: any[],
  formData: any[],
  actionsBtn: string[]
) => {
  download(
    downTableVue(pageInfo, tableData, formData, actionsBtn, true),
    'Table.vue'
  )
  download(jsFormat(tableData, pageInfo), `${pageInfo.key}.ts`)
  download(downFormVue(formData, actionsBtn), 'Form.vue')
}

export const download = (codeStr: string, name = '') => {
  // const blob = new Blob([beautifier(codeStr, beautifierConf.html)], {
  const blob = new Blob([codeStr], {
    type: 'text/plain;charset=utf-8'
  })
  saveAs(blob, name || 'file')
}

export const beautifierConf: { [key: string]: any } = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}
