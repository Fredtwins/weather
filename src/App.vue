<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jQuery from 'jquery'

export default {
  name: 'app',
  mounted() {
    !this.$store.state.initData.status && this.$store.dispatch('getInitData')
  },
  computed: {
    initStatus() {
      return this.$store.state.initData.status
    }
  },
  watch: {
    initStatus() {
      this.$nextTick(() => {
        const { initData } = this.$store.state
        if (initData.status) {
          let { keyword, title } = initData.website
          jQuery("meta[name='keywords']").attr('content', keyword)
          jQuery('title').html(title)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  /* min-width: 1399px; */
}
</style>
