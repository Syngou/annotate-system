<template>
  <div id="paper">
    <!-- TODO 有空把这里的bootstrap换成原生css -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous"
    />

    <!-- 标注选项对话框 -->
    <div v-show="showDialog" ref="showDialog" class="optionDialog">
      <button
        v-for="(info, index) in labels"
        :key="index"
        :style="{ backgroundColor: info.color }"
        @click="annotateText(index + '-' + $store.state.annotate.id, index)"
      >
        {{ info.text }}({{ info.shortcut }})
      </button>
      <button @click="translateText">翻译</button>
    </div>

    <!-- 翻译结果显示 -->
    <div v-show="showTranslateCard" ref="translateCard" class="translate-card">
      <i
        class="el-message__closeBtn el-icon-close delete-button"
        @click="showTranslateCard = false"
      />
      <TranslateCard :data="translateResult" />
    </div>

    <!-- 定义一个容器 -->
    <div class="container">
      <div class="row">
        <!-- 侧边栏 -->
        <div class="col-md-2">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="head">现有标签</div>
              <hr />
              <div class="tip">(选中文本后单击任一标签即可标注)</div>
            </div>
            <div class="panel-body">
              <div class="side">
                <button
                  v-for="(info, index) in labels"
                  :key="index"
                  :style="{ backgroundColor: info.color }"
                  @click="
                    annotateText(index + '-' + $store.state.annotate.id, index)
                  "
                >
                  {{ info.text }}({{ info.shortcut }})
                </button>
                <br /><br />
                <router-link to="/labelsManage"> 添加新标签 </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 论文排版 -->
        <div class="col-md-10">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="head">文章如下</div>
            </div>
            <div class="panel-body">
              <p>没有导出或保存数据前不用刷新页面，否则会丢失数据哦</p>
              <pre
                id="annotateContent"
                class="annotate-content"
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

import { annotateUtil } from "@/utils/annotateUtils";
import { translateApi, getLabelsApi } from "@/api/annotateData";
import { fetchAnnotationTextByIndexApi } from "@/api/annotateText";

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
    ...mapGetters(["labels"]), // 标签
  },
  // 键盘标注，初始化即开始监听
  created() {
    this.annotateByShortcut();
    // created时获取文本和标签，因为数据存在store中，一刷新就没了，所以需要重新获取
    fetchAnnotationTextByIndexApi(this.$route.query.textIndex).then((res) => {
      this.$store.dispatch("annotate/setAnnotateText", res.data.data);
    });
    getLabelsApi().then((res) => {
      this.$store.dispatch("annotate/setLabels", res.data.labels);
    });
  },
  methods: {
    /**
     *  在鼠标位置弹出对话框
     * @param {number} X  x轴坐标
     * @param {number} Y  y轴坐标
     */
    setBoxPosition(X, Y) {
      this.$refs.showDialog.style.left = `${X - 100}px`;
      this.$refs.showDialog.style.top = `${Y + 20}px`;
      this.$refs.translateCard.style.left = `${X + 10}px`;
      this.$refs.translateCard.style.top = `${Y + 10}px`;
    },

    /**
     *  获取选中文本，鼠标位置加上滚动距离
     * @param e  浏览器事件
     */

    getSelection(e) {
      if (window.getSelection().toString() !== "") {
        this.selectText = window.getSelection().toString();
        this.setBoxPosition(e.pageX, e.pageY);
        this.$refs.showDialog.style.display = "block";
        this.showDialog = true;
      }
      //点击空白处取消标注
      else {
        this.showDialog = false;
      }
    },

    /**
     *  标注文本
     * @param {string} id  给button标签的id，用于删除时查找
     * @param {number} index 标注颜色索引
     */
    annotateText(id, index) {
      // 隐藏对话框
      this.showDialog = false;
      annotateUtil(id, index);
    },

    /**
     *  快捷键标注
     */
    annotateByShortcut() {
      document.onkeydown = ($event) => {
        let key = $event.key;
        let id = this.$store.state.annotate.id;
        this.showDialog = false;
        let j = 0;
        for (; j < this.labels.length; j++) {
          if (key === this.labels[j].shortcut) {
            annotateUtil(j + "-" + id, j);
            break;
          }
        }
      };
    },

    /**
     *  翻译
     */
    translateText() {
      this.showDialog = false;
      let text = window.getSelection().toString();
      // 调用翻译api
      translateApi(text).then((res) => {
        this.translateResult = res.data;
        this.showTranslateCard = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
/* 因为是有固定定位，所以要有margin-top */
#paper {
  margin-top: 48.8px;

  /* 标注时对话框的样式 */
  .optionDialog {
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
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }

  .head {
    font-size: 15px;
    color: white;
  }

  .tip {
    font-size: 10px;
    color: white;
  }

  /* 面板框样式 */
  .panel > .panel-heading {
    background-image: none;
    background-color: #7b8ca3;
    color: white;
    font-weight: 400;
  }

  /* 侧边栏样式 */
  .side {
    button {
      border: 1px solid black;
      margin-top: 10px;
      margin-left: 10px;
      border-radius: 10px;
      cursor: pointer;
      outline: none;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }

  /* 文本样式 */
  .annotate-content {
    margin-top: 50px;
    overflow: auto;
    flex: auto;
    min-height: 1000px;
    padding: 0 5% 0 5%;
    white-space: pre-line;
    word-break: break-all;
    line-height: 25px;
    font-family: Microsoft Yahei, serif;
  }
  // 翻译卡片
  .translate-card {
    width: 200px;
    position: absolute;
    z-index: 1;

    .delete-button {
      top: 10px;
      right: -40px;
    }
  }
}
</style>
