<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
const echarts = require("echarts");
require("echarts/theme/macarons");
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
    // x轴
    barXAxis: {
      type: Array,
      required: true,
    },
    // 数据
    barXData: {
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

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgb(255,255,255)",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 70,
          containLabel: true,
        },
        title: {
          text: "模型预测错误个数",
          left: "center",
          align: "right",
        },
        yAxis: {
          type: "value",
        },

        xAxis: {
          type: "category",
          data: this.barXAxis,
        },

        series: [
          {
            data: this.barXData,
            type: "bar",
          },
        ],
      });
    },
  },
};
</script>
