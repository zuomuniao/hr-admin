<script>
// 组件要显示内容有二种写法
// 1. template的写法 模板的写法 html写法 简单 但是不够灵活
// 2. render函数的写法 js写法 复杂 很灵活 因为可以写逻辑（if,else,for)
// <h1></h1>
// createElement('h1')
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {},
  render: function (h) {
    return h('h1', ['hello'])
  }
}
</script>

<style scoped>
</style>
