<template>
  <div class="wind">
    <img :src="windImg" :style="{left:windLeft,top:windTop,transform:`rotate(${windRotate}deg)`}" alt="">
  </div>
</template>

<script>
export default {
  props: {
    spotLeft: {
      type: String,
      default: '0px'
    },
    spotTop: {
      type: String,
      default: '0px'
    },
    windRotate: {
      default: 0
    },
    windDir: {
      default: 0
    }
  },
  data() {
    return {
      windLeft: '0px',
      windTop: '0px',
      windImg: ''
    }
  },
  mounted() {
    this.windLeft = parseFloat(this.spotLeft) - 12.5 + 'px';
    this.windTop = parseFloat(this.spotTop) - 30.5 + 'px';
    let tempNum = 0;
    if(Math.ceil(this.windDir) % 2 ==0) {
      tempNum = Math.ceil(this.windDir)
    }else {
      tempNum = Math.ceil(this.windDir) + 1
    }
    tempNum?tempNum:tempNum=2
    this.windImg = require(`./img/fx_${tempNum}.gif`)
  }
}
</script>

<style lang="scss">
.wind {
  img {
    width: 25px;
    height: 61px;
    transform: rotate(45deg);
    position: absolute;
    transform-origin: 50% 50% 0px;
  }
}
</style>
