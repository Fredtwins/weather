<template>
  <div class="tornado-introduce">
    <span class="content" v-html="content"></span>
  </div>
</template>
<script>

import { GetTornado } from 'api/article'
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
            this.content = res.data[0].content
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
  .content{
    width: 100%;
    display: block;
  }
}
</style>
