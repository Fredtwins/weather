<template>
  <div class="article-footer-body">
    <div class="inside">
      <div class="copyright-area">
        <span>{{copyright}}</span>
        <span>建议使用1280×1024分辨率</span>
      </div>
      <div class="focus-area">
        <span>关注佛山气象局</span>
        <a href="https://weibo.com/fssqxj">
          <img src="./img/sina.png" />
        </a>
        <a href="">
          <img src="./img/wx.png" />
        </a>
        <a href="https://new.cnzz.com/v1/login.php?siteid=1000523696">
          <img src="http://icon.cnzz.com/img/pic.gif" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    copyright(){
      return this.$store.state.initData.website.statement
    }
  }
};
</script>

<style lang="scss" scoped>
.article-footer-body {
  width: 100%;
  height: 86px;
  background-color: #2061aa;
  .inside {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    > div {
      height: 100%;
      float: left;
    }
    .copyright-area {
      width: 975px;
      padding: 29px 0;
      box-sizing: border-box; 
      span {
        width: 100%;
        height: 14px;
        line-height: 14px;
        display: block;
        font-size: 12px;
        color: #ffffff;
        font-family: "宋体";
      }
    }
    .focus-area {
      width: 225px;
      height: 86px;
      line-height: 86px;
      text-align: right;
      span {
        height: 14px;
        line-height: 14px;
        vertical-align: middle;
        font-size: 12px;
        color: #ffffff;
      }
      a {
        margin-left: 10px;
        display: inline-block;
        vertical-align: middle;
        img {
          display: block;
        }
      }
    }
  }
}
</style>

