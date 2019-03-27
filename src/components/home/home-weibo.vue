<template>
  <!--首页 右侧 微博互动-->
  <div class="home-weibo">
    <titleContent :titlearray="titleright" :weiboMidTitle="midTitle" :weiborigTitle="rigTitle"/>
    <div class="weibo">
      <div class="weibo-nav">
        <a class="weibo-link tooltip">微信<span class="tooltipImg"><img src="./img/home_weibo_qrcode.png"/></span></a>
        <a class="weibo-link tooltip">省局停课铃<span class="tooltipImg"><img src="./img/home_weibo_ling.png"/></span></a>
      </div>
      <iframe width="100%" height="796px" class="share_self" frameborder="0" scrolling="no" src="http://widget.weibo.com/weiboshow/index.php?language=&amp;width=0&amp;height=880&amp;fansRow=2&amp;ptype=1&amp;speed=100&amp;skin=9&amp;isTitle=1&amp;noborder=1&amp;isWeibo=1&amp;isFans=0&amp;uid=2097116807&amp;verifier=7c6fbf1f&amp;dpc=1">
      </iframe>
    </div>
  </div>
</template>

<script>
import titleContent from './titlecontent'

export default {
  components: {
    titleContent
  },
  data () {
    return {
      titleright: '微博互动',
      midTitle: '龙卷风报料',
      rigTitle: '缤纷微天气'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.home-weibo {
  width: 350px;
  color: #000;
  > .weibo{
    width: 352px;
    float: left;
    color: #000;
    height: 820px;
    overflow: hidden;
    > .weibo-nav{
      background-color: #cfe1f3;
      height: 28px;
      color: #5093d5;
      padding-left:31px;
      padding-top:5px;
      > .weibo-link{
        margin-right:0px;
        float:initial;
        color: #5093d5;
      }
      > .tooltip{
        > .tooltipImg{
          visibility: hidden;
          width: 120px;
          height: 120px;
          position: absolute;
          z-index: 1;
        }
        > .tooltipImg::after {
          content: "";
          position: absolute;
          margin-left: -5px;
        }
      }
      .tooltip:hover .tooltipImg {
        visibility: visible;
      }
    }
  }
}
</style>

