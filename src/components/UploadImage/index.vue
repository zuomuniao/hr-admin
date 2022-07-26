<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      accept="image/png,image/jpg,image/jpeg,image/gif"
      :limit="limit"
      :class="{ hidden: filesList.length === limit }"
      :on-change="handleChange"
      :file-list="filesList"
      :http-request="handleRequest"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-progress :percentage="50"></el-progress>
    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDmKF1OZnGwPeh9MR6bwUofX80vd6OBRM9',
  SecretKey: 'jCevznLEwOaVIYaNYaXGjxxlKfw8G9nX'
})
export default {
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      filesList: []
    }
  },
  methods: {
    handleRemove (file) {
      this.filesList = this.filesList.filter(item => item.uid !== file.uid)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      console.log(fileList)
      this.filesList = fileList
    },
    handleRequest (obj) {
      console.log(obj)
      cos.putObject({
        Bucket: 'heima123-1300357219', /* 写你的存储桶名字 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 ap-nanjing */
        Key: Date.now() + '_' + obj.file.name, /* 必须 随便写的  */
        StorageClass: 'STANDARD', // 不用改
        Body: obj.file, // 上传文件对象
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

<style scoped lang='scss'>
// 原理：hidden类名是动态绑定
.hidden ::v-deep .el-upload--picture-card {
  display: none;
}
</style>
