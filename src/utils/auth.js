import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// cookie和本地存储
// 1. cookie是有有效期，可以设置 locaclStorage永久有效，除非用户自己手动清理
// 2. cookie兼容性支持ie6 会随着请求头自动发送到服务器
// 3. cookie 4kb左右 localStorage 5MB
