import PageTool from './PageTool'
export default {
  // install 安装
  install (Vue) {
    Vue.component('PageTool', PageTool)
    // Vue.prototype.a = 100
    // Vue.directive
    // Vue.filter
  }
}

// 要写的代码没有变 使用者角度

// 如果没有插件,我们封装了一堆指令\过滤器\组件... 给同事用的时候 同事需要一个一个注册
// 但是如果有插件,只要写一行
