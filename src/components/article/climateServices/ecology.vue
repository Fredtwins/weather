<template>
  <div class="service-prediction">
    <div class="inside">
      <div class="nav-area">
        <template v-for="(item,index) in chartList">
          <span
            :key="'nav-'+item.id"
            :class="['nav-button',{'current':current==index}]"
            @click="switchChart(index)"
          >{{item.name}}</span>
        </template>
      </div>
      <div class="chart-area">
        <template v-for="(item,index) in chartList">
          <div
            :key="'chart-'+item.id"
            :id="item.id"
            :class="['chart-box',{'current':current==index}]"
          ></div>
        </template>
      </div>
      <div
        class="text-area"
        v-if="current==2"
        v-html="text"
      ></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import echarts from 'echarts'
export default {
  async mounted() {
    let dataSource = await this.getData()
    dataSource = this.setData(dataSource)
    dataSource = this.setCharts(dataSource)
    this.chartList.forEach(item => {
      let chartElement = echarts.init(document.getElementById(item.id))
      chartElement.setOption(dataSource[item.dataName])
    })
  },
  data() {
    return {
      current: 0,
      text: '',
      chartList: [
        {
          id: 'chart-rainfall',
          name: '降水预测',
          dataName: 'chart_rainfall'
        }, {
          id: 'chart-temperature',
          name: '平均气温预测',
          dataName: 'chart_temperature'
        }, {
          id: 'chart-sunshine',
          name: '日照时数预测',
          dataName: 'chart_sunshine'
        }
      ]
    }
  },
  methods: {
    switchChart(index) {
      index != this.current && (this.current = index)
    },
    getData() {

      // 实况数据
      let surf_xun = axios.get('/request_file/surf_xun.js').then(res => {
        return res.data
      });

      // 平均值数据
      let surf_30y_xun = axios.get('/request_file/surf_30y_xun.js').then(res => {
        return res.data
      });

      // 预测数据
      let foxun = axios.get('/request_file/foxun.js').then(res => {
        return res.data
      });

      return Promise.all([surf_xun, surf_30y_xun, foxun])
    },
    setData(data) {

      let currentTime = new Date();

      const chartData = {
        currentTime: currentTime.getFullYear() + '年' + (currentTime.getMonth() + 1) + '月',
        forecast: {
          rainfall: [],
          temperature: [],
          sunshine: []
        },
        fact: {
          rainfall: [],
          temperature: [],
          sunshine: []
        },
        mean: {
          rainfall: [],
          temperature: [],
          sunshine: []
        },
        timeAxis: []
      }


      let timeData = []

      data[0].forEach(item => {
        item.r && chartData.fact.rainfall.push(item.r)
        item.tavg && chartData.fact.temperature.push(item.tavg)
        item.s && chartData.fact.sunshine.push(item.s)
        timeData.push([item.month, item.xun])
      })

      let meanData = {}
      data[1].forEach(item => {
        meanData[(item.month < 10 ? '0' + item.month : item.month) + '_' + item.xun] = item
      })

      timeData.forEach(item => {
        let index = item[0] + '_' + item[1]
        chartData.mean.rainfall.push(parseFloat(meanData[index].r).toFixed(1))
        chartData.mean.temperature.push(parseFloat(meanData[index].tavg).toFixed(1))
        chartData.mean.sunshine.push(parseFloat(meanData[index].s).toFixed(1))
      })

      for (var i = 0; i < 9; i++) {
        if (i == 8) {
          chartData.forecast.rainfall.push(data[2][0]["r"])
          chartData.forecast.temperature.push(data[2][0]["tavg"])
          chartData.forecast.sunshine.push(data[2][0]["s"])
        } else if (i == 7) {
          chartData.forecast.rainfall.push('-')
          chartData.forecast.temperature.push(chartData.fact.temperature[chartData.fact.temperature.length - 1])
          chartData.forecast.sunshine.push(chartData.fact.sunshine[chartData.fact.temperature.length - 1])
        } else {
          chartData.forecast.rainfall.push('-')
          chartData.forecast.temperature.push('-')
          chartData.forecast.sunshine.push('-')
        }
      }

      this.text = data[2][0]["dscr"].replace(/(\d)/g, "<br/>$1")

      chartData.timeAxis = timeData.map(item => {
        return item[0] + '月' + (item[1] == 0 ? '上' : (item[1] == 1 ? '中' : '下')) + '旬'
      })

      return chartData
    },
    setCharts(data) {
      return {
        chart_rainfall: {
          title: {
            text: '佛山市' + data.currentTime + '平均降水预测',
            x: 'center',
            y: 25,
            textStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#566C81'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'none' }
          },
          legend: {
            selectedMode: true,
            data: ['实况', '平均值', '预测']
          },
          toolbox: {
            show: false
          },
          grid: {
            borderWidth: 0
          },
          color: ['#2e8dff', '#aa4744', '#89a54f'],
          xAxis: [{
            type: 'category',
            data: data.timeAxis,
            axisLine: {
              color: '#333'
            },
            splitArea: { show: false },
            splitLine: { show: false }
          }],
          yAxis: [{
            type: 'value',
            //max: 250,
            splitNumber: 5,
            scale: true,
            axisLine: {
              color: '#333'
            },
            splitArea: { show: false },
            splitLine: { show: true }
          }],
          series: [
            {
              name: '实况',
              type: 'bar',
              data: data.fact.rainfall
            },
            {
              name: '平均值',
              type: 'bar',
              data: data.mean.rainfall
            },
            {
              name: '预测',
              type: 'bar',
              data: data.forecast.rainfall
            }
          ]
        },
        chart_temperature: {
          title: {
            text: '佛山市' + data.currentTime + '平均气温预测',
            x: 'center',
            y: 25,
            textStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#566C81'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'none' }
          },
          legend: {
            selectedMode: true,
            data: ['实况', '平均值', '预测']
          },
          toolbox: {
            show: false
          },
          grid: {
            borderWidth: 0
          },
          color: ['#2e8dff', '#aa4744', '#89a54f'],
          xAxis: [{
            type: 'category',
            data: data.timeAxis,
            //data: ['01上旬', '01下旬', '02上旬', '02下旬', '03上旬', '03下旬', '04上旬', '05下旬', '05上旬', '05下旬', '06上旬', '06下旬', '07上旬', '07下旬', '08上旬', '08下旬', '09上旬', '09下旬', '10上旬', '10下旬', '11上旬', '11下旬', '12上旬', '12下旬'],
            axisLine: {
              color: '#333'
            },
            splitArea: { show: false },
            splitLine: { show: false }
          }],
          yAxis: [{
            type: 'value',
            //max: 50,
            //splitNumber: 4,
            scale: true,
            axisLine: {
              color: '#333'
            },
            //precision:3,
            splitArea: { show: false },
            splitLine: { show: true }
          }],
          series: [
            {
              name: '实况',
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              data: data.fact.temperature
            },
            {
              name: '平均值',
              type: 'line',
              symbol: 'rect',
              symbolSize: 10,
              data: data.mean.temperature
            },
            {
              name: '预测',
              type: 'line',
              symbol: 'triangle',
              symbolSize: 10,
              data: data.forecast.temperature
            }
          ]
        },
        chart_sunshine: {
          title: {
            text: '佛山市' + data.currentTime + '日照时数预测',
            x: 'center',
            y: 25,
            textStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#566C81'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'none' }
          },
          legend: {
            selectedMode: true,
            data: ['实况', '平均值', '预测']
          },
          toolbox: {
            show: false
          },
          grid: {
            borderWidth: 0
          },
          calculable: false,
          color: ['#2e8dff', '#aa4744', '#89a54f'],
          xAxis: [{
            type: 'category',
            data: data.timeAxis,
            axisLine: {
              color: '#333'
            },
            splitArea: { show: false },
            splitLine: { show: false }
          }],
          yAxis: [{
            type: 'value',
            max: 80,
            splitNumber: 4,
            scale: true,
            axisLine: {
              color: '#333'
            },
            splitArea: { show: false },
            splitLine: { show: true }
          }],
          series: [
            {
              name: '实况',
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              data: data.fact.sunshine
            },
            {
              name: '平均值',
              type: 'line',
              symbol: 'rect',
              symbolSize: 10,
              data: data.mean.sunshine
            },
            {
              name: '预测',
              type: 'line',
              symbol: 'triangle',
              symbolSize: 10,
              data: data.forecast.sunshine
            }
          ]
        }
      }
    }
  },
}

</script>
<style lang="scss" scoped>
.service-prediction {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  .inside {
    width: 100%;
    padding: 12px 36px;
    background-color: #2f8dff;
    .nav-area {
      width: 100%;
      height: 34px;
      margin-bottom: 18px;
      span {
        width: 130px;
        height: 34px;
        line-height: 34px;
        margin-right: 10px;
        display: inline-block;
        font-size: 14px;
        font-family: "宋体";
        text-align: center;
        color: #ffffff;
        background-color: #025bc4;
        cursor: pointer;
      }
      .current {
        background-color: #ff6c00;
      }
    }
    .chart-area {
      width: 894px;
      height: 395px;
      display: block;
      background-color: #ffffff;
      overflow: hidden;
      .chart-box {
        width: 894px;
        height: 395px;
        display: none;
      }
      .current {
        display: block;
      }
    }
    .text-area {
      padding: 10px 10px 10px 58px;
      line-height: 25px;
      box-sizing: border-box;
      font-size: 14px;
      color: black;
      text-align: left;
      background-color: #ffffffff;
    }
  }
}
</style>
