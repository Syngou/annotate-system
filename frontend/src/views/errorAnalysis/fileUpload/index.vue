<template>
  <div class="file-upload">
    <el-upload
      v-show="!isUploaded"
      class="upload-demo"
      drag
      action="http://10.250.127.20:8000/error_analysis/file_upload/"
      name="analysis_file"
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
    <div v-show="isUploaded">
      <router-link to="text">
        <el-button type="primary" style="margin-right: 20px"
          >文本分析</el-button
        ></router-link
      >
      <router-link to="charts"
        ><el-button type="primary">图表分析</el-button></router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isUploaded: false,
    };
  },
  methods: {
    handleSuccess() {
      this.$message.success("上传成功");
      this.isUploaded = true;
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