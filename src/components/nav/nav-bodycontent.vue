<template>
  <div class="nav-bodycontent">
    <!-- 大的盒子包含着 -->
    <div class="big-navbody">
      <!-- 中间内容 -->
      <div class="nav-body">
        <!-- ul列表 -->
        <ul>
          <li class="real_time oneli">
            <dl style="cursor:pointer">
              <router-link to="/weatherForecast/local">
                <div class="text">
                  <div class="text-content2">
                    <div class="text-left">
                      <span class="onetitle">季华五路 27.5°C</span>
                      <br>
                      <span class="onespan">较昨日：下降4.7℃</span>
                      <br>
                      <span class="onespan">风向：西北    风速：5.1 m/s </span>
                      <br>
                      <span class="onespan">能见度：8.8公里</span>
                    </div>
                    <div class="text-right">
                      <img src="./img/cloudy.png" alt="">
                    </div>
                  </div>
                </div>
                <div class="txt-3">短时预报</div>
              </router-link>
            </dl>
          </li>
          <li class="real_time orgintwo">
            <!-- <dl>
              <router-link to="/">
                <div class="ealywanring">
                  <div class="imgwaning">
                    <img src="./img/W0.gif" alt="">
                  </div>
                  <span class="titlerightwanring">佛山市现时无天气预警信号发布</span>
                  <br>
                  <span>天气预警</span>
                </div>
              </router-link>
            </dl> -->
            <router-link to="/">
              <nav-yujing />
            </router-link>

          </li>
          <li>
            <!-- <div class="flip-front"></div> -->
            <dl style="cursor:pointer">
              <router-link to="/polularScience/polularScience/page/1">
                <p>
                  <img src="./img/home_09.png" alt="">
                </p>
                <span>政务公开</span>
              </router-link>
            </dl>
          </li>
          <li class="twoli">
            <dl style="cursor:pointer">
              <router-link to="/emergencyWarning/FoShan">
                <p>
                  <img src="./img/home_06.png" alt="">
                </p>
                <span>互动交流</span>
              </router-link>
            </dl>
          </li>
          <li>
            <dl style="cursor:pointer">
              <router-link to="/weatherForecast/environment">
                <p>
                  <img src="./img/home_31.png" alt="">
                </p>
                <span>气象指数</span>
              </router-link>
            </dl>
          </li>
          <li class="threeli">
            <dl style="cursor:pointer">
              <router-link to="/weatherMonitor/cloud">
                <p>
                  <img src="./img/home_28.png" alt="">
                </p>
                <span>台风路径</span>
              </router-link>
            </dl>
          </li>
          <li class="fourli">
            <dl style="cursor:pointer">
              <router-link to="/weatherForecast/video">
                <p>
                  <img src="./img/icon_2.png" alt="">
                </p>
                <span>气象视听</span>
              </router-link>
            </dl>
          </li>
          <li class="fiveli">
            <dl style="cursor:pointer">
              <router-link to="/weatherMonitor/sRadar">
                <p>
                  <img src="./img/home_25.png" alt="">
                </p>
                <span>雷达卫星</span>
              </router-link>
            </dl>
          </li>
          <li class="sixli">
            <dl style="cursor:pointer">
              <router-link to="/polularScience/polularScience/page/1">
                <p>
                  <img src="./img/home_37.png" alt="">
                </p>
                <span>在线办事</span>
              </router-link>
            </dl>
          </li>
          <li>
            <dl style="cursor:pointer">
              <router-link to="/tornadoResearch/scienceInformation/page/1">
                <p>
                  <img src="./img/home_34.png" alt="">
                </p>
                <span>动态新闻</span>
              </router-link>
            </dl>
          </li>
          <li class="sevenli">
            <dl style="cursor:pointer">
              <router-link to="/climateServices/ecology">
                <p>
                  <img src="./img/home_50.png" alt="">
                </p>
                <span>气候服务</span>
              </router-link>
            </dl>
          </li>
          <li class="niteli">
            <dl style="cursor:pointer">
              <router-link to="/emergencyWarning/signalMeaning/typhoon">
                <p>
                  <img src="./img/home_53.png" alt="">
                </p>
                <span>应急知识</span>
              </router-link>
            </dl>
          </li>
          <li class="real_time site">
            <dl style="cursor:pointer">
              <router-link to="/weatherMonitor/aws">
                <div class="text">
                  <div class="text-content">
                    <span class="onespan">禅城 23－26°C </span>
                    <br>
                    <span class="onespan">阴天间多云</span>
                    <br>
                    <span class="onespan">相对湿度 65%~80%,东南风2级</span>
                  </div>
                </div>
                <div class="txt-3">短时预报</div>
              </router-link>
            </dl>
          </li>
          <li class="real_time lastli">
            <dl>
              <router-link to="/">
                <p>
                  <img src="./img/pic.jpg" alt="">
                </p>
                <span>
                  <img src="./img/i1.png" alt="">
                  &nbsp;&nbsp;&nbsp; 佛山景点天气
                </span>
              </router-link>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavYujing from './nav-yujing'

export default {
  components: {
    NavYujing
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bodycontent {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  > .big-navbody {
    width: 1167px;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 14px;
    clear: both;
    // background: green;
    > .nav-body {
      width: 1002px;
      height: auto;
      padding-top: 5px;
      margin: 0 auto;
      // background: red;
      > ul {
        > li {
          display: inline-block;
          width: 154px;
          margin-right: 9px;
          margin-bottom: 11px;
          color: #fff;
          overflow: hidden;
          height: 150px;
          background: #41b0ff;
          position: relative;
          text-align: center;
          > dl {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 999;
            p {
               padding-top: 20px;
               height: 100px;
            }
            span {
              color: #fff;
              // font-size: 16px;
              font-size: 22px;
            }
            .text {
              height: 104px;
              display: block;
              overflow: hidden;
              .text-content {
                padding-left: 13px;
                font-size: 14px;
                line-height: 25px;
                width: 308px;
                padding-top: 13px;
                text-align: left;
                .onespan {
                  font-size: 14px;
                }
              }
              .text-content2 {
                width: 308px;
                height: 110px;
                display: block;
                .text-left {
                  width: 63%;
                  display: block;
                  height: 100%;
                  padding-left: 13px;
                  font-size: 14px;
                  line-height: 25px;
                  text-align: left;
                  padding-top: 5px;
                  .onetitle {
                    font-size: 20px;
                  }
                  .onespan {
                    font-size: 14px;
                  }
                }
                .text-right {
                  width: 80px;
                  height: 63px;
                  display: inline-block;
                  margin-top: 9px;
                  position: absolute;
                  top: 0px;
                  right: 14px;
                  > img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
            .txt-3 {
              font-size: 24px;
              display: block;
              padding-left: 10px;
              text-align: left;
              position: relative;
              color: #fff;
            }
          }
        }
        li:hover {
          transform: translate(0, -10px);
          box-shadow: 0px 5px 15px #e5e5e5;
          -webkit-transform: translate(0, -10px);
          -moz-transform: translate(0, -10px);
          -o-transform: translate(0, -10px);
          -ms-transform: translate(0, -10px);
          -webkit-box-shadow: 0px 5px 15px #e5e5e5;
          -moz-box-shadow: 0px 5px 15px #e5e5e5;
        }
        .oneli {
          background: rgb(46, 141, 255);
        }
        .twoli {
          background: rgb(239, 40, 83);
        }
        .threeli {
          background: #9800a0;
        }
        .fourli {
          background: #de4501;
        }
        .fiveli {
          background: #8cd900;
        }
        .sixli {
          background: #2e8dff;
        }
        .sevenli {
          background: green;
        }
        .niteli {
          background-color: #bd1e4a;
        }
        .site {
          background: #0c3479;
        }
        .orgintwo {
          background: #ed4d07;
          text-align: left;
          .ealywanring {
            width: 100%;
            height: 100%;
            .imgwaning {
              display: inline-block;
              padding-top: 10px;
              > img {
                width: 100%;
                height: 100%;
              }
            }
            .titlerightwanring {
              font-size: 16px;
            }
            > span {
              font-size: 22px;
            }
          }
        }
        .lastli {
          background: rgb(34, 126, 236);
          > dl {
            p {
              padding-top: 0px;
              height: 114px;
              display: block;
              > img {

              }
            }
            span {
              display: block;
              text-align: left;
              padding-left: 8px;
              padding-top: 6px;
              font-size: 12px;
            }
          }
        }
        .real_time {
          width: 321px;
        }
      }
    }
  }
}
</style>
