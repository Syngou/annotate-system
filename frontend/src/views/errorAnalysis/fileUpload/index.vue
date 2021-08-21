<template>
  <div class="file-upload">
    <el-upload
      v-show="!isUploaded"
      class="upload-demo"
      drag
      accept="text/plain"
      action="http://localhost:8000/api/error_analysis/"
      name="analysis_file"
      :on-success="handleSuccess"
      :on-error="handleError"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">
        只能上传txt文件，且不超过500kb
      </div>
    </el-upload>
    <div v-show="isUploaded">
      <div style="font-size: 100px; margin-left: 50px;">
        <SvgIcon icon-class="success" />
      </div>
      <div>文件上传成功了，现在您可以选择</div>
      <router-link to="errorAnalysis/text">
        <el-button type="primary" style="margin-right: 20px;">
          文本分析
        </el-button>
      </router-link>
      <router-link to="errorAnalysis/charts">
        <el-button type="primary">
          图表分析
        </el-button>
      </router-link>
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
    handleSuccess(response) {
      let data = JSON.parse(response.data.data);
      this.$store.dispatch("errorAnalysis/setData", data);
      this.$message.success("上传成功");
      this.isUploaded = true;
    },
    handleError() {
      this.$message.error("上传失败");
    },
  },
};
</script>

<style lang="scss" scoped>
.file-upload {
  display: flex;
  justify-content: center;
  margin-top: 10%;
}
</style>
