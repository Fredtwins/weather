<template>
  <div class="tornado-news">
    <router-view :path="path" :contentName="name" list-type="notice_img"/>
  </div>
</template>
<script>

export default {
  data(){
    return {
      path:'/tornadoResearch/scienceInformation',
      name:'科普资讯'
    }
  }
 
}
</script>
<style lang="scss" scoped>
.tornado-news {
  width: 100%;
}
</style>
