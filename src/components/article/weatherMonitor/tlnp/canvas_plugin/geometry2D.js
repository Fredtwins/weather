export default function(target) {

  function D(A, _) {
    if (_ == 0 && A == 0) return 0;
    else if (A == 0) return _ >= 0 ? Math.PI / 2 : Math.PI / 2 + Math.PI;
    else if (_ == 0) return A >= 0 ? 0 : Math.PI;
    var $ = Math.atan(_ / A);
    if ($ >= 0) { if (A < 0) $ += Math.PI } else if (A > 0) $ += 2 * Math.PI;
    else $ += Math.PI;
    return $
  }

  function B(E, _, D, A) {
    var B = C(E, _) * C(D, A);
    if (B == 0)
      return Math.PI / 2;
    return Math.acos($(E, _, D, A) / B)
  }

  function $(B, $, A, _) {
    return B * A + $ * _
  }

  function C(_, $) {
    return Math.sqrt(_ * _ + $ * $)
  }

  function _(_, A, C) {
    var $ = C * Math.PI / 180,
      D = A * Math.sin($),
      B = A * Math.cos($);
    return { x: _.x + D, y: _.y - B }
  }

  function E(B, _, C, E) {
    var F, D, A, $ = (_.y - B.y) ? Math.atan((B.x - _.x) / (_.y - B.y)) : Math.PI / 2;
    A = E * Math.PI / 180 + $;
    F = C * Math.sin(A);
    D = C * Math.cos(A);
    return { x: _.x + F, y: _.y - D }
  }

  function A(A, _, M, K, J, I) {
    var F = target.math;

    function G(_, $) {
      return K != null ? K(_, $) : _
    }

    function H($, _) {
      return J != null ? J($, _) : $
    }
    var B = H(A[1]),
      C = H(_[1]);
    if (B != C) {
      var D = G(A[0]),
        E = G(_[0]),
        L = function($) { return D + (E - D) * (H($) - B) / (C - B) },
        $ = function($) { return M(L($), $) },
        N = F.secant_1R($, _[1], _[1] - 1, I);
      if (N != null) return [L(N), N]
    } else {
      var $ = function($) { return M($, A[1]) },
        O = F.secant_1R($, _[0], _[0] - 1, I);
      if (O != null) return [O, A[1]]
    }
    return null
  }
  target.geometry2D = {
    angle: D,
    cornerDimension: B,
    dotProduct: $,
    magnitude: C,
    calculateTerminalPoint: _,
    calculateTerminalPointOnLine: E,
    crosspoint_on_line_curve: A
  }
}