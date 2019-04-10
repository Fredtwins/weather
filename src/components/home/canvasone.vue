<template>
  <div class="canvaslistone">
    <canvas id="canvasz"></canvas>
  </div>
</template>

<script>
import $ from "jquery"
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'CANVASTEN'
    ])
  },
  methods: {
    // 显示canvas图
    _getcanvasList () {
      var _this = this
      $(function() {
        //温度走势图start
        var tmaxarr = []
        var tminarr = []
        for (var i = 0; i < _this.CANVASTEN.nDay.length; i++) {
          tmaxarr.push((parseInt(_this.CANVASTEN.nDay[i].tmax)))
          tminarr.push((parseInt(_this.CANVASTEN.nDay[i].tmin)))
        }
        var forecast = new Array();
        forecast[0] = new Array();
        forecast[1] = new Array();
        forecast[2] = new Array();
        forecast[3] = new Array();
        forecast[4] = new Array();
        forecast[5] = new Array();
        forecast[6] = new Array();
        forecast[7] = new Array();
        forecast[8] = new Array();
        forecast[9] = new Array();

        forecast[0]["high"] = tmaxarr[0];
        forecast[0]["low"] = tminarr[0];
        forecast[1]["high"] = tmaxarr[1];
        forecast[1]["low"] = tminarr[1];
        forecast[2]["high"] = tmaxarr[2];
        forecast[2]["low"] = tminarr[2];
        forecast[3]["high"] = tmaxarr[3];
        forecast[3]["low"] = tminarr[3];
        forecast[4]["high"] = tmaxarr[4];
        forecast[4]["low"] = tminarr[4];
        forecast[5]["high"] = tmaxarr[5];
        forecast[5]["low"] = tminarr[5];
        forecast[6]["high"] = tmaxarr[6];
        forecast[6]["low"] = tminarr[6];
        forecast[7]["high"] = tmaxarr[7];
        forecast[7]["low"] = tminarr[7];
        forecast[8]["high"] = tmaxarr[8];
        forecast[8]["low"] = tminarr[8];
        forecast[9]["high"] = tmaxarr[9];
        forecast[9]["low"] = tminarr[9];
        // console.log(forecast)
        var maxTemp = forecast[0]['high'];
        var minTemp = forecast[0]['low'];

        var high_tep_arr = [];
        for (var x = 0; x < forecast.length; x++) {
          var high_tep = forecast[x]['high'];
          if (high_tep > maxTemp) {
            maxTemp = high_tep;
          }
          high_tep_arr.push(high_tep);
        }
        var low_tep_arr = [];
        for (x = 0; x < forecast.length; x++) {
          var low_tep = forecast[x]['low'];
          if (low_tep < minTemp) {
            minTemp = low_tep;
          }
          low_tep_arr.push(low_tep);
        }
        var canvasz = document.getElementById("canvasz");
        var context = canvasz.getContext("2d");
        canvasz.width = 750;
        var item_width = 77;
        var wencha = maxTemp - minTemp;
        var tem_pexi = (80 / (maxTemp - minTemp)); //计算每度对应的px。80是自己设定的，这里画布总高是174,所以我设定这几天最高温度和最低温度之间间距为80。
        context.translate(30, maxTemp * tem_pexi + 40); //画布的偏移量，53是画布x轴从左向右方向偏移。后面的值是y轴（细说一下：web里面的坐标轴和我们数学知识上学习的坐标系，y轴是相反的。故这里画点为了让温度高的点显示在温度低的上面，我们要取反。取反以后这个点就跑到画布以外去了，所以我们要向正方向偏移出来。偏移的数值，我这里是选择了最高温度所占对应px加上每个点上要写文字的距离，从而计算出来）。
        //折线走势
        var new_high_x = [];
        var new_high_y = [];

        function draw_line(a, high_color_line) {
          // console.log(a)
          new_high_x = [];
          new_high_y = [];
          for (var j = 0; j < a.length; j++) { //a温度数组
            //画点
            context.beginPath();
            var high_y = parseInt(Number(a[j]) * tem_pexi);
            var high_x = j * item_width;
            context.arc(high_x, -high_y, 3, 0, 2 * Math.PI, true);
            context.strokeStyle = high_color_line;
            context.stroke();
            context.fillStyle = high_color_line;
            context.fill();
            context.closePath();
            //画线
            new_high_x.push(high_x);
            new_high_y.push(-high_y);
            //写文字
            if (a == high_tep_arr) {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#333";
              context.fillText(a[j] + "°", high_x - 10, -high_y - 10, 50);
              context.stroke();
              context.closePath();
            } else {
              context.beginPath();
              context.font = "12px 微软雅黑";
              context.fillStyle = "#333";
              context.fillText(a[j] + "°", high_x - 10, -high_y + 30, 50);
              context.stroke();
              context.closePath();
            }
          }
          for (var z = 0; z < 15; z++) {
            // if (z == 6) {
            //   continue;
            // }
            context.beginPath();
            context.moveTo(new_high_x[z], new_high_y[z]);
            context.lineTo(new_high_x[z + 1], new_high_y[z + 1]);
            context.strokeStyle = high_color_line;
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
          }
        }
        draw_line(high_tep_arr, '#fcc370');
        draw_line(low_tep_arr, '#94ccf9');
        //温度走势图end
      })
    }
  },
  created () {

  },
  mounted () {
    setTimeout(() => {
      this._getcanvasList()
    }, 40)
  }
}
</script>

<style lang="scss" scoped>

</style>
