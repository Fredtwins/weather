<template>
  <div class="lightning-online">
    <div class="list clearfloat">
      <div  v-for="(item,index) in list" :key="index" class="list-box">
          <router-link class="inside" v-if="item.type == 'content'" :to="item.path">
            <img :src="item.img" />
            <span>{{item.title}}</span>
          </router-link>
          <a class="inside" v-else-if="item.type=='link'" :href="item.path" target="blank">
              <img :src="item.img" />
              <span>{{item.title}}</span>
          </a>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      type:'list',
      list: [{
        type: 'link',
        img: require('../img/gdzwfww.jpg'),
        path:'http://www.gdzwfw.gov.cn/portal/branch-hall?orgCode=456073670',
        title: '政务服务网'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.lightning-online {
  width: 100%;
  padding: 26px 0;
  box-sizing: border-box;
  .list-box{
    width: 266px;
    margin:0 0 20px 46px;
    float: left;
    .inside{
      width: 100%;
      display: block;
      span,img{
        width: 100%;
        display: block
      }
      img{
        height: 104px;
        margin-bottom: 10px;
      }
      span{
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        font-family: "宋体";
        text-align: center;
      }
    }
  }
}
</style>
