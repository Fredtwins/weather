<template>
  <!--首页 右侧 轮播图-->
  <div class="home-tabimg">
    <div class="top-tabimg">
      <div class="topimg">
        <ul>
          <li
            v-for="(item, index) in tabimgArr"
            :class="[flagimg===item.id?'on':'']"
            :key="item.id"
            @click="jump(item.id)"
          >
            <img :src="item.imgurl" alt="">
          </li>
        </ul>
      </div>
      <div class="bottomimg">
        <ul>
          <li :class="[flag===1?'tabon':'']">实景</li>
          <li :class="[flag===2?'tabon':'']">雷达</li>
          <li :class="[flag===3?'tabon':'']">云图</li>
          <li :class="[flag===4?'tabon':'']">台风</li>
          <li :class="[flag===5?'tabon':'']">预警</li>
          <li :class="[flag===6?'tabon':'']">地质</li>
        </ul>
      </div>
    </div>
    <!--<div class="footer-tabspan">-->
      <!--<ul>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">空气指数</a></div>-->
          <!--<div class="nav_5" style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_kqwr.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">洗车指数</a></div>-->
          <!--<div class="nav_5" style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_zwcy.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">紫外线指数</a></div>-->
          <!--<div class="nav_5 " style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_zwx.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">晨练指数</a></div>-->
          <!--<div class="nav_5" style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_clzs.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">雨具指数</a></div>-->
          <!--<div class="nav_5 nav_9" style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_yuju.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">穿衣指数</a></div>-->
          <!--<div class="nav_5 nav_9" style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_clzs.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">郊游指数</a></div>-->
          <!--<div class="nav_5 nav_9" style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_jyzs.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li>-->
          <!--<div class="nav_4"><a href="huanjing.aspx">人体舒适度</a></div>-->
          <!--<div class="nav_5 nav_9" style="display: none;">-->
            <!--<a href="huanjing.aspx"><img src="./img/home_ssd.jpg"></a>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabimgArr: [
        {
          imgurl: require('./img/fengjing.png'),
          id: 1
        }, {
          imgurl: require('./img/fengjing2.png'),
          id: 2
        }, {
          imgurl: require('./img/fengjing3.png'),
          id: 3
        }, {
          imgurl: require('./img/fengjing4.png'),
          id: 4
        }, {
          imgurl: require('./img/fengjing2.png'),
          id: 5
        }, {
          imgurl: require('./img/fengjing4.png'),
          id: 6
        }
      ],
      flagimg: 1,
      flag: 1
    }
  },
  methods: {
    // 循环切换
    _GetListtabimg () {
      setInterval(() => {
        this.flag++
        if (this.flag > 6) {
          this.flag = 1
        }
        this.flagimg = this.flag
      }, 2000)
    },
    // 跳转
    jump (index) {
      let data = ['天气实景', 'sRadar', 'cloud', '台风路径图', 'FoShan', 'geologicHazard']
      this.$router.push({name: data[index]})
    }
  },
  mounted () {
    this._GetListtabimg()
  }
}
</script>

<style lang="scss" scoped>
.home-tabimg {
  width: 352px;
  > .top-tabimg {
    margin-top: 10px;
    width: 100%;
    float: left;
    overflow: hidden;
    > .topimg {
      width: 100%;
      cursor: pointer;
      > ul {
        width: 100%;
        > li {
          display: none;
        }
        > .on {
          width: 100%;
          height: 211px;
          display: list-item;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    > .bottomimg {
      width: 100%;
      height: 34px;
      float: left;
      background-color: #ededed;
      > ul {
        width: 100%;
        height: 34px;
        display: flex;
        font-size: 14px;
        > li {
          width: 16.66%;
          height: 100%;
          color: #666666;
          line-height: 34px;
          text-align: center;
          border: 1px solid #eee;
        }
        > .tabon {
          background-color: #0055c2;
          color: #fff;
        }
      }
    }
  }
  > .footer-tabspan {

  }
}
</style>
