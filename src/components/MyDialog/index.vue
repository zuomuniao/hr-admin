<template>
  <div v-show="visible">
    <div class="mask"></div>
    <div class="content" :style="{ width: width }">
      <span>{{ title }}</span>
      <button @click="$emit('update:visible', false)">x</button>
      <slot name="default"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
// 封装一个组件思路
// 1. 先把组件的html,css效果写出来
// 2. 看一下有哪些需要父组件传进去 props
// 3. 看一下里面有哪些自定义事件要触发 $emit 如果发现对props是双向操作可以用v-model或sync来简化语法
// 4. 如果html部分需要父组件来决定，就可以考虑使用插槽slot
// sync修饰符 =  :visible + @update:visible

// 面试的时候应该怎么答？
// 我可以用一个例子来给你说下，比如我来封装一个类似el-dialog的组件我是怎么做
// 1. 在components中新建一个文件夹叫MyDialog 然后新建一个文件叫index.vue
// 2. 使用语法Vue.component把它注册成一个全局组件
// 3. 随便找一个页面去使用它 <MyDialog title="标题" :visible.sync="flag" width="40%"></MyDialog>
// 4. 在组件内部通过props我平时一般用的是对象的写法 type是什么 required:true
// 5. 开始布局组件把html,css写好 在里面通过width设置对话框的宽度 通过title指定标题
// 6. 组件里面有一个关闭按钮 由于外面用的是sync修饰符，所以代码写成 @click="$emit('update:visible',false)"
// 7. 在里面创建一个插槽，一个是默认插槽，用来放主体内容 比如放表单 然后还有一个底部名字叫footer的具名插槽

export default {
  filters: {},
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.content {
  padding: 40px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
