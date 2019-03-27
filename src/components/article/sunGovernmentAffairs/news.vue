<template>
  <div class="affairs-news">
    <router-view :path="path" :content-name="name" list-type="public" />
  </div>
</template>
<script>

export default {
  data () {
    return {
      path: '/sunGovernmentAffairs/news',
      name: '气象新闻'
    }
  }
}
</script>
<style lang="scss" scoped>
.affairs-news {
  width: 100%;
}
</style>
