<template>
  <div>
    <div class="dialog" v-show="showDialog" ref="showDialog">
      <Button type="error" @click="annotation('relation' + $store.state.id, 0)"
        >关系(r)
      </Button>
      <Button type="primary" @click="annotation('name' + $store.state.id, 1)"
        >名称(b)
      </Button>
      <Button
        type="success"
        @click="annotation('medicine' + $store.state.id, 2)"
        >药物(g)
      </Button>
      <Button type="warning" @click="annotation('tool' + $store.state.id, 3)"
        >器械(o)
      </Button>
      <Button type="info" @click="translate">翻译(t)</Button>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" @click="choice = false">取消</Button>
    </div>
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
  // 键盘标注，初始化即开始监听
  created() {
    this.annotateByShortcut();
  },
  methods: {
    /**
     
     * @description 在鼠标位置弹出对话框
     */
    showSelectBox(X, Y) {
      this.$refs.showDialog.style.left = X + 10 + "px";
      this.$refs.showDialog.style.top = Y + 10 + "px";
      this.$refs.showDialog.style.display = "block";
      this.showDialog = true;
    },

    /**
     
     * @description 获取选中文本，鼠标位置加上滚动距离
     * @param 窗口事件
     */
    getSelection(e) {
      if (window.getSelection().toString() !== "") {
        this.selectText = window.getSelection().toString();
        this.$store.state.selectionText = window.getSelection().toString();
        // 加上滚轮滚动距离才是y轴长度！！！
        this.showSelectBox(
          e.clientX,
          e.clientY + document.documentElement.scrollTop
        );
      }
    },
    /**
     
     * @description 快捷键标注，全局监听鼠标事件，然后进行标注
     */
    annotateByShortcut() {
      document.onkeydown = ($event) => {
        let keyCode = $event.keyCode;
        let id = this.$store.state.id;
        switch (keyCode) {
          case 82: {
            this.annotation("relation" + id, 0);
            break;
          }
          case 66: {
            this.annotation("name" + id, 1);
            break;
          }
          case 71: {
            this.annotation("medicine" + id, 2);
            break;
          }
          case 79: {
            this.annotation("tool" + id, 3);
            break;
          }
          case 84: {
            this.translate();
            break;
          }
        }
      };
    },
    /**
     
     * @description 标注
     * @param id 给button标签的id，用于删除时查找
     * @param index 标注颜色索引
     */
    annotation(id, index) {
      let colorArray = ["red", "blue", "green", "orange"]; // 标注颜色
      let text = this.selectText;
      this.$store.commit("addToList", { id, text });
      // 按钮样式   TODO：样式美化
      let buttonStyle = this.buttonStyle();
      // 标注文本样式
      let annotatedTestStyle =
        ";border:5px solid " +
        colorArray[index] +
        `
      ;border-radius: 10px;
      padding: 0 5px 0 3px;`;
      // 隐藏对话框
      this.showDialog = false;
      // 选中不为空
      if (text.length > 0) {
        // 按钮添加事件
        let button = document.createElement("button");
        button.setAttribute("id", id);
        button.addEventListener("click", () => {
          this.deleteById(id);
        });

        button.setAttribute("style", buttonStyle);
        let span = document.createElement("span");
        span.setAttribute(
          "style",
          "background-color:" + colorArray[index] + annotatedTestStyle
        );

        let TextRange = window.getSelection().getRangeAt(0);
        TextRange.surroundContents(span);
        span.appendChild(button);
        //移除选中状态，否则很难看
        window.getSelection().removeAllRanges();
        this.$store.state.id++;
      }
    },

    /**
     
     * @description 按钮样式，需要调整可以在这里更改
     */
    buttonStyle() {
      return `height:20px;
        width:20px;
        text-align:center;
        line-height:20px;
        border-radius:30px;
        margin-left:5px;
        outline: none;
        cursor:pointer;
        background-color:white`;
    },
    /**
     
     * @description 删除样式
     */
    deleteById(id) {
      let essay = this.$refs.essay;
      let span = document.getElementById(id).parentNode;
      // 获取文本，将其插入当前节点前，再删除节点
      let textNode = document.createTextNode(span.innerText);
      let text = span.innerText;
      essay.insertBefore(textNode, span);
      essay.removeChild(span);
      this.$store.commit("deleteAnnotatedText", { type: id, text });
    },

    /**
     
     * @description 翻译  TODO：等待接口
     */
    translate() {
      this.showDialog = false;
      this.$Message.info("功能正在开发");
    },
  },
};
</script>

<style scoped>
  .dialog {
    position: absolute;
    width: 100px;
    border: 5px solid rgb(248, 220, 6);
    background-color: rgb(243, 255, 6);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }

  .input-content {
    overflow: auto;
    flex: auto;
    min-height: 1000px;
    padding: 0 5% 0 5%;
    white-space: pre-line;
    word-break: break-all;
  }
</style>
