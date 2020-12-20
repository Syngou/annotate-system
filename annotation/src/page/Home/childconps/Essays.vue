<template>
  <div>
    <!-- ------------------------------------------------------------------------------------- -->
    <!--    TODO: 获取滚轮滚动距离，保证对话框弹出位置准确,但是有两个滚轮，需要考虑用哪个                   -->
    <!-- --------------------------------------------------------------------------------------- -->

    <div
      style="position: absolute; width: 100px"
      v-show="showDialog"
      ref="showDialog"
    >
      <Button type="error" @click="annotation(0)">关系(r)</Button>
      <Button type="primary" @click="annotation(1)">名称(b)</Button>
      <Button type="success" @click="annotation(2)">药物(g)</Button>
      <Button type="warning" @click="annotation(3)">器械(o)</Button>
      <Button type="info" @click="translate">翻译(t)</Button>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" @click="choice = false">取消</Button>
    </div>

    <!-- ----------------------------------------------------------------------- -->
    <!--                                    文本框                                     -->
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
      showDialog: false, // 显示对话框
      selectText: "", // 选中文本
    };
  },
  // 键盘标注，拟开发
  created() {
    this.annotateByKey();
  },
  methods: {
    //  在鼠标位置弹出对话框  TODO：加上滚动距离
    showSelectBox(X, Y) {
      this.$refs.showDialog.style.left = X + 10 + "px";
      this.$refs.showDialog.style.top = Y + 10 + "px";
      this.$refs.showDialog.style.display = "block";
      this.showDialog = true;
    },

    //  获取选中文本
    getSelection(e) {
      if (window.getSelection().toString() !== "") {
        this.selectText = window.getSelection().toString();
        this.$store.state.selectionText = window.getSelection().toString();
        this.showSelectBox(e.clientX, e.clientY);
      }
    },

    annotateByKey() {
      document.onkeydown = () => {
        let keyCode = window.event.keyCode;
        console.log(keyCode);
        switch (keyCode) {
          case 82: {
            this.annotation(0);
            break;
          }
          case 66: {
            this.annotation(1);
            break;
          }
          case 71: {
            this.annotation(2);
            break;
          }
          case 79: {
            this.annotation(3);
            break;
          }
          case 84: {
            this.translate();
            break;
          }
        }
      };
    },
    //  标注
    annotation(index) {
      let colorArray = ["red", "blue", "green", "orange"]; // 标注颜色
      let essay = this.$refs.essay;
      let text = this.selectText;

      // 按钮样式   TODO：样式美化
      let buttonStyle =
        `height:20px;
        text-align:center;
        line-height:20px;
        border-radius:30px;
        margin-right:5px;
        margin-left:5px;
        cursor:pointer;
        background-color:` + colorArray[index];
      // 标注文本样式
      let annotatedTestStyle =
        ";border:5px solid " +
        colorArray[index] +
        `
      ;border-radius: 10px;
      padding: 0 5px 0 3px;`;
      this.showDialog = false;
      if (text.length > 0) {
        let values = (essay || "").innerHTML.split(text);
        essay.innerHTML = values.join(
          "<span style='background-color:" +
            colorArray[index] +
            annotatedTestStyle +
            "'>" +
            text +
            "<button style='" +
            buttonStyle +
            "'  id='test'/>*</button></span>"
        );

        this.$emit("showAnnotations", index, text);
      }
    },
    // 翻译  TODO：等待接口
    translate() {
      this.showDialog = false;
      this.$Message.info("功能正在开发");
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
