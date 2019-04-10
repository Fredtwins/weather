<template>
  <div class="warning-foshan">
    <div class="inside">
      <div class="scroll-area" @mouseover="stopScroll" @mouseleave="startScroll">
        <div id="scroll-inside" ref="scroll-inside" class="scroll-inside" :style="{'left':scrollDirection}">
          <template>
            <template v-for="(item,index) in scrollList">
              <div :key="index" class="scroll-box">
                <span>{{item.cn}} {{item.formatTime}} </span>
                <img :src="httpUrl+'/image/warning/wa_fo/'+item.code+'.png'" />
              </div>
            </template>
          </template>
        </div>
      </div>
      <div class="nav-area">
        <span :class="['nav-button',{'current':showStatus==='map'}]" @click="showSwitch('map')">区域展示</span>
        <span :class="['nav-button',{'current':showStatus==='list'}]" @click="showSwitch('list')">列表展示</span>
        <a class="nav-button last" href="http://gd.weather.com.cn/zhyj/index.shtml" target="blank">全省预警</a>
      </div>
      <div class="content-area">
        <div v-if="showStatus === 'map'" class="show-map">
          <div class="map-nav">
            <div class="title">预警信号类型</div>
            <div class="map-list">
              <template v-for="(item,index) in warningType">
                <span :key="'map-nav-'+index" :class="['map-nav-button',{'current':currentWarning === item}]" @click="currentSwitch(item)">
                  <img :src="httpUrl+'/image/warning/wa_fo/'+item+'.png'" />
                </span>
              </template>
            </div>
          </div>
          <div class="map-left">
            <div class="title">当前预警信号统计信息</div>
            <table width="230px">
              <tr>
                <th>当前预警信号</th>
                <th>白</th>
                <th>蓝</th>
                <th>黄</th>
                <th>橙</th>
                <th>红</th>
              </tr>
              <tr v-for="(item, index) in warningTypeNum">
                <td>{{item.type}}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <div class="map-content">
            <map-area :current-code="currentWarning" />
          </div>
        </div>
        <div v-if="showStatus === 'list'" class="show-list">
          <list-area />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import jqury from 'jquery'
import mapArea from './map'
import listArea from './list'
import { getFoshanEmergency } from 'api/article'
import { httpUrl, ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'

export default {
  components: { mapArea, listArea },
  data () {
    return {
      scrollDirection: '100%',
      httpUrl: httpUrl,
      scrollList: [],
      scrollMove: 'scrollMove',
      showStatus: 'map', // 展示的类型
      warningType: [], // 预警信号类型
      currentWarning: '', // 当前预警信号类型
      warningTypeNum: [] // 当前预警信号统计信息
    }
  },
  mounted () {
    this._getFoshanEmergency()
  },
  methods: {
    _getFoshanEmergency () {
      getFoshanEmergency().then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
          let arr = []
          if (res.data.dists.length > 0) {
            res.data.dists.forEach(Item => {
              if (Item.length > 0) {
                Item.forEach(item => {
                  arr.push(item)
                })
              }
            })
          }
          this.scrollList = arr
          this.warningType = res.data.codeSet
          let numArr = []
          res.data.codeCounts.forEach(item => {
            for (let i in item) {
              console.log(i)
              numArr.push({
                level: i,
                num: item[i]
              })
            }
          })
          console.log(numArr)
          this.warningTypeNum = res.data.codeCounts
          setTimeout(() => {
            this.startScroll()
          }, 500)
        }
      }).catch(res => {
        errorNotice(res.msg)
      })
    },
    // 停止滚动
    stopScroll () {
      this.scrollMove && clearInterval(this.scrollMove)
    },
    // 开始滚动
    startScroll () {
      this.setScroll()
    },
    // 设置滚动
    setScroll () {
      let el = this.$refs['scroll-inside']
      let originDirection, targetDirection
      if (el.style.left === '100%') {
        originDirection = 940
      } else {
        originDirection = parseFloat(el.style.left)
      }
      targetDirection = -el.offsetWidth
      this.scrollDirection = originDirection + 'px'
      this.scrollMove = setInterval(() => {
        if (originDirection > targetDirection) {
          originDirection -= 1
        } else {
          originDirection = 940
        }
        this.scrollDirection = originDirection + 'px'
      }, 50)
    },
    // 切换地图模式和列表模式
    showSwitch (status) {
      this.showStatus !== status && (this.showStatus = status)
    },
    // 切换预警类型
    currentSwitch (type) {
      console.log(type)
      if (this.currentWarning !== type) {
        clearInterval(this.scrollMove)
        this.scrollDirection = '100%'
        this.currentWarning = type
      }
    }
  },
  beforeDestroy () {
    this.stopScroll()
  }
//  async mounted() {
//    const dataSource = await this.getData()
//    console.log(dataSource)
//    this.setData(dataSource)
//  },

//  data() {
//    return {
//      httpUrl: httpUrl,
//      showStatus: 'map',
//      cityMap: {
//        GDSS: '三水',
//        GDSD: '顺德',
//        GDNH: '南海',
//        GDGM: '高明',
//        BFFO: '禅城'
//      },
//      warningList: [],
//      currentWarning: '',
//      scrollDirection: '100%',
//      scrollList: {},
//      scrollMove: 'scrollMove'
//    }
//  },
//  methods: {
//    getData() {
//
//      // 当前预警状态
//      let currentStatus = axios.get('/warning/wa_fotown_inforce.js').then(res => {
//        return res.data
//      });
//
//      // 区预警状态
//      let cityStatus = axios.get('/warning/wa_fo_inforce.js').then(res => {
//        return res.data
//      });
//
//      return Promise.all([currentStatus, cityStatus])
//    },
//    setData(data) {
//
//      // 整理各区预警数据
//      data[1].forEach(item => {
//        let { code, station_code, datetime } = item
//        !this.scrollList[code] && (this.scrollList[code] = [])
//        this.scrollList[code].push({
//          city: this.cityMap[station_code],
//          time: datetime
//        })
//      })
//      console.log(this.scrollList)
//      !this.currentWarning && (this.currentWarning = data[1][0].code)
//
//    },
//  },
//  watch: {
//    currentWarning() {
//      this.$nextTick(() => {
//        this.setScroll()
//      })
//    }
//  }
}
</script>
<style lang="scss" scoped>
.warning-foshan {
  width: 100%;
  padding: 20px 22px;
  box-sizing: border-box;
  .inside {
    width: 100%;
    .scroll-area {
      width: 100%;
      height: 32px;
      padding: 0 10px;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      border: 1px solid #cccccc;
      .scroll-inside {
        width: auto;
        top: 0;
        position: absolute;
        height: 30px;
        display: inline-block;
        white-space: nowrap;
        .scroll-box {
          height: 26px;
          margin: 2px 0 0 26px;
          display: inline-block;
          span {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #346984;
          }
          img {
            height: 26px;
            display: inline-block;
          }
        }
      }
    }
    .nav-area {
      width: 100%;
      height: 58px;
      padding: 12px 0;
      .nav-button {
        width: 120px;
        height: 34px;
        line-height: 34px;
        margin-right: 10px;
        float: left;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        background-color: #025bc4;
        cursor: pointer;
      }
      .current {
        background-color: #ff6c00;
      }
      .last {
        margin-right: 0;
        float: right;
      }
    }
    .content-area {
      width: 100%;
      .show-map {
        width: 100%;
        display: inline-block;
        .map-nav {
          width: 230px;
          display: inline-block;
          vertical-align: top;
          .title {
            background: #025bc4;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-family: "宋体";
            display: block;
          }
          .map-list {
            width: 100%;
            padding-top: 10px;
            box-sizing: border-box;
            border: 1px #dfdcdc solid;
            .map-nav-button {
              width: 84px;
              height: 69px;
              margin: 0 0 10px 20px;
              display: inline-block;
              border: 2px solid transparent;
              box-sizing: border-box;
              cursor: pointer;
              img {
                width: 80px;
                height: 65px;
                display: block;
              }
            }
            .map-nav-button:hover,
            .current {
              border-color: #ff6c00;
            }
          }
        }
        .map-left{
          margin-top: 20px;
          width: 230px;
          .title {
            background: #025bc4;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-family: "宋体";
          }
          table{
            border: 1px solid #dfdcdc;
          }
        }
        .map-content {
          width: 680px;
          height: 540px;
          margin-left: 20px;
          display: inline-block;
          vertical-align: top;
        }
      }
      .show-list {
        width: 100%;
      }
    }
  }
}
</style>
