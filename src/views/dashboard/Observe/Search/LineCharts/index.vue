<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <svg
        t="1682259780851"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2738"
        width="20"
        height="20"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          fill="#000000"
          p-id="2739"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">123213</span>
      <span class="main-content">17.1</span>
      <svg
        t="1682260922612"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4439"
        width="16"
        height="16"
      >
        <path
          d="M719.36 575.36l-77.44 0c0-0.64 0-0.64 0-1.28L641.92 256c0-35.2-28.8-64-64-64L448 192C412.8 192 384 220.8 384 256l0 318.08c0 0.64 0 0.64 0 1.28L305.92 575.36c-44.16 0-65.92 44.8-35.2 70.4l206.72 173.44c19.2 16 50.56 16 69.76 0l206.72-173.44C785.28 620.16 763.52 575.36 719.36 575.36z"
          p-id="4440"
          fill="#1afa29"
        ></path>
      </svg>
      <svg
        t="1682260829238"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3275"
        data-spm-anchor-id="a313x.7781069.0.i1"
        width="16"
        height="16"
      >
        <path
          d="M786.295467 485.000533l-6.126934 2.082134v-18.295467h6.024534l0.1024 16.213333zM221.5424 485.239467h-8.9088l-0.085333-16.247467 8.994133-0.512v16.759467z"
          fill="#1afa29"
          p-id="3276"
        ></path>
        <path
          d="M784.469333 480.290133L504.456533 178.978133a6.826667 6.826667 0 0 0-10.001066 0L214.459733 480.290133a6.826667 6.826667 0 0 0 5.922134 11.4176l158.1056-21.435733L358.4 853.333333v16.162134a6.826667 6.826667 0 0 0 6.826667 7.168h268.356266a6.826667 6.826667 0 0 0 6.826667-7.168l-0.119467-16.3328-19.848533-382.8736 158.122667 21.418666a6.826667 6.826667 0 0 0 5.922133-11.4176z"
          fill="#1afa29"
          p-id="3277"
        ></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
  mounted() {
    //   初始化echarts
    let lineChart = echarts.init(this.$refs.charts);
    lineChart.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          data: [23, 30, 20, 10,23,40],
          type: "line",
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "blue",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
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
.header {
  display: block;
  color: black;
}
.header span {
  margin-right: 10px;
}
.main {
  margin: 10px 0;
  font-size:16px;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 10px;
}
.charts {
  width: 250px;
  height: 50px;
}
</style>
