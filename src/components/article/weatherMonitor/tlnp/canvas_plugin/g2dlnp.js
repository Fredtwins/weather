export default function(target) {

  function M(_, $) {
    return Math.abs(_ - $) < 0.00001
  }

  function _(_, C) {
    var F = C[0],
      G = C[2],
      $ = C[1],
      B = C[3];
    if (_ == $) return F;
    else if (_ == B) return G;
    else {
      var A = Math.log($),
        D = Math.log(B),
        E = (A - D) / (G - F);
      return F + (A - Math.log(_)) / E
    }
  }

  function A(B, $, A) {
    if (!$ || $.length < 2) return null;
    else if ($.length < 4 && B == $[1]) return $[0];
    for (var C = 0, _ = $.length; C < _ - 2; C += 2)
      if (B <= $[C + 1] && B > $[C + 3])
        return this.getXonLine(B, $.slice(C, C + 4));
    if (A) {
      C = B > $[1] ? 0 : _ - 4;
      return this.getXonLine(B, $.slice(C, C + 4))
    }
    return null
  }

  function D(G, B) {
    var E = B[0],
      F = B[2],
      $ = B[1],
      A = B[3];
    if (G == E) return $;
    else if (G == F) return A;
    else {
      var _ = Math.log($),
        C = Math.log(A),
        D = (_ - C) / (F - E);
      return Math.exp(_ - (G - E) * D)
    }
  }

  function J(G, _) {
    var $ = [];
    if (!_ || _.length < 2) return $;
    else if (_.length < 4 && G == _[0]) return [_[1]];
    var D = Number.NEGATIVE_INFINITY;
    for (var F = 0, A = _.length; F < A - 2; F += 2) {
      var C = _[F],
        E = _[F + 2];
      if (G >= Math.min(C, E) && G <= Math.max(C, E)) {
        var B = this.getYonLine(G, _.slice(F, F + 4));
        if (B != D) {
          $.push(B);
          D = B
        }
      }
    }
    return $
  }

  function $(A, _, $) {
    var G = A[0],
      B = Math.log(A[1]),
      E = _[0],
      C = Math.log(_[1]),
      F = $[0],
      D = Math.log($[1]);
    return ((G - F) * (C - D) - (E - F) * (B - D)) * 0.5
  }

  function I(D) {
    var _ = 0,
      C = [D[0], D[1]];
    for (var F = 2, E = D.length; F < E - 3; F += 2) {
      var A = [D[F], D[F + 1]],
        B = [D[F + 2], D[F + 3]];
      _ += $(C, A, B)
    }
    return Math.abs(_)
  }

  function B($, _) {
    var A = $.slice(0);
    for (var B = _.length, C = B - 2; C >= 0; C -= 2) A.push(_[C], _[C + 1]);
    return A
  }

  function N($, _) {
    var A = J.bind(this),
      N = $[1],
      I = _[1],
      F = $[$.length - 1],
      B = _[_.length - 1],
      D, C = [];
    if (F >= I || B >= N) return null;
    if (M(N, I));
    else if (N > I) {
      C.push(0, this.getSubPolyline($, I), null);
      $ = this.getSubPolyline($, I, true)
    } else if (N < I) {
      C.push(0, null, this.getSubPolyline(_, N));
      _ = this.getSubPolyline(_, N, true)
    }
    D = this.crosspoint_of_polylines($, _) || [];
    for (var G = 0, E = D.length; G < E; G += 2) {
      var P = D[G],
        L = D[G + 1],
        O = this.getSubPolyline($, L),
        K = this.getSubPolyline(_, L),
        H = A(O, K);
      C.push(H, O, K);
      $ = this.getSubPolyline($, L, true);
      _ = this.getSubPolyline(_, L, true)
    }
    if (F < B) {
      O = this.getSubPolyline($, B), H = A(O, _);
      C.push(H, O, _);
      C.push(0, this.getSubPolyline($, B, true), null)
    } else if (F > B) {
      K = this.getSubPolyline(_, F), H = A($, K);
      C.push(H, $, K);
      C.push(0, null, this.getSubPolyline(_, F, true))
    } else {
      H = A($, _);
      C.push(H, $, _)
    }
    return C;

    function J($, _) {
      if ($ == null) return null;
      var B = ($[1] + $[$.length - 1]) / 2,
        A = this.getXonPolyline(B, $),
        C = this.getXonPolyline(B, _);
      return A < C ? 1 : -1
    }
  }

  function H(A, G, _) {
    var F = G != null ? G : 0,
      E = _ != null ? _ : A.length - 3,
      D = 0;
    for (var H = F; H <= E; H += 3) {
      var C = A[H],
        $ = A[H + 1],
        B = A[H + 2];
      if ($ != null && B != null) D += C * this.area_polygon(this.polyline2_circuit($, B))
    }
    return D
  }

  function L(A, E, B) {
    var G = this.getXonPolyline(E, A),
      D = A.length;
    for (var F = D - 1; F > 2; F -= 2) {
      var $ = A[F],
        _ = A[F - 2];
      if (E >= $ && E <= _ || M(E, $) || M(E, _)) {
        var C;
        if (M(E, $)) C = B ? A.slice(F - 1) : A.slice(0, F + 1);
        else if (M(E, _)) C = B ? A.slice(F - 3) : A.slice(0, F - 1);
        else if (B) {
          C = A.slice(F - 1);
          C.unshift(G, E)
        } else {
          C = A.slice(0, F - 1);
          C.push(G, E)
        }
        return C
      }
    }
    if (D == 2 && E == A[1]) return A;
    return null
  }

  function C(D, $, I) {
    var B = Math.abs(D),
      K = [],
      J = [];
    for (var G = 0, E = $.length; G < E; G += 3) {
      var _ = $[G + 1],
        C = $[G + 2],
        H = this.area_mark2polyline($, G, G);
      if (H * D > 0 && Math.abs(H) > B) {
        var A = this.polyline2_y(B, _, C, I);
        return A;
        K = F(K, A[1]);
        J = F(J, A[2]);
        return [A[0], K, J]
      } else {
        D += H;
        K = F(K, _);
        J = F(K, C)
      }
    }
    return null;

    function F(E, D) {
      var $ = E.length,
        C = E[$ - 2],
        _ = E[$ - 1],
        B = D[0],
        A = D[1];
      return M(C, B) && M(_, A) ? E.concat(D.slice(1)) : E.concat(D)
    }
  }

  function E(F, $, _, J) {
    var L = this.getSubPolyline.bind(this),
      H = this.area_polygon.bind(this),
      G = this.polyline2_circuit.bind(this),
      K = $.length,
      M = _.length,
      E = $[1],
      D = Math.max($[K - 1], _[M - 1]),
      N = I(E),
      P = I(D),
      C = A(N[0], F, J),
      B = A(P[0], F, J);
    if (B == 0) return P;
    if (C == 0) return N;
    if (B < 0 || C > 0) return null;
    return O(E, D, J);

    function O(_, $, B) {
      var E = Math.sqrt(_ * $),
        D = I(E),
        C = A(D[0], F, B);
      if (C == 0) return D;
      else if (C > 0) return O(_, E, B);
      return O(E, $, B)
    }

    function I(D) {
      var C = L($, D),
        B = L(_, D);
      if (C && B) { var A = H(G(C, B)); return [A, C, B] }
      return null
    }

    function A(A, $, B) {
      var _ = A - $;
      if (Math.abs(_) <= B) return 0;
      else if (_ > 0) return 1;
      else return -1
    }
  }

  function K(H, F) {
    var L = 0,
      I = -1,
      O = 1,
      G = 2,
      K = null,
      A = [H[0], Math.log(H[1]), H[2], Math.log(H[3])],
      C = [F[0], Math.log(F[1]), F[2], Math.log(F[3])],
      B = A[3] - A[1],
      Q = A[0] - A[2],
      N = A[2] * A[1] - A[0] * A[3],
      $ = C[3] - C[1],
      D = C[0] - C[2],
      P = C[2] * C[1] - C[0] * C[3];
    if (M(B * D, Q * $)) {
      var E = J(A),
        _ = J(C),
        K = (E || _) ? G : M((B + Q) * P, ($ + D) * N) ? L : I;
      return [K, null]
    } else {
      var S = (D * N - Q * P) / ($ * Q - B * D),
        R = (B * P - $ * N) / ($ * Q - B * D);
      return [O, [S, Math.exp(R)]]
    }

    function J($) { return M($[0], $[2]) && M($[1], $[3]) }
  }

  function G(A, E) {
    var F = Math.max,
      B = Math.min,
      P = A[0],
      O = A[1],
      N = A[2],
      L = A[3],
      M = E[0],
      K = E[1],
      I = E[2],
      H = E[3],
      _ = (F(P, N) >= B(M, I) && F(M, I) >= B(P, N) && F(O, L) >= B(K, H) && F(K, H) >= B(O, L));
    if (_) {
      var D = Math.log,
        G = [P, D(O)],
        Q = [N, D(L)],
        $ = [M, D(K)],
        C = [I, D(H)];
      _ = (J($, Q, G) * J(Q, C, G)) >= 0 && (J(G, C, $) * J(C, Q, $)) >= 0
    }
    return _;

    function J(B, _, D) {
      var $ = B[0],
        E = B[1],
        C = _[0],
        A = _[1],
        G = D[0],
        F = D[1];
      return ($ - G) * (A - F) - (C - G) * (E - F)
    }
  }

  function F($, _, K) {
    var A = false,
      E = [];
    if ($ == null || $.length < 4 || _ == null || _.length < 4) return null;
    var pre_y
    var G = pre_y = Number.NEGATIVE_INFINITY;
    for (var H = 0, C = $.length; H < C - 2 && !A; H += 2) {
      var D = $.slice(H, H + 4);
      for (var F = 0, J = _.length; F < J - 2 && !A; F += 2) {
        var B = _.slice(F, F + 4);
        if (this.linesegIntersect(D, B)) {
          var I = this.crosspoint(D, B)[1];
          if (I == null) continue;
          if (!M(G, I[0]) && !M(pre_y, I[1])) {
            E.push(I[0], I[1]);
            G = I[0];
            pre_y = I[1];
            if (K) A = true
          }
        }
      }
    }
    return E.length > 0 ? E : null
  }
  target.g2dlnp = {
    getXonLine: _,
    getYonLine: D,
    getXonPolyline: A,
    getYonPolyline: J,
    area_triangle: $,
    area_polygon: I,
    area_mark2polyline: H,
    polyline2_circuit: B,
    polyline2_y: E,
    mark2polyline_y: C,
    mark2polyline: N,
    getSubPolyline: L,
    crosspoint: K,
    linesegIntersect: G,
    crosspoint_of_polylines: F
  }
}