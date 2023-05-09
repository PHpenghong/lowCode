<template>
  <div>
    <!-- <ModelBox
      v-model:visible="props.visible"
      visible-str="visibleUpload"
      title="备份数据上传"
      width="35%"
    >
      <template #body> -->
    <section class="fileUpload">
      <a-form
        class="fileUpload_form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item>
          <template #label>
            <span style="color: #666">上传</span>
          </template>
          <a-upload
            :accept="`.${state.fileType.join(',.')}`"
            :file-list="state.fileList"
            :max-count="1"
            :before-upload="beforeUpload"
          >
            <a-button>
              <upload-outlined />
              选择文件
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item>
          <template #label>
            <span style="color: #666">支持格式 </span>
          </template>
          <span style="color: #999999"> tar.gz </span>
        </a-form-item>
        <a-form-item>
          <section :class="state.progressFlag ? 'progress' : 'progressHide'">
            <!-- <a-progress
              :percent="state.percent"
              :format="(percentage:any)=>percentage<100?`已上传(${percentage}%)`:'上传完成'"
            /> -->
          </section>
        </a-form-item>
      </a-form>
    </section>
    <!-- </template>
      <template #btns> -->
    <section class="uploadBtns">
      <a-button
        type="primary"
        :loading="state.uploading"
        :disabled="state.fileList.length === 0"
        @click="submitUpload"
        >确定</a-button
      >&nbsp;
      <a-button @click="close">关闭</a-button>
    </section>
    <!-- </template> -->
    <!-- </ModelBox> -->
    <form
      action="/api/users/uploadAvatar"
      method="POST"
      encType="multipart/form-data"
    >
      <input type="file" name="user" />
      <input type="submit" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue'
// import { defineAsyncComponent, defineProps, reactive } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { uploadAvatar } from '@/api/user/index'
// import { codeErr } from '@/utils/codeErr'

// const req = new Backup()

// const ModelBox = defineAsyncComponent(
//   () => import('@/components/ModalBox/index.vue')
// )

const props = defineProps({
  visible: {
    type: Object,
    default: () => ({})
  }
})

const state = reactive<any>({
  fileType: ['png', 'jpg'],
  uploading: false,
  fileList: [],
  progressFlag: false,
  percent: 0
})

const submitUpload = async () => {
  state.uploading = true
  const formData = new FormData()
  // if (
  state.fileList.map((i: any) => {
    formData.append('files', i)
    return i
  })
  // ) {
  //   state.uploading = false
  //   return
  // }

  state.progressFlag = true
  const config = {
    'Content-Type': 'multipart/form-data'
    // onUploadProgress: (e: any) => {
    //   state.percent = Number(((e.loaded / e.total) * 100).toFixed(2))
    // }
  }
  const res = await uploadAvatar(formData, config)
  if (res.code == 0) {
    console.log('🚀 ~ file: upload.vue:124 ~ submitUpload ~ res', res)
    message.success('上传成功', 2)
    reset()
    close()
  }
  setTimeout(() => {
    state.progressFlag = false
    // this.rotateFn(0)
    state.percent = 0
  }, 1000)
}

const beforeUpload = (file: any) => {
  state.fileList = [...state.fileList, file]
  return false
}

// const handleRemove = (file: any) => {
//   const index = state.fileList.indexOf(file)
//   const newFileList = state.fileList.slice()
//   newFileList.splice(index, 1)
//   state.fileList = newFileList
// }

const reset = () => {
  state.uploading = false
  state.fileList.splice(0)
}

const close = () => {
  props.visible.visibleUpload = false
}
</script>

<style lang="scss" scoped>
.fileUpload {
  width: 100%;
  .fileUpload_form {
    width: 100%;
  }
}
.progressHide {
  display: none;
}
.progress {
  display: flex;
  width: 200px;
  height: 30px;
  position: absolute;
  left: 30%;
  top: -10px;
  // transform: translate(-50%, 0);
  background-color: transparent;
}
</style>
