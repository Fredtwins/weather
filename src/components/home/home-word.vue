<template>
  <!--首页 右侧 在线办事-->
  <div class="word">
    <titleContent :titlearray="titleword"/>
    <div class="wordlist">
      <ul>
        <li>
          <a href="#">
            <img src="./img/zxbs4.jpg" alt="">
            <span>办事指南</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import titleContent from './titlecontent'

export default {
  components: {
    titleContent
  },
  data () {
    return {
      titleword: '在线办事'
    }
  }
}
</script>

<style lang="scss" scoped>
.word {
  width: 355px;
  > .wordlist{
    width: 100%;
    height: 100px;
    border: 1px solid #e3e3e3;
    overflow: hidden;
    > ul {
      > li {
        width: 33.33%;
        height: 80px;
        text-align: center;
        padding-top: 10px;
        > a {
          width: 100%;
          height: 100%;
          > img {
            width: 50%;
            height: 70%;
          }
          > span {
            display: block;
          }
        }
      }
    }
  }
}
</style>
