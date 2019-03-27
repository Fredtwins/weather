export default function(target) {

  target.namespace("tmgram").tlnp = function(_, $, A) { return new target.tmgram.tlnp.prototype.create(_, $, A) };
  target.tmgram.tlnp.prototype = {
    create: function(_, $, A) { this._init(_, $, A || {}); return this },
    _init: function(_, $, A) {
      this.element = 'tlnp'
      // this.element = _;
      this.dataMnt = $;
      if (this.dataMnt == null) throw new TypeError("dataMnt \u4e0d\u80fd\u4e3a\u7a7a!");
      if (typeof this.element === "string") this.element = document.getElementById(_);
      if (this.element == null) throw new TypeError("\u4e0d\u80fd\u4e3a\u7a7a\u5143\u7d20!");
      if (this.element.tagName && this.element.tagName !== "CANVAS") throw new TypeError("\u5fc5\u987b\u4e3aCANVAS\u5143\u7d20!");
      this._reset(A);
      return this
    },
    _reset: function(E) {
      E = E || {};
      E.plugin_opt = E.plugin_opt || {};
      this._canvas = target.tmgram.Canvas.create(this.element, E || {});
      var A = this.pluginMnt = target.tmgram.PluginMnt(this._canvas, this.dataMnt),
        $ = E.plugins != null ? E.plugins : target.tmgram.PLUGIN_GROUP.STD;
      for (var G = 0; G < $.length; G++) {
        var B = $[G][0],
          F = $[G][1],
          D = null,
          _ = B.indexOf(".");
        if (_ != -1) {
          D = B.substring(_ + 1);
          B = B.substring(0, _)
        }
        E.plugin_opt[B] = E.plugin_opt[B] || {};
        if (F != null) {
          var C = target.util.extend({}, F, E.plugin_opt[B]);
          E.plugin_opt[B] = C
        }
        A.register(B, D)
      }
    },
    setOption: function($) { this._reset($); return this },
    draw: function() {
      this._canvas.clear();
      this.pluginMnt.draw()
    }
  };
  target.tmgram.tlnp.prototype.create.prototype = target.tmgram.tlnp.prototype
}