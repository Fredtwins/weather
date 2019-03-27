<template>
  <div>
    <!-- <img src="./img/Round.png"  alt=""> -->
    <span class="temp-spot temp-spot-1" :style="{left:spotLeft,top:spotTop}">{{maxTemp}}</span>
    <span class="temp-spot temp-spot-2" :style="{left:spotLeft,top:spotTop}">{{minTemp}}</span>
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
    minTemp: {
      default: ''
    },
    maxTemp: {
      default: ''
    }
  }
}
</script>

<style lang="scss">
.temp-spot {
  /* transform: translateX(-4px) translateY(-4px); */
  display: inline-block;
  position: absolute;
  &.temp-spot-1 {
    transform: translateX(-120%);
    color: rgb(109, 58, 109);
  }
  &.temp-spot-2 {
    transform: translateX(-120%) translateY(-100%);
    color: rgb(255, 108, 0);
  }
}
</style>
