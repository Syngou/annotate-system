<template>
  <div class="container">
    <!--    TODO : 样式的命名，class类的命名-->

    <el-dropdown
      style="margin-left: 20px; margin-top: 20px"
      class="el-dropdown-link"
    >
      <a href="javascript:void(0)">
        功能
        <i class="el-icon-arrow-down el-icon--right"></i>
      </a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>待开发</el-dropdown-item>
        <el-dropdown-item>待开发</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown style="margin-left: 20px" class="el-dropdown-link">
      <a href="javascript:void(0)">
        翻译
        <i class="el-icon-arrow-down el-icon--right"></i>
      </a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>待开发</el-dropdown-item>
        <el-dropdown-item>待开发</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown style="margin-left: 20px" class="el-dropdown-link">
      <a href="javascript:void(0)">
        工具
        <i class="el-icon-arrow-down el-icon--right"></i>
      </a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>待开发</el-dropdown-item>
        <el-dropdown-item>待开发</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="functionButton">
      <button @click="reduceFontSize">-</button>
      <span>字体</span>
      <button @click="addFontSize">+</button>
    </span>
  </div>
</template>

<script>
export default {
  name: "myDropDown",
  methods: {
    /**
     
     * @description 增大字体
     */
    addFontSize() {
      this.$store.state.fontSize++;
    },
    /**
     
     * @description  减小字体
     */
    reduceFontSize() {
      this.$store.state.fontSize--;
    },
  },
};
</script>

<style scoped>
  .container {
    position: fixed;
    background-color: #333;
    width: 100%;
    left: 0;
    top: 46px;
    z-index: 1;
  }

  .functionButton {
    display: inline;
    margin-left: 20px;
  }

  .functionButton button {
    border: none;
    width: 20px;
    height: 20px;
    text-decoration: none;
    text-align: center;
    outline: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(14, 253, 22);
  }

  .functionButton span {
    color: white;
    margin: 0 10px 0 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
