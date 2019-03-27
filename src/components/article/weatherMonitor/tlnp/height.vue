<template>
  <div class='monitor-tlnp-canvas'
    :style="{'display':canvasId=='canvas-height'?'inline-block':'none'}"
  >
    <div class="canvas-area">
      <canvas
        id="canvas-height"
        width="744"
        height="537"
      ></canvas>
    </div>
    <form class="form-area">
      <div class="form-item">
        <label for="canvas_type">项目：</label>
        <div class="radio-box">
          <input
            type="radio"
            name="canvas_type"
            value="LCL"
            v-model="canvas_type"
            @change="formDataChange"
          />
          <label>抬升凝结高度LCL,自由对流高度LFC,平衡高度EL,对流上限高度EAL</label>
        </div>
        <div class="little-form-item">
          <div class="form-item">
            <label for="stateCurve_orgin3">—状态线出发点：</label>
            <div class="radio-box">
              <input
                type="radio"
                name="stateCurve_orgin3"
                value="lowest"
                v-model="stateCurve_orgin3"
                @change="formDataChange"
              />
              <label>探空底层</label>
            </div>
            <div class="radio-box">
              <input
                type="radio"
                name="stateCurve_orgin3"
                value="inversion_lid"
                v-model="stateCurve_orgin3"
                @change="formDataChange"
              />
              <label>逆温层顶</label>
            </div>
            <div class="radio-box">
              <input
                type="radio"
                name="stateCurve_orgin3"
                value="surf"
                v-model="stateCurve_orgin3"
                @change="formDataChange"
              />
              <label>地面</label>
            </div>
          </div>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="canvas_type"
            value="CCL"
            v-model="canvas_type"
            @change="formDataChange"
          />
          <label>对流凝结高度CCL,对流温度Ts</label>
        </div>
        <div class="little-form-item">
          <div class="form-item">
            <label for="when_inversion3">—遇较强逆温时，假定气块在逆温层顶沿何途径上升：</label>
            <div class="radio-box">
              <input
                type="radio"
                name="when_inversion3"
                value="moist_adiabat_first"
                v-model="when_inversion3"
                @change="formDataChange"
              />
              <label>湿绝热线</label>
            </div>
            <div class="radio-box">
              <input
                type="radio"
                name="when_inversion3"
                value="dry_adiabat_first"
                v-model="when_inversion3"
                @change="formDataChange"
              />
              <label>干绝热线</label>
            </div>
            <div class="radio-box">
              <input
                type="radio"
                name="when_inversion3"
                value="skip"
                v-model="when_inversion3"
                @change="formDataChange"
              />
              <label>忽视逆温</label>
            </div>
          </div>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="canvas_type"
            value="SpecialTempLayer"
            v-model="canvas_type"
            @change="formDataChange"
          />
          <label>几个温度层</label>
        </div>
        <div class="radio-box">
          <input
            type="radio"
            name="canvas_type"
            value="p-h_curve"
            v-model="canvas_type"
            @change="formDataChange"
          />
          <label>压-高曲线(黑)</label>
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
      canvas_type: 'LCL',
      stateCurve_orgin3: 'lowest',
      when_inversion3: 'moist_adiabat_first'
    }
  },

  methods: {

    // 绘制图表 
    draw() {
      if (this.canvasTarget) {
        const { target, dataMnt } = this.canvasTarget
        const tlnpTarget = target.tmgram.tlnp("canvas-height", dataMnt)
        let orgin = this.stateCurve_orgin3, inv = this.when_inversion3
        switch (this.canvas_type) {
          case "LCL": tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.LCL, plugin_opt: { StateCurve: { orgin: orgin }, LCL: { orgin: orgin } } }); break;
          case "CCL": tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.CCL, plugin_opt: { CCL: { when_inversion: inv } } }); break;
          case "SpecialTempLayer": tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.SpecialTempLayer, plugin_opt: {} }); break;
          default: tlnpTarget.setOption({ diagram_mode: this.layer, plugins: target.tmgram.PLUGIN_GROUP.P_H });
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
    height: 537px;
    margin-right: 26px;
  }
  .hide {
    display: none;
  }
  .form-area {
    width: 179px;
    height: 537px;
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
        line-height: 16px;
        margin-bottom: 10px;
        display: block;
        font-size: 13px;
      }
      .check-box,
      .radio-box {
        width: 100%;
        line-height: 16px;
        margin-bottom: 5px;
        font-size: 0;
        input,
        label {
          line-height: 16px;
          display: inline;
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