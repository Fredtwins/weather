<template>
  <div class="empty">
    <article-content-nav
      :list="list"
      :current="current"
    />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// 本地预报
import articleContentNav from "../article-contentnav"

export default {
  components: {
    articleContentNav
  },
  data () {
    return {
      current: '',
      list: [{
        path: 'awshou',
        title: '自动站',
        name: 'awshou',
        icon: require('../img/content-nav/L3_1.png'),
        iconCurrent: require('../img/content-nav/L3_1_2.png')
      }, {
        path: 'province',
        title: '能见度',
        name: 'province',
        icon: require('../img/content-nav/L3_1.png'),
        iconCurrent: require('../img/content-nav/L3_1_2.png')
      }, {
        path: 'meaning',
        title: '天气实景',
        name: 'province',
        icon: require('../img/content-nav/L3_3.png'),
        iconCurrent: require('../img/content-nav/L3_3_2.png')
      }, {
        path: 'radar',
        title: 'S波段雷达图',
        name: 'radar',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'xradar',
        title: 'X波段雷达图',
        name: 'xradar',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'cloud',
        title: '卫星云图',
        name: 'cloud',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'disaster',
        title: '台风路径图',
        name: 'province',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'disaster',
        title: '地球此时',
        name: 'province',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'disaster',
        title: 'T-Inp',
        name: 'disaster',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }]
    }
  },
  mounted () {
    if (this.$router.history.current.name === "monitor") {
      this.$router.replace('/article/monitor/awshou')
      return
    } else {
      this.current = this.$router.history.current.matched[2].name
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === "monitor") {
      this.$router.replace('/article/monitor/awshou')
    } else {
      this.current = to.matched[2].name
      next()
    }
  }
}
</script>
<style lang="scss" scoped>
  .empty{
    width: 100%;
    // height: 630px;
    // line-height: 630px;
    // font-size: 24px;
    // font-weight: 700;
    // text-align: center;
    .content {
      width: 992px;
      float: left;
      box-sizing: border-box;
      border: 5px solid #c2c8cc;
      background-color: #ffffff;
    }
  }
</style>
