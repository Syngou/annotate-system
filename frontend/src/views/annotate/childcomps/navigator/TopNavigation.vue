<template>
  <div class="topNavigation">
    <span class="title">医疗文本标注平台</span>
    <a href="#" @click="ShowIntroduce">功能介绍</a>
    <a href="#" @click="ShowUpload">上传文件</a>
    <a href="#" @click="ShowPaste">输入文本</a>
    <a href="#" @click="outputContent">输出文本</a>
    <a href="#" @click="ShowAnnotate">自动化标注</a>
    <a href="#" @click="ShowDrawer">已标注</a>
    <a v-if="!avatar" href="/login" style="float: right">登录</a>
    <div v-else class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 信息面板 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
import { mapGetters } from "vuex";

export default {
  name: "TopNavigation",
  components: {
    Introduce,
    Paste,
    AutoAnnotate,
    ShowAnnotation,
    UploadFile,
  },
  computed: {
    ...mapGetters(["avatar"]),
  },
  methods: {
    /**
     * @description 退出登录状态
     */
    async logout() {
      await this.$store.dispatch("user/logout");
    },
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
<style scoped lang='scss'>
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

    /* 导航条链接 */
    a {
      display: inline-block;
      padding: 14px 16px;
      background-color: #333;
      color: #f2f2f2;
      text-align: center;
      text-decoration: none;
    }

    /* 链接颜色修改 */
    a:hover {
      background-color: #ddd;
      color: black;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
