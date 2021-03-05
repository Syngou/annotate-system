<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
var echarts = require("echarts");
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
          text: "模型准确率对比图",
          left: "center",
          align: "right",
        },
        xAxis: {
          type: "category",
          data: ["标准模型", "模型1", "模型2", "模型3", "模型4", "模型5"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#3888fa",
                },
              },
              80,
              95,
              83,
              70,
              60,
            ],
            type: "bar",
          },
        ],
      });
    },
  },
};
</script>
