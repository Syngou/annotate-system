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
          <img :src="avatar" class="user-avatar" alt="用户头像" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 主控台 </el-dropdown-item>
          </router-link>
          <router-link to="/annotateSetting">
            <el-dropdown-item> 标注设置 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <output-options ref="outputOptions" />
  </div>
</template>

<script>
import OutputOptions from "./components/OutputOptions";
import { mapGetters } from "vuex";

export default {
  name: "TopNavigation",
  components: {
    OutputOptions
  },

  computed: {
    ...mapGetters(["avatar"])
  },

  methods: {
    /**
     *  注销登录状态
     */
    async logout() {
      await this.$store.dispatch("user/logout");
    },
    /**
     * : 标注数据导出为文件
     */
    exportData() {
      this.$refs.outputOptions.dialogVisible = true;
    },
    /**
     * 暂存标注数据
     */
    // TODO 待开发 或者说有没有必要开发
    saveTamporaryData() {
      this.$message.info("待开发");
    }
  }
};
</script>
<style scoped lang="scss">
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

  /* 标题样式 */
  .title {
    margin: 0 30px;
    color: white;
    font-size: 22px;
  }

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

  // 用户头像
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
@media screen and (max-width: 400px) {
  .title {
    display: none;
  }
}
</style>
