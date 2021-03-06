<template>
  <div class="file-upload">
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:8080"
      :on-success="handleSuccess"
      :on-error="handleError"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传word/txt文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  methods: {
    handleSuccess() {
      this.$message.success("上传成功");
    },
    handleError() {
      this.$message.error("上传失败");
    },
  },
};
</script>

<style scoped>
  .file-upload {
    display: flex;
    justify-content: center;
    margin-top: 10%;
  }
</style>