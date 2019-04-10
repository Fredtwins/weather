<template>
  <div class="affairs-public">
    <div
      class="nav-area"
      v-if="type == 'list'"
    >
      <router-link
        v-for="(item,index) in navList"
        :class="['nav-button',{'first':index==0},{'current':item.name == current}]"
        :key="'nav-'+item.name"
        :to="'/sunGovernmentAffairs/open/'+item.name"
      >{{item.title}}</router-link>
    </div>
    <router-view
      :path='path'
      :content-name="contentName"
      :list-type="current=='news'?'public_carousel':'public'"
    />
  </div>
</template>
<script>

export default {
  mounted() {
    let current = this.$route.params.current
    this.current = current
    this.path = '/sunGovernmentAffairs/open/' + current
    this.contentName = this.classMap[current]
  },
  updated() {
    this.type = this.$route.name == 'sunGovernmentAffairs_open_content' ? 'content' : 'list'
  },
  beforeRouteUpdate(to, from, next) {
    let current = to.params.current
    this.current = current
    this.path = '/sunGovernmentAffairs/open/' + current
    this.contentName = this.classMap[current]
    next()
  },
  data() {
    return {
      classMap: {
        responsibility: '政务公开_机构职能',
        news: '政务公开_工作动态',
        laws: '政务公开_政策法规',
        plan: '政务公开_规划计划',
        personnel: '政务公开_人事信息',
        funds: '政务公开_资金信息'
      },
      path: '',
      contentName: '',
      current: '',
      type: 'list',
      navList: [
        {
          title: '机构职能',
          name: 'responsibility'
        }, {
          title: '工作动态',
          name: 'news'
        }, {
          title: '政策法规',
          name: 'laws'
        }, {
          title: '规划计划',
          name: 'plan'
        }, {
          title: '人事信息',
          name: 'personnel'
        }, {
          title: '资金信息',
          name: 'funds'
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.affairs-public {
  width: 100%;
  padding: 22px 24px;
  box-sizing: border-box;
  .nav-area {
    height: 33px;
    padding: 0 8px;
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
