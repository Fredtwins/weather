<template>
  <div class="warning-list">
    <table>
      <thead>
        <th class="first">预警信号</th>
        <template v-for="(item,index) in warningCN">
          <th :key="'warning_cn_name_'+index">{{item}}</th>
        </template>
      </thead>
      <tbody>
        <template v-for="(item,index) in areaData">
          <tr :key="'area_row_'+index">
            <div class="inside">
              <div class="area-name">{{item.name}}</div>
              <div class="town-list">
                <template v-for="(townItem,townIndex) in item.town">
                  <div
                    :key="'town_row_'+townIndex"
                    :class="{'last':townIndex == item.town.length-1}"
                  >
                    <span>{{townItem.name}}</span>
                    <div class="warning-list">
                      <span
                        v-for="(warningItem,warningIndex) in warningData[item.code +townItem.code]"
                        :key="'warning_img_'+index+'_'+townIndex+'_'+warningIndex"
                        :class="{'last':warningIndex == warningData[item.code +townItem.code].length-1}"
                      >
                        <img
                          v-if="warningItem"
                          :src="'/images/warning/wa_fo/'+warningItem+'.png'"
                        />
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import Vue from 'Vue'
import axios from 'axios'
export default {
  mounted() {
    this.getData().then(res => {
      res.forEach(item => {
        let { station_code, code } = item
        let warningIndex = this.warningCode.indexOf(item.code[0])
        if (this.warningData[station_code]) {
          Vue.set(this.warningData[station_code], warningIndex, code)
        }
      })
    })
  },
  data() {
    return {
      warningCN: ['台风', '暴雨', '高温', '寒冷', '大雾', '灰霾', '雷雨大风', '道路结冰', '冰雹', '森林火险'],
      warningCode: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      areaData: [
        {
          name: '禅城',
          code: 'CC',
          town: [
            {
              name: '石湾',
              code: 'SW',
            }, {
              name: '祖庙',
              code: 'ZM'
            }, {
              name: '张槎',
              code: 'ZC'
            }, {
              name: '南庄',
              code: 'NZ'
            }
          ]
        },
        {
          name: '南海',
          code: 'NH',
          town: [
            {
              name: '里水',
              code: 'LS',
            }, {
              name: '西樵',
              code: 'XQ'
            }, {
              name: '九江',
              code: 'JJ'
            }, {
              name: '丹灶',
              code: 'DZ'
            }, {
              name: '大沥',
              code: 'DL'
            }, {
              name: '狮山',
              code: 'SS'
            }, {
              name: '桂城',
              code: 'GC'
            },
          ]
        }, {
          name: '顺德',
          code: 'SD',
          town: [
            {
              name: '均安',
              code: 'JA',
            }, {
              name: '大良',
              code: 'DL'
            }, {
              name: '容桂',
              code: 'RG'
            }, {
              name: '勒流',
              code: 'LL'
            }, {
              name: '伦教',
              code: 'LJ'
            }, {
              name: '陈村',
              code: 'CC'
            }, {
              name: '杏坛',
              code: 'XT'
            }, {
              name: '龙江',
              code: 'LZ'
            }, {
              name: '乐从',
              code: 'LC'
            }, {
              name: '北滘',
              code: 'BJ'
            }
          ]
        }, {
          name: '三水',
          code: 'SS',
          town: [
            {
              name: '云东海',
              code: 'YD',
            }, {
              name: '大塘',
              code: 'DT'
            }, {
              name: '乐平',
              code: 'LP'
            }, {
              name: '白坭',
              code: 'BN'
            }, {
              name: '南山',
              code: 'NS'
            }, {
              name: '西南',
              code: 'XN'
            }, {
              name: '芦苞',
              code: 'LB'
            },
          ]
        }, {
          name: '高明',
          code: 'GM',
          town: [
            {
              name: '杨和',
              code: 'YH',
            }, {
              name: '更合',
              code: 'GH'
            }, {
              name: '明城',
              code: 'MC'
            }, {
              name: '荷城',
              code: 'HC'
            }
          ]
        }
      ],
      warningData: {
        CCSW: ['', '', '', '', '', '', '', '', '', ''],
        CCZC: ['', '', '', '', '', '', '', '', '', ''],
        CCNZ: ['', '', '', '', '', '', '', '', '', ''],
        CCZM: ['', '', '', '', '', '', '', '', '', ''],
        NHLS: ['', '', '', '', '', '', '', '', '', ''],
        NHXQ: ['', '', '', '', '', '', '', '', '', ''],
        NHDZ: ['', '', '', '', '', '', '', '', '', ''],
        NHJJ: ['', '', '', '', '', '', '', '', '', ''],
        NHDL: ['', '', '', '', '', '', '', '', '', ''],
        NHSS: ['', '', '', '', '', '', '', '', '', ''],
        NHGC: ['', '', '', '', '', '', '', '', '', ''],
        SDJA: ['', '', '', '', '', '', '', '', '', ''],
        SDDL: ['', '', '', '', '', '', '', '', '', ''],
        SDRG: ['', '', '', '', '', '', '', '', '', ''],
        SDLL: ['', '', '', '', '', '', '', '', '', ''],
        SDLJ: ['', '', '', '', '', '', '', '', '', ''],
        SDCC: ['', '', '', '', '', '', '', '', '', ''],
        SDXT: ['', '', '', '', '', '', '', '', '', ''],
        SDLZ: ['', '', '', '', '', '', '', '', '', ''],
        SDLC: ['', '', '', '', '', '', '', '', '', ''],
        SDBJ: ['', '', '', '', '', '', '', '', '', ''],
        SSYD: ['', '', '', '', '', '', '', '', '', ''],
        SSDT: ['', '', '', '', '', '', '', '', '', ''],
        SSLP: ['', '', '', '', '', '', '', '', '', ''],
        SSBN: ['', '', '', '', '', '', '', '', '', ''],
        SSNS: ['', '', '', '', '', '', '', '', '', ''],
        SSXN: ['', '', '', '', '', '', '', '', '', ''],
        SSLB: ['', '', '', '', '', '', '', '', '', ''],
        GMYH: ['', '', '', '', '', '', '', '', '', ''],
        GMGH: ['', '', '', '', '', '', '', '', '', ''],
        GMMC: ['', '', '', '', '', '', '', '', '', ''],
        GMHC: ['', '', '', '', '', '', '', '', '', '']
      }
    }
  },
  methods: {
    getData() {
      // 镇街预警状态
      return axios.get('/warning/wa_fotown_inforce_all.js').then(res => {
        return res.data
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.clear-float:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.warning-list {
  width: 100%;
  table {
    width: 100%;
    thead {
      width: 100%;
      display: block;
      margin-bottom: 1px;
      th {
        width: 80px;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        border-left: 1px solid #ffffff;
        background-color: #025ac4;
      }
      .first {
        width: 138px;
        border-left: 0;
      }
    }
    tbody {
      width: 100%;
      display: block;
      border-top: 1px solid #025ac4;
      > tr {
        width: 100%;
        padding: 2px 1px;
        display: block;
        border: solid #025ac4;
        border-width: 0 1px 1px;
        box-sizing: border-box;
        .inside {
          width: 100%;
          display: inline-block;
          background-color: #025ac4;
          font-size: 0;
          .area-name {
            width: 40px;
            padding: 0 12px;
            display: inline-block;
            text-align: center;
            font-size: 16px;
            color: #ffffff;
            vertical-align: middle;
          }
          .town-list {
            width: 894px;
            display: inline-block;
            background-color: #ffffff;
            vertical-align: middle;
            > .last {
              margin-bottom: 0;
            }
            > div {
              margin-left: 2px;
              margin-bottom: 2px;
              font-size: 0;
              > span {
                width: 94px;
                height: 50px;
                line-height: 50px;
                display: inline-block;
                vertical-align: middle;
                font-size: 12px;
                text-align: center;
                background-color: #eeeeee;
              }
              .warning-list {
                width: 798px;
                height: 50px;
                display: inline-block;
                vertical-align: middle;
                span {
                  width: 79px;
                  height: 50px;
                  margin-left: 1px;
                  display: block;
                  float: left;
                  background-color: #eeeeee;
                  img {
                    width: 50px;
                    height: 40px;
                    margin: 5px auto;
                    display: block;
                  }
                }
                .last {
                  width: 77px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
