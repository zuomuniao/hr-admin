<template>
  <div style="width: 100%">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 40px; padding: 30px 140px; font-size: 14px; width: 100%"
    >
      <el-col>
        <span>{{ node.data ? node.data.name : node.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>{{ node.data ? node.data.manager : "负责人" }}</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown @command="onCommand">
              <span> 操作<i class="el-icon-arrow-down" /> </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">添加子部门</el-dropdown-item>
                <template v-if="node.data">
                  <el-dropdown-item command="b">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="c">删除部门</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- @click.native.stop -> 阻止冒泡，因为这个东西在tree里面写 -->
    <!-- stop -> e.stopPropagation() -->
    <el-dialog
      :title="title"
      :visible.sync="addDialogVisible"
      width="50%"
      @click.native.stop
      @close="handleAddClose"
    >
      <el-form
        ref="addFormRef"
        label-width="100px"
        :model="addDepartmentForm"
        :rules="rules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="addDepartmentForm.name"
            placeholder="1-50个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="addDepartmentForm.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <!-- <el-input v-model="addDepartmentForm.manager"></el-input> -->
          <el-select
            v-model="addDepartmentForm.manager"
            placeholder="请选择"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="addDepartmentForm.introduce"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 在当前部门下面添加子部门 子部门名字不能在当前子部门有重复
// 先把所有的部门获取到，然后filter 根据 pid 这样可以找到当前部门下面所有现有的子部门 然后在里面找看有没有 some
import { getSimpleUserList } from '@/api/user'
import { delDepartment, addDepartment, getDepartmentsList, editDepartment } from '@/api/departments'
export default {
  filters: {},
  components: {},
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  data () {
    // element ui自定义校验规则函数
    // rule 代表当前校验规则
    // value要校验的数据
    // callback不加小括号 就会出现不管数据是什么都会失败
    const validateName = async (rule, value, callback) => {
      // 拿到所有的部门数据
      const res = await getDepartmentsList()
      if (this.isEdit) {
        // 标题不存在编辑
        const pid = this.node.data.pid// 把当前要编辑的部门父级的id找到了 然后根据这个pid去找所有的兄弟元素
        // && item.id !== this.node.data.id 排除自己 因为自己可以和自己重名
        res.depts.filter(item => item.pid === pid && item.id !== this.node.data.id).some(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      } else {
        // 待筛选的所有的子部门的pid值
        const id = this.node.data ? this.node.data.id : ''
        // filter 筛选 只要子部门pid和当前部门id一样 说明就是它的子部门
        // some 看有没有符合条件
        res.depts.filter(item => item.pid === id).some(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      }
    }
    return {
      addDialogVisible: false,
      addDepartmentForm: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: ''// 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10之间', trigger: 'blur' },
          // blur -> 值没有变 只要失去焦点就会发送ajax change只会有值变了才发一次 性能好一点
          { validator: validateName, trigger: 'blur' }
        ]
      },
      users: [], // 用户列表
      isEdit: false// 用来判断当前是在做添加还是在做编辑
    }
  },
  computed: {
    // isTitle () {
    //   // return Boolean(this.node.data)
    //   return !!this.node.data
    // }
    title () {
      return this.isEdit ? '编辑部门' : '新增部门'
    }
  },
  watch: {},
  created () { },
  methods: {
    async onCommand (key) {
      if (this.users.length === 0) {
        this.getSimpleUserList()
      }
      if (key === 'a') {
        this.isEdit = false
        this.addDialogVisible = true
      } else if (key === 'b') {
        this.isEdit = true
        this.addDialogVisible = true
        console.log('编辑')
        // var obj = {a:1,b:2} --> ...obj 把花括号去掉 --> 重新加上去
        this.addDepartmentForm = { ...this.node.data }
      } else {
        try {
          await this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          console.log('用户确定了')
          await delDepartment(this.node.data.id)
          this.$emit('delDepartment', this.node.data.id)
        } catch (err) {
          console.log(err)
          this.$notify({
            message: '取消了删除',
            duration: 1000
          })
        }
      }
    },
    async getSimpleUserList () {
      const res = await getSimpleUserList()
      console.log(res)
      this.users = res
    },
    handleAddClose () {
      this.$refs.addFormRef.resetFields()// 表单重置
    },
    async onSubmit () {
      if (this.isEdit) {
        delete this.addDepartmentForm.children// 把对象的children属性移除
        await editDepartment(this.addDepartmentForm)
      } else {
        // 在哪一项上面新增部门，这一项的id就是pid
        // 标题id在node下面 其他在node.data下面
        this.addDepartmentForm.pid = this.node.data ? this.node.data.id : ''
        await addDepartment(this.addDepartmentForm)
      }
      this.addDialogVisible = false
      this.$emit('delDepartment')// 子向父传值，数据更新要刷新tree
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-col {
  span {
    height: 40px;
  }
}
</style>
