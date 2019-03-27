<template>
  <div class="forecast-weather-news">
    <router-view :path="path" :content-name="name" />
  </div>
</template>
<script>

export default {
  data(){
    return {
      path:'/weatherForecast/news',
      name:'天气消息'
    }
  }
 
}
</script>
<style lang="scss" scoped>
.forecast-weather-news {
  width: 100%;
}
</style>
