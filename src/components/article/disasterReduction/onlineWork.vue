<template>
  <div class="lightning-online">
    <div class="list" v-html="content">
    </div>
  </div>
</template>
<script>
import { onlineWork } from 'api/article'
import { ERR_OK } from 'api/config'
import { errorNotice } from 'common/js/dom'
export default {
  data () {
    return {
      content: null
    }
  },
  mounted () {
    this._onlineWork()
  },
  methods: {
    _onlineWork (page) {
      onlineWork(page).then(res => {
        if (res.code === ERR_OK && res.data) {
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
.lightning-online {
  width: 100%;
  padding: 26px 0;
  box-sizing: border-box;
}
</style>
