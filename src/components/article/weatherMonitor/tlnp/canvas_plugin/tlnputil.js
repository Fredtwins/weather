export default function(target) {

  var _ = target.phy,
    $ = target.math,
    D = target.g2dlnp;

  function B(E, F, C, B) {
    var D = [];
    for (var A = F; A >= C; A -= B) {
      var $ = _.qs_T(E, A);
      D.push(_.t($), A)
    }
    return D
  }

  function C($, F, D, C) {
    var E = [],
      B = F - C;
    E.push(_.t(_.theta_T(_.T($), F)), F);
    if (F > 1000) {
      E.push($, 1000);
      B = 1000 - C
    }
    for (var A = B; A >= D; A -= C) E.push(_.t(_.theta_T(_.T($), A)), A);
    return E
  }

  function I(D, B, J, C, G) {
    var F = [],
      K = Number.MAX_VALUE,
      A = G ? J - 25 : H(D, 40);
    for (var I = B; I >= J - 25; I -= 25) {
      var E = I < A ? A : I >= J ? I : J,
        $ = _.thetase_T(D, E);
      if ($ == null || $ > K) break;
      K = $;
      F.push(C === true ? $ : _.t($));
      F.push(E);
      if (I < A) break
    }
    return F
  }

  function H(D, E) {
    var G = 5e-9,
      B = [_.T(120), 90],
      A = [_.T(-60), 250],
      H = function($) { return 0.01 / 1000 - _.q(_.e($[0], true), $[1]) },
      C = [H, function($) { return I(D, $[1], $[0]) }],
      F = $.nonlinearEqs_Secant(C, B, A, G);
    return F != null ? F[1] : E;

    function I(A, B, $) { return A - _.thetase($, $, B) }
  }

  function F(_, $, B) { var A = function(_, $) { return Math.log(_) }; return target.geometry2D.crosspoint_on_line_curve(_, $, B, null, A, 0.1) }

  function G(B, A, $) { return F(A, $, function($, A) { return B - _.theta($, A) }) }

  function A(B, A, $) { return F(A, $, function($, A) { return B - _.thetase($, $, A) }) }

  function E(C, F, W) {
    var i_el;
    var O = C[0],
      R = C[1],
      $ = D.mark2polyline(C, F),
      T = $.length,
      I = 0.03,
      B = {},
      U = i_el = -1;
    for (var M = 0; M < T; M += 3) {
      var P = $[M],
        N = $[M + 1],
        L = $[M + 2];
      if (P == 1 && N[1] < W) {
        if (D.area_mark2polyline($, M, M) < I) continue;
        B.LFC = [_.t(N[0]), N[1]];
        U = M;
        break
      }
    }
    if (U > 0)
      for (var E = 0, M = T - 3; M >= 0; M -= 3, E++) {
        P = $[M], N = $[M + 1], L = $[M + 2];
        if (P == 1 && N[N.length - 1] < B.LFC[1]) {
          if (D.area_mark2polyline($, M, M) < I) continue;
          if (E == 0 && Math.abs(N[N.length - 2] - L[L.length - 2]) > 0.00001) break;
          B.EL = [_.t(N[N.length - 2]), N[N.length - 1]];
          i_el = M;
          break
        }
      }
    if (U > 0 && i_el > 0) {
      var H = D.area_mark2polyline($, U, i_el);
      if (H > 0) {
        var A = D.mark2polyline_y(-H, $.slice(i_el + 3), 0.001);
        if (A != null) {
          var G = A[1],
            K = A[2],
            J = G[G.length - 2],
            V = G[G.length - 1],
            Q = K[K.length - 2],
            S = K[K.length - 1];
          B.EAL = [_.t(J), V, _.t(Q), S]
        }
      }
    }
    return B
  }
  target.namespace("tmgram").util = {
    qs_curve: B,
    theta_curve: C,
    discret_moistAdiabat: I,
    getP_thetase_q001: H,
    crosspoint_on_dryAdiabat: G,
    crosspoint_on_moistAdiabat: A,
    lfc_el_eal: E
  }
}