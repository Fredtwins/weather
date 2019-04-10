<template>
  <div class="dqM">
    <div class="dqMenu">
      <dl>
        <dd class="left">
          <div class="Title">要素选择</div>
          <div class="content">
            <input id="tqysControl" checked="checked" type="checkbox" value="">显示
            <input name="tqys" type="radio" value="p">气压
            <input name="tqys" type="radio" value="temp" checked="checked">气温
            <input name="tqys" type="radio" value="rh">湿度
            <input name="tqys" type="radio" value="rain">6小时降水&nbsp;&nbsp;|

            <input name="tqys" checked="checked" type="checkbox" value="tx" class="tx_tx">天象
            <input name="tqys" type="checkbox" value="wd" class="tx">风&nbsp;&nbsp;|
            <input name="tqys" type="checkbox" value="sname" class="tx">站名
            <input type="button" class="markers"><a class="markersHot">快速定位</a>
          </div>
        </dd>
        <dd class="right">
          <ul class="sugis_TimeChoseArea">
            <li>
              <p>3月31日</p>
              <a href="#" rel="2019033102">2时</a>
              <a href="#" rel="2019033108">8时</a>
              <a href="#" rel="2019033114">14时</a>
              <a href="#" rel="2019033120">20时</a>
            </li>
            <li>
              <p>4月1日</p>
              <a href="#" rel="2019040102">2时</a>
              <a href="#" rel="2019040108" class="on">8时</a>
            </li>
          </ul>
        </dd>
      </dl>
      <dl class="dingwei">
        <dd>
          <!-- <div class="Title">快速定位</div> -->
        </dd>
      </dl>
    </div>
    <div class="clear"></div>
    <!-- <div class="dqCon" id="map_dqck"></div> -->
    <div id="map" class="map"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        layers: {
          markers: []
        },
        mapData: [],
      }
    },
    methods: {
      // 初始化地图
      initMap () {
        this.layers.Map = new T.Map('map')
        this.layers.Map.centerAndZoom(new T.LngLat(113.12, 23.029657), 8)
        const mapType = new T.Control.MapType()
        // 添加控件
        this.layers.Map.addControl(mapType)
      }
    },
    mounted () {
      this.initMap()
    },
  }
</script>
<style lang="scss" scoped>
.dqM {
  width: 896px;
  margin: 0 auto;
  padding-bottom: 15px;
  padding-top: 13px;
  .dqMenu{
    dl{
      .left{
        width: 586px;
        height: auto;
        padding: 1px;
        border: 1px #183f7e solid;
        margin-bottom: 9px;
        float: left;
        .Title {
          height: 28px;
          line-height: 28px;
          background: #0656b4;
          font-size: 14px;
          text-indent: 17px;
          color: white;
        }
        .content {
          height: 30px;
          padding-top: 10px;
          color: #000;
        }
      }
      .right {
        width: 243px;
        float: right;
        padding: 1px;
        border: 1px #183f7e solid;
        margin-top: 8px;
        ul{
          li {
            float: left;
            width: 119px;
            position: relative;
            background: #0656b4;
            text-align: center;
            color: #FFF;
            height: 50px;
            line-height: 28px;
            font-size: 14px;
            p {
              border-bottom: 1px solid #fff;
              height: 25px;
            }
            a {
              padding: 0 2px;
              text-decoration: none;
              color: #fff;
            }
          }
          li:nth-child(even) {
            border-left: 2px solid #fff;
          }
        }
      }
    }
    .dingwei{
      color: black;
      top: 108px;
      left: 42px;
      position: absolute;
      z-index: 10;
      background-color: white;
    }
  }
  .clear {
    clear: both;
    font-size: 0px;
    line-height: 0px;
    height: 0px;
  }
  .dqCon {
    width: 896px;
    height: 587px;
    border: 1px #183f7e solid;
    margin: 0 auto 0;
    overflow: hidden;
    position: relative;
    z-index: 0;
    background-color: rgb(243, 241, 236);
    color: rgb(0, 0, 0);
    text-align: left;
  }
  > .map {
    // width: 100%;
    // height: calc(100% - 47px);
    // margin-top: 10px;
    width: 896px;
    height: 587px;
    border: 1px #183f7e solid;
    margin: 0 auto 0;
    overflow: hidden;
    position: relative;
    z-index: 0;
    background-color: rgb(243, 241, 236);
    color: rgb(0, 0, 0);
    text-align: left;
  }
}
</style>
