<template>
  <div class="service-notice">
    <router-view :path="path" :contentName="name" list-type="notice"/>
  </div>
</template>
<script>

export default {
  data(){
    return {
      path:'/climateServices/archiveBulletin',
      name:'档案公报'
    }
  }
 
}
</script>
<style lang="scss" scoped>
.service-notice {
  width: 100%;
}
</style>
