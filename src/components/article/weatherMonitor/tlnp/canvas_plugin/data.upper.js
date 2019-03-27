export default function(target) {

  var $ = target.phy,
    D = target.g2dlnp;

  function G(_, $) {
    this.data = _;
    this.sta = $;
    this._blend_data = this.blend(_)
  }

  function L() {
    return this.sta
  }

  function E(D) {
    if (!this._blend_data) return null;
    var C = [2, 0],
      B = [],
      F = A(this._blend_data, this.data.surf);
    if (!F) return null;
    B.push($.T(F[2]), F[0]);
    for (var G = F[4]; G < this._blend_data.length; G++) {
      var E = this._blend_data[G];
      if (_(E, C)) B.push($.T(E[2]), E[0])
    }
    return { Td: $.T(F[3]), Tps: B };

    function A(K, C) {
      var F = C,
        I = [2, 3, 0];
      if ("surf" == D && F != null && _(F, I)) {
        return [F[0], F[1], F[2], F[3], 0];
      } else if ("inversion_lid" == D) {
        var A = Number.NEGATIVE_INFINITY,
          H = null;
        for (var J = 0, G = K.length; J < G; J++) {
          F = K[J];
          if (_(F, I) && F[2] >= A && F[0] > 500) {
            H = [F[0], F[1], F[2], F[3], J + 1];
            A = F[2]
          }
        }
        if (H) return H
      } else if ("max_thetase" == D) {
        var B = Number.NEGATIVE_INFINITY,
          H = null;
        for (J = 0, G = K.length; J < G; J++) {
          F = K[J];
          if (_(F, I) && F[0] > 500) {
            var E = $.thetase($.T(F[2]), $.T(F[3]), F[0]);
            if (E > B) {
              H = [F[0], F[1], F[2], F[3], J + 1];
              B = E
            }
          }
        }
        if (H) return H
      }
      for (J = 0, G = K.length; J < G; J++) { F = K[J]; if (_(F, I)) return [F[0], F[1], F[2], F[3], J + 1] }
    }
    return null
  }

  function M($, _) {
    return D.getXonPolyline($, this.getSeries("h", true), _)
  }

  function I($, _) {
    return D.getXonPolyline($, this.getSeries("t", true), _)
  }

  function B($, _) {
    return D.getXonPolyline($, this.getSeries("td", true), _)
  }

  function K(_) {
    var $ = this.getSeries("w");
    for (var B = 2, A = $.length; B < A; B += 3)
      if (_ == $[B]) return [$[B - 2], $[B - 1]];
    return null
  }

  function F(B, C) {
    var _ = C ? this.data.surf : null;
    switch (B) {
      case "h":
        return $(this.data.isob, [1], _);
      case "t":
        return $(this._blend_data, [2], _);
      case "td":
        return $(this._blend_data, [3], _);
      case "t&td":
        return $(this._blend_data, [2, 3], _);
      case "w":
        return $(this._blend_data, [4, 5], _);
      case "w&t":
        return $(this._blend_data, [4, 5, 2], _);
      case "w&h":
        return $(this.data.isob, [4, 5, 1], _);
      default:
        return null
    }

    function $(D, _, C) {
      var $ = A(D, _);
      if (C) {
        var B = H(C, _);
        if (B.length > 0)
          if ($.length > 0) $ = B.concat($)
      }
      return $
    }
  }

  function A(G, B) {
    var A = [],
      $ = B.concat(0);
    if (!G) return A;
    for (var C = 0, F = G.length; C < F; C++) {
      var E = G[C];
      if (!_(E, $)) continue;
      for (var H = 0, D = B.length; H < D; H++) A.push(E[B[H]]);
      A.push(E[0])
    }
    return A
  }

  function H(C, A) {
    var $ = [];
    if (_(C, A.concat(0))) {
      for (var D = 0, B = A.length; D < B; D++) $.push(C[A[D]]);
      $.push(C[0])
    }
    return $
  }

  function _(_, $) {
    for (var B = 0, A = $.length; B < A; B++)
      if (_[$[B]] == null) return false;
    return true
  }

  function J(D) {
    if (!D) return null;
    var $ = [],
      A = ["isob", "spec", "sign"];
    for (var F in A) {
      var C = D[A[F]];
      if (C)
        for (var G = 0, E = C.length; G < E; G++)
          if (C[G][0] != null) $.push(C[G])
    }
    $.sort(function(_, $) { return $[0] - _[0] });
    if ($.length > 1) {
      var G = 1,
        E = $.length,
        B = $[0];
      while (G < E) {
        var _ = $[G];
        if (_[0] == B[0]) {
          if (B[4] != null || _[4] == null) $.splice(G, 1);
          else $.splice(G - 1, 1);
          E = $.length;
          continue
        }
        B = $[G++]
      }
    }
    return $
  }

  function C() {
    return this.data.surf
  }
  target.namespace("data").upper = function() {
    return { blend: J, setData: G, getData4State: E, getSeries: F, calcH: M, calcT: I, calcTd: B, getSta: L, getW: K, hasSurf: C }
  }
}