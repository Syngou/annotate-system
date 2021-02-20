<template>
  <div>
    <el-dialog
      :visible.sync="uploadModal"
      title="上传文件"
      :modal-append-to-body="false"
    >
      <el-upload
        class="upload-demo"
        drag
        multiple
        action="http://localhost/8080/upload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  created() {
    this.$bus.$on("showUpload", () => {
      this.uploadModal = true;
    });
  },
  data() {
    return {
      uploadModal: false, // 上传文件
    };
  },
};
</script>

<style scoped>
</style>
