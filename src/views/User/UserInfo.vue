<template>
  <div>
    <a-upload
      v-model:file-list="state.fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      action="/api/users/uploadAvatar"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="state.imageUrl" :src="state.imageUrl" alt="avatar" />
      <div v-else>
        <loading-outlined v-if="state.loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const state = ref<any>({
  fileList: [],
  imageUrl: '',
  loading: false
})

const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
const handleChange = (info: any) => {
  if (info.file.status === 'uploading') {
    state.value.loading = true
    return
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      state.value.imageUrl = base64Url
      state.value.loading = false
    })
  }
  if (info.file.status === 'error') {
    state.value.loading = false
    message.error('upload error')
  }
}
</script>

<style lang="scss" scoped></style>
