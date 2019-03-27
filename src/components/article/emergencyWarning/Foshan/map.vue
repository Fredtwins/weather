<template>
  <div class="map-area">
    <div id="map-box"></div>
    <div style="display:none">
      <div id="popup-box">
        <div class="title">{{popupData.name}}</div>
        <div class="content">
          <img
            v-if="popupData.code"
            :src="'/images/warning/wa_fo/'+popupData.code+'.png'"
          />
          <div class="data">
            <span>{{popupData.name}}: 【{{popupData.content}}】</span>
            <span>发布时间: {{popupData.time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'Vue'
import echarts from 'echarts'
import axios from 'axios'
import jqury from 'jquery'
export default {
  props: ['current-code'],
  data() {
    return {
      mapChart: null,
      dataList: {},
      colorMap: [
        ['#e7e7e7', '#333333'],
        ['#ffffff', '#333333'],
        ['#0f0feb', '#ffffff'],
        ['#f5e82a', '#333333'],
        ['#efa425', '#333333'],
        ['#c30e21', '#ffffff'],
      ],
      warningCode: '',
      popupData: {
        name: '',
        code: '',
        content: '',
        time: ''
      }
    }
  },
  async mounted() {
    let dataSource = await this.getData()
    this.setData(dataSource)
    this.warningCode = this.currentCode
    this.configMap()
  },
  methods: {
    getData() {
      // 镇街预警状态
      let townStatus = axios.get('/warning/wa_fotown_inforce_all.js').then(res => {
        return res.data
      });

      // 佛山镇街geoJSON数据
      let mapSource = axios.get('/map-source/area.js').then(res => {
        return res.data
      })

      return Promise.all([townStatus, mapSource])
    },

    setData(data) {

      data[0].forEach(item => {
        let { code, datetime, cn, name } = item
        !this.dataList[code] && (this.dataList[code] = [])
        const obj = {
          name: cn,
          value: code,
          data: {
            name: cn,
            code,
            time: datetime,
            content: name
          }
        }

        if (code[1] > 0) {
          obj.itemStyle = {
            areaColor: this.colorMap[code[1]][0]
          }
        }

        this.dataList[code].push(obj)
      })

      echarts.registerMap('foshan', data[1])

      this.mapChart = echarts.init(document.getElementById('map-box'))
    },

    configMap() {

      const mapData = this.dataList[this.warningCode]

      const option = {
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          position: (point, params, dom) => {
            params.data && (this.popupData = params.data.data)
            if (!params.name) {
              $(dom).hide()
            } else {
              let cssCode = $('.map-area')[0].attributes[0].nodeName
              $(dom)
                .addClass('map-popup-box')
                .attr(cssCode, '')
                .attr('style', 'position:absolute')
                .html('')
                .append($('#popup-box').clone())
            }
          }
        },
        series: [{
          type: 'map',
          map: 'foshan',
          zoom: 1.1,
          roam: true,
          itemStyle: {
            areaColor: this.colorMap[0][0]
          },
          label: {
            show: true,
            fontSize: 10,
            color: this.colorMap[(this.warningCode ? this.warningCode[1] : 0)][1]
          },
          data: mapData
        }]
      }
      this.mapChart.setOption(option);
    }
  },
  watch: {
    currentCode() {
      this.warningCode && (this.warningCode = this.currentCode) && this.configMap()
    }
  }
}
</script>
<style lang="scss" scoped>
.map-area {
  width: 680px;
  height: 540px;
  position: relative;
  #map-box {
    width: 680px;
    height: 540px;
  }
  .map-popup-box {
    width: 284px;
  }
  #popup-box {
    width: 288px;
    background: #ffffff;
    border: 1px solid #025bc4;
    padding: 1px;
    box-sizing: border-box;
    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      background-color: #025bc4;
    }
    .content {
      width: 100%;
      padding: 10px;
      min-height: 85px;
      box-sizing: border-box;
      word-wrap: none;
      img {
        width: 80px;
        height: 65px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: top;
      }
      .data {
        width: 170px;
        display: inline-block;
        vertical-align: top;
        span {
          line-height: 20px;
          display: block;
          word-break: break-all;
          color: #666666;
        }
      }
    }
  }
}
</style>
