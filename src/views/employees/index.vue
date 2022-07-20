<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTool title="共1条记录">
        <template #right>
          <el-button type="danger" size="mini">普通excel导出</el-button>
          <el-button type="info" size="mini">复杂表头excel导出</el-button>
          <el-button type="success" size="mini">excel导入</el-button>
          <el-button type="primary" size="mini">新增员工</el-button>
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
              <img v-imgerror :src="scope.row.staffPhoto" style="width: 40px" />
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
              {{ scope.row.formOfEmployment | formatFormType }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName"></el-table-column>
          <el-table-column
            label="入职时间"
            prop="timeOfEntry"
          ></el-table-column>
          <el-table-column label="状态" prop="enableState"></el-table-column>
          <el-table-column label="操作" width="350px" align="center">
            <template>
              <el-button type="text">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployee } from '@/api/employee'
import employees from '@/constant/employees'
export default {
  name: 'Employee',
  components: {},
  filters: {
    formatFormType (id) {
      return employees.hireType.find(item => item.id === id - 0).value
    }
  },
  data () {
    return {
      paramsObj: {
        page: 1,
        size: 20
      },
      employees: [],
      total: null
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
      return employees.hireType.find(item => item.id === cellValue - 0).value
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
