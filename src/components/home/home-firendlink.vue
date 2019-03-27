<template>
  <!--首页 友情链接-->
  <div class="firendlink">
    <titleContent :titlearray="titlefirenlink"/>
    <div class="footer-firendlink">
      <div class="big-firend">
        <ul>
          <li>
            <Select
              v-model="model1"
              placeholder="--- 佛山辖区气象网站 ---"
              size="large"
              class="select"
              placement="top"
              @on-change="changecitylist">
              <Option
                v-for="item in cityList"
                :value="item.name"
                :key="item.index"
              >{{ item.name }}</Option>
            </Select>
          </li>
          <li>
            <Select
              v-model="model2"
              placeholder="--- 气象网站 ---"
              size="large"
              class="select"
              @on-change="changewzlist">
              <Option
                v-for="item in wzList"
                :value="item.name"
                :key="item.index">{{ item.name }}</Option>
            </Select>
          </li>
          <li>
            <Select
              v-model="model3"
              placeholder="--- 气象微博 ---"
              size="large"
              class="select"
              @on-change="changewblist">
              <Option
                v-for="item in wbList"
                :value="item.name"
                :key="item.index">{{ item.name }}</Option>
            </Select>
          </li>
          <li>
            <Select
              v-model="model4"
              placeholder="--- 政务网站 ---"
              size="large"
              class="select"
              @on-change="changezwlist">
              <Option
                v-for="item in zwList"
                :value="item.name"
                :key="item.index">{{ item.name }}</Option>
            </Select>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import titleContent from './titlecontent'

export default {
  props: ['friendlyLinks'],
  components: {
    titleContent
  },
  data () {
    return {
      titlefirenlink: '友情链接',
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      cityList: [],
      wzList: [],
      wbList: [],
      zwList: []
    }
  },
  methods: {
    // 获取接口数据
    Getfirend () {
      const data = this.friendlyLinks
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentId === 73) {
          this.cityList.push(data[i])
        }
        if (data[i].parentId === 78) {
          this.wzList.push(data[i])
        }
        if (data[i].parentId === 83) {
          this.wbList.push(data[i])
        }
        if (data[i].parentId === 90) {
          this.zwList.push(data[i])
        }
      }
    },
    // 选择下拉触发
    changecitylist (val) {
      for (var i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].name === val) {
          location.href = this.cityList[i].jumpUrl
        }
      }
    },
    changewzlist (val) {
      for (var i = 0; i < this.wzList.length; i++) {
        if (this.wzList[i].name === val) {
          location.href = this.wzList[i].jumpUrl
        }
      }
    },
    changewblist (val) {
      for (var i = 0; i < this.wbList.length; i++) {
        if (this.wbList[i].name === val) {
          location.href = this.wbList[i].jumpUrl
        }
      }
    },
    changezwlist (val) {
      for (var i = 0; i < this.zwList.length; i++) {
        if (this.zwList[i].name === val) {
          location.href = this.zwList[i].jumpUrl
        }
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.Getfirend()
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.firendlink {
  width: 1144px;
  margin: 0 auto;
}
.footer-firendlink {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #e3e3e3;
  overflow: hidden;
}
.big-firend {
  width: 100%;
}
.big-firend ul li {
  width: 24%;
  display: inline-block;
  margin: 10px 8px 0 0;
}
.select{
  width: 275px;
}
.select .ivu-select-selection{
  height: 39px;
}
.ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder{
  font-size: 16px;
  line-height: 36px;
  color: #606060;
}
.select .ivu-select-selection .ivu-select-arrow{
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1;
  color: #808695;
  transition: all .2s ease-in-out;
  background-color: #f0f0f0;
  width: 33px;
  height: 37px;
  padding: 5px;
}

</style>
