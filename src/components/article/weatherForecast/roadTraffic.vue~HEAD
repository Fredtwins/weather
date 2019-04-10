<template>
  <div class="forecast-traffic">
    <div class="top">
      <span class="title">{{title}}</span>
      <span class="time">发布时间：{{time}}</span>
    </div>
    <div class="content" v-if="content!==''" v-html="content">
    </div>
  </div>
</template>
<script>
import { GetRoadTrafficForcast } from 'api/article'
import { ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'
import { changeTime } from 'common/js/util'

export default {
  data () {
    return {
      title: '最新道路交通预报',
      time: '2019年01月11日15时',
      content: ''
    }
  },
  mounted () {
    this._GetRoadTraffic()
  },
  methods: {
    _GetRoadTraffic () {
      GetRoadTrafficForcast().then(res => {
        if (res.code === ERR_OK && res.data) {
          this.name = res.data[0].title
          this.content = res.data[0].content
          let time = res.data[0].publishtime
          let date = Date.parse(new Date(time))
          this.time = changeTime(new Date(date))
        }
      }).catch(res => {
        errorNotice(res.msg)
      })
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
    .content{
      margin: 30px 20px;
    }
  }
}
</style>
