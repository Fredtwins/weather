<template>
  <div class="foshan-climate">
    <div class="title">{{title}}</div>
    <div v-html="content"></div>
  </div>
</template>
<script>
import { GetFoshanClimate } from 'api/article'
import { ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'
export default {
  data () {
    return {
      content: '',
      title: '佛山气候'
    }
  },
  mounted () {
    this._getFoshanClimate()
  },
  methods: {
    _getFoshanClimate () {
      GetFoshanClimate().then(res => {
        if (res.code === ERR_OK) {
          this.title = res.data[0].title
          this.content = res.data[0].content
        }
      }).catch(res => {
        errorNotice(res.msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.foshan-climate {
  width: 100%;
  padding: 22px 45px 20px;
  box-sizing: border-box;
  font-family: "宋体";
  .title {
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 40px;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
