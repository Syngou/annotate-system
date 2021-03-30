<template>
  <div>
    开发时使用的临时页面，用于测试
    <div>
      <p>测试</p>

      <div>
        <ul id="list"></ul>
        <el-upload
          class="upload-demo"
          drag
          accept="image/*"
          :headers="{ 'annotate-system-token': token }"
          action="http://localhost:8000/user/setAvatar/"
          name="avatar"
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
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "../utils/auth";
export default {
  computed: {
    token() {
      console.log(getToken());
      return getToken();
    },
  },
  created() {
    this.login();
  },
  methods: {
    login() {},
    handleError() {
      this.$message.error("上传失败");
    },
    handleSuccess(response) {
      console.log(response);
      this.$message.success("上传成功");
    },
  },
};
</script>
