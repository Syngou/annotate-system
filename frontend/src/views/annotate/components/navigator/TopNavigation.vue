<template>
  <div class="topNavigation">
    <span class="title">医疗文本标注和处理系统</span>
    <!-- TODO 解决起始索引后再打开-->
    <!-- <a @click="$bus.$emit('autoAnnotate')">自动化标注</a> -->
    <a @click="exportData">导出数据</a>
    <!-- TODO 等待数据库，待开发功能-->
    <a @click="saveTamporaryData">暂存数据</a>
    <router-link v-if="!avatar" to="/login" style="float: right;">
      登录
    </router-link>
    <div v-else class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
            alt="用户头像"
          />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 主控台 </el-dropdown-item>
          </router-link>
          <router-link to="/text/setting">
            <el-dropdown-item> 标注设置 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <AutoAnnotate />
  </div>
</template>

<script>
import AutoAnnotate from "./components/AutoAnnotate";
import { mapGetters } from "vuex";

export default {
  name: "TopNavigation",
  components: {
    AutoAnnotate,
  },
  computed: {
    ...mapGetters(["avatar", "annotateData", "typesInfo"]),
  },

  methods: {
    /**
     * @description 注销登录状态
     */
    async logout() {
      await this.$store.dispatch("user/logout");
    },
    /**
     * @description: 标注数据上传后台
     */
    exportData() {
      const url = window.URL.createObjectURL(
        new Blob([
          JSON.stringify({
            id: this.$store.state.annotate.essayId,
            text: this.$store.state.annotate.annotateText,
            annotations: this.annotateData,
          }),
        ])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `file${this.$store.state.annotate.essayId}.jsonl`
      );
      document.body.appendChild(link);
      link.click();
    },
    /**
     * 暂存标注数据
     */
    // TODO 待开发
    saveTamporaryData() {
      this.$message.info("待开发");
    },
  },
};
</script>
<style scoped lang="scss">
/* 标题样式 */
.title {
  margin: 0 30px;
  color: white;
  font-size: 22px;
}

@media screen and (max-width: 400px) {
  .title {
    display: none;
  }
}

/* 导航条 */
.topNavigation {
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 50px;
  padding-right: 20px;
  z-index: 50;
  background-color: #68768a;

  /* 导航条链接 */
  a {
    display: inline-block;
    padding: 14px 7px;
    background-color: #606d80;
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

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 5px;

    .avatar-wrapper {
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
