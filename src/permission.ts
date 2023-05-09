import { configure, start, done } from 'nprogress'
import { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { decode, encode, useLocal } from '@/utils/tools'
import { useUserStore } from '@/store/modules/user'
import { dealWithComponents } from '@/router/asyncRouter'

configure({ showSpinner: false })

const loginRoutePath = '/Login'
const defaultRoutePath = '/'

router.beforeEach(async (to, from) => {
  start()
  const {
    getStatus,
    getUserInfo,
    getTags,
    setToken,
    logout,
    GenerateRoutes,
    getUser,
    concatAllowRoutes,
    changeTagNavList,
    addCachedViews,
    changeNocacheViewStatus
  } = useUserStore()
  // 修改页面title
  // const reg = new RegExp(/^(.+)(\s\|\s.+)$/)
  // const appTitle = import.meta.env.VITE_APP_TITLE
  // document.title = !to.meta.title
  //   ? appTitle
  //   : appTitle.match(reg)
  //   ? appTitle.replace(reg, `${to.meta.title}$2`)
  //   : `${to.meta.title} | ${appTitle}`

  // 判断当前是否在登陆页面
  if (to.path.toLocaleLowerCase() === loginRoutePath.toLocaleLowerCase()) {
    done()
    if (getStatus.ACCESS_TOKEN)
      return typeof to.query.from === 'string'
        ? decode(to.query.from)
        : defaultRoutePath
    return
  }
  // 判断是否登录
  if (!getStatus.ACCESS_TOKEN) {
    return loginRoutePath + (to.fullPath ? `?from=${encode(to.fullPath)}` : '')
  }

  // 前端检查token是否失效
  useLocal('token')
    .then((d) => setToken(d.ACCESS_TOKEN))
    .catch(() => logout())

  // 判断是否还没添加过路由
  console.log(getUserInfo.router.length)

  if (getUserInfo.router.length === 0) {
    /**
     * 刷新页面缓存读取路由
     */
    // const { setUser } = useUserStore()
    // await setUser()
    // if (getUserInfo.router.length === 0) {
    //   await GenerateRoutes()
    //   await getUser()
    // }

    /**
     * 刷新页面重新获取路由
     */
    await GenerateRoutes()
    await getUser()

    dealWithComponents(getUserInfo.router)

    for (let i = 0; i < getUserInfo.router.length; i++) {
      router.addRoute(getUserInfo.router[i] as RouteRecordRaw)
    }
    concatAllowRoutes()
    return to.fullPath
  }
  changeTagNavList(to) // 切换导航，记录打开的导航(标签页)

  // 离开当前页面时是否需要添加当前页面缓存
  const reg = new RegExp(/^\/redirect\//)
  !reg.test(from.path) &&
    getTags.tagsList.some((v: any) => v.name === from.name) &&
    !getTags.cachedViews.some((v: any) => v === from.name) &&
    !getTags.isNocacheView &&
    addCachedViews({
      name: from.name as string,
      noCache: from.meta.noCache as boolean
    })

  // 缓存重置
  changeNocacheViewStatus(false)
})

router.afterEach(() => {
  done()
})
