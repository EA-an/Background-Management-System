<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "bar",
  mounted() {
    //   初始化echarts
    let lineChart = echarts.init(this.$refs.charts);
    lineChart.setOption({
      xAxis: {
        type: "category",
      },
      yAxis: {},
      series: [
        {
          data: [23, 30, 50, 20,33,29,18,23],
          type: "bar",
        },
      ],
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>
