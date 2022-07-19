<template>
  <div>
    <el-button type="primary" size="mini" @click="roleDialogVisible = true"
      >新增角色</el-button
    >
    <el-table :data="roleList" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <!-- <el-table-column>
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column
        label="角色名"
        prop="name"
        width="160px"
        sortable
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="description"
        sortable
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" @click="showRightDialog(scope.row.id)"
            >分配权限</el-button
          >
          <el-button type="text">修改</el-button>
          <el-button type="text" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="paramsObj.page"
        :page-size="paramsObj.pagesize"
        :page-sizes="[1, 2, 3, 4, 5, 6]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </el-row>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="rightVisible" width="20%">
      <!-- 只要是vue的项目，当你出现一个很奇怪的问题的时候，可以试一试v-if或$nextTick,或setTimeout  数据没有同步更新 -->
      <!-- v-if作用：保证每次对话框关闭的时候 让tree销毁，再显示对话框的时候，看到的tree是一个新的el-tree  -->
      <el-tree
        v-if="rightVisible"
        ref="myTree"
        :data="permissions"
        :props="{ label: 'name' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="selectedPermissions"
      ></el-tree>
      <template #footer>
        <el-button type="primary" @click="save">确认</el-button>
        <el-button @click="rightVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 新增和编辑的对话框 -->
    <el-dialog title="新增" :visible.sync="roleDialogVisible" @close="reset">
      <!-- 三层 -->
      <el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onClick">确认</el-button>
        <el-button @click="roleDialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, delRole, addRole } from '@/api/setting'
import { getPermissions, getPermissionsById, assignPermission } from '@/api/permission'
import { tranferListToTree } from '@/utils'
export default {
  filters: {},
  components: {},
  data () {
    return {
      paramsObj: {
        page: 1, // 默认拿第一页数据
        pagesize: 4// 每页数量
      },
      roleList: [],
      total: null,
      rightVisible: false,
      permissions: [],
      selectedPermissions: [],
      id: null,
      roleDialogVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const res = await getRoleList(this.paramsObj)
      this.roleList = res.rows
      this.total = res.total// 用于做分页
    },
    handleCurrentChange (page) {
      console.log(page)
      this.paramsObj.page = page
      this.getRoleList()
    },
    handleSizeChange (pagesize) {
      this.paramsObj.pagesize = pagesize
      this.getRoleList()
    },
    del (id) {
      this.$confirm('确定要删除这一行吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delRole(id)
        // 删除当前这一页最后一页 就应该跑到上一页
        if (this.roleList.length === 1 && this.paramsObj.page > 1) {
          this.paramsObj.page--
        }
        this.getRoleList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async showRightDialog (id) {
      this.id = id
      // 获取所有的权限点
      const res = await getPermissions()
      console.log(res)
      this.permissions = tranferListToTree(res, '0')
      // 获取当前的权限点
      const res1 = await getPermissionsById(id)
      console.log(res1)
      this.selectedPermissions = res1.permIds
      this.rightVisible = true
    },
    async save () {
      // console.log(this.$refs.myTree.getCheckedKeys())
      // id -> 角色id
      // ids数组 权限id数组
      // getCheckedKeys()只能获取到全选的东西
      // getHalfCheckedKeys()获取半选的东西
      // [...this.$refs.myTree.getCheckedKeys(),...this.$refs.myTree.getHalfCheckedKeys()]
      await assignPermission(this.id, this.$refs.myTree.getCheckedKeys())
      this.rightVisible = false// 把弹出层关闭
    },
    onClick () {
      // 二次校验
      this.$refs.myForm.validate(async bool => {
        if (!bool) return this.$message.error('表单数据非法')
        await addRole(this.form)
        this.getRoleList()
      })
    },
    reset () {
      this.$refs.myForm.resetFields()
    }
  }
}
// 角色：班长 经理 老板
</script>

<style scoped lang='scss'>
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
