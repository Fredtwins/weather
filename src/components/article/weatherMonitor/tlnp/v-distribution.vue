<template>
  <div
    class='monitor-tlnp-canvas'
    :style="{'display':canvasId=='canvas-v-distribution'?'inline-block':'none'}"
  >
    <div class="canvas-area">
      <canvas
        id="canvas-v-distribution"
        width="744"
        height="640"
      ></canvas>
    </div>
    <form class="form-area">
      <div class="form-item">
        <label for="yaxis_lnp4">气压轴处理方式：</label>
        <div class="radio-box">
          <input
            type="radio"
            name="yaxis_lnp4"
            value="ln"
            v-model="yaxis_lnp4"
            @change="formDataChange"
          />
          <label>对数</label>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="yaxis_lnp4"
            value=""
            v-model="yaxis_lnp4"
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
            value="q"
            v-model="graph"
            @change="formDataChange"
          />
          <label>比湿</label>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="graph"
            value="rh"
            v-model="graph"
            @change="formDataChange"
          />
          <label>相对湿度</label>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="graph"
            value="V_3theta"
            v-model="graph"
            @change="formDataChange"
          />
          <label>V-3θ (θ,θse,θ*)</label>
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
      yaxis_lnp4: 'ln',
      graph: 'q'
    }
  },

  methods: {

    // 绘制图表 
    draw() {
      if (this.canvasTarget) {
        const { target, dataMnt } = this.canvasTarget
        let dowithp = this.yaxis_lnp4 == 'ln' ? 'ln' : 'linear'
        const tlnpTarget = target.tmgram.tlnp("canvas-v-distribution", dataMnt, { no_padding: false })
        switch (this.graph) {
          case "q": tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.QCurve, plugin_opt: { CanvasReset: { dowithP: dowithp } } }); break;
          case "rh": tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.RhCurve, plugin_opt: { CanvasReset: { dowithP: dowithp } } }); break;
          case "V_3theta": tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.V_3theta, plugin_opt: { CanvasReset: { dowithP: dowithp } } }); break;
          default: tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.VDISTRIBUTION, plugin_opt: { CanvasReset: { dowithP: dowithp } } });
        }
        tlnpTarget.draw()
      }
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
    height: 640px;
    margin-right: 26px;
  }
  .hide {
    display: none;
  }
  .form-area {
    width: 179px;
    height: 640px;
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
  }
}
</style>
