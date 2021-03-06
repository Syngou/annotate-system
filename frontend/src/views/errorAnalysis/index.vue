<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row>
      <el-col>
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <entity-item-box
          :labels="items"
          :text="currentDoc.text"
          :entities="annotations"
          :add-entity="addEntity"
        />
      </el-col>
    </el-row>
    <!-- {{ annotations }} -->
  </div>
</template>

<script>
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DetailCard from "./components/DetailCard";
import EntityItemBox from "./components/EntityItemBox";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 132],
    actualData: [120, 82, 91, 154, 132],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    LineChart,
    BarChart,
    DetailCard,
    EntityItemBox,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      items: [
        {
          id: 4,
          text: "B",
          prefix_key: null,
          suffix_key: "l",
          background_color: "#7c20e0",
          text_color: "#ffffff",
        },
        {
          id: 5,
          text: "I",
          prefix_key: null,
          suffix_key: "m",
          background_color: "#fbb028",
          text_color: "#000000",
        },
        {
          id: 6,
          text: "R",
          prefix_key: null,
          suffix_key: "o",
          background_color: "#e6d176",
          text_color: "#000000",
        },
        {
          id: 7,
          text: "O",
          prefix_key: null,
          suffix_key: "p",
          background_color: "#6a74b9",
          text_color: "#ffffff",
        },
      ],
      currentDoc: {
        id: 8,
        text: `〔摘要〕伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械的生产过程中被广泛使用。在洁净室内的医疗器械使用压缩气体时，应根据其预期用途对控制水平和监测项目做出合理的评定，识别出安全的有关特征，结合受控项目、系统设计和监测工作进行风险分析，以满足《医疗器械生产质量管理规范附录》中对压缩气体提出的要求。
            〔关键词〕医疗器械；压缩气体；预期用途；风险分析
              压缩气体在医疗器械的生产过程中被广泛使用，主要用途有自动化生产设备的动力用气、清洗工艺中的吹扫用气、保护材料防止氧化的用气等。伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械领域的使用已越来越广泛。虽然医疗器械是在洁净的受控环境中生产，但《医疗器械生产质量管理规范附录》中仍对无菌、植入、体外诊断（invitrodiagnostic，IVD）的各类医疗器械使用压缩气体都提出了验证和控制要求，其目的是为保证医疗器械最终在临床使用的安全和有效。GB/T13277.1-2008是目前可检索到的唯一对气体污染物进行等级划分的国家标准，《医用气体工程技术规范》中对部分医用空气的品质要求也是引用了此标准。结合医疗器械行业的受控环境要求，对压缩气体的污染物控制应至少包含固体、液体、气体及微生物。
            1固体污染物
            固体污染物主要是指压缩气体中含有的尘埃微粒。控制微粒的核心技术是使用气体过滤器。过滤器的有效过滤滤径、有效过滤效率和有效工作流量直接影响到固体污染物的预期控制效果，保证过滤器的各项性能参数均符合使用工况状态是十分必要的。同一气体过滤器在不同流量状态下监测的过滤效果，见表1。`,
        annotations: [
          {
            prob: 0.0,
            label: 4,
            start_offset: 61,
            end_offset: 62,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            prob: 0.0,
            label: 4,
            start_offset: 95,
            end_offset: 96,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            prob: 0.0,
            label: 6,
            start_offset: 14,
            end_offset: 15,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            prob: 0.0,
            label: 6,
            start_offset: 73,
            end_offset: 74,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            prob: 0.0,
            label: 7,
            start_offset: 103,
            end_offset: 104,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
        ],
        meta: '{"wikiPageId":2}',
        annotation_approver: null,
      },
    };
  },
  computed: {
    annotations() {
      let result = [];
      let annotations = this.currentDoc.annotations;
      let entityItemNum = this.currentDoc.annotations.length;
      let index = 0;
      this.currentDoc.text = this.currentDoc.text.replaceAll(" ", "");
      for (let start = 0; start < this.currentDoc.text.length; start++) {
        if (
          start < annotations[index].start_offset ||
          index == entityItemNum - 1
        ) {
          result.push({
            prob: 0.0,
            label: 7,
            start_offset: start,
            end_offset: start + 1,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          });
        } else {
          result.push(annotations[index]);
          if (index <= entityItemNum - 2) {
            index++;
          }
        }
      }
      return result;
    },
  },
  methods: {
    addEntity(startOffset, endOffset, labelId) {
      const payload = {
        id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
        start_offset: startOffset,
        end_offset: endOffset,
        label: labelId,
      };

      this.currentDoc.annotations.push(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
