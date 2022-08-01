<template>
  <div id="app">
    <!-- 一级路由占位符 -->
    <!-- <router-view /> -->
    <button @click="flag = true">按钮</button>
    <MyDialog :visible.sync="flag" width="50%" title="标题">
      主体内容部分
      <template #footer>
        <button>确定</button>
      </template>
    </MyDialog>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      flag: false
    }
  }
}
</script>
