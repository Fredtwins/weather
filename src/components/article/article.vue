<template>
  <div class="article">
    <div class="article-header">
      <article-header
        :navList="navList"
        :current="current"
      />
    </div>
    <div class="article-body">
      <article-body-top />
      <div class="article-body-area">
        <article-body :parent-path="current" />
      </div>
    </div>
    <div class="article-footer">
      <article-footer />
    </div>
  </div>
</template>
<script>
import articleHeader from "./article-header";
import articleFooter from "./article-footer";
import articleBodyTop from "./article-bodytop";
import articleContentNav from "./article-contentnav";
import articleBody from "./article-body";

export default {
  components: {
    articleHeader,
    articleFooter,
    articleBodyTop,
    articleBody,
    articleContentNav

  },
  mounted() {
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
  data: function () {
    return {
      current: ''
    }
  }
};
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

