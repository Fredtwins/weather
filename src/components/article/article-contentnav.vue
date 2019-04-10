<template>
  <div class="article-content-nav">
    <router-link
      v-for="(item,index) in navList"
      :key="index"
      :class="['button',{'current':item.alias == current}]"
      :to="item.jumpUrl"
    >
      <em>
        <i></i>
        <img :src="item.alias == current?item.iconCurrent:item.icon" />
      </em>
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['current', 'nav-list']
}
</script>

<style lang="scss" scoped>
.article-content-nav {
  width: 172px;
  margin-right: 36px;
  float: left;
  box-sizing: border-box;
  border-width: 5px 5px 4px 5px;
  border-style: solid;
  border-color: #c2c8cc;
  .button {
    width: 100%;
    height: 42px;
    display: block;
    background-color: #ffffff;
    border-bottom: 1px solid #c2c8cc;
    em {
      width: 60px;
      height: 42px;
      display: block;
      text-align: center;
      float: left;
      i {
        height: 100%;
        vertical-align: middle;
        display: inline-block;
      }
      img {
        vertical-align: middle;
      }
    }
    span {
      width: 102px;
      height: 42px;
      line-height: 42px;
      float: left;
      font-size: 14px;
    }
  }
  .current {
    background-color: #2061aa;
    span {
      color: #ffffff;
    }
  }

  .current::after {
    content: "";
    width: 4px;
    margin: 16px -5px 0 0;
    float: right;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 5px solid #2061aa;
    border-bottom: 5px solid transparent;
  }
}
</style>

