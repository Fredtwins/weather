<template>
  <!--首页-浮动广告-->
  <div id="floatads" ref="floatads" style="position: absolute;z-index:1100;"
       @mouseover="removeFloat('stop')" @mouseout="removeFloat()">
    <span class="close" @click="closeFloatAds()">关闭</span>
    <a :href="floatAds[0].jumpUrl" target="_blank"><img :src="floatAds[0].url" alt="" border="0"/></a>
  </div>
</template>

<script>
export default {
  props: ['floatAds'],
  data () {
    return {
      xd: 1,
      yd: 1,
      timer: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.floatAdvert()
    }, 100)
  },
  methods: {
    // 浮动广告
    floatAdvert () {
      this.timer = setInterval(this.floatStart, 50)
    },
    // 鼠标移入浮动停止，移出浮动继续
    removeFloat (val) {
      if (val) {
        window.clearInterval(this.timer) // 停止
      } else {
        this.timer = setInterval(this.floatStart, 50) // 继续
      }
    },
    // 浮动广告
    floatStart () {
      let obj = this.$refs['floatads']
      if (obj === undefined) {
        clearInterval(this.timer)
        return
      }
      let width, height
      if (window.innerHeight === undefined) {
        // IE
        width = document.body.clientWidth
        height = document.body.clientHeight
      } else {
        // webkit
        width = window.innerWidth
        height = window.innerHeight
      }
      // 最大范围
      let maxW = width - 198 // 浮动广告的宽
      let maxH = height - 90 // 浮动广告的高
      let x = (obj.style.left === '' || obj === undefined ? 0 : parseInt(obj.style.left)) + this.xd
      let y = (obj.style.top === '' || obj === undefined ? 0 : parseInt(obj.style.top)) + this.yd
      if (x < 0) {
        x = 0
        this.xd = 1
      }
      if (x > maxW) {
        x = maxW
        this.xd = -1
      }
      if (y < 0) {
        y = 0
        this.yd = 1
      }
      if (y > maxH) {
        y = maxH
        this.yd = -1
      }
      obj.style.left = x + 'px'
      obj.style.top = y + 'px'
    },
    // 关闭浮动广告
    closeFloatAds () {
      clearInterval(this.timer)
      this.$refs['floatads'].style.display = 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
  #floatads{
    .close{
      text-align: right;
      color: #000;
      cursor: pointer;
      position: relative;
      display: inline-block;
      top: 5px;
      left: -30px;
    }
    a{
      float: left;
      margin-bottom: 5px;
      text-decoration: none;
    }
  }
</style>
