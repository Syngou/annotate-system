<template>
  <div class="topNavigation">
    <span v-if="device !== 'mobile'" class="title">医疗文本标注平台</span>
    <a href="#" @click="$bus.$emit('showIntroduce')">功能介绍</a>
    <a href="#" @click="$bus.$emit('showPaste')">输入文本</a>
    <a href="#" @click="$bus.$emit('showAnnotate')">自动化标注</a>
    <a href="#" @click="$bus.$emit('showDrawer')">已标注</a>
    <router-link v-if="!avatar" to="/login" style="float: right"
      >登录</router-link
    >
    <div v-else class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <router-link to="/profile">
            <el-dropdown-item> 个人中心 </el-dropdown-item>
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
  </div>
</template>

<script>
import Introduce from "./components/Introduce";
import Paste from "./components/Paste";
import AutoAnnotate from "./components/AutoAnnotate";
import ShowAnnotation from "./components/ShowAnnotation";
import { mapGetters } from "vuex";

export default {
  name: "TopNavigation",
  components: {
    Introduce,
    Paste,
    AutoAnnotate,
    ShowAnnotation,
  },
  computed: {
    ...mapGetters(["avatar"]),
    device() {
      return this.$store.state.app.device;
    },
  },
  mounted() {
    if (window.innerWidth <= 400) {
      console.log("yes");
      this.$store.dispatch("app/toggleDevice", "mobile");
    }
  },
  methods: {
    /**
     * @description 退出登录状态
     */
    async logout() {
      await this.$store.dispatch("user/logout");
    },
  },
};
</script>
<style scoped lang='scss'>
  /* 标题样式 */
  .title {
    margin: 0 30px;
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
    height: 50px;
    padding-right: 20px;
    z-index: 50;
    background-color: #333;

    /* 导航条链接 */
    a {
      display: inline-block;
      padding: 14px 5px;
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
      margin-right: 5px;

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
