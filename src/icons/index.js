import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// 等价于
// import './svg/404.svg'
// import './svg/bug.svg'
// 批量导入svg目录中所有的以svg结尾的文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
