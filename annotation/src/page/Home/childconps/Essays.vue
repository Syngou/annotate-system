<template>
  <div>
    <Modal v-model="choice" :mask-closable="false" :closable="false">
      <div class="choiceModal">
        <Button
          type="error"
          long
          @click="
            annotation(0);
            choice = false;
          "
          >关系
        </Button>
        <Button
          type="primary"
          long
          @click="
            annotation(1);
            choice = false;
          "
          >名称
        </Button>
        <Button
          type="success"
          long
          @click="
            annotation(2);
            choice = false;
          "
          >药物
        </Button>
        <Button
          type="warning"
          long
          @click="
            annotation(3);
            choice = false;
          "
          >器械
        </Button>
        <Button type="info" long @click="translate">翻译</Button>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="choice = false"
          >取消
        </Button>
      </div>
    </Modal>
    <!-- ---------------------------------------------------------------------------------- -->
    <!--                        拾色器 按钮                                                 -->
    <!-- ---------------------------------------------------------------------------------- -->

    <!-- ----------------------------------------------------------------------- -->
    <!--?                                   文本框                                     -->
    <!--                              TODO: 快捷键标注颜色                              -->
    <!-- ----------------------------------------------------------------------- -->

    <pre
      ref="essay"
      @mouseup="getSelection()"
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
      selectText: "", //?选中文本
      choice: false, //?对话框的显隐
    };
  },
  props: ["showDemo"],
  methods: {
    //? 获取选中文本
    getSelection() {
      if (window.getSelection().toString() !== "") {
        this.choice = true;
        // this.$refs.essay.style.fontSize = '30px'
        this.selectText = window.getSelection().toString();
        this.$store.state.selectionText = window.getSelection().toString();
      }
    },
    // ?标注
    annotation(index) {
      let essay = this.$refs.essay;
      let text = this.selectText;
      if (text.length > 0) {
        let values = (essay || "").innerHTML.split(text);

        let colorArray = ["red", "blue", "green", "orange"]; //?标注颜色

        essay.innerHTML = values.join(
          "<span style='background-color:" +
            colorArray[index] +
            "'>" +
            text +
            "</span>"
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
