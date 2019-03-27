export default function() {
  function $(_) {
    var B = this,
      $ = _.split(".");
    for (var C = 0, A = $.length; C < A; C++) {
      if (typeof B[$[C]] == "undefined") B[$[C]] = {};
      B = B[$[C]]
    }
    return B
  }
  return { namespace: $ }
}