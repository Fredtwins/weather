<template>
  <div class="monitor-tlnp-select">
    <form>
      <div class="form-item">
        <label for="layer">图层:</label>
        <select
          name="layer"
          id="layer"
          v-model="selectData.layer"
          @change="selectClick"
        >
          <template v-for="(item,index) in layer">
            <option
              :key="'layer'+index"
              :value="item.value"
            >{{item.name}}</option>
          </template>
        </select>
      </div>
      <div class="form-item">
        <label for="station">测站:</label>
        <select
          name="station"
          id="station"
          v-model="selectData.station"
          @change="selectClick"
        >
          <template v-for="(item,index) in stationList">
            <optgroup
              :key="'country_'+index"
              :label="item.name"
            >
              <template v-for="stationItem in item.station">
                <option
                  :key="stationItem[0]"
                  :value="stationItem[0]"
                >{{stationItem[0]}} {{stationItem[1]}} {{stationItem[2]}}</option>
              </template>
            </optgroup>
          </template>
        </select>
      </div>
      <div class="form-item">
        <label for="time">时次(BT):</label>
        <select
          name="time"
          id="time"
          v-model="selectData.time"
          @change="selectClick"
        >
          <template v-for="item in timeList">
            <option
              :key="item.value"
              :value="item.value"
            >{{item.name}}</option>
          </template>
        </select>
      </div>
    </form>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import Vue from 'vue'
export default {
  mounted() {
    this.getData().then(res => {
      this.setData(res)
    })
  },
  data() {
    return {
      selectData: {
        layer: 'ema50',
        station: '59280',
        time: ''
      },
      timeList: [],
      stationList: [],
      stationObject: {},
      layer: [
        {
          name: '全层',
          value: 'ema50'
        }, {
          name: '拆层',
          value: 'ema200'
        }
      ]
    }
  },
  methods: {
    selectClick() {
      const stationData = this.stationObject[this.selectData.station]
      this.$emit('selectUpdate', {
        layer: this.selectData.layer,
        time: this.selectData.time,
        station: {
          id: stationData[0],
          name: stationData[0] + ' ' + stationData[1] + ' ' + stationData[2],
          la: stationData[3]
        }
      })
    },
    getData() {
      let station = axios.get('/dat/upper/upper_station.js').then(res => {
        return res.data
      })
      let time = axios.get('/dat/upper/upper_list.js').then(res => {
        return res.data
      })
      return Promise.all([station, time])
    },
    setData(res) {
      const stationList = [], timeList = []

      res[0].forEach(item => {
        if (typeof item == 'string') {
          stationList.push({ name: item, station: [] })
        } else {
          stationList[stationList.length - 1].station.push(item)
          Vue.set(this.stationObject, item[0], item)
        }
      })

      res[1].hrs.forEach(item => {
        timeList.push({
          name: item.slice(0, 4) + '-' + item.slice(4, 6) + '-' + item.slice(6, 8) + ' ' + item.slice(8, 10) + ':00',
          value: item
        })
        !this.selectData.time && (this.selectData.time = item)
      })

      this.stationList = stationList
      this.timeList = timeList

      this.selectClick()

    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-tlnp-select {
  width: 100%;
  height: 20px;
  margin-bottom: 30px;
  padding: 6px 6px 6px 26px;
  box-sizing: border-box;
  font-size: 0;
  .form-item {
    margin-right: 20px;
    display: inline-block;
    vertical-align: middle;
    label {
      height: 20px;
      line-height: 20px;
      display: inline-block;
      color: #7d7d7d;
    }
    select {
      height: 20px;
      line-height: 20px;
      border: 1px solid rgb(169, 169, 169);
      display: inline-block;
    }
  }
}
</style>
