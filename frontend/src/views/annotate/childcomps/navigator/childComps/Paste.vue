<template>
  <div>
    <el-dialog
      :visible.sync="pasteContentModal"
      title="在这里输入或粘贴你的文本（若不成功，请刷新网页后重试）"
      :modal-append-to-body="false"
      :width="width"
    >
      <label>
        <textarea type="text" id="pasteContent"></textarea>
      </label>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <el-button type="primary" @click="pasteContent">确定</el-button>
        <el-button type="primary" @click="pasteContentModal = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Paste",
  created() {
    this.$bus.$on("showPaste", () => {
      this.pasteContentModal = true;
    });
  },
  data() {
    return {
      pasteContentModal: false, // 粘贴文本
      width: "",
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

     * @description 粘贴文本
     */

    pasteContent() {
      this.pasteContentModal = false;
      this.$store.state.inputContent = document.getElementById(
        "pasteContent"
      ).value;
      //清空数据
      document.getElementById("pasteContent").value = "";
      //  粘贴后清空存入的数据
      this.$store.state.data[1] = [];
      this.$store.state.data[0] = [];
      this.$store.state.data[2] = [];
      this.$store.state.data[3] = [];
    },
  },
};
</script>

<style scoped>
  /* 文本输入框 */
  textarea {
    width: 100%;
    height: 250px;
    font-size: 20px;
  }
</style>
