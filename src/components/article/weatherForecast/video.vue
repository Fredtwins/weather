<template>
  <div class="forecast-weather-video clearfloat">
    <div class="video-player">
      <video
        id="video-player"
        poster="../img/video-poster.jpg"
        src="http://www.fs121.com/WeatherDrumbeatMP4/A-%E3%80%8A%E5%BB%BA%E8%AE%BE%E6%B0%94%E8%B1%A1%E7%8E%B0%E4%BB%A3%E5%8C%96%E5%BC%BA%E5%B8%82%E4%B8%93%E9%A2%98%E5%AE%A3%E4%BC%A0%E7%89%87%E3%80%8B%EF%BC%88%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AD%97%E5%B9%95%E7%89%88%EF%BC%89.mp4"
        controls="controls"
      >
      </video>
    </div>
    <div class="video-list">
      <a
        v-for="(item,index) in videoList"
        :key="'videl-'+index"
        class="list-box"
        :href="item.href"
        target="blank"
        @click="playVideo(index)"
      >
        <img :src="item.img" />
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  mounted() {
    axios.get('/video/dat.js').then(res => {
      if (res.status == 200 && res.data) {
        let data = [{ title: '<<建设气象现代化强市专题宣传片>> (中英)', img: require('../img/video-poster.jpg') }, ...res.data.data]
        this.videoList = data
      }
    });
  },
  data() {
    return {
      videoList: []
    }
  },
  methods: {
    playVideo(index) {
      index == 0 && document.getElementById("video-player").play()
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.forecast-weather-video {
  width: 100%;
  padding: 20px 8px 8px;
  box-sizing: border-box;
  .video-player {
    width: 570px;
    height: 474px;
    background-color: #000000;
    float: left;
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .video-list {
    width: 361px;
    padding: 12px 0;
    float: right;
    box-sizing: border-box;
    background-color: #2061aa;
    .list-box {
      width: 128px;
      height: 120px;
      display: block;
      float: left;
      margin: 0 0 30px 35px;
      img {
        width: 128px;
        display: block;
      }
      span {
        width: 128px;
        line-height: 22px;
        font-size: 12px;
        font-family: "宋体";
        color: #ffffff;
      }
    }
  }
}
</style>
