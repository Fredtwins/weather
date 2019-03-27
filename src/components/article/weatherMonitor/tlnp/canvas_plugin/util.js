export default function(target) {

  if (!Date.prototype.now) {
    Date.now = function() {
      return (new Date()).getTime()
    }
  }

  function B() {
    var C = 0,
      B = 0,
      _ = 0,
      A = false,
      $ = false;
    return {
      start: function() {
        A = true;
        $ = true;
        _ = 0;
        C = Date.now()
      },
      stop: function() {
        if (!A || !$) return;
        $ = false;
        A = false;
        B = Date.now()
      },
      pause: function() {
        if (!$) throw new Error("Timer is not running!");
        if (!A) return;
        A = false;
        B = Date.now()
      },
      resume: function() {
        if (!$) throw new Error("Timer is not running!");
        if (A) return;
        _ += B - C;
        C = B = Date.now();
        A = true
      },
      reset: function() {
        this.start();
        this.pause()
      },
      sum: function() {
        var $ = A ? Date.now() : B;
        return _ + $ - C
      }
    }
  }

  function A() {
    var A = arguments[0],
      $ = 1;
    if (arguments.length > 1) {
      var _;
      while ((_ = arguments[$++]) != null)
        for (var B in _) A[B] = _[B]
    }
    return A
  }

  function D() {
    var B = arguments[0],
      _ = Object.create(B);
    if (arguments.length > 1) {
      var $ = Array.prototype.slice.call(arguments, 1);
      $.unshift(_);
      A.apply(null, $)
    }
    return _
  }

  function C() {
    var $ = {},
      _ = location.hash.substring(1).split(":");
    for (var B = 0; B < _.length; B++) {
      var A = _[B].indexOf("=");
      if (A != -1) $[_[B].slice(0, A)] = _[B].slice(A + 1)
    }
    return $
  }

  function _(B) {
    if (B != null) {
      var A = false,
        _ = "#";
      for (var C in B) {
        var $ = B[C];
        if ($ != null) {
          if (A) _ += ":";
          _ += C + "=" + $
        }
        A = true
      }
      if (A) location.hash = _
    }
  }

  function $() {
    return !!document.createElement("canvas").getContext
  }
  target.util = {
    timer: B,
    extend: A,
    create: D,
    getLocationHash: C,
    setLocationHash: _,
    isOfArray: function($) {
      return Object.prototype.toString.apply($) === "[object Array]"
    },
    canvasSupport: $
  }
}