<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
require("echarts/theme/macarons");
const echarts = require("echarts");
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
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    // 数据
    lineXData: {
      type: Array,
      required: true,
    },
    // x轴
    lineXAxis: {
      type: Array,
      required: true,
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
      this.setOptions(this.lineXData);
    },
    setOptions([expectedData, actualData] = []) {
      this.chart.setOption({
        xAxis: {
          data: this.lineXAxis,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 70,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
          backgroundColor: "rgba(255,255,255,0.8)",
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        color: ["#FF005A", "#3888fa"],
        title: {
          text: "模型预测个数对比",
          left: "center",
          align: "right",
        },
        legend: {
          data: ["标准模型", "当前使用模型"],
          top: 30,
        },
        series: [
          {
            name: "标准模型",

            smooth: true,
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "当前使用模型",
            smooth: true,
            type: "line",

            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
  },
};
</script>
