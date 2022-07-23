<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTool title="共1条记录">
        <template #right>
          <el-button type="danger" size="mini" @click="exportExcel"
            >普通excel导出</el-button
          >
          <el-button type="info" size="mini" @click="exportExcel1"
            >复杂表头excel导出</el-button
          >
          <!-- 车上有一个导航器 杭州->上海
          $router 用来实现路由切换的 相当于VueRouter实例 beforeEach afterEach
          $route 获取路由相关的参数 query params 指的是当前路由 -->
          <el-button
            type="success"
            size="mini"
            @click="$router.push('/import?type=user')"
            >excel导入</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="addEmployeeVisible = true"
            >新增员工</el-button
          >
        </template>
      </PageTool>

      <el-card style="margin-top: 14px">
        <el-table border :data="employees">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column
            label="姓名"
            sortable
            prop="username"
          ></el-table-column>
          <el-table-column label="头像" prop="staffPhoto">
            <template v-slot="scope">
              <img
                v-imgerror
                :src="scope.row.staffPhoto"
                style="width: 40px"
                @click="showQrDialog(scope.row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile"></el-table-column>
          <el-table-column label="工号" prop="workNumber"></el-table-column>
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            :formatter="formatterEmployee"
          ></el-table-column>
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="scope">
              {{ scope.row && scope.row.formOfEmployment | formatFormType }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName"></el-table-column>
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template v-slot="scope">
              {{ scope.row.timeOfEntry | dateformat }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="enableState">
            <template v-slot="scope">
              <el-switch :value="scope.row.enableState"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="350px" align="center">
            <template v-slot="scope">
              <el-button
                type="text"
                @click="$router.push('/employee/detail/' + scope.row.id)"
                >查看</el-button
              >
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text" @click="showRoleDialog(scope.row.id)"
                >角色</el-button
              >
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog title="分配角色" :visible.sync="roleVisible">
      <!-- 里面是有二个数组 一个是所有数据的数组 一个是选中的数组 -->
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-button type="primary" @click="assignRoles">确定</el-button>
        <el-button @click="roleVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 新增员工 -->
    <el-dialog
      title="新增员工"
      :visible.sync="addEmployeeVisible"
      @close="handleClose"
    >
      <el-form
        ref="employeeRef"
        label-width="80px"
        :model="employeeForm"
        :rules="employeeFormRules"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="employeeForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="employeeForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="employeeForm.timeOfEntry"
            type="date"
            placeholder="选择日期"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="employeeForm.formOfEmployment"
            placeholder="请选择"
          >
            <el-option
              v-for="item in hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="employeeForm.workNumber"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="departmentName">
          <el-input
            v-model="employeeForm.departmentName"
            @focus="showDepartment"
          ></el-input>
          <el-tree
            v-if="deparmentList.length > 0"
            :data="deparmentList"
            default-expand-all
            :props="{ label: 'name' }"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="employeeForm.correctionTime"
            type="date"
            placeholder="选择日期"
            clearable
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary">确定</el-button>
        <el-button @click="addEmployeeVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 二维码对话框 -->
    <el-dialog title="图片二维码" :visible.sync="qrcodeVisible">
      <el-row type="flex" justify="center">
        <canvas ref="canvas"></canvas>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { getDepartmentsList } from '@/api/departments'
import { validMobile } from '@/utils/validate'
import { getUserDetailById } from '@/api/user'
import { getRoleList } from '@/api/setting'
// 把花裤衩 vue-element-admin excel导出 准备好表头 [] 准备好数据 二维数组
import { getEmployee, assignRoles } from '@/api/employee'
import employees from '@/constant/employees'
// 懒加载 写法
// import Export2Excel from '@/vendor/Export2Excel'
export default {
  name: 'Employee',
  components: {},
  filters: {
    formatFormType (id) {
      var obj = employees.hireType.find(item => item.id === id - 0)
      if (obj) {
        return employees.hireType.find(item => item.id === id - 0).value
      } else {
        return '未知'
      }
    }
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不对'))
    }
    return {
      paramsObj: {
        page: 1,
        size: 5
      },
      employees: [],
      total: null,
      roleVisible: false,
      checkList: [],
      roleList: [],
      id: null,
      addEmployeeVisible: false,
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      employeeFormRules: {
        mobile: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      hireType: employees.hireType,
      deparmentList: [],
      qrcodeVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getEmployee()
  },
  methods: {
    async getEmployee () {
      const res = await getEmployee(this.paramsObj)
      console.log(res)
      this.employees = res.rows
      this.total = res.total
    },
    formatterEmployee (row, column, cellValue, index) {
      // console.log(row)// 就是这一行
      // console.log(column)// 当前这一列相关的信息 比如说这一列有多宽
      // console.log(cellValue)// 单元的值
      // console.log(index)// 索引
      var obj = employees.hireType.find(item => item.id === cellValue - 0)
      if (obj) {
        return employees.hireType.find(item => item.id === cellValue - 0).value
      } else {
        return '未知'
      }
    },
    async exportExcel () {
      // Object.keys(对象) -> 可以得到对象所有的属性名组成的数组
      // Object.values(对象) -> 得到对象所有的属性值组成的数组
      // 1. 获取所有的列表数据
      const { rows } = await getEmployee({ page: 1, size: 9999 })
      // 遍历数组，把数组每一项对象删除两个属性
      rows.forEach(item => {
        delete item.password
        delete item.staffPhoto
      })
      // 2. 把列表数据进行加工处理变成二维数组
      var data = []// data就会是一个二维数组
      rows.forEach(item => {
        data.push(Object.values(item))
      })
      // 因为我们导出的表格表头要是中文的
      const headers = {
        'id': '编号',
        'username': '姓名',
        'mobile': '手机',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门'
      }
      var tHeader = Object.keys(rows[0]).map(item => (headers[item]))

      // 只有按钮点击了才会导入
      import('@/vendor/Export2Excel').then(excel => {
        //   3. 使用这个插件导出成excel

        // 再发一次请求，这一次size写成9999，这样可以实现导出所有的数据
        // 把数组中每一项对象转换成数组
        // const tHeader = ['编号', '姓名']
        // const data = [[1, '张三'], [2, '李四']]
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '人力资源表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    exportExcel1 () {
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      const tHeader = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const data = [
        ['张三', '13000000', '2019-1-1', '正式', '2019-1-2', '110', 'java部门'],
        ['李四', '13000000', '2019-1-1', '正式', '2019-1-2', '111', 'java部门']
      ]

      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          multiHeader, // 第一行表头 复杂表头
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          merges // 设置合并规则
        })
      })
    },
    async showRoleDialog (id) {
      this.id = id
      const { rows } = await getRoleList({ page: 1, size: 9999 })
      this.roleList = rows
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds
      this.roleVisible = true
    },
    async assignRoles () {
      const res = await assignRoles({
        id: this.id,
        roleIds: this.checkList
      })
      console.log(res)
      this.roleVisible = false
    },
    handleClose () {
      this.$refs.employeeRef.resetFields()
      this.deparmentList = []
    },
    async showDepartment () {
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
      this.deparmentList = tranferListToTree(res.depts, '')
    },
    handleNodeClick (obj) {
      this.employeeForm.departmentName = obj.name// 当前节点name赋值给表单中的部门名字
      this.deparmentList = []// 关闭tree
    },
    showQrDialog (src) {
      console.log(src)
      // 数据变了，我们不能立马获取最新的DOM内容，因为视图不能立马更新
      this.qrcodeVisible = true
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, 'https://t11.baidu.com/it/u=3005961094,4112124005&fm=58', function (error) {
          if (error) console.error(error)
          console.log('success!')
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
