<template>
  <div class="cardInfo">
    <article class="card_title">
      {{ pageInfo.title }}
    </article>
    <section class="info_sec">
      <article class="logo_title">
        {{ pageInfo.logoText }}
      </article>
      <section class="logo_upload">
        <a-upload
          v-model:file-list="state.fileList"
          :accept="`${pageInfo.px ? '.png,.jpg,.jpeg' : '.ico'}`"
          :max-count="1"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :headers="{
            'Content-Type': 'multipart/form-data'
          }"
          @change="handleChange"
        >
          <section
            v-if="state.imageUrl"
            class="logo_img_sec"
            @mouseover="state.tipsShow = true"
            @mouseleave="state.tipsShow = false"
          >
            <img class="logo_img" :src="state.imageUrl" alt="avatar" />
            <article v-show="state.tipsShow" class="update_img_text">
              点击更改图片
            </article>
          </section>
          <div v-else>
            <loading-outlined v-if="state.loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <article class="upload_tips">
          文件格式：{{ `${pageInfo.px ? 'png、jpg、jpeg' : '.ico'}` }}
        </article>
        <span class="upload_tips"
          >建议: 背景色透明{{
            `${pageInfo.px ? `，图片像素不超过${pageInfo.px}` : ``}`
          }}</span
        >
      </section>
    </section>
    <section class="info_sec">
      <article class="logo_title">
        {{ pageInfo.titleText }}
      </article>
      <section class="logo_title_input">
        <article v-if="!state.isEditTitle" class="ingo_title_art">
          <span>{{
            dataObj[`${type}_${type === 'label' ? 'text' : 'title'}`]
          }}</span>
          <SvgIcon class="icon" :size="1.2" name="edit" @click="edit" />
        </article>
        <a-input
          v-else
          v-model:value="state.titleVal"
          :maxlength="pageInfo.maxlength"
          class="titleVal_class"
        />
      </section>
    </section>
    <section v-if="type === 'sys_page'" class="info_sec">
      <article class="logo_title">大屏标题</article>
      <section class="logo_title_input">
        <article v-if="!state.isEditDatav" class="ingo_title_art">
          <span>{{ dataObj.datav_title }}</span>
          <SvgIcon class="icon" :size="1.2" name="edit" @click="editDatav" />
        </article>
        <a-input
          v-else
          v-model:value="state.dataVal"
          :maxlength="19"
          class="titleVal_class"
        />
      </section>
    </section>
    <section v-show="state.isShowBtn" class="info_btn">
      <a-button type="primary" @click="save">保存</a-button>&nbsp;
      <a-button @click="cancel">取消</a-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, watchEffect, defineEmits } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { setConf, uploadFIle } from '@/api/bgConf/index'

interface PageInfo {
  title: string
  logoText: string
  titleText: string
  key: String
  px: string
  maxlength: number
}

interface State {
  imageUrl: string
  loading: boolean
  fileList: any[]
  isEditTitle: boolean
  isEditDatav: boolean
  isShowBtn: boolean
  titleVal: string
  dataVal: string
  tipsShow: boolean
  editObj: { [key: string]: string }
}

const emits = defineEmits(['update:dataObj'])
const props = defineProps({
  pageInfo: {
    type: Object as PropType<PageInfo>,
    default: () => ({})
  },
  dataObj: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  type: {
    type: String,
    default: ''
  }
})

const state = ref<State>({
  imageUrl: '',
  loading: false,
  fileList: [],
  isEditTitle: false,
  isEditDatav: false,
  isShowBtn: false,
  titleVal: '',
  dataVal: '',
  tipsShow: false,
  editObj: {}
})

watchEffect(() => {
  if (
    props.dataObj[`${props.type}_${props.type === 'label' ? 'icon' : 'logo'}`]
  ) {
    state.value.imageUrl =
      props.dataObj[`${props.type}_${props.type === 'label' ? 'icon' : 'logo'}`]
  }
})

const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

let isLt2M: boolean = false
const beforeUpload = (file: any) => {
  isLt2M = file.size / 1024 / 1024 < 1
  if (!isLt2M) {
    message.error('图片大小不能大于 1MB!')
  }
  return false
}

const handleChange = () => {
  if (isLt2M) {
    upload()
  }
}

const upload = () => {
  const formData = new FormData()
  state.value.fileList.map((i: any) => {
    formData.append('file', i.originFileObj)
    return i
  })

  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  uploadFIle(formData, headers).then((res: any) => {
    if (res) {
      getBase64(state.value.fileList[0].originFileObj, (base64Url: string) => {
        state.value.imageUrl = base64Url
        state.value.loading = false
      })
      state.value.editObj[
        `${props.type}_${props.type === 'label' ? 'icon' : 'logo'}`
      ] = res.file_path
      state.value.isShowBtn = true
    }
  })
}

const editDatav = () => {
  state.value.isShowBtn = true
  state.value.isEditDatav = true
  state.value.dataVal = `${props.dataObj.datav_title}`
  state.value.editObj.datav_title = ''
}

const edit = () => {
  state.value.isShowBtn = true
  state.value.isEditTitle = true
  state.value.titleVal = `${
    props.dataObj[`${props.type}_${props.type === 'label' ? 'text' : 'title'}`]
  }`
  state.value.editObj[
    `${props.type}_${props.type === 'label' ? 'text' : 'title'}`
  ] = ''
}

const save = () => {
  if (
    state.value.editObj[
      `${props.type}_${props.type === 'label' ? 'text' : 'title'}`
    ] !== undefined
  ) {
    if (state.value.titleVal) {
      state.value.editObj[
        `${props.type}_${props.type === 'label' ? 'text' : 'title'}`
      ] = state.value.titleVal
    } else {
      message.error('标题不能为空')
      return
    }
  }
  if (
    state.value.editObj[
      `${props.type}_${props.type === 'label' ? 'icon' : 'logo'}`
    ] !== undefined
  ) {
    state.value.editObj[
      `${props.type}_${props.type === 'label' ? 'icon' : 'logo'}`
    ] = state.value.imageUrl
  }
  if (state.value.editObj.datav_title !== undefined) {
    if (state.value.dataVal) {
      state.value.editObj.datav_title = state.value.dataVal
    } else {
      message.error('大屏标题不能为空')
      return
    }
  }
  saveReq(state.value.editObj)
}

const saveReq = (param: any) => {
  setConf(param).then((res: any) => {
    if (res) {
      state.value.isEditTitle = false
      state.value.isEditDatav = false
      state.value.isShowBtn = false
      emits('update:dataObj', { ...res })
    }
  })
}

const cancel = () => {
  state.value.isShowBtn = false
  state.value.isEditDatav = false
  state.value.isEditTitle = false
}
</script>

<style lang="scss" scoped>
.cardInfo {
  width: 50%;
  background-color: #ffffff;
  .card_title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    text-align: left;
    padding: 10px 20px;
  }
  .info_sec {
    width: 100%;
    display: flex;
    padding: 20px;
    .logo_title {
      width: 200px;
      font-size: 17px;
      font-weight: bold;
      color: #333333;
    }
    .logo_upload {
      flex: 1;
      text-align: left;
      .logo_img_sec {
        width: 102px;
        height: 102px;
        .update_img_text {
          height: 20px;
          position: relative;
          bottom: 20px;
          color: #7f7f7f;
          background-color: #efefef;
        }
        .logo_img {
          width: 102px;
          height: 102px;
        }
      }

      .upload_tips {
        color: #7f7f7f;
      }
    }
    .logo_title_input {
      flex: 1;
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      .ingo_title_art {
        display: flex;
        align-items: center;
        .icon {
          cursor: pointer;
          margin-left: 20px;
        }
      }
      .titleVal_class {
        width: 50%;
      }
    }
  }
  .info_btn {
    padding: 20px 20px 20px 0;
  }
}
</style>
