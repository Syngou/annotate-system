<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
const echarts = require("echarts");
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.8)",
          axisPointer: {
            type: "cross",
          },
        },
        title: {
          text: "模型预测错误个数",
          left: "center",
          align: "right",
        },
        xAxis: {
          type: "category",
          data: ["关系", "疾病", "患者", "药物", "器械"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [100, 80, 95, 83, 73],
            type: "bar",
          },
        ],
      });
    },
  },
};
</script>
