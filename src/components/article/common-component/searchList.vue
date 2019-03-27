<template>
  <div class="list-area">
    <p>您的搜索关键字是： "<span style="color: Red;font-size: 15px;">{{keywords}}</span>"，搜索到符合条件的信息是&nbsp<span style="color: Red;font-size: 15px;">{{list.length}}</span>&nbsp条</p>
    <ul style="margin-top: 18px;">
      <li v-for="(item,index) in list" :key="item.title + '-'+index" class="list-box clearfloat">
        <span class="name">【{{item.columnName}}】</span>
        <span v-if="item.jumpUrl!=='' && item.content===''" :class="[item.jumpUrl!=='' && item.content===''? 'title' : 'hide']"><a :href="item.jumpUrl" target="_blank">·{{item.title}}</a></span>
        <span v-else-if="item.displayPosition===2"><router-link class="title" :to="item.columnRoute+'/content/'+item.id">·{{item.title}}</router-link></span>
        <span v-else><router-link class="title" :to="item.columnRoute">·{{item.title}}</router-link></span>
        <span class="time">{{item.publishtime}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['list', 'path', 'keywords']
}
</script>
<style lang="scss" scoped>
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}

.list-area {
  width: 100%;
  padding: 4px 42px;
  li {
    .name,
    .title,
    .time {
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      font-family: "宋体";
    }
    .title {
      width: 798px;
    }
    .time {
      width: 120px;
      text-align: right;
      float: right;
    }
  }
  > .hide{
    display: none;
  }
}
</style>
