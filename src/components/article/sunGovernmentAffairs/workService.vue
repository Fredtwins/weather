<template>
  <div class="affairs-service">
    <div v-html="content"></div>
  </div>
</template>
<script>
import { getWorkService } from 'api/article'
import { ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'
export default {
  data () {
    return {
      content: null
    }
  },
  mounted () {
    this._getWorkService()
  },
  methods: {
    // 获取阳光政务-通知公告的列表
    _getWorkService (page) {
      getWorkService(page).then(res => {
        if (res.code === ERR_OK) {
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
.affairs-service {
  width: 100%;
  padding: 26px 0;
  box-sizing: border-box;
}
</style>
