<template>
  <div class="warning-disaster">
    <img :src="img" />
    <div class="desc-box">
      <div class="title">当前地址灾害说明</div>
      <div class="content">{{content}}</div>
    </div>
  </div>
</template>
<script>
// 地质灾害预警
export default {
  data() {
    return {
      img: '/dzzh/zhWeb20190127.jpg',
      content: '2019年1月27日预警信息：预计未来24小时(1月27日20时-1月28日20时)，无地质灾害预报预警。'
    }
  }
}
</script>
<style lang="scss" scoped>
.warning-disaster {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  img{
    margin-bottom: 26px;
  }
  .desc-box {
    width: 100%;
    padding: 1px;
    border: 1px #1164c7 solid;
    box-sizing: border-box;
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: left;
      text-indent: 20px;
      color: #fff;
      background: #025ac4;
    }
    .content {
      line-height: 20px;
      padding: 20px;
      box-sizing: border-box;
      font-family: "宋体";
    }
  }
}
</style>
