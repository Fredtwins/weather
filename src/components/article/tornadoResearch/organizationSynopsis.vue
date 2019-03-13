<template>
  <div class="tornado-introduce">
    <!--<span class="title">{{title}}</span>-->
    <span class="content" v-html="content"></span>
    <img src="../img/tornado.jpg"/>
  </div>
</template>
<script>

import { GetTornado } from 'api/tornado'
import { ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'

export default {
  mounted () {
    this._GetTornado()
  },
  data () {
    return {
      title: '佛山市龙卷风研究中心',
      content: ''
    }
  },
  methods: {
    _GetTornado () {
      GetTornado()
        .then(res => {
          if (res.code === ERR_OK) {
            let data = res.articleList[0].content
            this.content = data
          }
        })
        .catch(res => {
          errorNotice(res.msg)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.tornado-introduce {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .title {
    width: 100%;
    display: block;
    height: 24px;
    line-height: 24px;
    font-size: 22px;
    text-align: center;
  }
  .content{
    width: 100%;
    display: block;
  }
  img {
    width: 800px;
    height: 380px;
    display: block;
    margin: 0 auto;
  }
}
</style>
