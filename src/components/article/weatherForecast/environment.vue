<template>
  <div class="forecast-environment">
    <div class="top">
      <h3 class="title">环境气象</h3>
      <span class="time">{{time}}</span>
    </div>
    <div class="environment-data">
      <div
        v-for="(item,index) in environmentData"
        :key="item.type"
        :class="['data-box',{'hover':hoverIndex == index}]"
      >
        <div class="top">
          <img
            :src="item.icon"
            @mouseenter="enter(index)"
            @mouseleave="leave(index)"
          />
          <div>
            <span class="title">{{item.typeChinese}}</span>
            <span class="level">{{item.grade}}</span>
          </div>
        </div>
        <div class="desc">{{item.meaning}}</div>
        <div class="meaning-list">
          <span class="title">{{item.typeChinese}}说明：</span>
          <span
            class="meaning-box"
            v-for="(item,index) in item.title"
            :key="'meaning-' +index"
          >{{item.grade}}: {{item.meaning}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 环境气象
import axios from 'axios'
export default {
  data() {
    return {
      hoverIndex: -1,
      time: '',
      environmentData: [],
      iconList: {
        '空气污染气象条件': '/huanjing/image/poll.jpg',
        '洗车指数': '/huanjing/image/carwash.jpg',
        '火灾危险度': '/huanjing/image/cfd.jpg',
        '紫外线强度': '/huanjing/image/uv.jpg',
        '晨练指数': '/huanjing/image/moe.jpg',
        '雨具指数': '/huanjing/image/umb.jpg',
        '穿衣指数': '/huanjing/image/ddre.jpg',
        '效游指数': '/huanjing/image/outing.jpg',
        '人体舒适度': '/huanjing/image/comp.jpg'
      }
    }
  },
  methods: {
    enter(index) {
      this.hoverIndex = index
    },
    leave(index) {
      this.hoverIndex = -1
    }
  },

  mounted() {
    axios.get('http://10.0.1.184:8080/mpsp/web/environmentWeather/list').then(res => {
      if (res.status == 200 && res.data && res.data.data) {
        res.data.data.length > 9 && res.data.data.splice(3, 1) // 测试数据结构有问题, 如正常可删除改
        for (let item of res.data.data) {
          item.icon = this.iconList[item.typeChinese]
        }

        this.environmentData = res.data.data
        this.time = this.environmentData[0].formatTime
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.forecast-environment {
  width: 100%;
  padding: 16px 8px;
  box-sizing: border-box;
  .top {
    width: 100%;
    height: 50px;
    margin-bottom: 8px;
    background-color: #f2faff;
    .title {
      height: 50px;
      line-height: 50px;
      padding: 0 25px;
      display: inline-block;
      font-size: 25px;
      font-weight: normal;
      text-align: center;
    }
    .time {
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      display: inline-block;
    }
  }
  .environment-data {
    width: 100%;
    .data-box {
      width: 322px;
      height: 130px;
      padding: 28px 25px 0;
      margin-bottom: 15px;
      position: relative;
      float: left;
      box-sizing: border-box;
      background-color: #f2faff;
      .top {
        height: 46px;
        margin-bottom: 12px;
        img {
          width: 50px;
          height: 46px;
          margin-right: 15px;
          float: left;
          background-color: #21aefe;
          cursor: pointer;
        }
        div {
          width: 207px;
          height: 46px;
          float: left;
          font-family: "宋体";
          span {
            padding: 0;
            display: block;
            text-align: left;
          }
          .title {
            height: 24px;
            line-height: 24px;
            font-size: 12px;
          }
          .level {
            height: 22px;
            line-height: 22px;
            font-size: 14px;
            font-weight: 700;
          }
        }
      }
      .desc {
        width: 100%;
        line-height: 14px;
        font-size: 12px;
        font-family: "宋体";
        word-break: break-all;
      }
      .meaning-list {
        width: 200px;
        box-sizing: border-box;
        position: absolute;
        display: none;
        top: 28px;
        right: 0;
        z-index: 99;
        background-color: #ffffff;
        border: 1px solid #1badff;
        font-family: "宋体";
        .title {
          width: 100%;
          height: 24px;
          line-height: 24px;
          padding: 0 4px;
          margin-bottom: 4px;
          display: block;
          background-color: #1badff;
          font-size: 12px;
          color: #ffffff;
        }
        .meaning-box {
          line-height: 14px;
          padding: 0 4px 10px;
          display: block;
          font-size: 12px;
        }
      }
    }
    .hover {
      .meaning-list {
        display: block;
      }
    }
  }
}
</style>

