<template>
  <div class="empty">
    <div class="bigcloud">
      <!-- 头部下拉暂停菜单 -->
      <div class="cloudinput">
        <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
        </Select>
        <div class="leftbutton"><button>左边</button></div>
        <div class="contentbutton" @click="stop"><button>{{titlestop}}</button></div>
        <div class="rightbutton"><button>右边</button></div>
      </div>

      <!-- 轮播图 -->
      <div class="mycloud">
        <div class="header-slider">
          <div class="imgdatetime" v-model="value">{{imgdatetime}}</div>
          <div class="container" ref='mypp'>
            <div class="swiper-container" >
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in imgArray" :key="item.index" v-model="value2">
                  <img :src="item.imgurl" alt="">
                </div>
              </div>
              <!-- <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 底部说明文字 -->
      <div class="footercolud">
        <!-- <img src="./img/title.png" alt=""> -->
        <span>说明:</span>
        <br>
        <p>云图图像上显示的时间是世界时,标题时间为北京时。</p>
        <p>动画序列是由过去12幅卫星云图组成，每隔半小时或一小时一幅。图像动画能让观看者更清楚地了解云团的移动变化。</p>
        <p>风云-2C位于东经105度的赤道上空，距离地面约35,800公里。这颗卫星紧随地球的自转而运行，相对于地面是静止不动的(故又名地球同步卫星)，因此可以24小</p>
        <p>时不断拍摄地球上同一地区的云图。</p>
        <p>红外云图基本上显示观测物(如云)的温度。一般来说，云顶愈高，温度愈低，它在图像中便显得越明亮。</p>
        <p>以上图像已经处理过，以符合视觉效果。</p>
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
      mySwiper: '',
      model1: '',
      titlestop: '暂停',
      imgArray: [
        {
          value: 'New York1',
          imgurl: require('./img/nianhui1.png')
        }, {
          value: 'New York2',
          imgurl: require('./img/nianhui2.png')
        }, {
          value: 'New York3',
          imgurl: require('./img/nianhui3.png')
        }, {
          value: 'New York4',
          imgurl: require('./img/nianhui4.png')
        }, {
          value: 'New York5',
          imgurl: require('./img/nianhui5.png')
        }, {
          value: 'New York6',
          imgurl: require('./img/nianhui1.png')
        }
      ],
      value2: 0,
      value: '',
      imgdatetime: '',
      cityList: [
        {
          value: 'New York1',
          label: 'New York'
        },
        {
          value: 'New York2',
          label: 'London'
        },
        {
          value: 'New York3',
          label: 'Sydney'
        },
        {
          value: 'New York4',
          label: 'Ottawa'
        },
        {
          value: 'New York5',
          label: 'Paris'
        },
        {
          value: 'New York6',
          label: 'Canberra'
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
          el: '.swiper-pagination'
        },
        autoplay: {
          // 可选选项，自动滑动
          delay: 1500,
          // stopOnLastSlide: false,  //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        autoplayDisableOnInteraction: false,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar"
        }
      })
    },
    stop () {
      if (this.titlestop === '暂停') {
        this.mySwiper.autoplay.stop()
        this.titlestop = '开始'
      } else if (this.titlestop === '开始') {
        this.mySwiper.autoplay.start()
        this.titlestop = '暂停'
      }
    },
    start () {

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
.empty {
  width: 100%;
  height: 800px;
  > .bigcloud {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: 8px;
    > .cloudinput {
      width: 100%;
      height: 40px;
      margin-bottom: 15px;
      // background-color: red;
      > .leftbutton {
        display: inline-block;
      }
      > .contentbutton {
        display: inline-block;
      }
      > .rightbutton {
        display: inline-block;
      }
    }
    > .mycloud {
      width: 100%;
      height: 542px;
      background-color: orange;
    }
    > .footercolud {
      width: 100%;
      height: 150px;
      margin-top: 10px;
      font-size: 14px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.swiper-container {
  width: 100%;
  height: 542px;
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
  height: 542px;
}
</style>
