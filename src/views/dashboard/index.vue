<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div id="printMe" style="background: red">
      <p>葫芦娃，葫芦娃</p>
      <p>一根藤上七朵花</p>
      <p>小小树藤是我家 啦啦啦啦</p>
      <p>叮当当咚咚当当浇不大</p>
      <p>叮当当咚咚当当 是我家</p>
      <p>啦啦啦啦</p>
      <p>...</p>
    </div>

    <button v-print="'#printMe'">Print local range</button>

    <input
      type="file"
      accept="image/jpg,image/png,image/jpeg,image/gif"
      @change="handleChange"
    />
    <img :src="src" alt="" />
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDmKF1OZnGwPeh9MR6bwUofX80vd6OBRM9',
  SecretKey: 'jCevznLEwOaVIYaNYaXGjxxlKfw8G9nX'
})
console.log(cos)
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data () {
    return {
      src: ''
    }
  },
  methods: {
    handleChange (e) {
      console.dir(e.target)
      cos.putObject({
        Bucket: 'heima123-1300357219', /* 写你的存储桶名字 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 ap-nanjing */
        Key: 'heima', /* 必须 随便写的  */
        StorageClass: 'STANDARD', // 不用改
        Body: e.target.files[0], // 上传文件对象
        // 图片比较大的时候，会有一个进度效果
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        console.log(err || data)
        this.src = data.Location
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
