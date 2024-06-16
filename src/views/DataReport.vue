<template>
  <el-card class="page-container">
    <div class="tools">
      <div class="circle">
        <span class="red box"></span>
      </div>
      <div class="circle">
        <span class="yellow box"></span>
      </div>
      <div class="circle">
        <span class="green box"></span>
      </div>
    </div>
    <!--    按钮-->
    <div style="float: right; width: 300px; height: 150px">
      <el-button :color="buttonColor" @click="getData(6); buttonColor='blue'">近7天</el-button>
      <el-button :color="buttonColor" @click="getData(29); buttonColor='blue'">近30天</el-button>
    </div>
    <!--    数据-->
    <div style="float: left;width: 1130px; height:600px; margin-top: 20px">
      <div ref="chartRef1" style="float: left;width: 1130px; height:600px;"></div>
    </div>
  </el-card>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import * as echarts from 'echarts/core';
import {GridComponent} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {getDataService} from '@/api/report.js'
// 日期集合模型
const reportModel = ref({
  dateList: [],
  turnoverList: []
})
// 按钮的底色
const buttonColor=ref('');
// 默认回去近七天的数据
const defaultDay=ref(6);
// 默认获取近七天数据

// 根据参数传递获取指定数据
const getData=async (day) => {
  // 如果没有指定天数，就获取默认值
  day=day?day:defaultDay.value;
  const currentDate = new Date();
  // 计算参数前打印天
  const days = day * 24 * 60 * 60 * 1000;
  const daysAgo = new Date(currentDate.getTime() - days);
  // 获取开始时间
  const begin= daysAgo.toISOString().split('T')[0]
  // 获取结束时间
  const end = currentDate.toISOString().split('T')[0]
  // 调用接口获取数据
  let result = await getDataService(begin, end);
  // 渲染数据
  reportModel.value = result.data;
  // 刷新图表
  setOption1();
}
getData();

echarts.use([GridComponent, BarChart, CanvasRenderer]);

const chartRef1 = ref(null);
let myChart1 = null;

onMounted(() => {
  myChart1 = echarts.init(chartRef1.value);
  setOption1();
});

onUnmounted(() => {
  if (myChart1) {
    myChart1.dispose();
  }
});

const setOption1 = () => {
  const option1 = {
    title: {
      text: '销售数据（元）'
    },
    xAxis: {
      type: 'category',
      data: reportModel.value.dateList
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: reportModel.value.turnoverList,
        type: 'line'
      }
    ]
  };
  myChart1.setOption(option1);
};
</script>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  background-color: #F8FBFE;
  border-radius: 25px;
  z-index: 1;
  .tools {
    display: flex;
    align-items: center;
    padding: 9px;
  }

  .circle {
    padding: 0 4px;
  }

  .box {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 50%;
  }

  .red {
    background-color: #ff605c;
  }

  .yellow {
    background-color: #ffbd44;
  }

  .green {
    background-color: #00ca4e;
  }
}
button {
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}
</style>