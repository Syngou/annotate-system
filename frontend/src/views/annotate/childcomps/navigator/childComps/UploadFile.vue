<template>
  <div>
    <el-dialog
      :visible.sync="uploadModal"
      title="上传文件"
      :modal-append-to-body="false"
      width="28%"
    >
      <span>
        <el-upload
          class="upload-demo"
          drag
          multiple
          action="http://localhost/8080/upload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">文件不超过500kb</div>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadModal = false">取 消</el-button>
        <el-button type="primary" @click="uploadModal = false">确 定</el-button>
      </span>
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
