<template>
  <div id="paper">
    <!-- 标注选项对话框 -->
    <div v-show="showDialog" ref="showDialog" class="dialog">
      <button
        v-for="(info, index) in typesInfo"
        :key="index"
        :style="{ backgroundColor: info.color }"
        @click="annotateText(index + '-' + $store.state.annotate.id, index)"
      >
        {{ info.value }}
      </button>
      <button @click="translateText">
        翻译
      </button>
    </div>
    <!-- 翻译结果显示 -->
    <div v-show="showTranslateCard" ref="translateCard" class="translate-card">
      <i
        class="el-message__closeBtn el-icon-close delete-button"
        @click="showTranslateCard = false"
      />
      <TranslateCard :result="translateResult" />
    </div>
    <div class="essay-container">
      <pre
        id="essay"
        class="essay-content"
        @mouseup="getSelection($event)"
        v-text="$store.state.annotate.annotateText"
      />
    </div>
  </div>
</template>

<script>
import TranslateCard from "./components/TranslateCard";

import annotateUtils from "@/utils/annotateUtils";
import request from "@/api/annotatePageApi";

import { mapGetters } from "vuex";

export default {
  name: "Essays",
  components: {
    TranslateCard,
  },
  data() {
    return {
      showDialog: false, //显示标注对话框
      selectText: "", // 选中文本
      showTranslateCard: false, //显示翻译卡片
      translateResult: {}, //翻译结果
    };
  },
  computed: {
    ...mapGetters(["typesInfo"]),
  },
  methods: {
    /**
     * @description 在鼠标位置弹出对话框
     */
    setBoxPosition(X, Y) {
      this.$refs.showDialog.style.left = X - 100 + "px";
      this.$refs.showDialog.style.top = Y + 20 + "px";
      this.$refs.translateCard.style.left = X + 10 + "px";
      this.$refs.translateCard.style.top = Y + 10 + "px";
    },

    /**
     * @description 获取选中文本，在鼠标位置显示弹框
     * @param e 事件
     */
    // TODO 添加一个点击空白处取消标注的功能
    getSelection(e) {
      if (window.getSelection().toString() !== "") {
        this.selectText = window.getSelection().toString();
        // 加上滚轮滚动距离才是y轴长度！！！
        this.setBoxPosition(
          e.clientX,
          e.clientY + document.documentElement.scrollTop
        );
        this.$refs.showDialog.style.display = "block";
        this.showDialog = true;
      }
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
     * @description 翻译
     */
    // TODO 等待接口
    translateText() {
      this.showDialog = false;
      let text = window.getSelection().toString();
      request.translate(text).then((res) => {
        this.translateResult = res;
        this.showTranslateCard = true;
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss">
/* 标注时对话框的样式 */
.dialog {
  position: absolute;
  border-radius: 10px;
  background-color: rgb(147, 121, 121);
  padding: 5px;
  z-index: 10; /* 设置堆叠次序，防止被覆盖 */

  button {
    border: 1px solid black;
    margin-left: 10px;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
  }
}
.essay-container {
  margin: 10px 15%;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  padding-top: 10px;
  min-height: 1000px;
  /* 文本样式 */
  .essay-content {
    margin: 100px 15px 10px 15px;
    border: 1px solid black;
    background-color: #f5f5f5;
    min-height: calc(1000px - 30px);
    flex: auto;
    padding: 0 5% 0 5%;
    white-space: pre-line;
    word-break: break-all;
    line-height: 25px;
  }
}
@media screen and (max-width: 400px) {
  .essay-container {
    margin: 0 5%;
  }
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
