import axios from 'axios'
import { getTime } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '@/router'
// vuex和本地存储
// 1. vuex数据是响应式的,实时更新的,而本地存储需要用户手动更新
// 2. 速度vuex更快,因为vuex数据在内存中 本地存储在文件中,获取时间慢
import store from '@/store'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = store.state.user.token
  // 每次发送ajax的时候，先看一下token拿回来的时间和当前时间差是不是超过2个小时，如果超过了就认为token过期了，直接销毁让用户重新登录
  if (token) {
    // 主动介入 类似我们自己每天打开支付宝看时间到了没有，到了就去做
    const time = Date.now() - getTime()
    // 2 * 60 * 60 * 1000 2个小时
    if (time > 7200000) {
      store.dispatch('user/logout')
      router.push('/login')
    }
    // config.headers.Authorization = 'Bearer ' + token
    config.headers['Authorization'] = 'Bearer ' + token
    // 如果头信息有其他东西，这样写直接把其他东西全部搞没了 头信息是后台自动加的
    // config.headers = {
    //   Authorization: 'Bearer ' + token
    // }
    // console.log(config.headers)
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // console.log(response)
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function (error) {
  // 被动处理 从来不看手机，到了公共场所就往里进，在扫码的时候被别人发现过期 让你去做
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request

// const obj = {
//   a: 1,
//   b: 2
// }

// const { a, b } = obj

// const response = {
//   data: {
//     data: 122,
//     message: '成功',
//     success: true
//   }
// }
// const {data,message,success} = response.data
