<template>
  <div class="tornado-introduce">
<<<<<<< HEAD
    <span class="content" v-html="content"></span>
=======
    <!--<span class="title">{{title}}</span>-->
    <span class="content" v-html="content"></span>
    <img src="../img/tornado.jpg"/>
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5
  </div>
</template>
<script>

<<<<<<< HEAD
import { GetTornado } from 'api/article'
=======
import { GetTornado } from 'api/tornado'
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5
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
<<<<<<< HEAD
            this.content = res.data[0].content
=======
            let data = res.articleList[0].content
            this.content = data
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5
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
<<<<<<< HEAD
=======
  .title {
    width: 100%;
    display: block;
    height: 24px;
    line-height: 24px;
    font-size: 22px;
    text-align: center;
  }
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5
  .content{
    width: 100%;
    display: block;
  }
<<<<<<< HEAD
=======
  img {
    width: 800px;
    height: 380px;
    display: block;
    margin: 0 auto;
  }
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5
}
</style>
