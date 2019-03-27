<template>
  <div class="popularize-news">
    <router-view :path="path" :contentName="name" list-type="notice_img"/>
  </div>
</template>
<script>

export default {
  data () {
    return {
      path: '/polularScience/polularScience',
      name: '气象科普'
    }
  }
}
</script>
<style lang="scss" scoped>
.popularize-news {
  width: 100%;
}
</style>
