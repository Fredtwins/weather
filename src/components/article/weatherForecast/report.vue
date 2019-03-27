<template>
  <div class="forecast-weather-report">
    <router-view :path="path" :contentName="name"/>
  </div>
</template>
<script>

export default {
  data () {
    return {
      path: '/weatherForecast/report',
      name: '天气报告'
    }
  }
}
</script>
<style lang="scss" scoped>
.forecast-weather-report {
  width: 100%;
}
</style>
