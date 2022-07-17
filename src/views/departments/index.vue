<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card
        v-loading="isLoading"
        style="min-height: 700px"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-tabs>
          <el-tab-pane label="用户管理">
            <!-- 用了一个行列布局 -->
            <TreeItem
              :node="titleObj"
              @delDepartment="getDepartmentsList"
            ></TreeItem>
            <!-- :default-expand-all="true" -->
            <el-tree :data="data" default-expand-all>
              <!-- <template slot-scope="scope"></template> -->
              <!-- 使用 scoped slot 会传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据 -->
              <template v-slot="scope">
                <TreeItem
                  :node="scope.node"
                  @delDepartment="getDepartmentsList"
                ></TreeItem>
              </template>
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
// function fn (obj) {
//   console.log(obj.node)
// }
// fn({ node: 100 })
import { getDepartmentsList } from '@/api/departments'
import TreeItem from './components/TreeItem.vue'
export default {
  filters: {},
  components: { TreeItem },
  data () {
    return {
      data: [],
      titleObj: {},
      deletedArr: [],
      isLoading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartmentsList()
  },
  methods: {
    // 这个例子不适合用这个方式写，太麻烦了 渲染函数写法
    // renderContent: function (h) {
    //   return h('h1', ['hello'])
    // }
    async getDepartmentsList () {
      // 三元表达式 写二层 true?三元 一看就懂
      const res = await getDepartmentsList()
      // 我们的数据不能直接使用，而是先加工处理一下才能使用 递归在写的时候慢慢就意识到了 层次不确定
      function tranferListToTree (list, pid) {
        var list1 = []
        list.forEach(item => {
          if (item.pid === pid) {
            list1.push(item)
            item.children = tranferListToTree(list, item.id)
          }
        })
        return list1
      }
      this.data = tranferListToTree(res.depts, '')
      this.titleObj = res.depts[0]
      this.isLoading = false
    },
    delFn (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped lang='scss'>
// :deep()
::v-deep .el-tree-node {
  padding: 10px !important;
  span,
  div {
    font-size: 20px;
  }
}
::v-deep .el-tree-node__content {
  padding: 20px 0 !important;
}
</style>
