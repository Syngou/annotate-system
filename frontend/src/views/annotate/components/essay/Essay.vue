<template>
  <div id="paper">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous"
    />

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

    <!-- 论文排版 -->
    <!-- 定义一个容器 -->
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading" style="float: right;">
              文章如下
            </div>
            <div class="panel-body">
              <pre
                id="essay"
                class="essay-content"
                :style="'font-size:' + $store.state.annotate.fontSize + 'px'"
                @mouseup="getSelection($event)"
                v-text="$store.state.annotate.annotateText"
              ></pre>
            </div>
          </div>
        </div>
      </div>
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
     * @description 获取选中文本，鼠标位置加上滚动距离
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
/* 因为是有固定定位，所以要有margin-top */
#paper {
  margin-top: 48.8px;
}

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

/* 文本样式 */
.essay-content {
  margin-top: 100px;
  overflow: auto;
  flex: auto;
  min-height: 1000px;
  padding: 0 5% 0 5%;
  white-space: pre-line;
  word-break: break-all;
  line-height: 25px;
}
// 翻译卡片
.translate-card {
  width: 200px;
  position: absolute;
}
</style>
