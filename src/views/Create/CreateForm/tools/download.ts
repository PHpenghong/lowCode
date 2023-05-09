import {
  download,
  vueFormat,
  scriptFormat,
  cssFormat
} from '@/views/Create/CreateTable/ts/download'
import { dealWithJs } from '@/utils/tools'

/**
 *
 * downAll : add && details
 *
 * downloadForm : Add.vue
 *
 * downDetailsVue : Details.vue
 *
 */

export const downAll = (formData: any[], formObj: any, pageInfo: any) => {
  if (pageInfo.form) {
    downloadForm(formData, formObj, pageInfo)
  }
  if (pageInfo.details) {
    download(
      downDetailsVue(formData, formObj, pageInfo),
      `${pageInfo.filename}Details.vue`
    )
  }
}

const downloadForm = (formData: any[], formObj: any, pageInfo: any) => {
  const templateStr = pageType(formData, formObj, pageInfo)
  const res = `${vueFormat(templateStr)}
  ${scriptFormat(dealWithScript(formData, pageInfo.filetype))}
  ${cssFormat(`
  :deep .ant-form-item-control-input-content {
    text-align: left;
  }`)}
  `
  download(res, `${pageInfo.filename}.vue`)
}

const downDetailsVue = (formData: any[], formObj: any, pageInfo: any) => {
  const templateStr = vueFormat(
    pageType(formData, formObj, pageInfo, pageInfo.details)
  )
  const vueSetupStr = scriptFormat(
    dealWithScript(formData, pageInfo.filetype, pageInfo.details)
  )
  return `${templateStr}\n${vueSetupStr}\n${cssFormat(`
  :deep .ant-form-item-control-input-content {
    text-align: left;
  }`)}`
}

const detailsGenerateDrawer = (
  formData: any[],
  formObj: any,
  pageInfo: any
) => `<p-drawer
    :visible="props.visible"
    :visible-str="props.visibleStr"
    title="${`${pageInfo.filename}详情`}">
  >
    <template #body>
      ${generateForm(formData, formObj, pageInfo, true)}
    </template>
    <template #btns>
      <a-button @click="close">取消</a-button>
    </template>
  </p-drawer>`

const detailsTemplate = (formData: any[], formObj: any, pageInfo: any) => {
  const res = `<p-model
  :visible="props.visible"
  :visible-str="props.visibleStr"
  title="${`${pageInfo.filename}详情`}">
    <template #body>
      ${generateForm(formData, formObj, pageInfo, true)}
    </template>
    <template #btns>
      <a-button @click="close">关闭</a-button>
    </template>
  </p-model>`

  return res
}

const pageType = (
  formData: any[],
  formObj: any,
  pageInfo: any,
  details = false
) => {
  if (pageInfo.filetype === 'model') {
    return (!details ? generateModel : detailsTemplate)(
      formData,
      formObj,
      pageInfo,
      details
    )
  }
  if (pageInfo.filetype === 'drawer') {
    return (!details ? generateDrawer : detailsGenerateDrawer)(
      formData,
      formObj,
      pageInfo,
      details
    )
  }
  return generateForm(formData, formObj, pageInfo, details)
}

const generateModel = (
  formData: any[],
  formObj: any,
  pageInfo: any,
  details = false
) => `<p-model
  :visible="props.visible"
  :visible-str="props.visibleStr"
  :title="actionsType === 'add' ? ${`'新增${pageInfo.filename}'`} : ${`'编辑${pageInfo.filename}'`}"
>
  <template #body>
    ${generateForm(formData, formObj, pageInfo, details)}
  </template>
  ${
    pageInfo.filetype !== 'page'
      ? `
    <template #btns>
      <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
      <a-button @click="close">取消</a-button>
    </template>`
      : ''
  }
  </p-model>`

const generateDrawer = (
  formData: any[],
  formObj: any,
  pageInfo: any,
  details = false
) => `<p-drawer
    :visible="props.visible"
    :visible-str="props.visibleStr"
    :title="actionsType === 'add' ? ${`'新增${pageInfo.filename}'`} : ${`'编辑${pageInfo.filename}'`}"
  >
    <template #body>
      ${generateForm(formData, formObj, pageInfo, details)}
    </template>
    <template #btns>
      <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
      ${
        pageInfo.filetype !== 'page'
          ? `<a-button @click="close">取消</a-button>`
          : ''
      }
    </template>
  </p-drawer>`

const generateForm = (
  formData: any[],
  formObj: any,
  pageInfo: any,
  details = false
) => dealWithForm(formData, formObj, pageInfo, details)

const dealWithForm = (
  formData: any[],
  formObj: any,
  pageInfo: any,
  details = false
) => {
  const res = `<a-form 
  ref="formRef"
  :label-col="{ span: ${formObj.labelCol.span}}" 
  :wrapper-col="{ span: ${formObj.wrapperCol.span}}"
  :model="${!details ? 'formState' : 'detailsData'}"
  ${!details ? `:rules="rules"` : ''}
  layout="${formObj.layout}"
  labelAlign="${formObj.labelAlign}"
  >
  ${dealWithFormItem(formData, pageInfo, details)}
  </a-form>`
  return res
}

const dealWithFormItem = (formData: any[], pageInfo: any, details = false) => {
  let res = ''
  formData.map((i: any) => {
    res = `${res}${res ? '\n' : ''}${formItem(i, details)}`
    return i
  })
  if (pageInfo.filetype === 'page') {
    res = `${res}${res ? '\n' : ''}
    <a-form-item>
      <section>
        <a-button type="primary" @click="onSubmit">提交</a-button>&nbsp;
        <a-button >取消</a-button>
      </section>
    </a-form-item>
    `
  }
  return res
}

const formItem = (item: any, details = false) => `<a-form-item
  label="${item.label}"
  name="${item.name}">
  ${
    details
      ? `<span>{{ detailsData.${item.name} }}</span>`
      : formEl[item.tag](item)
  }
  </a-form-item>`

const comWidth = (item: any) =>
  `style="${item.style?.width ? ` width: ${item.style.width}` : '220px'}"`

const formEl: any = {
  'a-input': (item: any) =>
    `<a-input v-model:value="formState.${item.name}" 
    ${dealWithAttrs(item)} ${comWidth(item)}/>`,
  'a-textarea ': (item: any) =>
    `<a-textarea v-model:value="formState.${item.name}" 
    ${dealWithAttrs(item)} ${comWidth(item)}
    :autoSize="${dealWithJs(item.autoSize)}"/>`,
  'a-select': (item: any) =>
    `<a-select v-model:value="formState.${item.name}" 
    ${dealWithAttrs(item)} ${comWidth(item)}>
      <a-select-option 
      v-for="item in groupMap.${item.name}Options" 
      :key="item.value" :value="item.value">{{item.label}}</a-select-option>
    </a-select>`,
  'a-range-picker': (item: any) => `<a-range-picker 
    v-model:value="formState.${item.name}"
    ${dealWithAttrs(item, ['placeholder'])} ${comWidth(item)}
    :placeholder="['${item.placeholder[0]}', '${item.placeholder[1]}']">
  </a-range-picker>`,
  'a-date-picker': (item: any) => `<a-date-picker 
    v-model:value="formState.${item.name}"
    ${dealWithAttrs(item)} ${comWidth(item)}>
  </a-date-picker>`,
  'a-switch': (item: any) =>
    `<a-switch v-model:checked="formState.${item.name}" 
    ${dealWithAttrs(item)}/>`,
  'a-radio-group': (item: any) =>
    `<a-radio-group v-model:value="formState.${item.name}" 
    :options="groupMap.${item.name}Options" 
    ${dealWithAttrs(item)}/>`,
  'a-checkbox-group': (item: any) =>
    `<a-checkbox-group v-model:value="formState.${item.name}" 
    :options="groupMap.${item.name}Options" 
    name="${item.checkboxName}" ${dealWithAttrs(item)}/>`,
  'a-tree-select': (item: any) =>
    `<a-tree-select v-model:value="formState.${item.name}" 
    :treeData="state.${item.name}TreeData"
    name="${item.checkboxName}" ${dealWithAttrs(item)}/>`
}

const dealWithAttrs = (item: any, filterArr = [] as string[]) => {
  let res = ''
  Object.keys(item).map((s: string) => {
    if (~attrsArr.indexOf(s) && !~filterArr.indexOf(s)) {
      res = `${res}${res ? ' ' : ''}${attrsFunc(s, item[s])}`
    }
    return s
  })
  return res
}

const attrsArr: string[] = [
  'disabled',
  'placeholder',
  'allowClear',
  'readonly',
  'maxlength',
  'mode',
  'maxTagCount',
  'showTime',
  'showNow',
  'showToday',
  'optionType',
  'showCount',
  'checkedChildren',
  'unCheckedChildren'
]

const attrsFunc = (str: string, value: any) =>
  value ? ` ${typeof value !== 'string' ? ':' : ''}${str}="${value}"` : ''

const dealWithRules = (formData: any[]) => {
  const rules: any = {}
  formData.map((i: any) => {
    if (i.rules.length > 0) {
      const arr = i.rules.filter(
        (r: any) =>
          (r.pattern !== '' && r.message !== '') ||
          (r.required !== undefined && r.message !== '')
      )
      if (arr.length > 0) {
        rules[i.name] = arr.map((j: any) => {
          if (j.pattern !== undefined) {
            j.pattern = new RegExp(j.pattern)
          }
          return j
        })
      }
    }
    return i
  })
  return `const rules = ${dealWithJs(rules)}`
}

const dealWithOptions = (formData: any[]) => {
  let res = ``
  const optionStr = ['a-checkbox-group', 'a-radio-group', 'a-select']
  formData.map((i: any) => {
    if (~optionStr.indexOf(i.tag)) {
      res = `${res}${res ? ',' : ''}
      ${i.name}Options:${dealWithJs(i.options)}`
    }
    return i
  })
  return res ? `const groupMap = {${res}}` : ''
}

const dealWithScript = (formData: any[], filetype: string, details = false) =>
  `${pulSetup(filetype, details)}\n
  ${!details ? dealWithRules(formData) : ''}\n
  ${!details ? dealWithOptions(formData) : ''}\n
  ${!details ? formStateFormat(formData, filetype) : ''}\n
  ${formOnSubmit(filetype, details)}`

const formStateFormat = (formData: any[], filetype: string) => {
  let res = ''
  let state = ''
  formData.map((i: any) => {
    if (i.tag === 'a-tree-select') {
      state = `${state}${state ? ',\n' : ''}${i.name}TreeData: []`
    }
    res = `${res}${res ? ',\n' : ''}${i.name}: ${
      i.checked !== undefined
        ? false
        : typeof i.value === 'object'
        ? '[]'
        : "''"
    }`

    return i
  })
  return `
    ${state ? `const state = ref<any>({${state}})` : ''}
    const formState = reactive<any>({${res}})
    ${
      filetype !== 'page'
        ? ` watchEffect(() => {
      if (props.editData) {
        ({
          ${dealWithWatch(formData)}
        }=props.editData)
      }
    })`
        : ''
    }
   `
}

// const selectOptions = (options: any[]) => {
//   let res = ''
//   options.map((i: any) => {
//     res = `${res}${
//       res ? ',\n' : ''
//     }${`{value: '${i.value}', label: '${i.label}'}`}`
//     return i
//   })
//   return `[
//     ${res}
//   ]`
// }

const dealWithWatch = (formState: any[]) => {
  let res = ''
  formState.map((i: any) => {
    res = `${res}${res ? ',' : ''}${i.name}:formState.${i.name}`
    return i
  })
  return res
}

const pulSetup = (filetype: string, details = false) => `import { 
  ${
    !details
      ? `ref, 
        reactive, `
      : ''
  }
  ${
    filetype !== 'page'
      ? `watchEffect,
    defineAsyncComponent, 
    PropType, 
    defineProps, 
    // defineEmits`
      : ''
  } 
} from 'vue'
${
  !details
    ? `import { message } from 'ant-design-vue'
// import { codeErr } from '@/utils/codeErr'
// import { addReq, editReq } from '@/api/req'`
    : ''
}

${
  filetype !== 'page'
    ? `${
        filetype === 'model'
          ? `
          import '@without_end/ph-ui/style/model'

          const PModel = defineAsyncComponent(
      () => import('@without_end/ph-ui/lib/model')
    )`
          : ` const PDrawer = defineAsyncComponent(
      () => import('@without_end/ph-ui/lib/drawer')
    )`
      }

${!details ? `// const emits = defineEmits(['submitSucc'])` : ''}
const props = defineProps({
  visible: {
    type: Object,
    default: () => ({})
  },
  visibleStr: {
    type: String,
    default: 'visibleStr'
  },
  ${
    !details
      ? `actionsType: {
    type: String,
    default: 'add'
  },`
      : ''
  }
  ${details ? 'detailsData' : 'editData'}: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})`
    : ''
}

${!details ? `const formRef = ref<any>(null)` : ''}
`

const formOnSubmit = (filetype: string, details = false) => `
  ${
    !details
      ? `const onSubmit = async () => {
    formRef.value.validate().then(() => {
      // const req = props.actionsType === 'add' ? addReq : editReq
      // const res = await req({...formState,...props.actionsType === 'add' ? {} : {id: props.editData.id}})
      // if (res) {
      message.success('操作成功')
      
      // ${
        filetype !== 'page'
          ? `close() 
      //emits('submitSucc')`
          : ''
      }
      // } else {
      //  codeErr(res)
      // }
    })
  }`
      : ''
  }

  ${
    filetype === 'page' || details
      ? `// const resetFields = () => {
    //  formRef.value && formRef.value.resetFields()
    // }`
      : `const resetFields = () => {
      formRef.value && formRef.value.resetFields()
    }`
  }
  ${
    filetype !== 'page'
      ? `const close = () => {
        ${
          !details
            ? `Object.keys(formState).forEach((key: string) => {
          formState[key] = ''
        })`
            : ''
        }
        props.visible[props.visibleStr] = false
      }

      watchEffect(() => {
      if (!props.visible[props.visibleStr]) {
        ${!details ? `resetFields()` : ''}
        close()
      }
    })`
      : ''
  }
  `
