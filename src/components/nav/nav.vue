<template>
  <div class="article">
    <div class="article-header">
      <nav-topheader
        :navList="navList"
        :current="current"
      />
    </div>
    <div class="article-body">
      <nav-search @search="search"/>
      <div class="article-body-area">
        <nav-bodycontent />
      </div>
    </div>
    <div class="article-footer">
      <nav-footer />
    </div>
  </div>
</template>

<script>
import NavTopheader from './navtop'
import NavBodycontent from './nav-bodycontent'
import NavSearch from './nav-search'
import NavFooter from './nav-footer'

export default {
  components: {
    NavTopheader,
    NavBodycontent,
    NavSearch,
    NavFooter
  },
  data () {
    return {
      current: ''
    }
  },
  mounted () {
    this.current = this.$router.history.current.matched[0].name
  },
  beforeRouteLeave(to, from, next) {
    this.current = to.matched[0].name
    next()
  },
  computed:{
    navList(){
      return this.$store.state.initData.catalog
    }
  },
  methods: {
    search () {

    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100%;
  padding: 88px 0 86px;
  box-sizing: border-box;
  position: relative;
  background-color: #f2faff;
  .article-header {
    width: 100%;
    height: 88px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .article-body {
    width: 100%;
    height: 100%;
    padding-bottom: 46px;
    overflow-y: auto;
    background: #16499a;
    .article-body-area {
      width: 1200px;
      margin: 0 auto;
    }
  }
  .article-footer {
    width: 100%;
    height: 86px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
