export default function(target) {

  var _ = {
      diagram_mode: "ema50",
      default_settings: { padding_left: 25, padding_right: 25, padding_top: 15, padding_bottom: 15, tmin: -85, tmax: 40, pmin: 50, pmax: 1050, dowithP: "ln" },
      create: function($, A) {
        var _ = Object.create(this);
        _.ctx = $.getContext("2d");
        _.settings = target.util.extend({}, this.default_settings);
        _.settings.element_width = $.width * 1;
        _.settings.element_height = $.height * 1;
        _.setOption(A);
        return _
      },
      getContext: function() { return this.ctx },
      getMode: function() { return this.diagram_mode },
      setOption: function($) {
        if ($) target.util.extend(this.settings, $);
        this._init0();
        this._init()
      },
      _init0: function() {
        var $ = this.settings;
        if ($.no_padding) {
          $.padding_left = 0;
          $.padding_right = 0;
          $.padding_top = 0;
          $.padding_bottom = 0
        }
        $.viewport_width = $.element_width - $.padding_left - $.padding_right;
        $.viewport_height = $.element_height - $.padding_top - $.padding_bottom;
        $.viewport_left = $.padding_left;
        $.viewport_right = $.viewport_left + $.viewport_width;
        $.viewport_top = $.padding_top;
        $.viewport_bottom = $.viewport_top + $.viewport_height;
        $.r_tscale = $.viewport_width / ($.tmax - $.tmin)
      },
      _init: function() {
        var $ = this.settings;
        $.lnpmin = this._dowith_p($.pmin);
        $.lnpmax = this._dowith_p($.pmax);
        $.r_pscale = $.viewport_height / (this._dowith_p($.pmax) - this._dowith_p($.pmin))
      },
      _dowith_p: function($) { return this.settings.dowithP == "linear" ? $ : Math.log($) },
      clear: function() {
        var $ = this.settings.element_width,
          _ = this.settings.element_height;
        this.ctx.clearRect(0, 0, $, _)
      },
      clip_viewport: function() {
        var $ = this.settings;
        this.ctx.beginPath();
        this.ctx.rect($.viewport_left, $.viewport_top, $.viewport_width, $.viewport_height);
        this.ctx.clip()
      },
      fill: function(A, C) {
        var _ = this.ctx;
        _.save();
        this.clip_viewport();
        _.beginPath();
        for (var $ in C) _[$] = C[$];
        _.moveTo(A[0], A[1]);
        for (var D = 2, B = A.length; D < B; D += 2) _.lineTo(A[D], A[D + 1]);
        _.closePath();
        _.fill();
        _.restore()
      },
      draw_labels: function(I, H, D) {
        var A = this.ctx;
        A.save();
        A.beginPath();
        if (D)
          for (var _ in D) A[_] = D[_];
        for (var K = 0, C = I.length; K < C; K += 3) {
          var B = I[K],
            J = I[K + 1],
            G = I[K + 2];
          A.setTransform(1, 0, 0, 1, 0, 0);
          A.translate(J, G);
          if (H.rotation != null) A.rotate(H.rotation);
          if (H.bg_color) {
            A.fillStyle = H.bg_color;
            var $ = A.measureText(B).width;
            A.fillRect(F(A.textAlign, $), E(A.textBaseline, H.font_height), $, H.font_height)
          }
          A.fillStyle = H.label_color;
          A.fillText(B, 0, 0);
          if (H.unit && K == C - 3) {
            $ = A.measureText(B).width;
            A.textAlign = "left";
            A.fillText(H.unit, 0.5 * $, 0)
          }
        }
        A.stroke();
        A.closePath();
        A.restore();

        function F(_, $) {
          switch (_) {
            case "center":
              return -0.5 * $;
            case "right":
              return -$;
            default:
              return 0
          }
        }

        function E(_, $) {
          var A;
          switch (_) {
            case "middle":
              A = -0.5 * $;
              break;
            case "bottom":
              A = -$;
              break;
            default:
              A = 0
          }
          return A - 1
        }
      },
      toPx: function(_) { var $ = this; return _.map(function(_, A) { return A % 2 == 0 ? $.coor_x(_) : $.coor_y(_) }) },
      draw_node: function(A, D, C) {
        var _ = this.ctx;
        _.save();
        _.beginPath();
        for (var $ in C) _[$] = C[$];
        for (var E = 0, B = A.length; E < B; E += 2) {
          _.beginPath();
          _.arc(A[E], A[E + 1], D.node_radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
          _.stroke();
          _.fill();
          _.closePath()
        }
      },
      draw_polyline: function(A, C) {
        var _ = this.ctx;
        _.save();
        _.beginPath();
        for (var $ in C) _[$] = C[$];
        this.clip_viewport();
        _.moveTo(A[0], A[1]);
        for (var D = 2, B = A.length; D < B; D += 2) _.lineTo(A[D], A[D + 1]);
        _.stroke();
        _.closePath();
        _.restore()
      },
      draw_wrapline: function($, _) { this.draw_polyline(this.toPx($), _) },
      coor_x: function($) { return this.settings.viewport_left + ($ - this.settings.tmin) * this.settings.r_tscale },
      coor_y: function($) { return this.settings.viewport_top + (this._dowith_p($) - this.settings.lnpmin) * this.settings.r_pscale },
      legend_frame: function(B) {
        var A = this.ctx,
          _ = this.settings,
          $ = B;
        return {
          draw: function() {
            var D = this.X(-$.padding),
              C = this.Y(-$.padding),
              _ = $.width + 2 * $.padding,
              B = $.height + 2 * $.padding;
            A.beginPath();
            A.strokeStyle = $.border_strokeStyle;
            A.lineWidth = $.border_lineWidth;
            if ($.fillStyle) {
              A.fillStyle = $.fillStyle;
              A.fillRect(D, C, _, B)
            }
            A.strokeRect(D, C, _, B);
            A.closePath()
          },
          X: function(A) {
            switch ($.position) {
              case "lt":
              case "lb":
                return _.viewport_left + $.dx + $.padding + A;
              default:
                return _.viewport_right - $.dx - $.width - $.padding + A
            }
          },
          Y: function(A) {
            switch ($.position) {
              case "lt":
              case "rt":
                return _.viewport_top + $.dy + $.padding + A;
              default:
                return _.viewport_bottom - $.dy - $.height - $.padding + A
            }
          }
        }
      }
    },
    $ = Object.create(_);
  $.default_settings = target.util.extend({}, $.default_settings, _.default_settings, { pmin: 200, pmin_low: 200, pmax_low: 1050, pmin_high: 50, pmax_high: 262.5 });
  target.util.extend($, {
    diagram_mode: "ema200",
    _init: function() {
      var $ = this.settings;
      $.lnpmin_low = this._dowith_p($.pmin_low);
      $.lnpmax_low = this._dowith_p($.pmax_low);
      $.lnpmin_high = this._dowith_p($.pmin_high);
      $.lnpmax_high = this._dowith_p($.pmax_high);
      $.r_pscale_low = $.viewport_height / ($.lnpmax_low - $.lnpmin_low);
      $.r_pscale_high = $.viewport_height / ($.lnpmax_high - $.lnpmin_high)
    },
    draw_wrapline: function(C, F, E) {
      var A = this.settings,
        D = [],
        B = -1;
      for (var G = 0, $ = C.length; G < $; G += 2) {
        var _ = C[G + 1];
        if (_ >= A.pmax_high) B = G;
        D.push(this.coor_x(C[G]), this.coor_y(_));
        if (_ < A.pmin) break
      }
      this.draw_polyline(D, F);
      if (!E && B > 0) {
        D = [];
        for (G = B, $ = C.length; G < $; G += 2) D.push(this.coor_x(C[G]), this.coor_yhigh(C[G + 1]));
        this.draw_polyline(D, F)
      }
    },
    coor_yhigh: function($) { return this.settings.viewport_top + (this._dowith_p($) - this.settings.lnpmin_high) * this.settings.r_pscale_high },
    coor_ylow: function($) { return this.settings.viewport_top + (this._dowith_p($) - this.settings.lnpmin_low) * this.settings.r_pscale_low },
    coor_y: function($) { return this.coor_ylow($) },
    toPx: function(C, $) {
      var B = [];
      for (var E = 0, D = C.length; E < D; E += 2) {
        var _ = C[E],
          A = C[E + 1];
        if ($) { if (A >= this.settings.pmin_low) B.push(this.coor_x(_), this.coor_ylow(A)); if (A <= this.settings.pmax_high) B.push(this.coor_x(_), this.coor_yhigh(A)) } else B.push(this.coor_x(_), this.coor_ylow(A))
      }
      return B
    }
  });
  target.namespace("tmgram").Canvas = {
    create: function(A, C) {
      var B = C || {};
      switch (B.diagram_mode) {
        case "ema200":
          return $.create(A, C);
        default:
          return _.create(A, C)
      }
    }
  }
}