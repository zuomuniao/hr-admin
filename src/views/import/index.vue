<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { importEmployee } from '@/api/employee'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data () {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    async handleSuccess ({ results, header }) {
      // excel导入的时候 第三方库xsls得到日期是天数，不是我们要的数据，所以要转换一下
      // 还有一种思路：时间戳是从1970年1月1号开始
      function formatDate (numb, format) {
        const time = new Date((numb - 1) * 24 * 3600000 + 1)
        time.setYear(time.getFullYear() - 70)
        const year = time.getFullYear() + ''
        const month = time.getMonth() + 1 + ''
        const date = time.getDate() - 1 + ''
        if (format && format.length === 1) {
          return year + format + month + format + date
        }
        return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
      }

      results = results.map(item => {
        return {
          correctionTime: formatDate(item.转正日期, '-'),
          mobile: item.手机号,
          timeOfEntry: formatDate(item.入职日期, '-'),
          username: item.姓名,
          workNumber: item.工号
        }
      })
      await importEmployee(results)
      this.$router.push('/employees')
    }
  }
}
</script>
