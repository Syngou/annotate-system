<template>
  <div class="topNavigation">
    <span class="title">医疗文本标注平台</span>
    <a href="#" @click="ShowIntroduce">功能介绍</a>
    <a href="#" @click="ShowUpload">上传文件</a>
    <a href="#" @click="ShowPaste">输入文本</a>
    <a href="#" @click="outputContent">输出文本</a>
    <a href="#" @click="ShowAnnotate">自动化标注</a>
    <a href="#" @click="ShowDrawer">已标注</a>
    <a href="/login" style="float: right">登录</a>
    <Introduce></Introduce>
    <Paste></Paste>
    <AutoAnnotate></AutoAnnotate>
    <ShowAnnotation></ShowAnnotation>
    <UploadFile></UploadFile>
  </div>
</template>

<script>
import Introduce from "./childComps/Introduce";
import Paste from "./childComps/Paste";
import AutoAnnotate from "./childComps/AutoAnnotate";
import ShowAnnotation from "./childComps/ShowAnnotation";
import UploadFile from "./childComps/UploadFile";

export default {
  name: "TopNavigation",
  components: {
    Introduce,
    Paste,
    AutoAnnotate,
    ShowAnnotation,
    UploadFile,
  },
  methods: {
    /**
     * @description 输出文本，不知道需不需要，目前没有实现
     */
    outputContent() {
      this.$message.error({
        message: "功能正在开发...",
        duration: 2000,
        showClose: true,
      });
    },
    /**
     * @description  显示已标注的词语对话框
     */
    ShowAnnotate() {
      this.$bus.$emit("showAnnotate");
    },
    /**
     * @description 显示介绍对话框
     */
    ShowIntroduce() {
      this.$bus.$emit("showIntroduce");
    },
    /**
     * @description 粘贴文本进行标注
     */
    ShowPaste() {
      this.$bus.$emit("showPaste");
    },
    /**
     * @description 自动化标注对话框
     */
    ShowDrawer() {
      this.$bus.$emit("showDrawer");
    },

    /**
     * @description 文件上传
     */
    ShowUpload() {
      this.$bus.$emit("showUpload");
    },
  },
};
</script>

<style scoped>
  /* 标题样式 */
  .title {
    margin-left: 30px;
    color: red;
    font-size: 22px;
  }

  /* 导航条 */
  .topNavigation {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 100%;
    padding-right: 20px;
    z-index: 50;
    background-color: #333;
  }

  /* 导航条链接 */
  .topNavigation a {
    display: inline-block;
    padding: 14px 16px;
    background-color: #333;
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
  }

  /* 链接颜色修改 */
  .topNavigation a:hover {
    background-color: #ddd;
    color: black;
  }
</style>
