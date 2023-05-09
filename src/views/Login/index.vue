<template>
  <div class="login_page">
    <canvas id="circle" />
    <section class="input_win">
      <h3 class="win_title">测试系统</h3>
      <section class="input_sec">
        <a-form
          ref="loginForm"
          :model="formState"
          name="basic"
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
        >
          <a-form-item
            name="email"
            autocomplete="off"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <a-input v-model:value="formState.email" placeholder="账号">
              <template #prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            autocomplete="off"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
              autocomplete="new-password"
              @keydown.enter="onSubmit"
            >
              <template #prefix>
                <lock-outlined type="lock" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item
            name="code"
            autocomplete="off"
            :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <a-input
              v-model:value="formState.code"
              placeholder="验证码"
              @keydown.enter="onSubmit"
            >
              <template #prefix>
                <safety-outlined type="safety" />
              </template>
              <template #addonAfter>
                <div style="width: 100px">
                  <img
                    style="width: 100%; height: 48px"
                    :src="verifyCodeImg"
                    class="verify-code"
                    @click="changeImg"
                  />
                </div>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              class="loginBtn"
              type="primary"
              :loading="loading"
              @click="onSubmit"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import {
  UserOutlined,
  SafetyOutlined,
  LockOutlined
} from '@ant-design/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { start } from './components/Cirle'
// import User from '@/api/user'
// import codeErr from '@/utils/codeErr'

interface FormState {
  email: string
  password: string
  code: string
  timer: string
}

// const user = new User()

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    SafetyOutlined
  },
  setup() {
    const { login } = useUserStore()
    const loginForm = ref()
    const cId = ref(Date.now())
    const verifyCodeImg = ref()
    verifyCodeImg.value = `/api/captcha/${cId.value}`

    const loading = ref<boolean>(false)

    onMounted(() => {
      start('circle')
    })

    const formState = reactive<FormState>({
      email: '',
      password: '',
      code: '',
      timer: cId.value.toString()
    })
    const changeImg = () => {
      cId.value = Date.now()
      verifyCodeImg.value = `/api/captcha/${cId.value}`
      formState.timer = cId.value.toString()
    }
    const onSubmit = async () => {
      loading.value = true
      await login(formState)
      formState.code = ''
      changeImg()
      loading.value = false
    }
    return { formState, loading, verifyCodeImg, loginForm, changeImg, onSubmit }
  }
})
</script>

<style lang="scss">
.login_page {
  width: 100%;
  height: 100%;
  // background-color: #2d3a4b;
  #circle {
    width: 100%;
    height: 100%;
  }
  .input_win {
    position: relative;
    width: 520px;
    top: -100%;
    max-width: 100%;
    padding: 35px;
    margin: 15% auto 0;
    overflow: hidden;
    background-color: #f1f2f6;
    border-radius: 10px;
    input {
      background-color: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: #ffffff;
      // height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill,
      textarea:-webkit-autofill,
      select:-webkit-autofill {
        // -webkit-text-fill-color: #ffffff !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明 生效时长 过渡效果 启用时延迟的时间
      }
    }
    .win_title {
      font-size: 26px;
      color: #333333;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: 700;
    }
    .input_sec {
      .ant-input-affix-wrapper {
        // background-color: #283443 !important;
        // border: 1px solid #3e4957;
        height: 50px;
        .ant-input-prefix {
          // color: #81939d;
        }
      }
      .ant-input-password {
        // background-color: #283443 !important;
        // border: 1px solid #3e4957;
        .ant-input {
          border: 0px;
        }
        .ant-input-suffix {
          .ant-input-password-icon {
            // color: #81939d;
          }
        }
      }
      .ant-input-group-addon {
        padding: 0;
      }
      .ant-input {
        // background-color: #283443 !important;
        // border: 1px solid #3e4957;
        // color: #ffffff;
      }
      .ant-input::placeholder {
        // color: #889aa4;
        text-align: left;
      }
      .loginBtn {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
