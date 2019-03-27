<template>
  <table class="meaning-list">
    <tr>
      <th>预警信号</th>
      <th>含义</th>
      <th>防御指南</th>
    </tr>
    <tr
      v-for="(item,index) in list"
      :key="index"
    >
      <td class="icon"><img
          v-if="item.icon"
          :src="item.icon"
        /></td>
      <td class="meaning">{{item.meaning}}</td>
      <td class="guide">
        <span
          v-for="(item,index) in item.guide"
          :key="'guide'+index"
        >{{item}}</span>
      </td>
    </tr>
  </table>
</template>
<script>
// 预警信号含义

export default {
  props: ['list']
}
</script>
<style lang="scss" scoped>
.meaning-list {
  width: 100%;
  margin-bottom: 20px;
  background-color: #f2faff;
  border: solid #9abee7;
  border-width: 1px 0 0 1px;
  th{
    height: 41px;
    line-height: 40px;
  }
  th,
  td {
    box-sizing: border-box;
    border: solid #9abee7;
    border-width: 0 1px 1px 0;
       font-size: 14px;
    font-family: "宋体"
  }
  .icon {
    width: 200px;
    text-align: center;
    padding: 15px 10px;
    img {
      vertical-align: middle;
      display: inline-block;
    }
  }
  .meaning,
  .guide {
    line-height: 30px;
    padding: 15px 10px;
    font-size: 14px;
    span{
      display: block;
    }
  }
   .meaning{
     width: 350px;
   }
}
</style>
