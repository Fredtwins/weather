<template>
  <div @mouseleave="popHide" v-show="popShow" class="pos-echart"  :style="{left:left,top:spotTop}">
      <div class="pop-title">{{title}}</div>
      <div class="pop-content" id="echartDom">内容</div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    props: {
        spotLeft: {
            type: String,
            default: '0px'
        },
        spotTop: {
            type: String,
            default: '0px'
        },
        popShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '标题'
        }
    },
    computed: {
        left() {
            if(parseFloat(this.spotLeft) > (740 - 590)) {
                return (740 - 590) + 'px'
            }else {
                return this.spotLeft
            }
        }
    },
    mounted() {
        this.getEchart()
        // alert(90)
    },
    methods: {
        getEchart() {
            let chartElement = echarts.init(document.getElementById('echartDom'));
            let option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                    // symbol: 'http://www.fs121.com/images/wf/2.gif',
                    symbolSize: 18,
                }]
            };
            chartElement.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [{
                        value: 100,
                        symbol: `image://${require("./img/10.gif")}`,
                        symbolRotate: 190
                    },{
                        value: 200,
                        symbol: `image://${require("./img/2.gif")}`,
                        symbolRotate: 21
                    },{
                        value: 130,
                        symbol: `image://${require("./img/4.gif")}`,
                        symbolRotate: 23
                    },{
                        value: 104,
                        symbol: `image://${require("./img/6.gif")}`,
                        symbolRotate: 123
                    },{
                        value: 400,
                        symbol: `image://${require("./img/8.gif")}`,
                        symbolRotate: 140
                    },{
                        value: 130,
                        symbol: `image://${require("./img/10.gif")}`,
                        symbolRotate: 200
                    },{
                        value: 190,
                        symbol: `image://${require("./img/12.gif")}`,
                        symbolRotate: 100
                    }],
                    type: 'line',
                    smooth: true,
                    showSymbol: true,
                    symbol: `image://${require("./img/12.gif")}`,
                    symbolKeepAspect: true,
                    symbolSize: 60,
                }]
            })

        },
        popHide() {
            this.$emit('popHide')
        }
    }
}
</script>

<style lang="scss">
.pos-echart {
    position: absolute;
    z-index: 1000;
    background-color: #fff;
    width: 590px;
    min-height: 300px;
    border: 1px solid #025ac4;
    .pop-title {
        color: #ffffff;
        background-color: #025ac4;
        text-align: center;
    }
    .pop-content {
        width: 590px;
        height: 300px;
    }
}
</style>
