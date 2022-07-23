<template>
  <div id="app">
    <!-- 一级路由占位符 -->
    <!-- <router-view /> -->
    <p>{{ msg }}</p>
    <p>{{ msg }}</p>
    <input v-model="msg" type="text" />
  </div>
</template>

<script>
// 利用是数据劫持+观察者模式
export default {
  name: 'App',
  data () {
    return {
      msg: 'hello'
    }
  }
}
</script>
