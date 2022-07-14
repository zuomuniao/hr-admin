
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// vip 白名单 默认所有的是坏人,这几个是好人
// 白名单就是直接放行不用看有没有权限
const whiteList = ['/login', '/404']
// to 去哪 from 来自哪里 next 放行
// 前置路由守卫
router.beforeEach((to, from, next) => {
  // 开启进度效果
  NProgress.start()
  // 权限控制
  const token = store.state.user.token
  if (token) {
    // 如果登录过,就不能再去登录了,直接让去后台首页
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
      if (!store.state.user.userInfo.id) {
        // 这块ajax只会发送一次，优化了一下
        // 当用户手里面有token并且访问的不是登录页面,那就应该请求个人资料
        store.dispatch('user/getInfo')
      }
      next()// 放行
    }
  } else {
    // 用indexOf也可以,写起来有点麻烦
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
// 后置路由守卫
router.afterEach(() => {
  // 结束进度效果
  NProgress.done()
})
