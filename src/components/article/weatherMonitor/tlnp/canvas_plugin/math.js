export default function(target) {

  function _(B, A, $) {
    var _ = $ || 0;
    return Math.abs(A - _) <= B
  }

  function $(_, $) {
    return (_ > 0 && $ > 0) || (_ < 0 && $ < 0)
  }

  target.math = {
    constant_function: function($) {
      return function() {
        return $
      }
    },
    dichotomy_1R: function(A, E, B, F) {
      F = F || 1e-10;
      var G = A(E);
      if (_(F, G)) return E;
      var H = A(B);
      if (_(F, H)) return B;
      if ($(G, H)) return null;
      var D = (E + B) / 2,
        C = this.dichotomy_1R(A, E, D, F);
      if (C == null) return this.dichotomy_1R(A, D, B, F);
      return C
    },
    secant_1R: function($, D, B, E, C) {
      C = C || 100;
      E = E || 1e-10;
      var J = D,
        G = B;
      do {
        var F = $(J),
          H = $(G),
          A = H - F;
        if (A == 0) return null;
        var I = G - (G - J) * H / (H - F);
        if (_(E, I, G)) return I;
        J = G;
        G = I
      } while (--C);
      return null
    },
    linearEqs: function(C) {
      function A(D, B, A) {
        var C = B.length,
          $ = D[A][C],
          _ = D[A][A];
        if (_ == 0) return null;
        for (var E = A + 1; E < C; E++) $ -= D[A][E] * B[E];
        return $ / _
      }
      var B = target.matrix.create(C),
        _ = B.toUpperTriangular().elements,
        $ = new Array(C.length);
      for (var D = $.length - 1; D >= 0; D--) { $[D] = A(_, $, D); if ($[D] == null) return null }
      return $
    },
    nonlinearEqs_Newton: function(_, G, $, E, C) {
      C = C || 100;
      E = E || 1e-10;
      do {
        var F = A(_, G, $),
          D = this.linearEqs(F);
        if (D == null) return null;
        var B = target.matrix.create([D]).add([$]);
        B.precision = E;
        if (B.eq([$])) return B.elements[0];
        $ = B.elements[0]
      } while (--C);

      function A(_, D, $) {
        var A = [];
        for (var E = 0; E < D.length; E++) {
          var C = [];
          for (var B = 0; B < D[E].length; B++) C.push(D[E][B]($));
          C.push(-_[E]($));
          A.push(C)
        }
        return A
      }
    },
    nonlinearEqs_Secant: function($, G, H, E, B) {
      var C = target.matrix;
      B = B || 100;
      E = E || 1e-10;
      do {
        var F = _($, G, H);
        if (F == null) return null;
        var D = this.linearEqs(F);
        if (D == null) return null;
        var A = C.create([D]).add([H]);
        A.precision = E;
        if (A.eq([H])) return A.elements[0];
        G = H;
        H = A.elements[0]
      } while (--B);

      function _($, F, I) {
        var _ = [],
          H = [],
          E = [];
        for (var G = 0; G < F.length; G++) {
          E[G] = F[G] - I[G];
          if (E[G] == 0) return null;
          H[G] = C.create([I]).elements[0];
          H[G][G] += E[G]
        }
        for (G = 0; G < F.length; G++) {
          var D = [],
            B = $[G](I);
          for (var A = 0; A < F.length; A++) D.push(($[G](H[A]) - B) / E[A]);
          D.push(-B);
          _.push(D)
        }
        return _
      }
    }
  }
}