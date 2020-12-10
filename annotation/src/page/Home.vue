<template>
  <!--?                                导航栏                                   -->
  <div id="app">
    <TopNavigation @pasteContent="pasteContent" />
    <!--?                                   左栏                                    -->
    <div class="row">
      <div class="leftColumn">
        <div class="card">
          <!--?                                  下拉菜单                                   -->
          <!--                          TODO:超级拖拽，显示行数,快捷键标记                      -->
          <MyDropDown />
          <!--                            文本                                        -->
          <Essays
            :inputContent="inputContent"
            @showAnnotations="showAnnotations"
          />
        </div>
      </div>
      <!--?                                   右栏                                    -->
      <div class="rightColumn">
        <!--                               右栏卡片                                    -->
        <RightCulomn ref="rightCulomn" />
      </div>
    </div>
    <!--                                 底部区域                                   -->
    <div class="footer">Copyright © 2020 Syngou</div>
  </div>
</template>


<script>
import { enable as enableDarkMode } from "darkreader";
import Essays from "../components/Essays";
import MyDropDown from "../components/MyDropDown";
import RightCulomn from "../components/RightCulomn";
import TopNavigation from "../components/TopNavigation";
enableDarkMode({
  brightness: 150,
  contrast: 90,
  sepia: 0,
});

export default {
  name: "Home",
  components: {
    Essays,
    MyDropDown,
    RightCulomn,
    TopNavigation,
  },
  data() {
    return {
      inputContent: `
      〔摘要〕伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械的生产过程中被广泛使用。在洁净室内的医疗器械使用压缩气体时，应根据其预期用途对控制水平和监测项目做出合理的评定，识别出安全的有关特征，结合受控项目、系统设计和监测工作进行风险分析，以满足《医疗器械生产质量管理规范附录》中对压缩气体提出的要求。

〔关键词〕医疗器械；压缩气体；预期用途；风险分析

压缩气体在医疗器械的生产过程中被广泛使用，主要用途有自动化生产设备的动力用气、清洗工艺中的吹扫用气、保护材料防止氧化的用气等。伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械领域的使用已越来越广泛。虽然医疗器械是在洁净的受控环境中生产，但《医疗器械生产质量管理规范附录》中仍对无菌、植入、体外诊断（invitrodiagnostic，IVD）的各类医疗器械使用压缩气体都提出了验证和控制要求，其目的是为保证医疗器械最终在临床使用的安全和有效。GB/T13277.1-2008是目前可检索到的唯一对气体污染物进行等级划分的国家标准，《医用气体工程技术规范》中对部分医用空气的品质要求也是引用了此标准。结合医疗器械行业的受控环境要求，对压缩气体的污染物控制应至少包含固体、液体、气体及微生物。

1固体污染物

固体污染物主要是指压缩气体中含有的尘埃微粒。控制微粒的核心技术是使用气体过滤器。过滤器的有效过滤滤径、有效过滤效率和有效工作流量直接影响到固体污染物的预期控制效果，保证过滤器的各项性能参数均符合使用工况状态是十分必要的。同一气体过滤器在不同流量状态下监测的过滤效果，见表1。
            `,
    };
  },
  methods: {
    pasteContent(input) {
      this.inputContent = input;
    },
    showAnnotations(index, text) {
      this.$refs.rightCulomn.showAnnotations(index, text);
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

  .title {
    margin-left: 30px;
    color: red;
    font-size: 22px;
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
