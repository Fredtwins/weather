<template>
  <div
    class='monitor-tlnp-canvas'
    :style="{'display':canvasId=='canvas-hodograph'?'inline-block':'none'}"
  >
    <div class="canvas-area">
      <canvas
        id="canvas-hodograph"
        width="744"
        height="760"
      ></canvas>
    </div>
    <form class="form-area">
      <div class="form-item">
        <label for="yaxis_lnp2">气压轴处理方式：</label>
        <div class="radio-box">
          <input
            type="radio"
            name="yaxis_lnp2"
            value="ln"
            v-model="yaxis_lnp2"
            @change="formDataChange"
          />
          <label>对数</label>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="yaxis_lnp2"
            value=""
            v-model="yaxis_lnp2"
            @change="formDataChange"
          />
          <label>线性</label>
        </div>
      </div>
      <div class="form-item">
        <label for="graph">项目：</label>
        <div class="radio-box">
          <input
            type="radio"
            name="graph"
            value="hodograph"
            v-model="graph"
            @change="formDataChange"
          />
          <label>高空风分析图</label>
        </div>
        <div class="little-form-item">
          <div class="form-item">
            <label for="wind_unit">-标值单位：</label>
            <div class="radio-box">
              <input
                type="radio"
                name="wind_unit"
                value="h"
                v-model="wind_unit"
                @change="formDataChange"
              />
              <label>位势十米(dagpm)</label>
            </div>
            <div class="radio-box">
              <input
                type="radio"
                name="wind_unit"
                value="p"
                v-model="wind_unit"
                @change="formDataChange"
              />
              <label>百帕(hPa)</label>
            </div>
          </div>
          <div class="form-item">
            <label for="wf_profile">-风速分布指示：</label>
            <div class="radio-box">
              <input
                type="radio"
                name="wf_profile"
                value="sn"
                v-model="wf_profile"
                @change="formDataChange"
              />
              <label>南北分量</label>
            </div>
            <div class="radio-box">
              <input
                type="radio"
                name="wf_profile"
                value="ew"
                v-model="wf_profile"
                @change="formDataChange"
              />
              <label>东西分量</label>
            </div>
            <div class="radio-box">
              <input
                type="radio"
                name="wf_profile"
                value="hom"
                v-model="wf_profile"
                @change="formDataChange"
              />
              <label>同向</label>
            </div>
          </div>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="graph"
            value="vwprofile"
            v-model="graph"
            @change="formDataChange"
          />
          <label>垂直风速廓线</label>
        </div>
      </div>
    </form>
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
      yaxis_lnp2: 'ln',
      graph: 'hodograph',
      wind_unit: 'h',
      wf_profile: 'sn'
    }
  },

  methods: {

    // 绘制图表 
    draw() {
      if (this.canvasTarget) {
        this.graph == 'hodograph' ? this.drawHodograph() : this.drawVwprofile()
      }
    },

    // 绘制高空风分析图
    drawHodograph() {
      const { target, dataMnt } = this.canvasTarget
      const data = dataMnt.getSeries('w&h')
      const canv = document.getElementById("canvas-hodograph")
      const ctx = canv.getContext("2d")
      ctx.clearRect(0, 0, 744, 760);
      this.setHodograph(data, ctx, 20, 20, 360, { usingP: this.wind_unit == 'p' });
      target.wsymbol.drawWindPillar(ctx, data, {
        x: 755,
        y: 0,
        width: 150,
        height: 770,
        fWidth: 1,
        backgroundStyle: "rgba(255,255,555,1)",
        usingLnp: this.yaxis_lnp2 == 'ln',
        wfprofile: this.graph
      })
    },

    // 设置高空风分析图数据
    setHodograph(data, ctx, x, y, radius, opt) {
      const { target } = this.canvasTarget
      var _opt = {
        x: x + radius,
        y: y + radius,
        radius: radius,
        interval: 3,
        fWidth: .5,
        fcolor: 'blue',
        backgroundStyle: "rgba(255,238,119,1)"
      }
      target.util.extend(_opt, opt || {});
      target.wsymbol.drawHodograph(ctx, data, _opt);
    },

    // 绘制垂直风速廓线图
    drawVwprofile() {
      const { target, dataMnt } = this.canvasTarget
      const tlnpTarget = target.tmgram.tlnp("canvas-hodograph", dataMnt, { no_padding: false })
      const dowithP = this.yaxis_lnp2 == 'ln' ? 'ln' : 'linear'
      tlnpTarget.setOption({
        diagram_mode: this.layer,
        plugins: target.tmgram.PLUGIN_GROUP.V_WindSpeedProfile,
        plugin_opt: {
          CanvasReset: { dowithP }
        }
      })
      tlnpTarget.draw()
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
  .form-area {
    display: inline-block;
    vertical-align: top;
  }
  .canvas-area {
    width: 744px;
    height: 760px;
    margin-right: 26px;
  }
  .hide {
    display: none;
  }
  .form-area {
    width: 179px;
    height: 760px;
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
    .little-form-item {
      width: 100%;
      padding: 10px 0 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
