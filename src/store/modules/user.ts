import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { generatorDynamicRouter } from '@/router/asyncRouter'
// import { routerList } from '@/router/list'
import { IMenubarStatus } from '@/Layout/type/layout'
import router, { allowRouter } from '@/router/index'
import { setLocal, decode, getLocal, useLocal } from '@/utils/tools'
import { login, logout, getUser } from '@/api/user'
// import { getRouter } from '@/api/router'
import { list } from '@/router/test'

const setting = getLocal<any>('setting')
const { ACCESS_TOKEN } = getLocal<any>('token')

export const useUserStore = defineStore({
  id: 'user',
  state: (): any => ({
    // 用户信息
    userInfo: {
      name: '', // 用户名称
      id: '', // 用户id
      avatar: '', // 用户头像url
      email: '', // 邮箱
      phone: '', // 手机
      lang: '', // 语言
      router: [] // 路由
    },
    // 标签栏
    tags: {
      tagsList: [],
      cachedViews: [],
      isNocacheView: false
    },

    setting: {
      theme: setting.theme !== undefined ? setting.theme : 0,
      showTags: setting.showTags !== undefined ? setting.showTags : true,
      color: {
        primary: setting.color !== undefined ? setting.color.primary : '#409eff'
      },
      usePinyinSearch:
        setting.usePinyinSearch !== undefined ? setting.usePinyinSearch : false,
      mode: setting.mode || 'vertical'
    },
    status: {
      isLoading: false,
      ACCESS_TOKEN: ACCESS_TOKEN || ''
    },
    menubar: {
      status:
        document.body.offsetWidth < 768
          ? IMenubarStatus.PHN
          : IMenubarStatus.PCE,
      menuList: [],
      isPhone: document.body.offsetWidth < 768
    }
  }),
  getters: {
    getUsername(): any {
      return this.userInfo.username
    },
    getRouter(): any {
      return this.userInfo.router
    },
    getUserInfo(): any {
      return this.userInfo
    },
    getTags(): any {
      return this.tags
    },
    getSetting(): any {
      return this.setting
    },
    getStatus(): any {
      return this.status
    },
    getMenubar(): any {
      return this.menubar
    }
  },
  actions: {
    changeCollapsed(): void {
      this.menubar.status = this.menubar.isPhone
        ? this.menubar.status === IMenubarStatus.PHN
          ? IMenubarStatus.PHE
          : IMenubarStatus.PHN
        : this.menubar.status === IMenubarStatus.PCN
        ? IMenubarStatus.PCE
        : IMenubarStatus.PCN
    },
    changeDeviceWidth(): void {
      this.menubar.isPhone = document.body.offsetWidth < 768
      this.menubar.status = this.menubar.isPhone
        ? IMenubarStatus.PHN
        : IMenubarStatus.PCE
    },
    // 切换导航，记录打开的导航
    changeTagNavList(cRouter: RouteLocationNormalizedLoaded): void {
      if (!this.setting.showTags) return // 判断是否开启多标签页
      // if(cRouter.meta.hidden && !cRouter.meta.activeMenu) return // 隐藏的菜单如果不是子菜单则不添加到标签
      const reg = new RegExp('^/redirect')
      if (reg.test(cRouter.path)) return
      const index = this.tags.tagsList.findIndex(
        (v: any) => v.path === cRouter.path
      )
      this.tags.tagsList.forEach((v: any) => {
        v.isActive = false
      })
      // 判断页面是否打开过
      if (index !== -1) {
        this.tags.tagsList[index].isActive = true
        return
      }
      const tagsList: any = {
        name: cRouter.name as string,
        title: cRouter.meta.title as string,
        path: cRouter.path,
        isActive: true
      }
      this.tags.tagsList.push(tagsList)
    },
    changeNocacheViewStatus(isNoCache: boolean) {
      this.tags.isNocacheView = isNoCache
    },
    setToken(token: string): void {
      this.status.ACCESS_TOKEN = token
      setLocal('token', this.status, 1000 * 60 * 60)
    },
    // 添加缓存页面
    addCachedViews(obj: { name: string; noCache: boolean }): void {
      if (!this.setting.showTags) return // 判断是否开启多标签页
      if (obj.noCache || this.tags.cachedViews.includes(obj.name)) return
      this.tags.cachedViews.push(obj.name)
    },
    setRoutes(data: Array<any>): void {
      this.userInfo.router = data
      setLocal('userInfo', this.userInfo)
    },
    concatAllowRoutes(): void {
      allowRouter.reverse().forEach((v) => this.userInfo.router.unshift(v))
    },
    async login(param: any): Promise<void> {
      console.log('🚀 ~ file: user.ts:143 ~ login ~ param:', param)
      // const res = await login(param)
      const res = true
      if (res) {
        // if (res) {
        this.setToken('123456')
        // this.setToken(res.token)
        const { query } = router.currentRoute.value
        router.push(typeof query.from === 'string' ? decode(query.from) : '/')
      }
    },
    async setUser() {
      useLocal('userInfo').then((res: any) => {
        if (res) {
          Object.keys(res).map((i) => {
            this.userInfo[i] = res[i]
            return i
          })
          // setLocal('userInfo', this.userInfo)
        }
      })
    },
    async getUser(): Promise<void> {
      const res = await getUser()
      if (res) {
        const obj = res.data
        Object.keys(obj).map((i) => {
          this.userInfo[i] = obj[i]
          return i
        })
        setLocal('userInfo', this.userInfo)
      }
    },
    logout(): void {
      if (this.status.ACCESS_TOKEN) {
        this.status.ACCESS_TOKEN = ''
        Object.keys(this.userInfo).map((i: string) => {
          this.userInfo[i] = i === 'router' ? [] : ''
          console.log(this.userInfo[i])
          return i
        })
        console.log(this.userInfo)
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        logout({})
      }
      router.push({ name: 'Login' })
    },
    async GenerateRoutes(): Promise<void> {
      // const res: any = await getRouter()

      generatorDynamicRouter(list || [])
    }
  }
})
