export default function(target) {

  var W = target.constant,
    K = function($) {
      return M($, $ < W.Kt0)
    };

  target.phy = {
    T: T,
    t: A,
    e: K,
    e_Magnus: $,
    e_Magnus_improved: o,
    e_Emanuel: f,
    e_GoffGratch_1957: M,
    e_Wexler: J,
    e_WMO_2008: _,
    e_table_1980: D,
    water_vapor_density: B,
    q: l,
    qs_T: h,
    r: j,
    rh: E,
    Lw: U,
    theta: C,
    theta_p: p,
    theta_T: Q,
    thetae: R,
    thetae2: e,
    thetase: a,
    thetase_T: P,
    Tv: O,
    LCL: k,
    LCL_iteration: F,
    LCL_appro: n,
    LCL_intersection: G,
    h_se: N,
    h_by: Z,
    index: { SI: I, SSI: b, SWEAT: g, TT: V, A: d, K: X, KY_TA: i, KY: m, KY_s: L }
  };

  function T($) { return W.Kt0 + $ }

  function A($) { return $ - W.Kt0 }

  function o($, E) {
    var C = E !== true,
      B = C ? 17.2693882 : 21.8745584,
      _ = C ? 35.86 : 7.66,
      D = $ - 0.01;
    return 6.1078 * Math.exp(B * A(D) / (D - _))
  }

  function $($, E) {
    var C = E !== true,
      B = C ? 7.5 : 9.5,
      _ = C ? 36.16 : 8.16,
      D = $ - 0.01;
    return 6.1078 * Math.pow(10, B * A(D) / (D - _))
  }

  function M($, E) {
    var C = E !== true,
      D = T(0.01),
      _ = $ / D,
      B = D / $,
      A = C ? 10.79574 * (1 - B) - 5.028 * Math.LOG10E * Math.log(_) + 0.000150475 * (1 - Math.pow(10, -8.2969 * (_ - 1))) + 0.00042873 * (Math.pow(10, 4.76955 * (1 - B)) - 1) + 0.78614 : -9.09685 * (B - 1) - 3.56654 * Math.LOG10E * Math.log(B) + 0.87682 * (1 - _) + 0.78614;
    return Math.pow(10, A)
  }

  function J($, B) {
    var _ = B !== true,
      A = _ ? -6043.6117 / $ + 18.9318833 - 0.028238594 * $ + 0.000017241129 * $ * $ + 2.858487 * Math.log($) : -5865.3696 / $ + 22.241033 + 0.013749042 * $ - 0.000034031775 * $ * $ + 2.6967687e-8 * $ * $ * $ + 0.6918651 * Math.log($);
    return Math.exp(A) / 100
  }

  function _($, D) {
    var C = D !== true,
      B = C ? 17.62 : 22.46,
      _ = C ? 30.03 : 0.53;
    return 6.112 * Math.exp(B * A($) / ($ - _))
  }

  function f($) {
    return Math.exp(53.67957 - 6743.769 / $ - 4.8451 * Math.log($))
  }

  function D($) {
    var $ = 273 + A($),
      J = 643 / $ - 1,
      D = 3.1473172,
      F = -0.00295944,
      I = 0.0004191398,
      H = -1.829924e-7,
      E = 8.243516e-8,
      K = ($ - 453) / 10,
      _ = K * K,
      B = K * _,
      C = _ * _,
      G = 5.3208 - (D + F * K + I * _ + H * B + E * C) * J;
    return Math.pow(10, G)
  }

  function B($, _) {
    return _ / ($ * W.Rv)
  }

  function l($, _) {
    return W.eps * $ / (_ - (1 - W.eps) * $)
  }

  function h(D, B) {
    var $ = target.math,
      C = 5e-9,
      _ = $.secant_1R(A.bind(null, D, B), T(30), T(40), C);
    return _ != null ? _ : T(0);

    function A(A, _, $) {
      return A - l(K($), _)
    }
  }

  function j($, _) {
    return W.eps * $ / (_ - $)
  }

  function E($, _) {
    return 100 * K(_) / K($)
  }

  function U($) {
    return W.Lw0 - W.cL * (A($))
  }
  var c = W.Rd / W.Cpd,
    H = 1 / c,
    q = Math.pow(1000, c);

  function C($, _) {
    return $ * (q / Math.pow(_, c))
  }

  function p(_, $) {
    return Math.pow($ * q / _, H)
  }

  function Q(_, $) {
    return _ * Math.pow($, c) / q
  }

  function e(A, $, _) {
    return A * Math.exp(U($) * _ / (W.Cpd * $))
  }

  function R(_, D, B) {
    var $ = k(_, D, B),
      A = C(_, B);
    return e(A, $.T, $.q0)
  }

  function a(_, E, B) {
    var $ = k(_, E, B),
      F = K(E),
      A = C(_, B - F),
      D = j(F, B);
    return e(A, $.T, D)
  }

  function P($, _) {
    var A = 0.005;
    return target.math.secant_1R(B.bind(null, $, _), T(24), T(25), A);

    function B(_, A, $) {
      return _ - a($, $, A)
    }
  }

  function O($, _) {
    return (1 + 0.608 * _) * $
  }

  function k($, A, _) {
    var B = n($, A, _);
    return F($, A, _, Math.round(B.p))
  }

  function F($, H, _, D) {
    var TL,qL
    if ($ <= H) {
      var E = l(K(H), _);
      return { T: $, p: _, q: E, q0: E, n: 0 }
    }
    var B = 0,
      F = D || 300,
      E = l(K(H), _),
      A = C($, _);
    G(0);
    if (qL < E) {
      var J, I, L;
      while (qL < E) {
        J = F;
        I = TL;
        L = qL;
        G(1)
      }
      F = J;
      TL = I;
      qL = L
    } else if (qL > E)
      while (qL > E) G(-1);
    if (qL < E)
      while (qL < E) G(0.1);
    return { T: TL, p: F, q: qL, q0: E, n: B };

    function G($) {
      F += $;
      TL = Q(A, F);
      qL = l(K(TL), F);
      B++
    }
  }

  function n($, D, _) {
    if ($ <= D) { var A = l(K(D), _); return { T: $, p: _, q: A, q0: A, n: 0 } }
    var C = $ - 1.24 * ($ - D),
      B = _ * Math.pow(C / $, H);
    return { T: C, p: B }
  }

  function G(J, G, L) {
    var I = target.math,
      D = C(J, L),
      N = l(K(G), L),
      A = [F, B, H],
      _ = [J, G, L],
      $ = [J - 1, G - 1, L - 1],
      M = 0.000005,
      E = I.nonlinearEqs_Secant(A, _, $, M);
    if (E == null) return null;
    return { T: E[0], p: E[2] };

    function B($) {
      return D - C($[0], $[2])
    }

    function F($) {
      return N - l(K($[1]), $[2])
    }

    function H($) {
      return $[0] - $[1]
    }
  }

  function N(_, $) {
    return (_ - $) / W.dar
  }

  function Z(_, $, A) {
    return 18410 * A / W.Kt0 * Math.LOG10E * Math.log(_ / $)
  }

  function I(A, B, $) {
    if (Y(arguments)) return null;
    var _ = a(B, $, 850);
    return A - P(_, 500)
  }

  function b(_, A) {
    if (Y(arguments)) return null;
    var $ = C(A, 850);
    return _ - Q($, 500)
  }

  function V(_, A, $) {
    if (Y(arguments)) return null;
    return A + $ - 2 * _
  }

  function d(A, _, C, B, $) {
    if (Y(arguments)) return null;
    return $ - A - (C - B) - (A - _)
  }

  function X(_, C, A, B, $) {
    if (Y(arguments)) return null;
    return B - _ + $ - (C - A)
  }

  function g(C, E, A, _, D, B) {
    if (Y(arguments)) return null;
    var $ = 0;
    if (E > 0) $ += 12 * E;
    if (C > 49) $ += 20 * (C - 49);
    $ += 4 * B;
    $ += 2 * _;
    if (D >= 130 && D <= 250 && A >= 210 && A <= 310 && A - D >= 0 && B >= 7.5 && _ >= 7.5) $ += 125 * (Math.sin(S(A - D)) + 0.2);
    return $
  }

  function i(A, _, $, D, C) {
    if (Y(arguments)) return null;
    return -B(A) * $ * C * Math.sin(S(_ - D)) * 100000;

    function B($) {
      return 2 * W.ew * Math.sin(S($)) / (W.Rd * Math.log(500 / 850))
    }
  }

  function m(_, B, A, $) {
    if (Y(arguments)) return null;
    return B > _ ? (B - _) / (1 + A - $) : 0
  }

  function L(C, E, D, $, B, _, A) {
    if (Y(arguments)) return null;
    return (_ * E - C + A) / (B + D - $)
  }

  function S($) {
    return $ * 2 * Math.PI / 360
  }

  function Y($) {
    for (var A = 0, _ = $.length; A < _; A++)
      if ($[A] == null) return true;
    return false
  }
}