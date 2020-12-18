<template>
  <div>
    <div style="position: absolute; width: 100px" v-show="isshow" ref="isshow">
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
      isshow: false, //?
      selectText: "", //?选中文本
      choice: false, //?对话框的显隐
    };
  },
  methods: {
    showSelectBox(X, Y) {
      this.$refs.isshow.style.left = X + 10 + "px";
      this.$refs.isshow.style.top = Y + 10 + "px";
      this.$refs.isshow.style.display = "block";
      this.isshow = true;
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
      let buttonStyle =
        "height:20px;text-align:center;line-height:20px;margin-right:5px;cursor:pointer;background-color:" +
        colorArray[index];

      this.isshow = false;

      if (text.length > 0) {
        let values = (essay || "").innerHTML.split(text);

        essay.innerHTML = values.join(
          "<span style='background-color:" +
            colorArray[index] +
            "'>" +
            text +
            "</span><span><input style=" +
            buttonStyle +
            " type='button' value='*'/></span>"
        );

        this.$emit("showAnnotations", index, text);
      }
    },
    translate() {
      this.choice = false;
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
