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
             
    <pre ref="essay" @mouseup="getSelection()" class="input-content" v-html="inputContent">
          </pre
    >
  </div>
</template>

<script>
export default {
  name: "Essays",
  data() {
    return {
      selectText: "",
      choice: false,
    };
  },
  props: ["inputContent", "showDemo"],
  methods: {
    //? 获取选中文本
    getSelection() {
      if (window.getSelection().toString() !== "") {
        this.choice = true;
        this.selectText = window.getSelection().toString();
      }
    },
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
  },
};
</script>

<style scoped>
  .input-content {
    overflow: auto;
    flex: auto;
    min-height: 771px;
    max-height: 771px;
    margin-top: 20px;
    line-height: 2em;
    white-space: pre-line;
    word-break: break-all;
  }
</style>
