<template>
  <div>
    <div
      style="position: absolute; width: 100px"
      v-show="showDialog"
      ref="showDialog"
    >
      <Button type="error" @click="annotation(0)">关系 </Button>
      <Button type="primary" @click="annotation(1)">名称 </Button>
      <Button type="success" @click="annotation(2)">药物 </Button>
      <Button type="warning" @click="annotation(3)">器械 </Button>
      <Button type="info" @click="translate">翻译</Button>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" @click="choice = false">取消 </Button>
    </div>

    <!-- ----------------------------------------------------------------------- -->
    <!--?                                   文本框                                     -->
    <!--                              TODO: 快捷键标注颜色                              -->
    <!-- ----------------------------------------------------------------------- -->

    <pre
      ref="essay"
      @mouseup="getSelection($event)"
      class="input-content"
      :style="'font-size:' + $store.state.fontSize + 'px'"
      v-html="$store.state.inputContent"
    ></pre>
  </div>
</template>

<script>
export default {
  name: "Essays",
  data() {
    return {
      showDialog: false, //?显示对话框
      selectText: "", //?选中文本
      choice: false, //?对话框的显隐
    };
  },
  methods: {
    //? 在鼠标位置弹出对话框
    showSelectBox(X, Y) {
      this.$refs.showDialog.style.left = X + 10 + "px";
      this.$refs.showDialog.style.top = Y + 10 + "px";
      this.$refs.showDialog.style.display = "block";
      this.showDialog = true;
    },

    //? 获取选中文本
    getSelection(e) {
      console.log(e.clientX);

      if (window.getSelection().toString() !== "") {
        this.showSelectBox(e.clientX, e.clientY);
        this.selectText = window.getSelection().toString();
        this.$store.state.selectionText = window.getSelection().toString();
      }
    },
    // ?标注
    annotation(index) {
      let colorArray = ["red", "blue", "green", "orange"]; //?标注颜色
      let essay = this.$refs.essay;
      let text = this.selectText;
      //?按钮样式
      let buttonStyle =
        `height:20px;
        text-align:center;
        line-height:20px;
        margin-right:5px;
        margin-left:5px;
        cursor:pointer;
        background-color:` +
        colorArray[index];
      //?标注文本样式
      let annotatedTestStyle =
        `;border: 3px solid;
      border-radius: 10px;
      padding: 0 5px 0 3px;`
      this.showDialog = false;

      if (text.length > 0) {
        let values = (essay || "").innerHTML.split(text);

        essay.innerHTML = values.join(
          "<span style='background-color:" +
            colorArray[index] + annotatedTestStyle +
            "'>" +
            text +
            "<input style='" +
            buttonStyle +
            "' type='button' value='*' id='test'/></span>"
        );

        this.$emit("showAnnotations", index, text);
      }
    },
    //?翻译
    translate() {
      this.choice = false;
      this.$Message.info("功能正在开发");
      console.log(document.getElementById('test'));
    },
  },
};
</script>

<style scoped>
  .input-content {
    overflow: auto;
    flex: auto;
    min-height: 1000px;
    max-height: 1000px;
    margin-top: 40px;
    line-height: 2em;
    white-space: pre-line;
    word-break: break-all;
  }
</style>
