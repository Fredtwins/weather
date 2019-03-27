<template>
  <div class="affairs-communication-research">
    <router-view :path="path" list-type="public" :content-name="name"/>
  </div>
</template>
<script>

export default {
  data() {
    return {
      path: '/sunGovernmentAffairs/communion/research',
      name: '网上调查'
    }
  }
}
</script>
<style lang="scss" scoped>
.affairs-communication-research {
  width: 100%;
}
</style>
v
