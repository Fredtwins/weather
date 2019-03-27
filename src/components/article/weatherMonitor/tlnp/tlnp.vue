<template>
  <div
    class='monitor-tlnp-canvas'
    :style="{'display':canvasId=='canvas-tlnp'?'inline-block':'none'}"
  >
    <div class="canvas-area">
      <canvas
        id="canvas-tlnp"
        width="744"
        height="628"
      ></canvas>
    </div>
    <div class="right-area">
      <div class="side-canvas">
        <canvas
          id="side-canvas"
          width="150"
          height="150"
        ></canvas>
      </div>
      <form class="form-area">
        <div class="form-item">
          <label for="stateCurve_orgin">状态曲线出发点：</label>
          <div class="radio-box">
            <input
              type="radio"
              name="stateCurve_orgin"
              value="lowest"
              v-model="stateCurve_orgin"
              @change="formDataChange"
            />
            <label>探空底层</label>
          </div>
          <div class="radio-box">
            <input
              type="radio"
              name="stateCurve_orgin"
              value="inversion_lid"
              v-model="stateCurve_orgin"
              @change="formDataChange"
            />
            <label>逆温层顶(如果有)</label>
          </div>
          <div class="radio-box">
            <input
              type="radio"
              name="stateCurve_orgin"
              value="surf"
              v-model="stateCurve_orgin"
              @change="formDataChange"
            />
            <label>地面(如果有)</label>
          </div>
        </div>
        <div class="form-item">
          <div class="check-box">
            <input
              type="checkbox"
              name="idx"
              v-model="idx"
              @change="formDataChange"
            />
            <label>显示指数 </label>
          </div>
        </div>
        <div class="form-item">
          <div class="graph-desc">
            <span class="title">图例：</span>
            <div class="line-box">
              <span style="background-color:#FFEE77;color:#FF9966">橙斜——</span>
              <span>干绝热线</span>
            </div>
            <div class="line-box">
              <span style="background-color:#FFEE77;color:#3366FF">蓝线——</span>
              <span>湿绝热线</span>
            </div>
            <div class="line-box">
              <span style="background-color:#FFEE77;color:green">绿线——</span>
              <span>饱和比湿</span>
            </div>
            <div class="line-box">
              <span style="background-color:#FFEE77;color:red">红线——</span>
              <span>温度层结</span>
            </div>
            <div class="line-box">
              <span style="background-color:#FFEE77;color:#9900FF">紫线——</span>
              <span>露点层结</span>
            </div>
            <div class="line-box">
              <span style="background-color:#FFEE77;color:brown">棕线——</span>
              <span>状态曲线</span>
            </div>
          </div>
          <div class="graph-desc">
            <span class="title">坐标：</span>
            <p>上横—绝对温度(K)</p>
            <p>下横—温度(℃)</p>
            <p>左纵外—气压(hPa)</p>
            <p>左纵内—气压(折层上部)</p>
            <p>右纵外—高度(dagpm)</p>
            <p>右纵内—实测高度</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    layer: String,
    canvasId: String,
    canvasTarget: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      idx: false,
      stateCurve_orgin: 'lowest'
    }
  },

  methods: {

    // 绘制图表 
    draw() {
      if (this.canvasTarget) {
        const { target, dataMnt } = this.canvasTarget
        const tlnpTarget = target.tmgram.tlnp("canvas-tlnp", dataMnt, { no_padding: false })
        tlnpTarget.setOption({ diagram_mode: this.layer, plugin_opt: { StateCurve: { orgin: this.stateCurve_orgin }, Idx: { hide: !this.idx } } })
        tlnpTarget.draw()
        this.drawSideCanvas()
      }
    },

    // 绘制右侧小图
    drawSideCanvas() {
      const { target, dataMnt } = this.canvasTarget
      const ctx = document.getElementById("side-canvas").getContext("2d")
      const data = dataMnt.getSeries('w&h')
      const options = {
        x: 75,
        y: 75,
        radius: 75,
        interval: 3,
        fWidth: 0.5,
        fcolor: 'blue',
        backgroundStyle: "rgba(255,238,119,1)"
      }
      target.util.extend(options, { no_label: true })
      target.wsymbol.drawHodograph(ctx, data, options)
    },

    formDataChange() {
      this.draw()
    }
  },
  watch: {
    canvasTarget() {
      this.$nextTick(() => {
        this.draw()
      })
    },
    layer() {
      this.$nextTick(() => {
        this.draw()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-tlnp-canvas {
  width: 100%;
  display: inline-block;
  font-size: 0;
  .canvas-area,
  .right-area {
    display: inline-block;
    vertical-align: top;
  }
  .canvas-area {
    width: 744px;
    height: 628px;
    margin-right: 26px;
  }
  .right-area {
    width: 179px;
    .side-canvas {
      width: 150px;
      height: 150px;
      margin: 0 auto 10px;
    }
    .form-area {
      width: 179px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #eee;
      border: 1px solid #000000;
      font-family: "宋体";
      .form-item {
        width: 100%;
        margin-bottom: 20px;
        > label {
          width: 100%;
          height: 16px;
          line-height: 16px;
          margin-bottom: 10px;
          display: block;
          font-size: 13px;
        }
        .check-box,
        .radio-box {
          width: 100%;
          height: 16px;
          margin-bottom: 5px;
          font-size: 0;
          input,
          label {
            height: 16px;
            line-height: 16px;
            display: inline-block;
            vertical-align: middle;
          }
          input {
            width: 16px;
            margin-right: 5px;
          }
          label {
            font-size: 12px;
          }
        }
      }
      .graph-desc {
        width: 100%;
        margin-bottom: 10px;
        .title {
          height: 18px;
          line-height: 18px;
          display: block;
          color: #2e2e2e;
          font-size: 14px;
        }
        .line-box {
          height: 20px;
          line-height: 20px;
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
