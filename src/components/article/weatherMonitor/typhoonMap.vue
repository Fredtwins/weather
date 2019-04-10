<template>
  <div class="typhoonMap">
    <div class="tfMap" id="map_Typhoon"></div>
    <div class="typhoon-path-point-detail-container">
      <div id="typhoon-path-detail" v-if="openDetail">
        <div class="top">
          <div class="left"></div>
          <div class="right"></div>
          <div style="clear:both;"></div>
        </div>
        <div class="content">
          <div class="right">
            <table>
              <caption><span class="typhoon-title" style="font-weight: bold;text-align: center;color: #0000FF;">{{typhoonName}}</span></caption>
              <tbody>
                <tr>
                  <td class="name">时&nbsp;&nbsp;&nbsp;间：</td>
                  <td>{{typhoonDetail.formatTime}}</td>
                </tr>
                <tr>
                  <td class="name">中心位置：</td>
                  <td>{{typhoonDetail.longitude}}°E, {{typhoonDetail.latitude}}°N</td>
                </tr>
                <tr>
                  <td class="name">风力风速：</td>
                  <td>{{typhoonDetail.windpower}} {{typhoonDetail.windspeed}}米/秒</td>
                </tr>
                <tr>
                  <td class="name">中心气压：</td>
                  <td>{{parseInt(typhoonDetail.pressure)}} 百帕</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="clear:both;"></div>
        </div>
        <div class="buttom">
          <div class="left"></div>
          <div class="right"></div>
          <div style="clear:both;"></div>
        </div>
        <a id="stretchContractIcon" @click="open()"></a>
      </div>
      <div id="typhoon-path-detail-none" v-else>
        <div class="top">
          <div class="left"></div>
          <div style="clear:both;"></div>
        </div>
        <div class="content">
          <div style="clear:both;"></div>
        </div>
        <div class="buttom">
          <div class="left"></div>
          <div style="clear:both;"></div>
        </div>
        <a id="stretchContractIcon-none" @click="open()"></a>
      </div>
    </div>
    <div class="leaflet-bottom leaflet-right">
      <table :class="['leaflet-control-legend', {'leaflet-control':showLegend}]" :style="{width: (showLegend ? 235 : 72) +'px'}">
        <tr class="">
          <td class="leaflet-control-legend-top-left"></td>
          <td align="right" class="leaflet-control-legend-top-center" @click="show()">
            <div class="leaflet-control-legend-title">预报机构</div>
            <div :class="[{'leaflet-control-legend-title-up':!showLegend},{'leaflet-control-legend-title-down':showLegend}]"></div>
          </td>
          <td class="leaflet-control-legend-top-right"></td>
        </tr>
        <tr class="">
          <td class="leaflet-control-legend-mid-left"></td>
          <td class="leaflet-control-legend-mid-center" v-show="showLegend">
            <checkbox-group class="typhoon-legend-main" @on-change="getLegend">
              <label v-for="(item, index) in institution" :key="index">
                <checkbox class="checkbox typhoon-legend-input" :checked="item.checked" :name="item.name" :value="item.name" :label="index">
                  <span class="typhoon-legend-name">{{item.desc}}</span>
                  <span :style="item.color" class="typhoon-legend-command">━ ━</span>
                </checkbox>
              </label>
            </checkbox-group>
          </td>
          <td class="leaflet-control-legend-mid-center-hid" v-show="!showLegend"></td>
          <td class="leaflet-control-legend-mid-right"></td>
        </tr>
        <tr class="">
          <td class="leaflet-control-legend-foot-left"></td>
          <td class="leaflet-control-legend-foot-center"></td>
          <td class="leaflet-control-legend-foot-right"></td>
        </tr>
      </table>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
  import jquery from 'jquery'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        map: null,
        CityPoint: {
          "佛山": [113.123192, 23.023212],
          "广州": [113.265771, 23.138112],
          "海口": [110.329677, 20.035035],
          "三亚": [109.515596, 18.255983],
          "湛江": [110.366471, 21.281832],
          "阳江": [111.985434, 21.866942],
          "台山": [112.788016, 22.186441],
          "珠海": [113.5768, 22.24747],
          "深圳": [114.071227, 22.529779],
          "惠来": [116.308798, 22.964926],
          "汕尾": [115.379735, 22.793381],
          "汕头": [116.727337, 23.359387],
          "厦门": [118.148528, 24.492477],
          "福州": [119.298359, 26.077327]
        }, // 需要测距的城市
        institution: [
          {
            name: 'BABJ',
            color: 'color:#FF4050',
            desc: '北京',
            checked: true
          }, {
            name: 'BCGZ',
            color: 'color:#FF66FF',
            desc: '广州',
            checked: true
          }, {
            name: 'PGTW',
            color: 'color:#FFA040',
            desc: '关岛',
            checked: true
          }, {
            name: 'RJTD',
            color: 'color:#43FF4B',
            desc: '日本',
            checked: true
          }, {
            name: 'VHHH',
            color: 'color:#669999',
            desc: '香港',
            checked: true
          }, {
            name: 'ECMWF',
            color: 'color:#40DDFF',
            desc: '欧洲',
            checked: true
          }, {
            name: 'GZRD9KM',
            color: 'color:#373591',
            desc: '热带所',
            checked: true
          }
        ], // 预报机构
        FA: {
          "BABJ": ["#FF4050", "北京"],
          "BCGZ": ["#FF66FF", "广州"],
          "PGTW": ["#FFA040", "关岛"],
          "RJTD": ["#43FF4B", "日本"],
          "VHHH": ["#669999", "香港"],
          "ECMWF": ["#40DDFF", "欧洲"],
          "GZRD9KM": ["#373591", "热带所"]
        }, // 北京，广州，关岛，日本，香港，欧洲，热带所预报机构
        CityDistance: [], // 城市距离
        TyphoonData: [], // 台风信息
        typhoonDetail: {}, //地图右上角台风信息
        typhoonName: '',
        openDetail: true, // 是否显示详细信息
        showLegend: true, // 是否显示预报机构
      }
    },
    computed: {
      ...mapGetters([
        'TyphoonMsg'
      ])
    },
    mounted () {
      this.init()
    },
    methods: {
      // 初始化地图（天地图）
      init () {
        this.map = new T.Map('map_Typhoon')
        this.map.centerAndZoom(new T.LngLat(130.06957, 23.859657), 5) // 设置中心点坐标和地图级别
        let control = new T.Control.Zoom();
        this.map.addControl(control); //添加缩放平移控件
        this.map.enableScrollWheelZoom(); //允许鼠标滚轮缩放地图
//        let myStyleJson = [
//          {
//            "featureType": "water",
//            "elementType": "all",
//            "stylers": {
//              "color": "#3d85c6"
//            }
//          }
//        ]
//        this.map.setMapStyle({styleJson: myStyleJson}) // 给地图设置样式
      },
      // 绘制台风折线-实况预报路径
      draCurveLine (val) {
        for (let i in val) {
          this.TyphoonData.push(val[i])
        }
        this.map.clearOverLays() // 清除覆盖物
        let first = true
        if (this.TyphoonData.length > 0) {
          this.TyphoonData.forEach(item => {
            // 设置标注点的图形
            let myIcon = new T.Icon({
              iconUrl: require('./img/' + item.fcid + '.png'),
              iconSize: new T.Point(30, 30)
            })
            let fcid = item.fcid
            let lineColor = this.FA[item.fcid][0] // 颜色
            let tscname = item.tscname // 中文名称
            let tscode = item.intlid
            let points = [] // 实况路径经纬度
            let realList = item.all // 实况路径
            let fstList = item.first // 预报路径
            if (realList.length > 0) {
              realList.forEach((real, index) => {
                let point = new T.LngLat(real.longitude, real.latitude)
                let time = real.ddatetime
                points.push(point)
                let wf = 0
                if (first && index<realList.length-1) {
                  // 计算移动速度, 距离/时间=速度
                  let nextPoint = new T.LngLat(realList[index+1].longitude, realList[index+1].latitude)
                  let nextTime = realList[index+1].ddatetime
                  if (nextPoint) {
                    let wfDistance = this.map.getDistance(nextPoint, point) / 1000 // 距离以km为单位
                    let caluTime = nextTime - time
                    let leave1 = caluTime % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
                    let hours = Math.floor(leave1 / (3600 * 1000))
                    wf = Math.round(wfDistance / hours)
                  }
                  // end
                  // 城市距离计算
                  for (let city in this.CityPoint) {
                    let distance = this.map.getDistance(new T.LngLat(this.CityPoint[city][0], this.CityPoint[city][1]), point) / 1000
                    this.CityDistance.push(parseInt(distance)+'km')
                  }
                  this.$emit('getCityDistance', this.CityDistance)
                  // end
                }
                // 点标注(实况)
                this.addMarker(point, myIcon, this.InboBoxContent(tscname, tscode, real, 'real', tscname, wf))
              })
            }
            this.draw(points, lineColor, 'solid') // 绘制实况路径
            if (this.selectLegend.hasOwnProperty(fcid)) {
              // 预报路径
              let pointsFst = [] // 预报路线
              pointsFst.push(points[0]) // 预报起始点
              if (fstList === undefined) {
                return true
              }
              let fstPoint = [] // 预报路径点
              let realLastTime = realList[realList.length - 1].ddatetime // 实况路径的最后时间
              fstList.forEach(fst => {
                let point = new T.LngLat(fst.longitude, fst.latitude)
                let time = fst.ddatetime
                if (realLastTime > time) {
                  return true
                }
                fstPoint.push(point)
                this.addMarker(point, myIcon, this.InboBoxContent(tscname, tscode, fst, 'fst', tscname, 0))
              })
              this.draw(fstPoint, lineColor, 'dashed') // 绘制预报路径
            }
            first = false
          })
        }
      },
      // 信息窗口的内容
      InboBoxContent (tsname, tscode, content, type, fa_name, wf) {
        var sContentjt01 = "<div class=\"map_typhoon\">";
        sContentjt01 += "<div class='tsname'><div class='tsname_l'></div><div class='tsname_c'>" + tsname + "（" + tscode + "）</div><div class='tsname_r'></div><div class='clear'></div>";
        sContentjt01 += "<div class=\"ts_infoDeta_t\"></div>";
        sContentjt01 += "<div class=\"ts_infoDeta\"><ul>";
        var time = content.ddatetime
        if (type === "fst") {
          time = content.ddatetime
          sContentjt01 += "<li class='tit'>预报机构：</li><li>" + fa_name + "</li>";
          sContentjt01 += "<li class='tit'>到达时间：</li><li>" + time + "</li>";
        } else {
          sContentjt01 += "<li class='tit'>时间：</li><li>" + time + "</li>";
        }
        sContentjt01 += "<li class='tit'>中心位置：</li><li>" + content.longitude + "&deg;E," + content.latitude + "&deg;N</li>";
        if (content.windspeed !== "") {
          sContentjt01 += "<li class='tit'>最大风速：</li><li>" + (content.windspeed === undefined ? "&nbsp;" : Math.round(content.windspeed) + "米/秒") + " </li>";
        }
        if (content.windpower !== "") {
          sContentjt01 += "<li class='tit'>最大风力：</li><li>" + (content.windpower === undefined ? "&nbsp;" : parseInt(content.windpower) + "级") + " </li>";
        }
        if (content.pressure !== "")
          sContentjt01 += "<li class='tit'>中心气压：</li><li>" + (content.pressure === undefined ? "&nbsp;" : Math.round(content.pressure) + "百帕") + " </li>";
        if (wf>0)
          sContentjt01 += "<li class='tit'>移动速度：</li><li>" + (wf > 0 ? wf + "公里/小时" : "&nbsp;") + "</li>";
        if (content.rr07 !== "")
          sContentjt01 += "<li class='tit'>七级风圈半径：</li><li>" + (content.rr07 === undefined ? "&nbsp;" : Math.round(content.rr07) + "公里") + "</li>";
        if (content.rr10 !== "")
          sContentjt01 += "<li class='tit'>十级风圈半径：</li><li>" + (content.rr10 === undefined ? "&nbsp;" : Math.round(content.rr10) + "公里") + "</li>";
        sContentjt01 += "</ul></div>";
        sContentjt01 += "<div class=\"ts_infoDeta_b\"></div></div>";
        return sContentjt01
      },
      // 添加标注  point 经纬度 color 线条颜色
      addMarker (point, myIcon, sContentjt) {
        let markerjt = new T.Marker(point, { icon: myIcon }) // 创建标注
        this.map.addOverLay(markerjt) // 将标注添加到地图中
        // 创建信息窗口
//        let infoBoxjt01 = new T.InfoWindow(this.map, sContentjt, {
//          offset: { width: 90, height: -2 },
//          boxStyle: {
//            width: "240px",
//            height: "auto"
//          },
//          boxClass: 'infobox',
//          closeIconMargin: '30px 8px 0 0',
//          closeIconUrl: '../img/iw_close1d3.gif'
//        })
        let infoBoxjt01 = new T.InfoWindow()
        infoBoxjt01.setContent(sContentjt)
        markerjt.addEventListener("mouseover", function () {
          markerjt.openInfoWindow(infoBoxjt01)
        })
        markerjt.addEventListener("mouseout", function () {
          markerjt.closeInfoWindow(infoBoxjt01)
        })
      },
      // 绘制折线  points 经纬度数组 color 线条颜色 strokeStyle 实线或虚线，solid或dashed
      draw (points, color, strokeStyle) {
        color = color === null ? 'black' : color
        if (points === null || points === undefined) {
          return
        }
        let polyline = new T.Polyline(points, { color: color, weight: 1.5, opacity: 1, lineStyle:strokeStyle })
        this.map.addOverLay(polyline)
      },
      // 预报机构多选框
      getLegend (e) {
        this.selectLegend = []
        e.forEach(i => {
          this.selectLegend.push(this.institution[i])
        })
        console.log(this.selectLegend)
      },
      // 是否显示详细信息
      open () {
        this.openDetail = !this.openDetail
      },
      // 是否显示预报机构
      show () {
        this.showLegend = !this.showLegend
      }
    },
    watch: {
      TyphoonMsg (val) {
        console.log(val)
        this.selectLegend = val
        if (val['BABJ'] && val['BABJ'].all.length>0) {
          this.typhoonDetail = val['BABJ'].all[0]
          this.typhoonName = val['BABJ'].intlid + val['BABJ'].tscname + '(' +val['BABJ'].tsename + ')'
          console.log(this.typhoonDetail)
        }
        this.draCurveLine(val)
      }
    }
  }
</script>
<style lang="scss" scoped>
.typhoonMap{
  .typhoon-path-point-detail-container{
    position: absolute;
    right: 40px;
    top: 50px;
    z-index: 999;
    #typhoon-path-detail{
      position: relative;
      display: inline-block;
      width: 192px;
      .top {
        position: relative;
        width: 192px;
        margin: 0 auto;
        .left {
          background: url(./img/detailPanel.png) no-repeat scroll 0 -14px;
          float: left;
          height: 10px;
          width: 6px;
        }
        .right {
          background: url(./img/detailPanel.png) no-repeat scroll -392px -14px;
          height: 10px;
          float: right;
          width: 186px;
        }
      }
      .content {
        width: 192px;
        position: relative;
        background: url(./img/detailPanel-middle.png) repeat-y scroll left top;
        .right {
          float: right;
          width: 186px;
          background: url(./img/detailPanel-middle.png) repeat-y scroll -392px 0;
          padding-bottom: 20px;
          color: #000000;
        }
      }
      .buttom {
        position: relative;
        width: 192px;
        .left {
          background: url(./img/detailPanel.png) no-repeat scroll 0 -25px;
          float: left;
          height: 10px;
          width: 6px;
        }
        .right {
          float: right;
          width: 186px;
          background: url(./img/detailPanel.png) no-repeat scroll -392px -25px;
          height: 10px;
        }
      }
      #stretchContractIcon{
        background: url(./img/stretchIcon.png) no-repeat scroll 0 0;
        bottom: 8px;
        display: block;
        height: 17px;
        right: 173px;
        position: absolute;
        width: 17px;
        cursor: pointer;
      }
    }
    #typhoon-path-detail-none{
      height: 0;
      width: 0;
      position: relative;
      display: inline-block;
      .top {
        position: relative;
        width: 0;
        height: 0;
        margin: 0 auto;
        .left {
          background: url(./img/detailPanel.png) no-repeat scroll 0 -14px;
          float: left;
          height: 0;
          width: 0;
        }
      }
      .content {
        width: 0;
        height: 0;
        position: relative;
        background: url(./img/detailPanel-middle.png) repeat-y scroll left top;
      }
      .buttom {
        position: relative;
        width: 0;
        height: 0;
        .left {
          background: url(./img/detailPanel.png) no-repeat scroll 0 -25px;
          float: left;
          height: 0;
          width: 0;
        }
      }
      #stretchContractIcon-none {
        background: url(./img/contract.png) no-repeat scroll 50% 50% #FFFFFF;
        border: 3px solid #309CD3;
        position: absolute;
        height: 30px;
        width: 30px;
        right: 0;
        top: 0;
        bottom: 8px;
        display: block;
        cursor: pointer;
      }
    }
  }
  .leaflet-bottom{
    position: absolute;
    z-index: 1000;
    bottom: 30px;
    table{
      position: relative;
      z-index: 7;
      clear: both;
      float: left;
      border: 0 none;
      opacity: 0.8;
      overflow: hidden;
      table-layout: fixed;
      tr{
        .leaflet-control-legend-top-left {
          background: url(./img/tilemap-legtop-left.png) repeat scroll 0 0;
          height: 24px;
          width: 8px;
        }
        .leaflet-control-legend-top-center {
          background: url(./img/tilemap-legtop-center.png) repeat scroll 0 0;
          cursor: pointer;
          height: 24px;
          .leaflet-control-legend-title {
            color: #FFFFFA;
            float: left;
            font-size: 12px;
            font-weight: bold;
            height: 24px;
            line-height: 24px;
          }
          .leaflet-control-legend-title-down {
            background: url(./img/tilemap-legicon-down.png) repeat scroll 0 0;
            cursor: pointer;
            height: 24px;
            width: 19px;
            float: right;
          }
          .leaflet-control-legend-title-up {
            background: url(./img/tilemap-legicon-up.png) repeat scroll 0 0;
            cursor: pointer;
            display: none;
            height: 24px;
            width: 19px;
            float: right;
          }
        }
        .leaflet-control-legend-top-right {
          background: url(./img/tilemap-legtop-right.png) repeat scroll 0 0;
          height: 24px;
          width: 12px;
        }
        .leaflet-control-legend-mid-left {
          background: url(./img/tilemap-legmid-left.png) repeat scroll 0 0;
          width: 8px;
        }
        .leaflet-control-legend-mid-center {
          background-color: #FFFFFF;
          display: table-cell;
          .typhoon-legend-main {
            overflow: hidden;
            padding-bottom: 5px;
            padding-left: 2px;
            padding-right: 2px;
            width: 210px;
            label{
              .typhoon-legend-input {
                float: left;
                margin: 5px 3px 5px 5px;
              }
              .typhoon-legend-name {
                border: 0 none;
                color: #000000;
                font: 12px Tahoma,Verdana,sans-serif;
                height: 15px;
                margin: 5px 3px 5px 1px;
                text-align: center;
              }
              .typhoon-legend-command {
                font: bold 12px Tahoma,Verdana,sans-serif;
                height: 15px;
                margin: 5px 9px 0 0;
                vertical-align: middle;
                width: 35px;
              }
            }
          }
        }
        .leaflet-control-legend-mid-right {
          background: url(./img/tilemap-legmid-right.png) repeat scroll 0 0;
          width: 12px;
        }
        .leaflet-control-legend-foot-left {
          background: url(./img/tilemap-legfoot-left.png) repeat scroll 0 0;
          height: 13px;
          width: 8px;
        }
        .leaflet-control-legend-foot-center {
          background: url(./img/tilemap-legfoot-center.png) repeat scroll 0 0;
          height: 13px;
        }
        .leaflet-control-legend-foot-right {
          background: url(./img/tilemap-legfoot-right.png) repeat scroll 0 0;
          height: 13px;
          width: 12px;
        }
      }
    }
    .leaflet-control{
      width: 235px;
    }
    .leaflet-control{
      width: 72px;
    }
  }
  .leaflet-right {
    right: 35px;
  }
  .clear{
    clear: both;
    font-size: 0px;
    line-height: 0px;
    height: 0px;
  }
}
</style>
