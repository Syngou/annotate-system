
<template>
  <div>
    <el-dialog
      :visible.sync="introduceModal"
      title="功能介绍"
      :modal-append-to-body="false"
      :width="width"
    >
      <div>
        <div>按下鼠标，滑过文本，松开，即可标注文本</div>
        <hr />
        <div>也可以选择使用快捷键标注.对应快捷键：</div>
        <hr />
        <div>
          <el-tag type="danger">红：r(red) </el-tag>
          <el-tag type="primary">蓝：b(blue) </el-tag>
          <el-tag type="success">绿：g(green) </el-tag>
          <el-tag type="warning">橙：o(orange)</el-tag>
        </div>
        <hr />
        <div>自动化标注功能用于机器学习自动化标注，人工标注时不推荐使用</div>
      </div>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <el-button type="primary" @click="introduceModal = false"
          >我知道了</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "Introduce",
  created() {
    this.$bus.$on("showIntroduce", () => {
      this.introduceModal = true;
    });
    this.haveRead();
  },
  data() {
    return {
      introduceModal: false, //功能介绍
      width: "", //对话框宽度
    };
  },
  mounted() {
    let width = window.innerWidth;
    if (width <= 450) {
      this.width = "80%";
    } else {
      this.width = "30%";
    }
  },
  methods: {
    /**
     * @description 设置cookie，用于介绍使用方法，已经读过的就不再显示
     */
    haveRead() {
      if (!Cookies.get("haveRead")) {
        this.introduceModal = true;
        Cookies.set("haveRead", "true", { expires: 365 * 100, path: "" });
      }
    },
  },
};
</script>

<style scoped>
</style>
