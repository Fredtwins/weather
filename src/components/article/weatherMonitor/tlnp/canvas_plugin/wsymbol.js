export default function(target) {

  var $ = target.geometry2D;

  function _(C, H, K, A, I, J, _, F) {
    var E = B(H, K, A, I, J, _);
    C.beginPath();
    for (var $ in F) C[$] = F[$];
    for (var G = 0; G < E.length; G++) {
      var D = E[G];
      C.moveTo(D[0], D[1]);
      C.lineTo(D[2], D[3])
    }
    C.stroke()
  }

  function B(L, M, B, C, D, G) {
    var I = [],
      O = G ? 40 : 60;
    if (!M || L == null) return I;
    var J = C != null ? C : 0,
      F = D != null ? D : 20,
      A = $.calculateTerminalPoint(B, J, L),
      H = $.calculateTerminalPoint(A, F, L);
    I.push([A.x, A.y, H.x, H.y]);
    var E = (M >= 0) ? Math.round(M) : -1,
      K, _ = L;
    if (E < 0) {
      K = $.calculateTerminalPoint(H, F / 6, _ + 45);
      I.push([H.x, H.y, K.x, K.y]);
      K = $.calculateTerminalPoint(H, F / 6, _ + 135);
      I.push([H.x, H.y, K.x, K.y]);
      K = $.calculateTerminalPoint(H, F / 6, _ + 225);
      I.push([H.x, H.y, K.x, K.y]);
      K = $.calculateTerminalPoint(H, F / 6, _ + 315);
      I.push([H.x, H.y, K.x, K.y]);
      return I
    } else if (E == 1) return I;
    else if (E == 2) {
      H = $.calculateTerminalPoint(H, F / 4, _ + 180);
      K = $.calculateTerminalPoint(H, F / 4, _ + 60);
      I.push([H.x, H.y, K.x, K.y]);
      return I
    } else if (E > O) {
      A = $.calculateTerminalPoint(H, F / 5, _ + 180);
      K = $.calculateTerminalPoint(A, F / 5, _ + 225);
      I.push([A.x, A.y, K.x, K.y]);
      K = $.calculateTerminalPoint(A, F / 5, _ + 315);
      I.push([A.x, A.y, K.x, K.y]);
      E = O
    }
    while (E - 20 >= 0 || E == 19) {
      K = $.calculateTerminalPoint(H, F * 0.433, _ + 90);
      I.push([H.x, H.y, K.x, K.y]);
      H = $.calculateTerminalPoint(H, F / 5, _ + 180);
      I.push([H.x, H.y, K.x, K.y]);
      E -= 20;
      if (E < 19) H = $.calculateTerminalPoint(H, F / 7, _ + 180)
    }
    while (E - 4 >= 0 || E == 3) {
      var N = G ? F / 6 : F / 10;
      K = $.calculateTerminalPoint(H, F / 2, _ + 60);
      I.push([H.x, H.y, K.x, K.y]);
      H = $.calculateTerminalPoint(H, N, _ + 180);
      E -= 4
    }
    if (E > 0) {
      K = $.calculateTerminalPoint(H, F / 4, _ + 60);
      I.push([H.x, H.y, K.x, K.y])
    }
    return I
  }

  function C(E, D, G) {
    var A = 3,
      F = 60,
      B = {
        x: 0,
        y: 0,
        radius: 100,
        backgroundStyle: "rgba(255,238,119,.7)",
        fcolor: "black",
        ftextcolor: "black",
        fWidth: 1,
        rcolor: "brown",
        rtextcolor: "green",
        rWidth: 2,
        rfont: "11px sans",
        font: "12px sans",
        usingP: false,
        no_label: false
      };
    target.util.extend(B, G || {});
    C();
    _();

    function C() {
      E.save();
      E.beginPath();
      E.fillStyle = B.backgroundStyle;
      E.fill();
      E.arc(B.x, B.y, B.radius, 0, 2 * Math.PI, true);
      E.fill();
      E.closePath();
      E.strokeStyle = B.fcolor;
      E.font = B.font;
      E.lineWidth = B.fWidth;
      E.textBaseline = "bottom";
      E.fillStyle = B.ftextcolor;
      var I = B.radius / A;
      for (var K = 1; K <= A; K++) {
        E.beginPath();
        var _ = K * I;
        E.arc(B.x, B.y, _, 0, 2 * Math.PI, true);
        E.stroke();
        if (K < A && !B.no_label) {
          var J = Math.sin(Math.PI / 2) * _,
            H = K * F / A;
          E.textAlign = "left";
          E.fillText(H, B.x + J, B.y);
          E.textAlign = "right";
          E.fillText(H, B.x - J, B.y)
        }
        E.closePath()
      }
      E.beginPath();
      for (var D = 0; D < 360; D += 10) {
        if (D % 30 == 0) E.moveTo(B.x, B.y);
        else {
          var C = $.calculateTerminalPoint(B, B.radius - 4, D);
          E.moveTo(C.x, C.y)
        }
        var J = B.x + Math.sin(D * Math.PI / 180) * B.radius,
          G = B.y - Math.cos(D * Math.PI / 180) * B.radius;
        E.lineTo(J, G)
      }
      E.stroke();
      if (!B.no_label) {
        E.textAlign = "center";
        E.textBaseline = "top";
        for (D = 0; D < 360; D += 30) {
          J = B.x + Math.sin(D * Math.PI / 180) * (B.radius + 2), G = B.y - Math.cos(D * Math.PI / 180) * (B.radius + 2);
          E.setTransform(1, 0, 0, 1, 0, 0);
          E.translate(J, G);
          E.rotate((D + 180) * Math.PI / 180);
          E.fillText(D, 0, 0);
          J = B.x + Math.sin(D * Math.PI / 180) * (B.radius - 2);
          G = B.y - Math.cos(D * Math.PI / 180) * (B.radius - 2);
          E.setTransform(1, 0, 0, 1, 0, 0);
          E.translate(J, G);
          E.rotate(D * Math.PI / 180);
          E.fillText((D + 180) % 360, 0, 0)
        }
      }
      E.restore()
    }

    function _() {
      var C = [];
      for (var J = 0; J < D.length; J += 4) {
        var O = D[J],
          P = D[J + 1],
          M = D[J + 3],
          G = D[J + 2],
          K = P * B.radius / F,
          H = (O + 180) % 360,
          R = B.x + Math.sin(H * Math.PI / 180) * K,
          Q = B.y + Math.cos(O * Math.PI / 180) * K;
        if (M != null && M < 100) break;
        C.push({ p: M, h: G, wd: O, wf: P, x: R, y: Q })
      }
      if (C.length == 0) return;
      var L = E.measureText("0.0").width,
        I = 10,
        N = A(L, I);
      E.save();
      E.strokeStyle = B.rcolor;
      E.lineWidth = B.rWidth + 0.5;
      for (J = 0; J < C.length; J++)
        if (N[J] != null) {
          E.beginPath();
          E.arc(C[J].x, C[J].y, 1, 0, 2 * Math.PI, true);
          E.stroke()
        }
      E.lineWidth = B.rWidth;
      E.beginPath();
      E.moveTo(C[0].x, C[0].y);
      for (J = 1; J < C.length; J++) E.lineTo(C[J].x, C[J].y);
      E.stroke();
      if (!B.no_label) {
        E.font = B.rfont;
        E.fillStyle = B.rtextcolor;
        for (J = 0; J < C.length; J++)
          if (N[J] != null) {
            E.textAlign = N[J].textAlign;
            E.textBaseline = N[J].textBaseline;
            var _ = B.usingP ? C[J].p : Math.round(C[J].h / 10);
            E.fillText(_, C[J].x, C[J].y)
          }
      }
      E.restore();

      function A(J, E) {
        var L = [],
          _ = [],
          N = Math.PI,
          M = N / 12;
        L[0] = { textAlign: "right", textBaseline: "bottom" };
        L[C.length - 1] = { textAlign: "right", textBaseline: "bottom" };
        for (var F = 1; F < C.length - 1; F++) {
          var I = true;
          for (var B = 0; B < F; B++)
            if (Math.abs(C[B].x - C[F].x) < J && Math.abs(C[B].y - C[F].y) < E) { I = false; break }
          if (!I) continue;
          var D = "middle",
            K = "center",
            H = (C[F - 1].x - C[F].x) + (C[F + 1].x - C[F].x),
            G = (C[F - 1].y - C[F].y) + (C[F + 1].y - C[F].y),
            A = $.angle(H, -G);
          if (A > M && A < N - M) D = "top";
          else if (A > N + M && A < 2 * N - M) D = "bottom";
          L[F] = { textAlign: K, textBaseline: D }
        }
        return L
      }
    }
  }

  function A(E, D, H) {
    var C = { x: 0, y: 0, height: 500, width: 100, padding_left: 3, padding_right: 3, padding_top: 3, padding_bottom: 3, pmin: 15, pmax: 1075, labels: [1000, 925, 850, 700, 600, 500, 400, 300, 250, 200, 150, 100, 70, 50, 30, 20], wfmax: 70, wfcolor: "#ccffff", wfprocolor: "#cc99ff", wftextcolor: "#6699ff", wftextfont: "16px Arial Black", wfprofile: "sn", usingLnp: true, shaftLength: 40, backgroundStyle: "rgba(255,238,119,.7)", fcolor: "black", ftextcolor: "black", fWidth: 2, rcolor: "brown", rWidth: 1.5, font: "12px sans" };
    target.util.extend(C, H || {});
    F();
    $();

    function F() {
      C.viewport_width = C.width - C.padding_left - C.padding_right;
      C.viewport_height = C.height - C.padding_top - C.padding_bottom;
      C.viewport_left = C.x + C.padding_left;
      C.viewport_right = C.viewport_left + C.viewport_width;
      C.viewport_top = C.y + C.padding_top;
      C.viewport_bottom = C.viewport_top + C.viewport_height;
      C.r_lnpscale = C.viewport_height / (Math.log(C.pmax) - Math.log(C.pmin));
      C.r_pscale = C.viewport_height / (C.pmax - C.pmin)
    }

    function A($) { return C.usingLnp ? C.padding_top + (Math.log($) - Math.log(C.pmin)) * C.r_lnpscale : C.padding_top + ($ - C.pmin) * C.r_pscale }

    function B(A, _) {
      var $ = -1;
      if (C.wfprofile == "ew") { if (_ > 0 && _ <= 180) $ = 1 } else if (C.wfprofile == "sn")
        if (_ >= 90 && _ < 270) $ = 1;
      return C.viewport_left + C.viewport_width / 2 + $ * A * C.viewport_width / 2 / C.wfmax
    }

    function G(B, A) {
      var $ = Math.PI / 2 - A * Math.PI / 180,
        _ = C.wfprofile == "hom" ? 0 : C.wfprofile == "ew" ? Math.cos($) : -Math.sin($);
      return C.viewport_left + C.viewport_width / 2 + _ * B * C.viewport_width / 2 / C.wfmax
    }

    function $() {
      E.save();
      E.rect(C.viewport_left, C.viewport_top, C.viewport_right, C.viewport_bottom);
      E.clip();
      E.beginPath();
      E.fillStyle = C.backgroundStyle;
      E.rect(C.x, C.y, C.width, C.height);
      E.fill();
      E.closePath();
      if (D.length > 2 * 4) {
        E.fillStyle = C.wfcolor;
        E.beginPath();
        E.moveTo(B(0, 0), A(D[3]));
        for (var Q = 0; Q < D.length; Q += 4) {
          var J = D[Q + 0],
            N = D[Q + 1],
            F = D[Q + 3];
          E.lineTo(B(N, J), A(F))
        }
        E.lineTo(B(0, 0), A(D[D.length - 1]));
        E.fill();
        E.closePath();
        E.fillStyle = C.wfprocolor;
        E.beginPath();
        E.moveTo(G(0, 0), A(D[3]));
        for (Q = 0; Q < D.length; Q += 4) {
          var J = D[Q + 0],
            N = D[Q + 1],
            F = D[Q + 3],
            M = G(N, J),
            P = B(N, J);
          E.lineTo(M, A(F))
        }
        E.lineTo(G(0, 0), A(D[D.length - 1]));
        E.fill();
        E.closePath()
      }
      if (C.wfprofile == "ew" || C.wfprofile == "sn") {
        var H = C.wfprofile == "ew" ? "E" : "S",
          $ = C.wfprofile == "ew" ? "W" : "N";
        E.textBaseline = "top";
        E.textAlign = "center";
        E.font = C.wftextfont;
        E.fillStyle = C.wftextcolor;
        var O = C.viewport_left + C.viewport_width / 4,
          L = C.viewport_top;
        E.fillText($, O, L);
        O = C.viewport_left + C.viewport_width * 3 / 4;
        E.fillText(H, O, L)
      }
      O = C.viewport_left + C.viewport_width / 2;
      E.textBaseline = "middle";
      E.textAlign = "left";
      E.fillStyle = C.ftextcolor;
      E.strokeStyle = C.fcolor;
      E.font = C.font;
      E.lineWidth = C.fWidth;
      E.beginPath();
      E.moveTo(O, C.viewport_top);
      E.lineTo(O, C.viewport_bottom);
      for (Q = 0; Q < C.labels.length; Q++) {
        F = C.labels[Q], L = A(F);
        E.moveTo(O, L);
        E.lineTo(O - 5, L);
        E.fillText(F, O + 3, L)
      }
      P = O + E.measureText("1000 ").width + 3;
      for (Q = 0; Q < D.length; Q += 4) {
        var K = D[Q + 2],
          F = D[Q + 3];
        if (K != null && F != null) {
          L = A(F);
          K = Math.round(K / 10);
          E.fillText(K, P, L)
        }
      }
      E.stroke();
      E.closePath();
      var I = { strokeStyle: C.rcolor, lineWidth: C.rWidth };
      for (Q = 0; Q < D.length; Q += 4) {
        J = D[Q + 0], N = D[Q + 1], K = D[Q + 2], F = D[Q + 3], L = A(F);
        _(E, J, N, { x: O, y: L }, 0, C.shaftLength, false, I)
      }
      E.restore()
    }
  }
  target.wsymbol = { drawWind: _, drawHodograph: C, drawWindPillar: A }
}