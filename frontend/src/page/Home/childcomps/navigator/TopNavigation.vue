<template>
  <div class="topNavigation">
    <span class="title">医疗文本标注平台</span>
    <a href="#" @click="ShowIntroduce">功能介绍</a>
    <a href="#" @click="ShowUpload">上传文件</a>
    <a href="#" @click="ShowPaste">输入文本</a>
    <a href="#" @click="outputContent">输出文本</a>
    <a href="#" @click="ShowAnnotate">一键标注</a>
    <a href="#" @click="ShowDrawer">已标注</a>
    <a href="#" @click="ShowLogin">登录</a>
    <Introduce></Introduce>
    <Paste></Paste>
    <Annotate></Annotate>
    <ShowAnnotation></ShowAnnotation>
    <UploadFile></UploadFile>
    <Login></Login>
  </div>
</template>

<script>
import Introduce from "./childComps/Introduce";
import Paste from "./childComps/Paste";
import Annotate from "./childComps/Annotate";
import ShowAnnotation from "./childComps/ShowAnnotation";
import Login from "./childComps/Login";
import UploadFile from "./childComps/UploadFile";

export default {
  name: "TopNavigation",
  components: {
    Introduce,
    Paste,
    Annotate,
    ShowAnnotation,
    Login,
    UploadFile,
  },
  methods: {
    /**
     * @description 输出文本，不知道需不需要，目前没有实现
     */
    outputContent() {
      this.$Message.info("功能正在开发...");
    },
    ShowAnnotate() {
      this.$bus.$emit("showAnnotate");
    },
    ShowIntroduce() {
      this.$bus.$emit("showIntroduce");
    },
    ShowPaste() {
      this.$bus.$emit("showPaste");
    },
    ShowDrawer() {
      this.$bus.$emit("showDrawer");
    },
    ShowLogin() {
      this.$bus.$emit("showLogin");
    },
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

  .topNavigation a:last-child {
    float: right;
  }

  /* 链接颜色修改 */
  .topNavigation a:hover {
    background-color: #ddd;
    color: black;
  }
</style>
