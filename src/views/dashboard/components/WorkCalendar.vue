<template>
  <div>
    <el-row type="flex" justify="end" :gutter="10">
      <el-col :span="6">
        <el-select
          v-model="year"
          size="mini"
          style="width: 100%"
          @change="handleChange"
        >
          <el-option
            v-for="(item, index) in 11"
            :key="index"
            :value="new Date().getFullYear() - 6 + item"
            >{{ new Date().getFullYear() - 6 + item }}</el-option
          >
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          v-model="month"
          size="mini"
          style="width: 100%"
          @change="handleChange"
        >
          <el-option v-for="(item, index) in 12" :key="index" :value="item">{{
            item
          }}</el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-calendar ref="calendar" v-model="value">
        <template #dateCell="scope">
          <span>{{ scope.date.getDate() }}</span>
          <div
            v-if="scope.date.getDay() === 0 || scope.date.getDay() === 6"
            class="rest"
          >
            休
          </div>
        </template>
      </el-calendar>
    </el-row>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      month: (new Date()).getMonth() + 1,
      year: (new Date()).getFullYear(),
      value: new Date()
    }
  },
  computed: {},
  watch: {
    // value: {
    //   handler (newVal, oldVal) {
    //     this.month = newVal.getMonth() + 1
    //     this.year = newVal.getFullYear()
    //   },
    //   deep: true
    // }
  },
  created () {
    // this.$next(() => {
    //   // 如果非要在created中操作DOM，一定要写在nextTick
    // })
  },
  mounted () {
    // 每个组件身上都有一个$el属性，对应是渲染成真正DOM之后最外层的div盒子
    // 不操作DOM功能肯定做不出来
    var that = this// 把外面的this对应的对象存储起来
    this.$refs.calendar.$el.addEventListener('click', function () {
      // console.log(that.$refs.calendar.realSelectedDay)// 这里面不能用this,因为this指向是DOM元素，而不是当前组件实例对象
      // realSelectedDay用户选择哪一天
      that.month = new Date(that.$refs.calendar.realSelectedDay).getMonth() + 1
    })
  },
  methods: {
    handleChange () {
      var str = this.year + '-' + this.month
      console.log(str)
      this.value = new Date(str)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar__body {
  padding: 0;
}
::v-deep .el-calendar-table td {
  border: none;
  text-align: center;
}
::v-deep .el-calendar-table tr td:first-child {
  border: none;
}
::v-deep .el-calendar-table tr:first-child td {
  border: none;
}
.rest {
  border-radius: 50%;
  background-color: orange;
  color: #fff;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  display: inline-block;
}
</style>
