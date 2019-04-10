<template>
  <div class="affairs-communication">
    <div v-if="$route.name != 'sunGovernmentAffairs_communion_research_content'" class="nav-area">
      <template v-for="(item,index) in navList">
        <router-link
          v-if="item.type=='content'"
          :key="'nav-'+item.name"
          :class="['nav-button',{'first':index==0},{'current':item.name == current}]"
          :to="'/sunGovernmentAffairs/communion/'+item.name"
        >{{item.title}}</router-link>
        <a
          class="nav-button"
          v-else-if="item.type=='link'"
          :key="'nav-'+item.name"
          :href="item.path"
          target="blank"
        >{{item.title}}</a>
      </template>
    </div>
    <router-view />
  </div>
</template>
<script>

export default {
  mounted() {
    this.setCurrent(this.$route)
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurrent(to)
    next()
  },
  methods: {
    setCurrent(route) {
      this.current = route.matched[2].name == 'sunGovernmentAffairs_communion_research' ? 'research' : 'suggestion'
    }
  },
  data() {
    return {
      current: 'suggestion',
      navList: [{
        type: 'content',
        name: 'research',
        title: '网上调查'
      }, {
        type: 'content',
        name: 'suggestion',
        title: '意见征集'
      }, {
        type: 'link',
        path: 'http://wz.foshan.gov.cn/wlfyr/zyszfsdw/sqxj/',
        title: '网络发言人平台'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.affairs-communication {
  width: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
  .nav-area {
    height: 33px;
    box-sizing: border-box;
    .nav-button {
      width: 128px;
      height: 33px;
      line-height: 33px;
      margin-left: 30px;
      float: left;
      font-size: 14px;
      font-family: "宋体";
      text-align: center;
      color: #ffffff;
      background-color: #025bc4;
    }
    .first {
      margin-left: 0;
    }
    .current {
      background-color: #ff6c00;
    }
  }
}
</style>
