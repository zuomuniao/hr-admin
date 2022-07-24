<template>
  <div>
    <el-row type="flex" justify="end" :gutter="10">
      <el-col :span="3">
        <el-select v-model="year" size="mini" @change="handleChange">
          <el-option
            v-for="(item, index) in 11"
            :key="index"
            :label="new Date().getFullYear() - 6 + item"
            :value="new Date().getFullYear() - 6 + item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="month" size="mini" @change="handleChange">
          <el-option
            v-for="(item, index) in 12"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="value">
      <template #dateCell="scope">
        <p :class="scope.data.isSelected ? 'is-selected' : ''">
          <span>{{ scope.data.day.split("-")[2] - 0 }}</span>
          <span>{{ [6, 0].includes(scope.date.getDay()) ? "休" : "" }}</span>
          <!-- {{ scope.data.day.split("-")[2] }} -->
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      value: new Date(),
      year: 2022,
      month: 1
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    handleChange () {
      var date = new Date()
      date.setFullYear(this.year)
      date.setMonth(this.month - 1)
      this.value = date
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-calendar__header {
  display: none;
}
</style>
