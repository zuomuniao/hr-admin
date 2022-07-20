<template>
  <el-card>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <el-alert
          v-if="title.length > 0"
          type="info"
          show-icon
          :closable="false"
        >
          {{ title }}
        </el-alert>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  filters: {},
  components: {},
  props: {
    title: {
      type: String,
      default: ''
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
.el-alert {
  display: inline;
  width: unset;
  ::v-deep .el-icon-info {
    font-size: 14px;
  }
}
</style>
