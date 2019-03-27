<template>
  <div class="search">
    <router-view :path="path" :contentName="name" list-type="search_list"/>
  </div>
</template>
<script>

export default {
  data () {
    return {
      path: '/search/search',
      name: '站内搜索'
    }
  }
}
</script>
<style lang="scss" scoped>
.popularize-news {
  width: 100%;
}
</style>
