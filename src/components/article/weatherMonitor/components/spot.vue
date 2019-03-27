<template>
  <div>
    <!-- <img src="./img/Round.png"  alt=""> -->
    <span @mouseenter="popEchart" class="spot-img" :style="{left:spotLeft,top:spotTop}">
      <!-- <Poptip placement="right" width="400">
        <span></span>
        <div class="api" slot="content">
           <div>图表</div>
        </div>
      </Poptip> -->
    </span>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    spotLeft: {
      type: String,
      default: '0px'
    },
    spotTop: {
      type: String,
      default: '0px'
    }
  },
  methods: {
    popEchart() {
      // alert(90)
      this.$emit('popEchart', this.spotLeft, this.spotTop)
    }
  }
}
</script>

<style lang='scss'>
.spot-img {
  background: url('./img/Round.png') no-repeat center center;
  transform: translateX(-4px) translateY(-4px);
  width: 8px;
  height: 9px;
  display: inline-block;
  position: absolute;
  z-index: 100;
  cursor: pointer;
  span {
    display: inline-block;
    height: 9px;
    width: 8px;
    // background-color: red;
  }
}
</style>
