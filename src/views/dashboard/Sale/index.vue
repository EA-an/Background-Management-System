<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <div class="left tab">
          <el-tabs v-model="activeName">
            <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
            <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            class="date"
            v-model="value1"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            size="mini"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="20"> <div ref="charts" class="charts"></div></el-col>
          <el-col :span="4">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="index">1</span><span>肯德基</span
                ><span class="rvalue">134</span>
              </li>
              <li>
                <span class="index">2</span><span>肯德基</span
                ><span class="rvalue">134</span>
              </li>
              <li>
                <span class="index">3</span><span>肯德基</span
                ><span class="rvalue">134</span>
              </li>
              <li>
                <span>4</span><span>肯德基</span><span class="rvalue">134</span>
              </li>
              <li>
                <span>5</span><span>肯德基</span><span class="rvalue">134</span>
              </li>
              <li>
                <span>6</span><span>肯德基</span><span class="rvalue">134</span>
              </li>
              <li>
                <span>7</span><span>肯德基</span><span class="rvalue">134</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "销售额",
      lineChart: {},
      value1: [],
    };
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.value1 = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.value1 = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.value1 = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.value1 = [start, end];
    },
  },
  mounted() {
    //   初始化echarts
    this.lineChart = echarts.init(this.$refs.charts);
    this.lineChart.setOption({
      title: {
        text: "销售额",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 111, 203, 223, 300, 103],
          color: "yellowgreen",
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName == "销售额" ? "销售额" : "访问量";
    },
  },
  watch: {
    title() {
      this.lineChart.setOption({
        title: {
          text: this.title,
        },
      });
    },
  },
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 240px;
  margin: 0 20px;
}
span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
li {
  height: 8%;
  margin: 10px 0;
}
.index {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  float: left;
}
.rvalue {
  float: right;
}
</style>
