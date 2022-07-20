<template>
  <el-form label-width="80px" style="width: 600px">
    <el-form-item label="企业名称">
      <el-input v-model="info.name" disabled></el-input>
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input disabled :value="info.companyAddress"></el-input>
    </el-form-item>
    <el-form-item label="公司电话">
      <el-input disabled :value="info.companyPhone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input disabled :value="info.mailbox"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input disabled :value="info.remarks"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCompanyInfo } from '@/api/setting'
// $store.state.user.userInfo.companyId -> 快捷方式
import { mapGetters } from 'vuex'
export default {
  filters: {},
  components: {},
  data () {
    return {
      info: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {},
  async created () {
    const res = await getCompanyInfo(this.companyId)
    console.log(res)
    this.info = res
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
</style>
