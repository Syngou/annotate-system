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
          :entities="currentDoc.annotations"
          :add-entity="addEntity"
        />
      </el-col>
    </el-row>
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
          text: "疾病",
          prefix_key: null,
          suffix_key: "l",
          background_color: "#7c20e0",
          text_color: "#ffffff",
        },
        {
          id: 5,
          text: "患者",
          prefix_key: null,
          suffix_key: "m",
          background_color: "#fbb028",
          text_color: "#000000",
        },
        {
          id: 6,
          text: "药物",
          prefix_key: null,
          suffix_key: "o",
          background_color: "#e6d176",
          text_color: "#000000",
        },
        {
          id: 7,
          text: "器械",
          prefix_key: null,
          suffix_key: "p",
          background_color: "#6a74b9",
          text_color: "#ffffff",
        },
      ],
      currentDoc: {
        id: 8,
        text:
          "伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械的生产过程中被广泛使用。在洁净室内的医疗器械使用压缩气体时，应根据其预期用途对控制水平和监测项目做出合理的评定，识别出安全的有关特征，结合受控项目、系统设计和监测工作进行风险分析，以满足《医疗器械生产质量管理规范附录》中对压缩气体提出的要求",
        annotations: [
          {
            id: 17,
            prob: 0.0,
            label: 4,
            start_offset: 61,
            end_offset: 70,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            id: 19,
            prob: 0.0,
            label: 4,
            start_offset: 95,
            end_offset: 98,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            id: 16,
            prob: 0.0,
            label: 6,
            start_offset: 14,
            end_offset: 22,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            id: 18,
            prob: 0.0,
            label: 6,
            start_offset: 73,
            end_offset: 87,
            user: 1,
            document: 8,
            standardType: 4,
            predictType: 6,
          },
          {
            id: 20,
            prob: 0.0,
            label: 7,
            start_offset: 100,
            end_offset: 105,
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
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
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
