<template>
  <div id="paper">
    <!-- 标注选项对话框 -->
    <div class="dialog" v-show="showDialog" ref="showDialog">
      <el-button
        type="danger"
        size="medium"
        @click="annotateText('0' + $store.state.id, 0)"
        >关系(r)
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="annotateText('1' + $store.state.id, 1)"
        >名称(b)
      </el-button>
      <el-button
        type="success"
        size="medium"
        @click="annotateText('2' + $store.state.id, 2)"
        >药物(g)
      </el-button>
      <el-button
        type="warning"
        size="medium"
        @click="annotateText('3' + $store.state.id, 3)"
        >器械(o)
      </el-button>
      <el-button type="info" size="medium" @click="translateText"
        >翻译(t)
      </el-button>
    </div>
    <div slot="footer">
      <el-button type="primary" size="medium" @click="choice = false"
        >取消
      </el-button>
    </div>
    <!-- 翻译结果显示 -->
    <div v-show="showTranslateCard" class="translate-card" ref="translateCard">
      <i
        class="el-message__closeBtn el-icon-close delete-button"
        @click="showTranslateCard = false"
      />
      <TranslateCard :result="translateResult" />
    </div>
    <!-- 论文 -->
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
import TranslateCard from "./components/TranslateCard";

import annotateUtils from "@/utils/annotateUtils";
import request from "@/api/annotatePageApi";

export default {
  name: "Essays",
  data() {
    return {
      showDialog: false, // 显示对话框
      selectText: "", // 选中文本
      showTranslateCard: false, //显示翻译卡片
      translateResult: "", //翻译结果
    };
  },
  components: {
    TranslateCard,
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
      this.$refs.translateCard.style.left = X + 10 + "px";
      this.$refs.translateCard.style.top = Y + 10 + "px";
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
        this.$refs.showDialog.style.display = "block";
        this.showDialog = true;
      }
    },
    /**
     * @description 快捷键标注，监听全局鼠标事件，然后进行标注
     */
    annotateByShortcut() {
      document.onkeydown = ($event) => {
        let key = $event.key;
        let id = this.$store.state.id;
        this.showDialog = false;
        if (key === "r") {
          annotateUtils.annotate("0" + id, 0);
        } else if (key === "b") {
          annotateUtils.annotate("1" + id, 1);
        } else if (key === "g") {
          annotateUtils.annotate("2" + id, 2);
        } else if (key === "o") {
          annotateUtils.annotate("3" + id, 3);
        }
      };
    },
    /**

     * @description 标注文本
     * @param id 给button标签的id，用于删除时查找
     * @param index 标注颜色索引
     */
    annotateText(id, index) {
      // 隐藏对话框
      this.showDialog = false;
      annotateUtils.annotate(id, index);
    },

    /**
     * @description 翻译  TODO：等待接口
     */
    translateText() {
      this.showDialog = false;
      let text = window.getSelection().toString();
      request.translate(text).then((res) => {
        this.translateResult = res;
        this.$message({
          type: "success",
          message: res.message,
          showClose: true,
        });
        this.showTranslateCard = true;
      });
    },
  },
};
</script>

<style scoped lang='scss'>
  /* 因为是有固定定位，所以要有margin-top */
  #paper {
    margin-top: 48.8px;
  }

  /* 标注时对话框的样式 */
  .dialog {
    position: absolute;
    width: 100px;
    border: 5px solid rgb(248, 220, 6);
    background-color: rgb(146, 150, 58);
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    button {
      margin: 0;
    }
  }

  /* 文本样式 */
  .input-content {
    overflow: auto;
    flex: auto;
    min-height: 1000px;
    padding: 0 5% 0 5%;
    white-space: pre-line;
    word-break: break-all;
  }
  // 翻译卡片
  .translate-card {
    width: 200px;
    position: absolute;

    .delete-button {
      position: relative;
      top: 25px;
      left: 182px;
    }
  }
</style>
