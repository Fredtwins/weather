<template>
  <div class="foshanradar">
    <div class="contentfoshan clear">
      <div class="left-foshan pull-left">
        <div class="lefttop-foshan">
          <p>帧间隔:</p>
          <Select
            v-model="model2"
            size="small"
            style="width:100px"
            @on-change="autopalychange">
              <Option v-for="item in cityList" :value="item.value" :key="item.index">{{ item.value }}</Option>
          </Select>
          <span>6小时内雷达图：</span>
          <div class="selectlist">
            <Select v-model="model2" size="small" style="width:200px">
              <Option v-for="item in cityListdatime" :value="item.value" :key="item.index">{{ item.value }}</Option>
            </Select>
          </div>
        </div>
        <div class="leftfooter-foshan">
          <span>雷达图说明:</span>
          <br>
          <p>
该雷达图为基本反射率图，底图以不同底色区分佛山市五区，精细到各镇街。当佛山及周边地区有降雨时，图上就会显示有颜色的雷达回波，图像右上方的色板标示反射率的强度。反射率强度值（dBz）越大表示降雨强度越强，当它的值大于或等于40dBz时，出现雷雨天气的可能性较大；当它的值在50dBz或以上时，出现暴雨、冰雹、大风等强对流天气的可能性较大。
          </p>
        </div>
      </div>
      <!-- 右边轮播图 -->
      <div class="right-foshan pull-right">
        <div class="mycloud">
        <div class="header-slider">
          <div class="container" ref='mypp'>
            <div class="swiper-container" >
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in imgArray" :key="item.index" v-model="value2">
                  <img :src="item.imgurl" alt="">
                </div>
              </div>
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div> -->
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  component: {
    Swiper
  },
  data () {
    return {
      model2: '',
      value2: '',
      mySwiper: '',
      cityList: [
        {
          value: '加速3秒'
        }, {
          value: '加速2秒'
        }, {
          value: '加速1秒'
        }, {
          value: '加速0.5秒'
        }
      ],
      cityListdatime: [
        {
          value: '2018.0.1'
        }, {
          value: '2018.0.2'
        }, {
          value: '2018.0.3'
        }, {
          value: '2018.0.4'
        }, {
          value: '2018.0.5'
        }, {
          value: '2018.0.6'
        }, {
          value: '2018.0.7'
        }, {
          value: '2018.0.8'
        }, {
          value: '2018.0.9'
        }, {
          value: '2018.0.10'
        }, {
          value: '2018.0.11'
        }, {
          value: '2018.0.12'
        }],
      imgArray: [
        {
          imgurl: require('../img/nianhui1.png'),
          value: '2018.0.1'
        }, {
          imgurl: require('../img/nianhui2.png'),
          value: '2018.0.2'
        }, {
          imgurl: require('../img/nianhui3.png'),
          value: '2018.0.3'
        }, {
          imgurl: require('../img/nianhui4.png'),
          value: '2018.0.4'
        }, {
          imgurl: require('../img/nianhui5.png'),
          value: '2018.0.5'
        }, {
          imgurl: require('../img/nianhui6.png'),
          value: '2018.0.6'
        }, {
          imgurl: require('../img/nianhui1.png'),
          value: '2018.0.7'
        }, {
          imgurl: require('../img/nianhui3.png'),
          value: '2018.0.8'
        }, {
          imgurl: require('../img/nianhui3.png'),
          value: '2018.0.9'
        }, {
          imgurl: require('../img/nianhui4.png'),
          value: '2018.0.10'
        }, {
          imgurl: require('../img/nianhui5.png'),
          value: '2018.0.11'
        }, {
          imgurl: require('../img/nianhui7.png'),
          value: '2018.0.12'
        }
      ]
    }
  },
  methods: {
    init () {
      this.mySwiper = new Swiper ('.swiper-container', {
        effect: "fade", // cube   fade   flip   slide(默认轮播效果-左右滑动)
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          },
          clickable: true
        },
        autoplay: {
          // 可选选项，自动滑动
          delay: 15000,
          // stopOnLastSlide: false,  //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        autoplayDisableOnInteraction: false,
        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar"
        }
      })
    },
    stop () {
      this.mySwiper.autoplay.stop()
    },
    start () {
      this.mySwiper.autoplay.start()
    },
    // 加速轮播图
    autopalychange (val) {
      console.log(val)
      if (val === '加速3秒') {
        // this.mySwiper.autoplay.delay = 3000
        this.mySwiper.params.autoplay.delay = 3000
        console.log(this.mySwiper, 22)
      } else if (val === '加速2秒') {
        this.mySwiper.params.autoplay.delay = 2000
      } else if (val === '加速1秒') {
        this.mySwiper.params.autoplay.delay = 1000
      } else if (val === '加速0.5秒') {
        this.mySwiper.params.autoplay.delay = 500
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>

<style lang="scss" scoped>
.foshanradar {
  width: 100%;
  height: 100%;
  > .contentfoshan {
    width: 100%;
    height: 100%;
    // background-color: orange;
    > .left-foshan {
      width: 30%;
      height: 100%;
      // background-color: green;
      > .lefttop-foshan {
        width: 80%;
        height: 110px;
        margin-top: 8px;
        margin-left: 30px;
        padding-top: 8px;
        background-color: #123a7b;
        text-align: center;
        > p {
          color: #fff;
          font-size: 12px;
          display: inline-block;
          margin-right: 2px;
        }
        > span {
          color: #fff;
          font-size: 12px;
          display: inline-block;
          padding-top: 12px;
          margin-right: 56px;
        }
        > .selectlist {
          padding-top: 4px;
        }
      }
      > .leftfooter-foshan {
        margin-top: 8px;
        margin-left: 30px;
        width: 80%;
        height: 336px;
        background-color: #123a7b;
        padding: 14px;
        color: #fff;
        > p {
          color: #fff;
          font-size: 14px;
        }
      }
    }
    > .right-foshan {
      width: 68%;
      height: 100%;
      background-color: red;
      display: inline-block;
      > .mycloud {
        width: 100%;
        height: 100%;
        // background-color: green;
      }
    }
  }
}

.swiper-container {
  width: 100%;
  height: 544px;
}
.swiper-container .swiper-wrapper {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.swiper-container .swiper-wrapper .swiper-slide {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.swiper-container .swiper-wrapper .swiper-slide > img {
  width: 100%;
  height: 544px;
}

.swiper-pagination {
  position: relative !important;
  left: -13px !important;
  width: 306px;
}
</style>
