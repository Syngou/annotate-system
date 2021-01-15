<template>
  <div>
    <Modal
      v-model="pasteContentModal"
      title="在这里输入或粘贴你的文本（若不成功，请刷新网页后重试）"
      :mask-closable="false"
    >
      <label>
        <textarea type="text" ref="inputContentId"></textarea>
      </label>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="pasteContent">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Paste",
  created() {
    this.$bus.$on("showPaste", () => {
      this.pasteContentModal = true;
    })
  },
  data() {
    return {
      pasteContentModal: false, // 粘贴文本
    }
  },
  methods: {
    /**

     * @description 粘贴文本
     */

    pasteContent() {
      this.pasteContentModal = false;
      this.$store.state.inputContent = this.$refs.inputContentId.value;
      //  粘贴后清空存入的数据
      this.$store.state.data[1] = [];
      this.$store.state.data[0] = [];
      this.$store.state.data[2] = [];
      this.$store.state.data[3] = [];
    },

  }
}
</script>

<style scoped>
/* 文本输入框 */
textarea {
  width: 100%;
  height: 250px;
  font-size: 20px;
}
</style>
