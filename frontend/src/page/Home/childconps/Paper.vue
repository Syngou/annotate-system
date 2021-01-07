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
import { addToDatabase, delFromDatabase } from "@/network/request";

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
    this.annotateByShortcut();
  },
  methods: {
    //  在鼠标位置弹出对话框
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
        // 加上滚轮滚动距离才是y轴长度！！！
        this.showSelectBox(
          e.clientX,
          e.clientY + document.documentElement.scrollTop
        );
      }
    },
    //快捷键标注
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
    //  标注
    annotation(id, index) {
      let colorArray = ["red", "blue", "green", "orange"]; // 标注颜色
      let text = this.selectText;
      this.addToMap(id, text);
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
        // 事件总线
        this.$bus.$emit("showAnnotations", index);

        // 按钮添加事件
        let button = document.createElement("button");
        button.addEventListener("click", () => {
          this.deleteById(id);
        });
        let deleteButton = document.createTextNode("*");

        button.setAttribute("style", buttonStyle);
        button.appendChild(deleteButton);
        let span = document.createElement("span");
        span.setAttribute("id", id);
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
    addToMap(id, text) {
      if (id.indexOf("relation") !== -1) {
        console.log(this.$store.state.relationsMap);
        console.log(this.$store.state.relationsMap.set(id, text));

        addToDatabase("relation", id, text);
      } else if (id.indexOf("name") !== -1) {
        console.log(this.$store.state.nameMap.set(id, text));

        addToDatabase("name", id, text);
      } else if (id.indexOf("medicine") !== -1) {
        console.log(this.$store.state.medicineMap.set(id, text));

        addToDatabase("medicine", id, text);
      } else if (id.indexOf("tool") !== -1) {
        console.log(this.$store.state.toolsMap.set(id, text));

        addToDatabase("tool", id, text);
      }
    },
    // 按钮样式
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
    // 删除样式
    deleteById(id) {
      let essay = this.$refs.essay;
      let span = document.getElementById(id);
      let button = span.getElementsByTagName("button");
      span.removeChild(button[0]);
      let text = document.createTextNode(span.innerHTML);
      essay.insertBefore(text, span);
      essay.removeChild(span);
      this.deleteAnnotatedText(id);
      //发射删除事件
    },
    // 删除map中的标注记录
    deleteAnnotatedText(id) {
      if (id.indexOf("relation") !== -1) {
        console.log(this.$store.state.relationsMap);
        console.log(this.$store.state.relationsMap.delete(id));

        delFromDatabase("relation", id);
      } else if (id.indexOf("name") !== -1) {
        console.log(this.$store.state.nameMap.delete(id));

        delFromDatabase("name", id);
      } else if (id.indexOf("medicine") !== -1) {
        console.log(this.$store.state.medicineMap.delete(id));

        delFromDatabase("medicine", id);
      } else if (id.indexOf("tool") !== -1) {
        console.log(this.$store.state.toolsMap.delete(id));

        delFromDatabase("tool", id);
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
