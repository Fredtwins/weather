<template>
  <!--天气预报--景区预报-->
  <div class="scenic-forcast">
    <div class="scenic-card" v-if="list.length>0" v-for="(item, index) in list" :key="index">
      <p class="card-top">{{item.name}}</p>
      <img class="card-left" :src="item.imageName" alt=""/>
      <ul class="card-right">
        <li>时间：<span>{{item.formatTime}}</span></li>
        <li>风向：<span>{{item.windChinese}}</span></li>
        <li>风速：<span>{{item.wf}}</span></li>
        <li>温度：<span>{{item.tRange}}</span></li>
        <li>雨量：<span>{{item.rain}}(mm)</span></li>
      </ul>
    </div>
    <span v-else>系统升级中</span>
  </div>
</template>
<script>
import { GetImgList } from 'api/home'
import { ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this._getImgList()
  },
  methods: {
    _getImgList () {
      GetImgList().then(res => {
        if (res.code === ERR_OK && res.data) {
          let data = res.data
          data.map(item => {
            item.imageName = 'http://10.0.1.184:80' + '/images/Scenic/' + item.imageName
          })
          this.list = data
        }
      }).catch(res => {
        errorNotice(res.msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .scenic-forcast{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 32px 0 20px 10px;
    > .scenic-card{
      width: 45%;
      margin-bottom: 30px;
      > .card-top{
        height: 30px;
        font-size: 20px;
        text-indent: 10px;
      }
      > .card-left{
        width: 300px;
        height: 166px;
        float: left;
        margin: 6px 15px 0 0;
      }
      > .card-right{
        float: left;
        line-height: 30px;
        font-size: 14px;
        padding-top: 5px;
      }
    }
  }
</style>
