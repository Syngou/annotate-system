<template>
  <div>
    <div v-if="x.length" class="dashboard-editor-container">
      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px;"
      >
        <line-chart :chart-data="data" :x="x" />
      </el-row>
      <el-row>
        <el-col>
          <div class="chart-wrapper">
            <bar-chart :bar-x="barX" :bar-data="barData" />
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
  computed: {
    x() {
      let arr = [];
      let data = this.$store.state.errorAnalysis.line_graph[0];
      for (let key in data) {
        arr.push(key);
      }
      return arr;
    },
    data() {
      let temp0 = this.$store.state.errorAnalysis.line_graph[0];
      let temp1 = this.$store.state.errorAnalysis.line_graph[1];
      let expectedData = [];
      let actualData = [];
      for (let key1 in temp0) {
        expectedData.push(temp0[key1]);
      }
      for (let key2 in temp1) {
        actualData.push(temp1[key2]);
      }
      return { expectedData, actualData };
    },
    barX() {
      let temp = [];
      for (let key in this.$store.state.errorAnalysis.chart_graph) {
        temp.push(key);
      }
      return temp;
    },
    barData() {
      let temp = [];
      let data = this.$store.state.errorAnalysis.chart_graph;
      for (let key in data) {
        temp.push(data[key]);
      }
      return temp;
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
