<template>
  <span @click="handleClick">
    <svg-icon icon-class="fullscreen" class="icon"></svg-icon>
  </span>
</template>

<script>
import screenfull from 'screenfull'
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async handleClick () {
      // mdn中原生写法
      // if (document.fullscreenElement) { // 判断是否在全屏状态中
      //   await document.exitFullscreen()// 退出全屏
      // } else {
      //   await document.documentElement.requestFullscreen()// 进入全屏
      // }
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.icon {
  color: #fff;
  font-size: 20px;
  margin-right: 6px;
}
</style>
