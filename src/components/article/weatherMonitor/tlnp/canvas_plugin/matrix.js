export default function(target) {
  function E(_, A, $) {
    if (_ == null || A == null)
      return _ == A;
    var B = _.length;
    if (B != A.length) return false;
    for (var C = 0; C < B; C++)
      if (Math.abs(_[C] - A[C]) > $) return false;
    return true
  }

  function B(B, A, E, _) {
    var D = A,
      C = Math.abs(B[D][_]);
    for (var F = A + 1; F <= E; F++) {
      var $ = Math.abs(B[F][_]);
      if ($ > C) {
        C = $;
        D = F
      }
    }
    return D
  }

  function C($) {
    if ($.length > 0 && !target.util.isOfArray($[0])) {
      var _ = [];
      for (var A = 0; A < $.length; A++) _.push([$[A]]);
      return _
    }
    return $
  }

  function A(_) {
    var $ = _ == null ? [] : _.elements || _;
    return C($)
  }

  function $(_) {
    var $ = _.elements || _;
    return C($)
  }

  function _(_, A) {
    var $ = A == null ? _ : A.elements || A;
    return C($)
  }

  target.matrix = {
    precision: 1e-10,
    elements: null,
    add: function(_) {
      // e = A(_);
      // if (!this.isSameSizeAs(e)) { var $ = this.dim(); throw new Error("The dimension of argument must be " + $.row + " X " + $.col + ".") }
      // this.map(function($, A, _) { return $ + e[A][_] });
      return this
    },
    create: function(_) {
      var $ = Object.create(this);
      $.setElements(_);
      return $
    },
    setElements: function D(_) {
      var $ = A(_);
      this.elements = JSON.parse(JSON.stringify($));
      return this
    },
    e: function(_, $) { return this.elements[_ - 1][$ - 1] },
    eq: function(B) {
      if (B == null) return false;
      var _ = $(B),
        A = this.elements.length;
      if (A != _.length) return false;
      for (var C = 0; C < A; C++)
        if (!E(this.elements[C], _[C], this.precision)) return false;
      return true
    },
    dim: function(B) {
      var $ = _(this.elements, B),
        A = { row: 0, col: 0 };
      if ($ != null) { A.row = $.length; if ($[0] != null) A.col = $[0].length }
      return A
    },
    isSameSizeAs: function(A) { if (A == null) return false; var _ = $(A); if (this.elements.length != _.length) return false; if (this.elements.length == 0) return true; return this.elements[0].length == _[0].length },
    swapRow: function(A, _) {
      var $ = this.elements[A];
      this.elements[A] = this.elements[_];
      this.elements[_] = $;
      return this
    },
    toUpperTriangular: function() {
      var F = this.elements,
        E = this.dim();
      for (var G = 0; G < E.row - 1; G++) {
        var _ = B(F, G, E.row - 1, G);
        if (_ != G) this.swapRow(G, _);
        var $ = F[G][G];
        if ($ == 0) continue;
        for (var C = G + 1; C < E.row; C++) {
          var A = F[C][G] / $;
          F[C][G] = 0;
          for (var D = G + 1; D < E.col; D++) F[C][D] -= A * F[G][D]
        }
      }
      return this
    },
    map: function(D, H, A) {
      var $ = this.dim();
      if ($.row == 0 || $.col == 0 || H && (H[0] < 0 || H[1] >= $.row) || A && (A[0] < 0 || A[1] >= $.col)) return;
      var G = H ? H[0] : 0,
        E = H ? H[1] : $.row - 1,
        C = A ? A[0] : 0,
        _ = A ? A[1] : $.col - 1;
      for (var F = G; F <= E; F++)
        for (var B = C; B <= _; B++) this.elements[F][B] = D(this.elements[F][B], F, B)
    },
    toReducedEchelon: function() {
      this.toUpperTriangular();
      var C = this.elements,
        $ = this.dim(),
        _ = [$.row, $.col - 1];
      for (var E = $.row - 1; E >= 0; E--) {
        if (C[E][E] == 0) return null;
        this.map(D.bind(null, C[E][E]), [E, E], _);
        C[E][E] = 1;
        if (E == 0) break;
        this.map(B.bind(null, C, E), [0, E - 1], _);
        this.map(A, [0, E - 1], [E, E])
      }

      function D(A, $, B, _) { return $ / A }

      function B(B, _, $, C, A) { return $ - B[_][A] * B[C][_] }

      function A() { return 0 }
    },
    toString: function(A) {
      var $ = _(this.elements, A);
      return JSON.stringify($)
    }
  }
}