<template>
  <div>
    <div class="dialog" v-show="showDialog" ref="showDialog">
      <Button type="error" @click="annotation('0' + $store.state.id, 0)"
        >关系(r)
      </Button>
      <Button type="primary" @click="annotation('1' + $store.state.id, 1)"
        >名称(b)
      </Button>
      <Button type="success" @click="annotation('2' + $store.state.id, 2)"
        >药物(g)
      </Button>
      <Button type="warning" @click="annotation('3' + $store.state.id, 3)"
        >器械(o)
      </Button>
      <Button type="info" @click="translate">翻译(t)</Button>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" @click="choice = false">取消</Button>
    </div>
    <pre
      ref="essay"
      id="essay"
      @mouseup="getSelection($event)"
      class="input-content"
      :style="'font-size:' + $store.state.fontSize + 'px'"
      v-html="$store.state.inputContent"
    ></pre>
  </div>
</template>

<script>
import { buttonStyle,annotate } from "@/utils/paperUtils";
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
    this.$bus.$on("autoAnnotate", this.autoAnnotate);
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
            this.annotation("0" + id, 0);
            break;
          }
          case 66: {
            this.annotation("1" + id, 1);
            break;
          }
          case 71: {
            this.annotation("2" + id, 2);
            break;
          }
          case 79: {
            this.annotation("3" + id, 3);
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
       // 隐藏对话框
    this.showDialog = false;
     annotate(id,index);
    },

    /**
     * @description 自动标注
     */
    autoAnnotate(data) {
      let essay = this.$refs.essay;
      let text = essay.innerHTML;
      for (let i = 0; i < data.length; i++) {
        if (data[i].length != 0) {
          this.$store.state.data[i].push(...data[i].split(" "));
        }
      }
      let array = [];
      let annotatedTestStyle = "";
      let colorArray = ["red", "blue", "green", "orange"]; // 标注颜色
      for (let i = 0; i < this.$store.state.data.length; i++) {
        for (let j = 0; j < this.$store.state.data[i].length; j++) {
          if (this.$store.state.data[i][j].length != 0) {
            array = text.split(this.$store.state.data[i][j]);
            this.$refs.essay.innerHTML = array.join(
              "<font style='color:red'>" +
                this.$store.state.data[i][j] +
                "</font>"
            );
            array = [];
          }
        }
        for (let k = 0; k < essay.childNodes.length; k++) {
          if (essay.childNodes[k].nodeName === "FONT") {
            annotatedTestStyle =
              ";border:5px solid " +
              colorArray[i] +
              `;border-radius: 10px;padding: 0 5px 0 3px;`;

            let button = document.createElement("button");
            let innerText = document.createTextNode(
              essay.childNodes[k].innerText
            );
            button.id = i + "" + this.$store.state.id++;
            button.onclick = () => {
              this.deleteById(button.id);
            };
            button.setAttribute("style", buttonStyle());
            let span = document.createElement("span");
            span.appendChild(innerText);
            span.appendChild(button);
            span.setAttribute(
              "style",
              "background-color:" + colorArray[i] + annotatedTestStyle
            );
            essay.childNodes[k].parentNode.replaceChild(
              span,
              essay.childNodes[k]
            );
          }
        }
      }
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
