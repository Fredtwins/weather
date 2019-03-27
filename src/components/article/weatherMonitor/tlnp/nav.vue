<template>
  <div class="monitor-tlnp-nav">
    <template v-for="item in navList">
      <router-link
        :key="'nav_'+item.id"
        :class="['button',{'current':item.id==canvasId}]"
        :to="item.path"
      >{{item.name}}</router-link>
    </template>
  </div>
</template>
<script>
export default {
  props: ['canvas-id'],
  data() {
    return {
      current: 0,
      navList: [
        {
          name: 'T-LnP',
          id: 'canvas-tlnp',
          path: '/weatherMonitor/T-lnP/T-lnP'
        }, {
          name: '高空风分析',
          id: 'canvas-hodograph',
          path: '/weatherMonitor/T-lnP/hodograph'
        }, {
          name: '高度',
          id: 'canvas-height',
          path: '/weatherMonitor/T-lnP/height'
        }, {
          name: '未分类',
          id: 'canvas-v-distribution',
          path: '/weatherMonitor/T-lnP/v-distribution'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-tlnp-nav {
  width: 100%;
  height: 28px;
  padding-left: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  .button {
    width: 96px;
    height: 28px;
    line-height: 28px;
    margin-right: 4px;
    display: inline-block;
    background: #0656b4;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
  }
  .current {
    background-color: #ff6c00;
  }
}
</style>
