<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "pro",
  mounted() {
    //   初始化echarts
    let lineChart = echarts.init(this.$refs.charts);
    lineChart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          data: [78],
          type: "bar",
          barWidth: 10,
          color: "yellowgreen",
          showBackground:true,
          backgroundStyle:{
            color:"#eee"
          },
          label:{
            formatter:"|",
            position:'right',
            show:true
          }
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
