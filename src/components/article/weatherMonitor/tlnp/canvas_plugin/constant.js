export default function(target) {

  var $ = target.constant = {
    Kt0: 273.15,
    g: 9.8,
    Rd: 287.05,
    Rv: 461.5,
    Cpd: 1005,
    Cpv: 1850,
    Lw0: 2500790,
    Ls: 2834500,
    Cw: 4218,
    ew: 0.0000729
  };
  
  $.cL = $.Cw - $.Cpv;
  $.dar = $.g / $.Cpd;
  $.eps = $.Rd / $.Rv
}