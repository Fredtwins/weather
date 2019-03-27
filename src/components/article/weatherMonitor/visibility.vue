<template>
  <div class="empty">
    <div class="njd" style="height: 693px;">
      <div class="nLeft">
        <ul id="stationsList">
          <li>
            <a value="0" title="示意图" href="javascript:;" class="">示意图</a>
          </li>
          <li v-for="(item, index) in siteList" :key="index" @click="_getVisibilityData(item.id, index, item.name)">
            <a :value="item.id" :title="item.name" href="javascript:;" class="zoom cboxElement">
              {{item.name}}
            </a>
          </li>
        </ul>
      </div>
      <div class="nRight">
        <div class="nMap" id="nMap">
          <p>
            最新能见度记录(单位：公里)<br>{{recordTime}}
          </p>
          <span v-for="(item, index) in siteList" :rid="item.id" :title="item.name"  @click="_getVisibilityData(item.id, index, item.name)"
                href="/VISLine.aspx?t=1&amp;n=%u4F5B%u5C71%u5E02%u6C14%u8C61%u5C40&amp;rid=59828"
                class="mIcon_2 zoomMap cboxElement absolute"
                :style="item.style">{{item.latestVis}}</span>
          </div>
        <div class="nTxtVIS">
          <div class="titleVIS">说 明:</div>
          <div class="txt1VIS">
            1.鼠标移至圆点上开启代表站点的时间序列图
            2.佛山气象信息网.试验版所提供信息，未经订
            正和审核，可能存有错误，请小心甄别。引用
            及传播本网信息，事前必须征得佛山市气象台同意。
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div id="colorbox" class="colorbox" role="dialog" tabindex="-1" v-show="showChart">
      <div id="cboxContent">
        <div id="cboxLoadedContent" style="width:610px;height:328px;" ref="cboxLoadedContent">
          <!--<iframe frameborder="0"-->
          <!--src="/VISLine.aspx?t=1&amp;n=%u5357%u6D77%u7F57%u6751%u4E0A%u67CF%u6751%u59D4&amp;rid=VB59625"-->
          <!--name="1553222729475"-->
          <!--class="cboxIframe"-->
          <!--allowfullscreen="true">-->
          <!--</iframe>-->
        </div>
        <div class="cboxBottom">
          <div class="button">
            <button type="button" id="cboxPrevious" @click="_getVisibilityData()"></button>
            <button type="button" id="cboxNext" @click="_getVisibilityData()"></button>
            <div id="cboxCurrent">{{pageIndex}} / {{pageTotal}}</div>
          </div>
          <div id="cboxTitle">{{stationName}}</div>
          <button type="button" id="cboxClose" @click="closeChart()"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { getVisibilityMsg, getVisibilityData } from 'api/article'
  import { ERR_OK } from 'api/config'
  import { errorNotice } from 'common/js/dom'
  import { changeMDTime } from 'common/js/util'

  export default {
    data () {
      return {
        recordTime: '', // 最新能见度记录时间
        position: [
          {
            style: 'left: 488.108px;top: 436.292px;'
          },{
            style: 'left: 421.623px;top: 408.168px;'
          },{
            style: 'left: 421.789px;top: 346.496px'
          },{
            style: 'left: 449.498px;top: 405.678px;'
          },{
            style: 'left: 406.56px;top: 465.833px'
          },{
            style: 'left: 383.878px;top: 403.571px;'
          },{
            style: 'left: 417px;top: 298px;'
          },{
            style: 'left: 408.291px;top: 383.072px;'
          },{
            style: 'left: 571.735px;top: 421.004px;'
          },{
            style: 'left: 572.254px;top: 549.745px;'
          },{
            style: 'left: 343.689px;top: 331.323px;'
          },{
            style: 'left: 326.05px;top: 97.4519px;'
          },{
            style: 'left: 295.258px;top: 367.945px;'
          },{
            style: 'left: 359.957px;top: 183.455px;'
          },{
            style: 'left: 406.892px;top: 284.217px;'
          },{
            style: 'left: 340.947px;top: 230.56px;'
          },{
            style: 'left: 331.763px;top: 522.732px;',
            top: ''
          },{
            style: 'left: 278.118px;top: 531.744px;'
          },{
            style: 'left: 238.289px;top: 540.71px;'
          },{
            style: 'left: 317.884px;top: 451.672px;'
          }
        ], // 各站点的绝对定位位置
        siteList: [], // 站点信息列表
        today: [], // 今天能见度
        yesterday: [], // 昨天能见度
        showChart: false,
        pageIndex: 1,
        pageTotal: 1,
        stationName: ''
      }
    },
    mounted () {
      this._getVisibilityMsg()
//      this._getVisibilityData()
    },
    methods: {
      // 能见度站点信息
      _getVisibilityMsg () {
        getVisibilityMsg().then(res => {
          if (res.code === ERR_OK && res.data) {
            this.recordTime = res.data[0].latestVisTime
            if (res.data.length > 0) {
              res.data.forEach((item, index) => {
                item.latestVis = (Math.round((item.latestVis / 1000) * 10) / 10)
                this.position.forEach((val, vindex) => {
                  if (vindex === index) {
                    Object.assign(item, val)
                  }
                })
              })
            }
            this.siteList = res.data
            this.pageTotal = this.siteList.length
          }
        }).catch(res => {
          errorNotice(res.msg)
        })
      },
      // 某个站点(id)的能见度
      _getVisibilityData (id, index, name) {
        this.pageIndex = index
        this.stationName = name
        this.showChart = true
        getVisibilityData(id).then(res => {
          if (res.code === ERR_OK && res.data) {
            console.log(res)
            let chartData = {
              title: '',
              today: {
                name: '今天',
                time: '',
                data: []
              },
              yesterday: {
                name: '昨天',
                time: '',
                data: []
              }
            }
            // 转换能见度单位
            if (res.data.todayVis.length > 0) {
              res.data.todayVis.forEach(item => {
                item.vis = (Math.round((item.vis / 1000) * 10) / 10)
                chartData.today.data.push(item.vis)
              })
              this.today = res.data.todayVis
              let todayTime = changeMDTime(new Date(Date.parse(new Date(this.today[0].datetime))))
              chartData.today.time = todayTime
            }
            if (res.data.yesterdayVis.length > 0) {
              res.data.yesterdayVis.forEach(item => {
                item.vis = (Math.round((item.vis / 1000) * 10) / 10)
                chartData.yesterday.data.push(item.vis)
              })
              this.yesterday = res.data.yesterdayVis
              let yesterdayTime = changeMDTime(new Date(Date.parse(new Date(this.yesterday[0].datetime))))
              chartData.yesterday.time = yesterdayTime
            }
            // end
            chartData.title = `${name}能见度（单位：公里）`
            console.log(chartData)
            this.setCharts(chartData)
          }
        }).catch(res => {
          errorNotice(res.msg)
        })
      },
      setCharts (chartData) {
        let option = {
          title: {
            text: chartData.title,
            left: 'center',
            top: 30,
            textStyle: {
              fontSize: 12,
              color: '#000'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 30,
            top: 60,
            itemHeight: 10,
            itemWidth: 14,
            orient: 'vertical',
            data: [chartData.today.time, chartData.yesterday.time] // 日期
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'value',
            boundaryGap: false,
            onZero: true,
            data: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
          },
          yAxis: {
            type: 'value',
            onZero: true
          },
          series: [
            {
              name: chartData.today.time,
              type: 'line',
              stack: '总量',
              data: chartData.today.data
            },
            {
              name: chartData.yesterday.time,
              type: 'line',
              stack: '总量',
              data: chartData.yesterday.data
            }
          ]
        }
        let chartElement = echarts.init(document.getElementById('cboxLoadedContent'))
        chartElement.setOption(option)
      },
      // 关闭图表弹窗
      closeChart () {
        this.showChart = false
      }
    }
  }
</script>

<style lang="scss">
  .empty {
    width: 100%;
    height: 700px;
    padding: 30px;
    > .njd{
      > .nLeft{
        width: 191px;
        float: left;
        > ul{
          > li{
            height: 32px;
            line-height: 32px;
            background: #025bc4;
            margin-bottom: 1px;
            text-align: center;
            font-weight: bold;
            > a{
              color: white;
            }
          }
        }
      }
      > .nRight{
        width: 700px;
        display: inline;
        float: left;
        position: relative;
        > .nMap {
          width: 700px;
          height: 740px;
          background: url(./img/qwBg.jpg) no-repeat left bottom;
          > p {
            margin-LEFT: 40PX;
            line-height: 33px;
            color: #025bc4;
            position: absolute;
            right: 0;
            top: 0;
            font-weight: bold;
            font-size: 14px;
          }
          > span {
            width: auto;
            height: 23px;
            cursor: pointer;
            color: #FFF;
            line-height: 23px;
            position: absolute;
            z-index: 9999;
          }
          > .mIcon_2 {
            background-color: #e7530b;
            left: 233px;
            top: 120px;
            padding: 0 2px;
            text-align: left;
            position: absolute;
            filter: alpha(opacity=80);
            -moz-opacity: 0.8;
            -khtml-opacity: 0.8;
            opacity: 0.8;
          }
        }
        > .nTxtVIS {
          border: 1px #025bc4 solid;
          float: right;
          padding: 1px;
          width: 268px;
          height: 144px;
          z-index: 1;
          margin-bottom: 10px;
          > .titleVIS {
            height: 25px;
            line-height: 25px;
            background: #025bc4;
            text-indent: 12px;
            color: #FFF;
          }
          > .txt1VIS {
            padding: 10px;
            color: #000;
            line-height: 22px;
          }
        }
      }
      > .clear{
        clear: both;
        font-size: 0px;
        line-height: 0px;
        height: 0px;
      }
    }
    > .colorbox{
      top: 229px;
      left: 243px;
      position: absolute;
      width: 636px;
      height: 392px;
      -moz-box-shadow:2px 2px 2px #333333;
      -webkit-box-shadow:2px 2px 2px #333333;
      box-shadow:2px 2px 2px #333333;
      z-index: 9999;
      border-radius: 9px;
      background-color: #fff;
      > #cboxContent {
        width: 610px;
        height: 368px;
        background: #fff;
        overflow: hidden;
        margin: 10px auto;
        > .cboxBottom{
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          > .button{
            > #cboxPrevious {
              float: left;
              background: url(./img/controls.png) no-repeat -75px 0;
              width: 25px;
              height: 25px;
              border: none;
            }
            > #cboxNext {
              float: left;
              background: url(./img/controls.png) no-repeat -50px 0;
              width: 25px;
              height: 25px;
              margin: 0 8px;
              border: none;
            }
            > #cboxCurrent {
              float: left;
              color: #949494;
              margin-top: 5px;
            }
          }
          > #cboxTitle {
            text-align: center;
            color: #949494;
            margin-top: 8px;
          }
          > #cboxClose {
            background: url(./img/controls.png) no-repeat -25px 0;
            width: 25px;
            height: 25px;
            border: none;
          }
        }
      }
    }
  }
</style>
