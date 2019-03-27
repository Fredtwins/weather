<template>
  <!--首页 底部 版权信息-->
  <div class="home-copyright">
    <div class="bot">
      <img src="./img/home_copyright.jpg" alt="">
    </div>
    <div class="botlink">
      <ul>
        <li><router-link :to="path[0]">天气预报</router-link></li>
        <li><router-link :to="path[1]">天检监测</router-link></li>
        <li><router-link :to="path[2]">应急预警</router-link></li>
        <li><router-link :to="path[3]">气候服务</router-link></li>
        <li><router-link :to="path[4]">天气互动</router-link></li>
      </ul>
    </div>
    <div class="logos clearfix">
      <div class="logo_1 left"></div>
    </div>
    <div class="copyright">
      <p>版权所有© 佛山市气象公共服务中心 <br>热线：12121(自动)、(0757)82812121(人工) 传真：(0757)83380266</p>
      <p>{{copyright.statement}}</p>
      <p>建议使用1280×1024分辨率</p>
      <a href="https://new.cnzz.com/v1/login.php?siteid=1000523696"><img src="http://icon.cnzz.com/img/pic.gif" /></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['copyright'],
  data () {
    return {
      path: [
        '/weatherForcast/fine',
        '/weatherMonitor/aws',
        '/emergencyWarning/FoShan',
        '/climateServices/ecology',
        '/sunGovernmentAffairs/communion/suggestion/1'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-copyright {
  width: 1020px;
  margin: 0 auto;
  > .bot{
    float: left;
    margin: 30px 0 10px 30px;
  }
  > .botlink{
    float: left;
    width: 500px;
    padding-top: 10px;
    > ul{
      float: left;
      margin-top: 10px;
      margin-left: 30px;
      list-style-type: none;
      > li{
        float: left;
        width: 80px;
        text-align: left;
        list-style-type: none;
        > a{
          color: #494949;
          text-decoration: none;
        }
      }
    }
  }
  > .logos{
    float: right;
    padding-left: 20px;
    padding-top: 20px;
    > .left{
      float: left;
    }
  }
  > .copyright{
    width: 480px;
    float: left;
    line-height: 20px;
    margin-left: 30px;
    > p{
      color: #727272;
    }
  }
}
</style>
