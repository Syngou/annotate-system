<template>
  <div>
    <div v-if="lineXAxis.length" class="dashboard-editor-container">
      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px;"
      >
        <line-chart :line-x-data="lineXData" :line-x-axis="lineXAxis" />
      </el-row>
      <el-row>
        <el-col>
          <div class="chart-wrapper">
            <bar-chart :bar-x-axis="barXAxis" :bar-x-data="barXData" />
          </div>
        </el-col>
      </el-row>
    </div>
    <Empty v-else />
  </div>
</template>

<script>
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import Empty from "../empty/Empty";

export default {
  name: "DashboardAdmin",
  components: {
    LineChart,
    BarChart,
    Empty,
  },
  data() {
    return {
      lineXAxis: [], // 折线图x轴
      lineXData: [[], []], //折线图数据
      barXAxis: [], //柱形图x轴
      barXData: [], //柱形图数据
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const expectedData = this.$store.state.errorAnalysis.line_graph[0];
      const actualData = this.$store.state.errorAnalysis.line_graph[1];
      const barData = this.$store.state.errorAnalysis.chart_graph;
      for (let key in expectedData) {
        this.lineXAxis.push(key);
        this.lineXData[0].push(expectedData[key]);
        this.lineXData[1].push(actualData[key]);
      }
      for (let key in barData) {
        this.barXAxis.push(key);
        this.barXData.push(barData[key]);
      }
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
