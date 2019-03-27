<template>
  <div class="empty">
    <div class="bigradar">
      <!-- 头部标签 -->
      <div class="top-tab">
        <ul>
          <!-- <li v-for="(item, index) in toptabArray" :key="item.index">{{item.name}}</li> -->
          <li :class="[flag == 0?'active':'']" @click="activeshow(0)">佛山镇街雷达图</li>
          <li :class="[flag == 1?'active':'']" @click="activeshow(1)">广州雷达</li>
          <li :class="[flag == 2?'active':'']" @click="activeshow(2)">肇庆雷达</li>
          <li :class="[flag == 3?'active':'']" @click="activeshow(3)">全国雷达图</li>
        </ul>
      </div>
      <!-- 雷达图内容 -->
      <div class="conteng-radar">
        <foshan-radar v-if="flag == 0"/>
        <gz-radar v-if="flag == 1" />
      </div>
    </div>
  </div>
</template>

<script>
import FoshanRadar from './radar/foshanradar'
import GzRadar from './radar/gzradar'

export default {
  components: {
    FoshanRadar,
    GzRadar
  },
  data () {
    return {
      flag: 0,
      toptabArray: [
        {
          name: '佛山镇街雷达图'
        }, {
          name: '广州雷达'
        }, {
          name: '肇庆雷达'
        }, {
          name: '全国雷达图'
        }
      ]
    }
  },
  methods: {
    activeshow (flag) {
      this.flag = flag
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  height: 700px;
  > .bigradar {
    width: 100%;
    height: 100%;
    // background-color: red;
    > .top-tab {
      > ul {
        display: flex;
        padding-top: 8px;
        padding-left: 8px;
        > li {
          width: 19.91%;
          background-color: #eee;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border-right: 1px solid #123A7B;
          font-size: 13px;
          cursor: pointer;
        }
        .active {
          background-color: #123A7B;
          color: #fff;
        }
        li:hover {
          background-color: #123A7B;
          color: #fff;
        }
      }
    }
    > .conteng-radar {
      width: 100%;
      height: 550px;
      padding-top: 5px;
    }
  }
}
</style>
