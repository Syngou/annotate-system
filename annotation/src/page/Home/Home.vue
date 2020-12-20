<template>
  <!--                                 导航栏                                   -->
  <div id="app">
    <TopNavigation />
    <!--                                    左栏                                    -->
    <div class="row">
      <div class="leftColumn">
        <div class="card">
          <!--                          TODO:超级拖拽，显示行数,快捷键标记                      -->
          <FunctionBar />
          <!--                            文本                                        -->
          <div>
            <Essays @showAnnotations="showAnnotations" />
          </div>
        </div>
      </div>
      <!--                                    右栏                                    -->
      <div class="rightColumn">
        <!--            TODO:当文本更改时，将右栏标注文本清空                       -->
        <RightColumn ref="rightColumn" />
      </div>
    </div>
    <!--                                 底部区域                                   -->
    <div class="footer">Copyright © 2020 Syngou</div>
  </div>
</template>


<script>
import Essays from "./childconps/Essays";
import FunctionBar from "./childconps/FunctionBar";
import RightColumn from "./childconps/RightColumn";
import TopNavigation from "./childconps/TopNavigation";

export default {
  name: "Home",
  components: {
    Essays,
    FunctionBar,
    RightColumn,
    TopNavigation,
  },

  methods: {
    showAnnotations(index, text) {
      this.$refs.rightColumn.showAnnotations(index, text);
    },
  },
};
</script>
<style scoped>
  * {
    box-sizing: border-box;
    color: black;
  }

  p {
    word-break: break-all;
    word-wrap: break-word;
  }

  /* 创建两列 */

  /* Left column */
  .leftColumn {
    float: left;
    width: 75%;
  }

  /* 右侧栏 */
  .rightColumn {
    float: left;
    width: 25%;
    padding-left: 20px;
  }

  /* 文章卡片效果 */
  .card {
    margin-top: 20px;
    padding: 20px;
  }

  /* 列后面清除浮动 */
  .row:after {
    display: table;
    content: "";
    clear: both;
  }

  /* 底部 */
  .footer {
    padding: 20px;
    background: #333;
    color: white;
    text-align: center;
  }

  /* 响应式布局 - 屏幕尺寸小于 800px 时，两列布局改为上下布局 */
  @media screen and (max-width: 800px) {
    .leftColumn,
    .rightColumn {
      width: 100%;
      padding: 0;
    }
  }

  /* 响应式布局 -屏幕尺寸小于 400px 时，导航等布局改为上下布局 */
  @media screen and (max-width: 400px) {
    .topNavigation a {
      float: none;
      width: 100%;
    }
  }
</style>
