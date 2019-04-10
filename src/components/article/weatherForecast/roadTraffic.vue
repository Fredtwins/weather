<template>
  <div class="forecast-traffic">
    <div class="top">
      <span class="title">最新道路交通预报</span>
      <span class="time">发布时间：{{time}}</span>
    </div>
    <div class="content">
      <div class="left">
        <img :src="leftImg" />
      </div>
      <div class="right">
        <img :src="rightImg" />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      time: '2019年01月11日15时',
      leftImg: require('../img/jtmap.jpg'),
      rightImg: require('../img/road201901111518.png')
    }
  }
}
</script>
<style lang="scss" scoped>
.forecast-traffic {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  .top {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background-color: #f2faff;
    text-align: left;
    font-weight: 700;
    .title {
      margin-right: 20px;
      font-size: 20px;
    }
    .time {
      font-size: 13px;
    }
  }
  .content {
    .left {
      float: left;

      padding: 20px;
    }
    .right{
      width: 560px;
      float: right;
    }
    img {
      display: block;
    }
  }
}
</style>
