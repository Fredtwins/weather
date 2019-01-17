/*
	krpano Embedding Script
	krpano 1.16.6 (build 2013-08-09)
*/
function createPanoViewer(e) {
  function ot(e) { return ("" + e).toLowerCase() }

  function ut(e, t) { return e[d](t) >= 0 }

  function at() { var t, r, i, s, o, u, a = n.location;
    a = a.search || a.hash; if (a) { t = a[W](1)[R]("&"); for (r = 0; r < t[x]; r++) i = t[r], s = i[d]("="), s == -1 && (s = i[x]), o = i[W](0, s), u = i[W](s + 1), o == _ || ot(o) == M ? e[M] = u : e[Z](o, u) } }

  function ft(e) { return e[H] = at, e }

  function lt() { var l, c, h, m, g, y, b, w, S; if (s == p) {
      function T() { var e, n, i, s, o, u, a; if (t[Y]) { e = t[Y]["Shockwave Flash"]; if (typeof e == "object") { n = e.description; if (n) { i = v, t[O] && (s = t[O]["application/x-shockwave-flash"], s && (s.enabledPlugin || (i = p))); if (i) { o = n[R](" "); for (u = 0; u < o[x]; ++u) { a = parseFloat(o[u]); if (isNaN(a)) continue; return a } } } } } if (r.ActiveXObject) try { e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); if (e) { n = e.GetVariable("$version"); if (n) return parseFloat(n[R](" ")[1][R](",").join(".")) } } catch (f) {}
        return 0 }

      function N() { var e, t, i = p,
          s = n[A]("div"); for (e = 0; e < 5; e++)
          if (typeof s.style[["p", "msP", "MozP", "WebkitP", "OP"][e] + "erspective"] != X) { i = v, e == 3 && r[nt] && (t = r[nt]("(-webkit-transform-3d)"), t && (i = t.matches == v)); break }
        return i }

      function C() { var e, t, r = E,
          i = p; try { e = n[A]("canvas"); for (t = 0; t < 4; t++) { r = e.getContext(["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"][t]); if (r) break }
          r && (i = v) } catch (s) {} return r = E, e = E, i } if (e.isDevice("iphone|ipad|ipod") && i[d]("opera mini") < 0) a = f = v;
      else { u = T(), u >= 10.1 && (o = v), l = N(), c = C(), h = ot(t.platform), m = 0, g = 0, y = 0, b = i[d]("firefox/"), b < 0 && (b = i[d]("gecko/")), b >= 0 && (m = parseInt(i[U](1 + i[d]("/", b)), 10)), b = i[d]("chrome"), b > 0 && (y = parseInt(i[U](b + 7), 10)), b = i[d](K), b > 0 && (g = parseInt(i[U](b + 8), 10), m >= 18 && (g = 4)), l && (g > 0 && g < 4 && (l = p), m > 3 && m < 18 && g > 1 && (c = l = p), c || (h[d](Q) < 0 && m > 3 && g < 1 && (l = p), y > 9 && y < 20 && (l = p))); if (l || c) { a = v, w = i[d]("blackberry") >= 0 || i[d]("rim tablet") >= 0 || i[d]("bb10") >= 0, S = (t.msMaxTouchPoints | 0) > 1; if (g >= 4 || w || S) f = v } }
      s = v } } var t, n, r, i, s, o, u, a, f, l, c, h, p = !1,
    d = "indexOf",
    v = !0,
    m = "addEventListener",
    g = "externalMouseEvent",
    y = "target",
    b = "wmode",
    w = "targetelement",
    E = null,
    S = "onerror",
    x = "length",
    T = "getElementById",
    N = "bgcolor",
    C = "onmousewheel",
    k = "flashbasepath",
    L = "enable_mousewheel_js_bugfix",
    A = "createElement",
    O = "mimeTypes",
    M = "html5",
    _ = "useHTML5",
    D = "params",
    P = "externalMouseEvent2",
    H = "passQueryParameters",
    B = "always",
    j = "srcElement",
    F = "consolelog",
    I = "onready",
    q = "never",
    R = "split",
    U = "slice",
    z = "xml",
    W = "substring",
    X = "undefined",
    V = "vars",
    $ = "basepath",
    J = "mwheel",
    K = "android",
    Q = "mac",
    G = "stopPropagation",
    Y = "plugins",
    Z = "addVariable",
    et = "preventDefault",
    tt = "lastIndexOf",
    nt = "matchMedia",
    rt = '" />',
    it = "auto",
    st = "only"; return t = navigator, n = document, r = window, i = ot(t.userAgent), s = p, o = p, u = 0, a = p, f = p, e || (e = {}), l = e[H] === v, e.swf || (e.swf = "krpano.swf"), e[z] === undefined && (e[z] = e.swf[R](".swf").join(".xml")), e.id || (e.id = "krpanoSWFObject"), e.width || (e.width = "100%"), e.height || (e.height = "100%"), e[N] || (e[N] = "#000000"), e[b] || (e[b] = E), e[y] || (e[y] = E), e[M] || (e[M] = it), e[J] === undefined && (e[J] = v), e[V] || (e[V] = []), e[D] || (e[D] = []), e[I] || (e[I] = E), e[$] ? e[k] = e[$] : (c = "./", h = e.swf[tt]("/"), h >= 0 && (c = e.swf[U](0, h + 1)), e[$] = c), e.isDevice = function(e) { var t, n, r, s = "all",
      o = ["ipad", "iphone", "ipod", K]; for (t in o) i[d](o[t]) >= 0 && (s += "|" + o[t]);
    e = ot(e)[R]("|"); if (e == E) return v;
    n = e[x]; for (t = 0; t < n; t++) { r = e[t]; if (s[d](r) >= 0) return v } return p }, e[Z] = function(t, n) { t = ot(t), t == "pano" || t == z ? e[z] = n : e[V][t] = n }, e.addParam = function(t, n) { e[D][ot(t)] = n }, e[_] !== undefined && (e[M] = e[_]), e[_] = function(t) { e[M] = t }, e.isHTML5possible = function() { return lt(), a }, e.isFlashpossible = function() { return lt(), o }, e[S] || (e[S] = function(t) { var n = e[w];
    n ? n.innerHTML = '<table width="100%" height="100%"><tr valign="middle"><td><center>ERROR:<br/><br/>' + t + "<br/><br/></center></td></tr></table>" : alert("ERROR: " + t) }), 
    e.embed = function(s) { 
      var c, h, _, H, R, W, $, K;
      s && (e[y] = s), e[w] = n[T](e[y]); 
      if (!e[w]) 
        e[S]("No Embedding Target");
      else { 
        l && at(), e[J] == p && (e[V]["control.disablewheel"] = v), e[F] && (e[V][F] = e[F]), lt(), c = ot(e[M]), h = o, _ = a, c == q ? _ = p : ut(c, st) && (h = p), ut(c, B) ? (o = h = p, a = _ = v) : _ && (c == "whenpossible" || ut(c, "prefer") || ut(c, it) && f) && (h = p); if (h && o) {
        function Z(e) {
          function S(e) {
            function a() { r[m] ? (r[m]("DOMMouseScroll", c, p), r[m]("mousewheel", c, p), n[m]("mousedown", f, p), n[m]("mouseup", l, p)) : (r.opera ? r.attachEvent(C, c) : r[C] = n[C] = c, n.onmousedown = f, n.onmouseup = l) }

            function f(e) { e || (e = r.event, e[y] = e[j]), u = e ? e[y] : E }

            function l(e) { var t, i, s, a, f, l, c, h;
              e || (e = r.event, e[y] = e[j]), t = 0, i = o[x]; for (t = 0; t < i; t++) { s = o[t]; if (s) { a = n[s.id]; if (a && s.needfix) { f = a.getBoundingClientRect(), l = a == e[y], c = a == u, h = e.clientX >= f.left && e.clientX < f.right && e.clientY >= f.top && e.clientY < f.bottom; if ((l || c) && h == p) try { a[P] && a[P](0, "mouseUp") } catch (d) {} } } } return v }

            function c(t) { var i, u, a, f, l, c;
              t || (t = r.event, t[y] = t[j]), i = 0, u = p, t.wheelDelta ? (i = t.wheelDelta / 120, r.opera && s && (i /= 4 / 3)) : t.detail && (i = -t.detail, s == p && (i /= 3)); if (i) { a = 0, f = o[x]; for (a = 0; a < f; a++) { l = o[a]; if (l) { c = n[l.id]; if (c && c == t[y]) { try { c.jswheel ? c.jswheel(i) : c[g] ? c[g](i) : c[L] && (c[L](), c[g] && c[g](i)) } catch (h) {}
                      u = v; break } } } }
              e[J] == p && (u = p); if (u) return t[G] && t[G](), t[et] && t[et](), t.cancelBubble = v, t.cancel = v, t.returnValue = p, p } var i, s = ot(t.appVersion)[d](Q) >= 0,
              o = r._krpMW,
              u = E;
            o || (o = r._krpMW = new Array, a()), i = e[b], o.push({ id: e.id, needfix: s || !!r.chrome || i == "opaque" || i == "transparent" }) } var i, s, o, u, a, f = "",
            l = e[V],
            c = e[D],
            h = e.id; for (;;) { s = n[T](h); if (!s) break;
            h += String.fromCharCode(48 + Math.floor(9 * Math.random())), e.id = h }
          e[b] && (c[b] = e[b]), e[N] && (c[N] = e[N]), e[z] !== undefined && (l[z] = e[z]), e[b] = ot(c[b]), c.allowfullscreen = "true", c.allowscriptaccess = B; for (i in l) f != "" && (f += "&"), f += encodeURIComponent(i) + "=" + encodeURIComponent(l[i]);
          c.flashvars = f, e[k] && (c.base = e[k]), o = "", u = ' id="' + h + '" width="' + e.width + '" height="' + e.height + '" style="outline:none;" ', a = "_krpcb_" + h, !e[I] || (r[a] = function() { try { delete r[a] } catch (t) { r[a] = E }
            e[I](n[T](h)) }); if (t[Y] && t[O] && t[O][x]) { o = '<embed name="' + h + '"' + u + 'type="application/x-shockwave-flash" src="' + e.swf + '" '; for (i in c) o += i + '="' + c[i] + '" ';
            o += " />" } else { o = "<object" + u + 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="' + e.swf + rt; for (i in c) o += '<param name="' + i + '" value="' + c[i] + rt;
            o += "</object>" }
          e[w].innerHTML = o, S(e) }
        u >= 11.4 && (H = v, ot(t.platform)[d](Q) >= 0 && ot(t.vendor)[d]("apple") >= 0 && (R = i[d]("webkit/"), R > 0 && (R = parseFloat(i[U](R + 7)), !isNaN(R) && R > 0 && R < 534 && (H = p))), H && e[b] == E && !e[D][b] && (e[b] = "direct")), Z(e) } else if (_ && a) {
        function nt(t) {
          function h(e, t, r) { var i, s = n.getElementsByTagName("head");
            s && (s = s[0]), s || (s = n.body), s ? (i = n[A]("script"), i.type = "text/javascript", i.async = v, i.onload = t, i[S] = r, i.src = f + e, s.appendChild(i)) : r() }

          function d() { return typeof krpanoJS !== X }

          function m() { return !!r.krpanoreg && !!r.krpanokey }

          function g() { s = v, b() }

          function b() { i == p && (m() || s) && d() && (i = v, e[V][z] = e[z], e[D] = e, e.htmltarget = e[y], krpanojs_init(t)) }

          function w() { t[S]("HTML5 Version not available!") } var i, s, o, u = "krpanoiphone.js",
            a = "krpanoiphone.license.js",
            f = "./",
            l = t.swf,
            c = l[tt]("/");
          c >= 0 && (f = l[U](0, c + 1)), i = p, s = p, o = m() | 0 | (d() | 0) << 1, o == 0 ? (h(a, b, g), h(u, b, w)) : o == 1 ? h(u, b, w) : o == 2 ? g() : b() }
        nt(e) } else W = "", $ = c != q, K = o == p && (c == q || !ut(c, B) && !ut(c, st)), K && (W += "Adobe Flashplayer 10.1 (or higher)"), K && $ && (W += " or a<br/>"), $ && (W += "HTML5 Browser with CSS 3D Transforms or WebGL support"), K && $ && (W += " are"), W += " required!", e[S](W) } }, ft(e) }

function removepano(e) { var t, n, r, i, s = document.getElementById(e); if (s) { t = window._krpMW; if (t)
      for (n = 0; n < t.length; n++) { r = t[n]; if (r && r.id === e) { t.splice(n, 1); break } }
    s.unload && s.unload(), i = s.parentNode, i && i.removeChild(s) } }

function embedpano(e) { createPanoViewer(e).embed() }

function createswf(e, t, n, r, i) { return createPanoViewer({ swf: e, id: t, width: n, height: r, bgcolor: i }) }

function createkrpanoJSviewer(e, t, n) { return createPanoViewer({ id: e, width: t, height: n, html5: "always" }) }
var embedPanoViewer, createkrpanoSWFviewer;
embedPanoViewer = embedpano, createkrpanoSWFviewer = createswf;