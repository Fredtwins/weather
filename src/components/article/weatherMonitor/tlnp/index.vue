<template>
  <div class="monitor-tlnp">
    <select-ctrl @selectUpdate="selectUpdate" />
    <nav-ctrl :canvas-id="canvasId" />
    <tlnp-box
      :canvas-id="canvasId"
      :layer="layer"
      :canvas-target="canvasTarget"
    />
    <hodograph-box
      :canvas-id="canvasId"
      :layer="layer"
      :canvas-target="canvasTarget"
    />
    <height-box
      :canvas-id="canvasId"
      :layer="layer"
      :canvas-target="canvasTarget"
    />
    <v-distributon-box
      :canvas-id="canvasId"
      :layer="layer"
      :canvas-target="canvasTarget"
    />
    <div class="tlnp-desc-area">
      <div class="title">说 明：</div>
      <div class="content">
        <p>&nbsp;&nbsp;点击进入更详细的<a
            href="/tlnpdoc/index.html"
            target="blank"
            style="font-size:1.2em;font-weight:bold;color:blue;"
          >说明</a></p>
        <p>1.必须使用支持HTML5的浏览器，新近版Firefox、Safari、Opera、Chrome测试通过。IE9(非兼容性视图模式)可用，IE6、7、8不可用。</p>
        <p>2.测站列表中，如果选项不可选择（灰色），表示当前时次该站资料未到</p>
        <p>&nbsp;【特别提醒】</p>
        <p>&nbsp;本应用处于开发阶段，可能存在理论不透，算法不佳，程序有BUG等问题，请小心使用。</p>
        <p>&nbsp;【<a
            href="http://www.fs121.com/Changelog.tlnp.html"
            target="_blank"
            style="font-size:1.2em;font-weight:bold;color:blue;"
          >Changelog</a>】</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import selectCtrl from './select'
import navCtrl from './nav'
import tlnpBox from './tlnp'
import hodographBox from './hodograph'
import heightBox from './height'
import vDistributonBox from './v-distribution'

// canvas模块加载
import canvasTarget from './canvas_plugin/target'
import canvasUtil from './canvas_plugin/util'
import canvasMath from './canvas_plugin/math'
import canvasMatrix from './canvas_plugin/matrix'
import canvasGeometry2D from './canvas_plugin/geometry2D'
import canvasConstant from './canvas_plugin/constant'
import canvasPhy from './canvas_plugin/phy'
import canvasG2dlnp from './canvas_plugin/g2dlnp'
import canvasDataupper from './canvas_plugin/data.upper'
import canvasWsymbol from './canvas_plugin/wsymbol'
import canvasTlnputil from './canvas_plugin/tlnputil'
import canvasTlnp from './canvas_plugin/tlnp'
import canvasTlnpcanvas from './canvas_plugin/tlnpcanvas'
import canvasTlnpplugin from './canvas_plugin/tlnpplugin'

export default {
  components: {
    selectCtrl,
    navCtrl,
    tlnpBox,
    hodographBox,
    heightBox,
    vDistributonBox
  },
  data() {
    return {
      station: {},
      time: '',
      layer: 'ema50',
      canvasId: 'canvas-tlnp',
      canvasData: {},
      canvasTarget: null
    }
  },
  beforeRouteUpdate(to, from, next) {
    let id = 'canvas-' + to.params.id
    id != this.canvasId && (this.canvasId = id) && next()
  },
  methods: {

    // 顶部select切换
    selectUpdate(data) {
      if (data.station.id != this.station.id || data.time != data.time) {
        this.dataUpdate(data)
      } else if (data.layer != this.layer) {
        this.layer = data.layer
      }
    },

    // 获取图表数据
    async dataUpdate(data) {
      this.station = data.station
      this.time = data.time
      this.layer = data.layer
      const canvasData = await axios.get('/dat/upper/upper.js').then(res => {
        return res.data
      })
      this.createDrawObject(canvasData)
    },

    // 创建绘制tlnp图的对象
    createDrawObject(data) {
      const target = canvasTarget()
      canvasUtil(target)
      canvasMath(target)
      canvasMatrix(target)
      canvasGeometry2D(target)
      canvasConstant(target)
      canvasPhy(target)
      canvasG2dlnp(target)
      canvasDataupper(target)
      canvasWsymbol(target)
      canvasTlnputil(target)
      canvasTlnp(target)
      canvasTlnpcanvas(target)
      canvasTlnpplugin(target)
      const dataMnt = target.data.upper()
      dataMnt.setData(data, { current: true, ...this.station })
      this.canvasTarget = { dataMnt, target }
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-tlnp {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
  .tlnp-desc-area {
    width: 100%;
    height: auto;
    margin-top: 10px;
    padding: 1px;
    box-sizing: border-box;
    border: 1px #025bc4 solid;
    .title {
      width: 100%;
      height: 25px;
      line-height: 25px;
      background: #025bc4;
      text-indent: 12px;
      font-size: 12px;
      font-family: "宋体";
      color: #fff;
    }
    .content {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      font-family: "宋体";
      color: #000;
      line-height: 22px;
    }
  }
}
</style>
