<template>
  <div class="empty">
    <div class="zdzd">
      <!-- 头部 -->
      <div class="zdMenu">
        <Select v-model="model1" size="large" @on-change="cityChange">
          <Option v-for="item in showlistArray" :value="item.val" :key="item.index">{{ item.val }}</Option>
        </Select>
        <span :class="[flag==1?'active':'']" style="cursor:pointer" @click="changeclass('table')">表格</span>
        <span :class="[flag==2?'active':'']" style="cursor:pointer" @click="changeclass('map')">图</span>
      </div>
      <div class="zdMenu-box">
        <div class="zdMenu-left">
          <Collapse :hide-arrow='true' accordion v-model="value2">
            <Panel name="1"  :hide-arrow='true'>
              自动站时次记录
              <p @click="switchTime(item)" v-for="(item, index) in awshouTime" :key="index" class="zdMenu-left-item" :class="[false?'item-active':'']" slot="content">
                {{item}}
              </p>
            </Panel>
            <Panel name="2">
              日记录（20-20时）
              <p @click="switchTime(item)" v-for="(item, index) in timeday" :key="index" class="zdMenu-left-item" slot="content">
                {{item.value}}
              </p>
            </Panel>
            <Panel name="3">
              日记录（8-8时）
              <p @click="switchTime" class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
            </Panel>
            <Panel name="4">
              时极值、雨量
              <p @click="switchTime" class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
            </Panel>
            <Panel name="5">
              时内5分钟雨量
              <p @click="switchTime" class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
            </Panel>
          </Collapse>
        </div>
        <div class="zdMenu-right" v-show="flag == 'table'">
          <Table :columns="columnsTable"></Table>
        </div>
        <div class="zdMenu-right" v-show="flag == 'map'">
          <div>
            <awshouMap :awshouData="awshouData" :currentIndex="currentIndex" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import awshouMap from './components/'
import mapData from './components/data.json'
import awshouData from './components/index.json'
import awshouTime from './components/time.json'
import weaterData from './components/weater.json'
import timeday from './components/timeday.json'
export default {
  components: {
    awshouMap
  },
  data () {
    return {
      showlist: false,
      currentIndex: 0,
      model1: '全市',
      flag: 'map',
      awshouData: awshouData.data,
      awshouTime: awshouTime,
      timeday: timeday,
      showlistArray: [
        {
          val: '全市',
          index: 0
        }, {
          val: '禅城',
          index: 4
        }, {
          val: '南海',
          index: 5
        }, {
          val: '顺德',
          index: 6
        }, {
          val: '三水',
          index: 7
        }, {
          val: '高明',
          index: 8
        }
      ],
      value2: '1',
      columnsTable: [
        {
          title: '地点',
          key: 'name',
          sortable: true
        },
        {
          title: '气温（℃）',
          key: 'name',
          sortable: true
        },
        {
          title: '时雨量（mm）',
          key: 'name',
          sortable: true
        },
        {
          title: '风向',
          key: 'name',
          sortable: true
        },
        {
          title: '风速（m/s）',
          key: 'name',
          sortable: true
        }
      ]
    }
  },
  methods: {
    changeclass (flag) {
      this.flag = flag
    },
    cityChange (item) {
      this.showlistArray.forEach(val => {
        if (val.val === item) this.currentIndex = val.index
      })
    },
    getTableData() {

    },
    switchTime() {
      // alert(this.value2)
//      console.log(this.value2[this.value2.length-1])
      switch (this.value2[this.value2.length-1]) {
        case '1':
          // alert(1)
          this.awshouData = weaterData.data;
//          console.log(this.awshouData, 909090)
          break;
        case '2':
          // alert(2)
          this.awshouData = awshouData.data;
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.empty {
  width: 100%;
  height: 700px;
  > .zdzd {
    background-color: #fff;
    height: auto;
    padding-bottom: 31px;
    > .zdMenu {
      width: 892px;
      height: auto;
      margin: 0 auto 0;
      color: #000;
      padding-top: 16px;
      > .ivu-select {
        width: 121px;
        > .ivu-select-selection {
          background-color: #025bc4;
          color: #fff;
          font-weight: bold;
          height: 37px;
          -webkit-border-radius: 0;
          -moz-border-radius: 0;
          border-radius: 0;
          > .ivu-select-selected-value{
            height: 37px;
            line-height: 37px;
            text-align: center;
            font-size: 12px;
            font-family: '宋体';
          }
        }
      }
      > span {
        width: 121px;
        height: 37px;
        line-height: 37px;
        text-align: center;
        color: #fff;
        margin-right: 8px;
        display: inline-block;
        background: #025bc4;
        margin-left: 10px;
      }
      .active {
        background: #ff6c00;
      }

    }
  }
  .zdMenu-box {
    padding: 30px;
  }
  .zdMenu-left {
    float: left;
    width: 160px;
    border: 1px solid #025bc4;
    padding: 1px;
    font-size: 14px;
    .ivu-collapse-header{
      background-color: #025bc4 !important;
      color: #fff;
      padding-left: 6px;
      border: 1px solid #ffffff;
      border-bottom: none;
      position: relative;
      &:nth-last-child() {
        border-bottom: 1px solid #ffffff;
      }
      .ivu-icon {
        position: absolute;
        right: 0px;
        top: 0px;
        line-height: 38px;
        font-size: 16px;
      }
    }
    .ivu-collapse-content {
      padding: 6px !important;
    }
    .ivu-collapse-content-box {
      padding: 0px !important;
      max-height: 240px;
      overflow-y: scroll;
      .zdMenu-left-item {
        line-height: 30px;
        cursor: pointer;
        &.item-active {
          color: #025bc4;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .zdMenu-right {
    width: 740px;
    float: left;
    margin-left: 20px;
    border: 1px solid #025bc4;
    .ivu-table-header {
      thead th {
        background-color: #025bc4;
        color: #ffffff;
        text-align: center;
      }
      .ivu-table td, .ivu-table th {
        border-color: #ffffff;
      }
    }
    .ivu-table td, .ivu-table th {
      border: 0.5px solid #fff;
    }
  }
}
</style>
