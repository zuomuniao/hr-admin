// 自定义指令 我们想封装一个dom操作的时候 供页面的一堆的组件去使用
export const imgerror = {
  inserted (el, binding) {
    el.onerror = function () {
      this.src = 'http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'
    }
  }
}

// 拿到token一瞬间 把当时时间点记下来 Date.now() - 大于2小时
