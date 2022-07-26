import PageTool from './PageTool'
// vue插件的写法
// 1. 定义一个插件 插件就是一个普通的对象，只不过这个对象有一个固定的方法，名字叫install 参数就是Vue
// 2. 使用一个插件 Vue.use(插件名字) 使用的时候 会自动执行install方法
// 为什么要使用插件或者插件有什么好处?
// 如果不用插件的写法，我们封装了100个组件，给别的同事使用，同事他们需要导入100次，注册100次 使用不方便
// 但是插件只要我们设置好了，用户在使用的时候只有一行
// 哪些东西是插件？
// 1. vue-router Vue.use(VueRouter) <router-link></router-link> <router-view></router-view>
// 2. vuex Vue.use(Vuex)
// 3. element-ui Vue.use(element) 几百个组 el-button Vue.component
// 很多概念的出现都是为了让用户写代码更简单 promise async await 解决以前代码bug
import UploadImage from './UploadImage'
export default {
  // install 安装
  install (Vue) {
    Vue.component('PageTool', PageTool)
    Vue.component('UploadImage', UploadImage)
    // Vue.prototype.a = 100
    // Vue.directive
    // Vue.filter
  }
}

// 要写的代码没有变 使用者角度

// 如果没有插件,我们封装了一堆指令\过滤器\组件... 给同事用的时候 同事需要一个一个注册
// 但是如果有插件,只要写一行
