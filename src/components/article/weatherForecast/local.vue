<template>
  <!-- 本地预报 -->
  <div class="localForecast">
    <div class="weather">
      <!-- 顶部预测 天气趋势-->
      <div class="weather-top">
        <img width="80px" height="68px" src="http://www.fs121.com/images/weather/index/day/partly-cloudy.png"/>
        <div class="nowcasting-right">
          <p v-model="weatheroutlook.content">
            {{weatheroutlook.content}}
            <em style="float:right;" v-model="weatheroutlook.formatTime">{{weatheroutlook.formatTime}}</em>
          </p>
        </div>
      </div>
      <!-- 各地区天气预报 综合-->
      <div class="weather-mid">
        <div class="multiple-left">
          <div class="skNext" @click="Clickswitch">
            <img src="../../home/img/skNext.png" alt="">
            <span style="display: block;position: relative;top: -52px;color: #fff;">{{dataForm.dist}}</span>
          </div>
          <img width="80px" height="68px" src="http://www.fs121.com/images/weather/index/day/partly-cloudy.png"/>
        </div>
        <div class="multiple-mid">
          <p v-model="dataForm.t">{{dataForm.t}}</p>
          <table>
            <tr>
              <th>气压：{{dataForm.p}}</th>
              <th>风向：{{dataForm.windChinese}}</th>
            </tr>
            <tr>
              <th>相对湿度：{{dataForm.u}}</th>
              <th>风速：{{dataForm.wf2}}</th>
            </tr>
            <tr>
              <th colspan="2">{{dataForm.r24}}</th>
            </tr>
          </table>
        </div>
        <!-- 短时预报-->
        <div class="multiple-right">
          <div class="rit-desc" v-for="(item, index) in nowcasting.details" :key="item.index">
            <p>{{item}}</p>
          </div>
          <span class="rit-time">{{nowcasting.formatTime}}</span>
        </div>
      </div>
      <!-- 十天天气预报 -->
      <div class="nav_6_1">
        <ul>
          <li :class="[flag===1?'hover':'']" style="cursor:pointer;" @click="change(1)">十天预报</li>
          <li :class="[flag===2?'hover':'']" style="cursor:pointer;" @click="change(2)">十五天预报</li>
          <li></li>
        </ul>
        <div class="zdqw">
          <p>发布日期：<span id="date_fb">{{navtime}}</span></p>
          <div class="zdwd2">
            <img src="../../home/img/home_005.jpg">最高温度（单位：℃）
          </div>
          <div class="zdwd2">
            <img src="../../home/img/home_004.jpg">最低温度
          </div>
        </div>
      </div>
      <!-- 趋势图 -->
      <!--十天预报-->
      <div class="daytq0" v-if="flag === 1">
        <div class="littit_10">
          <span class="s_ws" v-for="(item, index) in swsArray" :key="item.index">
            {{item.date}}
            <br>
            {{item.week}}
            <br>
            <br>
            <img :src="item.wb" :alt="item.altholder">
          </span>
        </div>
        <canvas-one />
      </div>
      <!--十五天预报-->
      <div class="daytq1" v-if="flag === 2">
        <div class="littit_10">
          <span class="s_ws" v-for="(item, index) in swsArraytoo" :key="item.index">
            {{item.date}}
            <br>
            {{item.week}}
            <br>
            <br>
            <img :src="item.wbi" :alt="item.altholder">
          </span>
        </div>
        <canvas-list />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import canvasOne from 'components/home/canvasone'
import canvasList from 'components/home/canvaslist'
import { Gethomemore, Getshare10, Getshare15 } from 'api/home'
import { imgweather, ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'
// 本地预报
export default {
  components: {
    canvasOne,
    canvasList
  },
  data () {
    return {
      weatheroutlook: {
        content: '',
        formatTime: ''
      }, // 天气趋势
      dataForm: {
        p: '',
        wf2: '',
        t: '',
        windChinese: '',
        u: '',
        r24: '',
        dist: ''
      }, // 综合内容
      nowcasting: {
        details: '',
        formatTime: ''
      }, // 短时预报
      navtime: '', // 发布时间
      flag: 1,
      swsArray: [], // 十天预报
      swsArraytoo: [], // 十五天预报
      dataArr: [] // 综合信息
    }
  },
  mounted () {
    this._Gethomemore(5)
    this._Getshare10()
    this._Getshare15()
  },
  methods: {
    _Gethomemore (index) {
      Gethomemore().then(res => {
        if (res.code === ERR_OK) {
          this.dataArr = res.data
          this.dealData(index)
        }
      }).catch(res => {
        errorNotice(res.msg)
      })
    },
    dealData (num) {
      let index = num >= 4 ? 0 : num+1
      this.dataForm = this.dataArr.realNHours[index].real // 综合信息
      this.dataForm.dist = this.dataForm.dist.slice(0, 2) // 截取地区名
      this.weatheroutlook = this.dataArr.outlookNowcastings[index].outlook // 天气趋势
      this.nowcasting = this.dataArr.outlookNowcastings[index].nowcasting // 短时预报
    },
    // 点击切换地区
    Clickswitch () {
      switch (this.dataForm.dist) {
        case '禅城' :
          return this.dealData(0)
          break;
        case '南海' :
          return this.dealData(1)
          break;
        case '顺德' :
          return this.dealData(2)
          break;
        case '高明' :
          return this.dealData(3)
          break;
        case '三水' :
          return this.dealData(4)
          break;
      }
    },
    // 获取10天天气预报接口数据
    _Getshare10 () {
      Getshare10().then(res => {
        if (res.code === ERR_OK) {
          let data = res.data
          this.navtime = data.datetime
          data.nDay.forEach(item => {
            item.wb = `${imgweather}${item.wb}.png`
          })
          this.swsArray = data.nDay
          this.SET_CANVASTEN(data)
        }
      }).catch(res => {
        errorNotice(res.msg)
      })
    },
    // 获取15天天气预报接口数据
    _Getshare15 () {
      Getshare15().then(res => {
        if (res.code === ERR_OK) {
          let data = res.data
          this.navtime = data.datetime
          data.nDay.forEach(item => {
            item.wbi = `${imgweather}${item.wbi}.png`
          })
          this.swsArraytoo = data.nDay
          this.SET_CANVASFIVE(data)
        }
      }).catch(res => {
        errorNotice(res.msg)
      })
    },
    // 切换趋势图
    change (flag) {
      this.flag = flag
    },
    ...mapMutations([
      'SET_CANVASTEN',
      'SET_CANVASFIVE'
    ])
  }
}
</script>
<style lang="scss" scoped>
  .localForecast{
    font-size: 24px;
    font-weight: 700;
    font-family: '宋体';
    height: 762px;
    > .weather{
      width: 900px;
      height: 675px;
      margin: 0 auto;
      padding-top: 15px;
      margin-top: 10px;
      padding-bottom: 18px;
      background: url(http://www.fs121.com/images/bg_1.jpg) repeat-x;
      > .weather-top{
        height: 140px;
        margin-bottom: 17px;
        background: url(http://www.fs121.com/images/bg_top.png) no-repeat 10px 0;
        > img{
          float: left;
          margin-left: 34px;
          margin-top: 19px;
        }
        > .nowcasting-right{
          width: 690px;
          float: left;
          line-height: 24px;
          padding-top: 14px;
          margin-left: 40px;
          > P{
            color: #fff;
            font-size: 14px;
            text-indent: 25px;
          }
        }
      }
      > .weather-mid{
        height: 205px;
        overflow: hidden;
        padding: 10px;
        > .multiple-left{
          width: 220px;
          height: 100px;
          float: left;
          font-size: 47px;
          > .skNext{
            width: 100px;
            height: 100px;
            text-align: center;
            cursor: pointer;
            float: left;
          }
          > img{
            float: left;
            margin: 18px;
          }
        }
        > .multiple-mid{
          width: 300px;
          height: 205px;
          float: left;
          position: relative;
          border-right: 1px solid #035CC4;
          > p{
            width: 300px;
            height: 70px;
            font-size: 38px;
            line-height: 70px;
            color: #fff;
          }
          > table{
            width: 209px;
            height: 135px;
            text-align: left;
            line-height: 1px;
            font-size: 12px;
            margin: 0 10px;
            > tr{
              height: 20px;
              > th{
                color: #fff;
              }
            }
          }
        }
        > .multiple-right{
          width: 320px;
          float: right;
          padding: 10px;
          height: 205px;
          > .rit-desc{
            > p{
              line-height: 25px;
              margin: 5px 0;
              color: #fff;
              text-indent: 25px;
            }
          }
          > .rit-time{
            float: right;
            color: #fff;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
          }
        }
      }
      > .nav_6_1{
        width: 900px;
        height: 40px;
        line-height: 40px;
        border-bottom: #0055c2 solid 3px;
        background: #ededed;
        float: left;
        margin-top: 35px;
        > ul{
          float: left;
          line-height: 24px;
          > li{
            float: left;
            color: #666;
            font-size: 16px;
            font-family: "Microsoft Yahei";
            padding: 0 30px;
            width: auto;
            text-align: center;
            line-height: 40px;
            > a{
              color: #858585;
              float: right;
              line-height: 43px;
              margin-right: 15px;
            }
          }
          > .hover{
            background: #0055c2;
            color: #fff;
          }
        }
        > .zdqw{
          color: #7b7b7b;
          font-size: 14px;
          > p{
            font-size: 12px;
            float: left;
            margin-right: 20px;
            color: #7b7b7b;
          }
          > .zdwd2{
            width: auto;
            float: right;
            padding-right: 10px;
            > img{
              float: left;
              margin: 19px 8px 0 0;
            }
          }
        }
      }
      > .daytq0{
        width: 899px;
        height: 300px;
        overflow: hidden;
        position: relative;
        border: 1px solid #e5e5e5;
        float: left;
        > .littit_10{
          width: 892px;
          height: 110px;
          overflow: hidden;
          padding-top: 15px;
          > .s_ws{
            width: 89px;
            height: 84px;
            float: left;
            padding: 0 5px;
            font-size: 12px;
            text-align: center;
            color: #7b7b7b;
            background: url(http://www.fs121.com/images/line10.jpg) top right no-repeat;
          }
          > .s_ws:last-child{
            background: none;
          }
        }
        > canvas{
          width: 99%;
        }
      }
      >.daytq1 {
        width: 100%;
        height: 292px;
        position: relative;
        border: 1px solid #e5e5e5;
        float: left;
        background-color: #eff7ff;
        overflow-x: scroll;
        > .littit_10 {
          width: 154%;
          height: 100px;
          overflow: hidden;
          > span {
            position: relative;
            top: 20px;
            width: 80px;
            text-align: center;
            color: #7b7b7b;
            font-weight: bold;
            line-height: 18px;
            background: url(http://www.fs121.com/img/line10.jpg) top right no-repeat;
          }
          .s_ws {
            width: 77px;
            float: left;
            font-size: 12px;
            padding: 0 5px;
          }
        }
      }
    }
  }
</style>
