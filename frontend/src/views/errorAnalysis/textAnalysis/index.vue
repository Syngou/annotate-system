<template>
  <div>
    <div
      class="entity-item-box"
      v-for="(text, index) in textArray"
      :key="index"
    >
      <entity-item-box
        :labels="items"
        :text="text"
        :entities="annotations(index)"
      />
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="1"
        layout="prev, pager, next, jumper"
        :total="3"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import EntityItemBox from "../textAnalysis/components/EntityItemBox";

export default {
  name: "index",
  components: {
    EntityItemBox,
  },
  data() {
    return {
      currentPage: 1,
      items: [
        {
          id: 4, //标签id 用于实体选择标签
          text: "B", // 标签显示的文本
          background_color: "#00ff00", // 标签的背景颜色
          text_color: "#ffffff", // 标签的文字颜色
        },
        {
          id: 5,
          text: "O",
          background_color: "#fbb028",
          text_color: "#000000",
        },
        {
          id: 6,
          text: "R",
          background_color: "#0000ff",
          text_color: "#000000",
        },
        {
          id: 7,
          text: "I",
          background_color: "#ff0000",
          text_color: "#ffffff",
        },
      ],
      currentDoc: {
        text: [
          "〔关键词〕医疗器械；压缩气体；预期用途；风险分析压缩气体在医疗器械的生产过程中被广泛使用，主要用途有自动化生产设备的动力用气、清洗工艺中的吹扫用气、保护材料防止氧化的用气等。伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械领域的使用已越来越广泛。虽然医疗器械是在洁净的受控环境中生产，但《医疗器械生产质量管理规范附录》中仍对无菌、植入、体外诊断（invitrodiagnostic，IVD）的各类医疗器械使用压缩气体都提出了验证和控制要求，其目的是为保证医疗器械最终在临床使用的安全和有效。GB/T13277.1-2008是目前可检索到的唯一对气体污染物进行等级划分的国家标准，",

          "〔摘要〕伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械的生产过程中被广泛使用。在洁净室内的医疗器械使用压缩气体时，应根据其预期用途对控制水平和监测项目做出合理的评定，识别出安全的有关特征，结合受控项目、系统设计和监测工作进行风险分析，以满足《医疗器械生产质量管理规范附录》中对压缩气体提出的要求。",

          "《医用气体工程技术规范》中对部分医用空气的品质要求也是引用了此标准。结合医疗器械行业的受控环境要求，对压缩气体的污染物控制应至少包含固体、液体、气体及微生物。1固体污染物固体污染物主要是指压缩气体中含有的尘埃微粒。控制微粒的核心技术是使用气体过滤器。过滤器的有效过滤滤径、有效过滤效率和有效工作流量直接影响到固体污染物的预期控制效果，保证过滤器的各项性能参数均符合使用工况状态是十分必要的。同一气体过滤器在不同流量状态下监测的过滤效果，见表1。",
        ],

        annotations: [
          [
            {
              start_offset: 10, // 文字的起始位置索引，因为每个字都有标签，所以就不要结束索引了
              standardType: 4, // 标准模型  标签的id
              predictType: 7, // 使用模型   标签的id
            },
            {
              start_offset: 14,
              standardType: 7,
              predictType: 7,
            },
            {
              start_offset: 61,
              standardType: 4,
              predictType: 6,
            },
            {
              start_offset: 73,
              standardType: 4,
              predictType: 7,
            },
            {
              start_offset: 95,
              standardType: 6,
              predictType: 6,
            },
          ],
          [
            {
              start_offset: 10,
              standardType: 4,
              predictType: 7,
            },
            {
              start_offset: 14,
              standardType: 7,
              predictType: 7,
            },
            {
              start_offset: 61,
              standardType: 4,
              predictType: 6,
            },
            {
              start_offset: 73,
              standardType: 4,
              predictType: 7,
            },
            {
              start_offset: 95,
              standardType: 6,
              predictType: 6,
            },
          ],
          [
            {
              start_offset: 10,
              standardType: 4,
              predictType: 7,
            },
            {
              start_offset: 14,
              standardType: 7,
              predictType: 7,
            },
            {
              start_offset: 61,
              standardType: 4,
              predictType: 6,
            },
            {
              start_offset: 73,
              standardType: 4,
              predictType: 7,
            },
            {
              start_offset: 95,
              standardType: 6,
              predictType: 6,
            },
          ],
        ],
      },
    };
  },
  computed: {
    textArray() {
      let temp = [this.currentDoc.text[this.currentPage - 1]];
      console.log(temp);
      return temp;
    },
    /**
     * 标签信息
     */ annotations() {
      return (index) => {
        let result = [];
        let annotations = this.currentDoc.annotations[index];
        let entityItemNum = this.currentDoc.annotations[index].length;
        let i = 0;
        this.currentDoc.text[index] = this.currentDoc.text[index].replace(
          /\s/g,
          ""
        );
        for (
          let start = 0;
          start < this.currentDoc.text[index].length;
          start++
        ) {
          if (
            start < annotations[i].start_offset ||
            start > annotations[i].start_offset
          ) {
            result.push({
              start_offset: start,
              end_offset: start + 1,
              standardType: 5,
              predictType: 5,
            });
          } else {
            result.push(annotations[i]);
            if (i <= entityItemNum - 2) {
              i++;
            }
          }
        }
        return result;
      };
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style >
  .entity-item-box {
    margin-bottom: 100px;
  }
  .page {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
  }
</style>
