export default function(target) {
  /* 
   * 项目: 【佛山气象试验版】
   * 库名: Tlnp插件及管理器
   * 作者: 木土
   * 版本: 0.1
   * 日期: 2011-10-9
   * 修订: 2013-2-2
   *
   * 设计提示:
   * 1 插件使用前先注册到PluginMnt
   * 2 在插件注册时，this.canv,this.dataMnt,this.pluginMnt被注入，插件的default_settings的内容会填入this.canv.settings.plugin_opt[注册插件id]，但不会覆盖同名属性。插件注册后this.getSettings()指向this.canv.settings.plugin_opt[注册插件id]
   */

  var phy = target.phy,
    util = target.util,
    tmutil = target.tmgram.util,
    g2dlnp = target.g2dlnp,
    tlnpplugin = target.namespace("tmgram.tlnpplugin");
  //以风向为X轴
  //@param order
  //@param min
  //@param max
  //@param left
  //@param right
  //@param width
  //@param x
  //@return 
  //function coor_x_linear(order,min,max,left,right,width,x){
  function coor_x_linear(order, min, max, canv, x) {
    var s = canv.settings,
      left = s.viewport_left,
      right = s.viewport_right,
      width = s.viewport_width,
      r = (x - min) * width / (max - min);
    return order ? left + r : right - r;
  }
  var coor_x_asc = coor_x_linear.bind(null, true),
    coor_x_desc = coor_x_linear.bind(null, false);
  target.tmgram.PLUGIN_GROUP = {
    //每项格式:
    //插件组名:[
    //	['id']	通常情况，为一个包含已注册的插件id的1元数组
    //	['id#2']	如果需要2个以上同id插件时,必须加'#xxx'区分
    //	['id.func_name']	默认执行插件对象的draw(),但可以指定其他函数，用'.'分隔。常用在同一个插件分步draw的场合。譬如一插件先绘画图形，接着其它插件绘画，然后前插件再标值(免被其它插件覆盖)
    //	['id',{opt0:value0,...}]	加入opt,将覆盖插件对象的default_settings设置
    //	（以上可组合）
    //	...
    //	]
    STD: [
      ['Framework'],
      ['Qs'],
      ['DryAdiabat'],
      ['MoistAdiabat'],
      ['QsLabel'],
      ['DryAdiabatLabel'],
      ['MoistAdiabatLabel'],
      ['XaxisLabel', { position: 'bottom' }],
      ['XaxisLabel_K', { 't_ref': 'XaxisLabel' }],
      ['YaxisLabel', { mode: "tlnp" }],
      ['HeightCoor'],
      ['Glass'],
      ['StratificationCurve', { wrap: true }],
      ['StateCurve'],
      ['Wind', { wrap: true }],
      ['Idx', { position: 'rt', fillStyle: "rgba(100%,100%,100%,0.9)", items: [{ color: 'black', lineWidth: 2, label: '风速' }, { color: '#777', lineWidth: 1, label: '风向' }] }],
      ['Mark']
    ],
    P_H: [
      ['Framework'],
      ['XaxisLabel', { position: 'top' }],
      ['XaxisLabel-h'],
      ['YaxisLabel'],
      ['HeightCoor'],
      ['Glass'],
      ['PressHeightCurve'],
      ['StratificationCurve'],
      ['Mark']
    ],
    LCL: [
      ['Framework'],
      ['Qs'],
      ['DryAdiabat'],
      ['MoistAdiabat'],
      ['XaxisLabel', { position: 'bottom' }],
      ['XaxisLabel_K', { 't_ref': 'XaxisLabel' }],
      ['YaxisLabel'],
      ['Glass', { fillStyle: "rgba(255,238,119,0.8)" }],
      ['Mark'],
      ['LCL'],
      ['StratificationCurve'],
      ['StateCurve'],
      ['LCL.label'],
      ['HeightCoor']
    ],
    CCL: [
      ['Framework'],
      ['Qs'],
      ['DryAdiabat'],
      ['MoistAdiabat'],
      ['XaxisLabel', { position: 'bottom' }],
      ['XaxisLabel_K', { 't_ref': 'XaxisLabel' }],
      ['YaxisLabel'],
      ['Glass', { fillStyle: "rgba(255,238,119,0.8)" }],
      ['Mark'],
      ['CCL'],
      ['StratificationCurve'],
      ['CCL.label'],
      ['HeightCoor']
    ],
    SpecialTempLayer: [
      ['Framework'],
      ['Qs'],
      ['DryAdiabat'],
      ['MoistAdiabat'],
      ['QsLabel'],
      ['DryAdiabatLabel'],
      ['MoistAdiabatLabel'],
      ['XaxisLabel', { position: 'bottom' }],
      ['XaxisLabel_K', { 't_ref': 'XaxisLabel' }],
      ['YaxisLabel'],
      ['Wind'],
      ['StateCurve'],
      ['Glass', { fillStyle: "rgba(255,238,119,0.6)" }],
      ['Mark'],
      ['StratificationCurve'],
      ['SpecialTempLayer'],
      ['SpecialTempLayer.label'],
      ['HeightCoor']
    ],
    VDISTRIBUTION: [
      ['Framework', { color_background: 'white' }],
      ['XaxisLabel'],
      ['YaxisLabel'],
      ['HeightCoor', { mode: 'standard' }],
      ['Mark']
    ],
    QCurve: [
      ['CanvasReset', { tmin: 0, tmax: 40 }],
      ['Framework', { color_background: 'white' }],
      ['XaxisLabel', { unit: 'g/kg', step: 5, position: 'bottom' }],
      ['XaxisLabel#2', { unit: 'g/kg', step: 5, position: 'top', unit_position: 'left' }],
      ['YaxisLabel'],
      ['HeightCoor', { mode: 'standard' }],
      ['Mark'],
      ['QCurve']
    ],
    RhCurve: [
      ['CanvasReset', { tmin: 0, tmax: 100 }],
      ['Framework', { color_background: 'white' }],
      ['XaxisLabel', { unit: '%', position: 'bottom' }],
      ['XaxisLabel#2', { unit: '%', position: 'top', unit_position: 'left' }],
      ['YaxisLabel'],
      ['HeightCoor', { mode: 'standard' }],
      ['Mark'],
      ['RhCurve']
    ],
    V_3theta: [
      ['CanvasReset', { tmin: -20, tmax: 120 }],
      ['Framework', { color_background: 'white' }],
      ['XaxisLabel', { position: 'bottom' }],
      ['XaxisLabel_K', { 't_ref': 'XaxisLabel' }],
      ['YaxisLabel'],
      ['HeightCoor', { mode: 'standard' }],
      ['Mark'],
      ['V_3theta'],
      ['Legend', { position: 'lt', fillStyle: "rgba(100%,100%,100%,0.9)", items: [{ color: 'black', lineWidth: 2, label: 'θ' }, { color: 'red', lineWidth: 2, label: 'θse' }, { color: 'blue', lineWidth: 2, label: 'θ*' }] }]
    ],
    V_WindSpeedProfile: [
      ['CanvasReset', { tmin: 0, tmax: 80 }],
      ['Framework', { color_background: 'white' }],
      ['XaxisLabel_cust', { unit: '°', position: 'top', unit_position: 'each', min: 0, max: 360, step: 45, coor_x: coor_x_desc }],
      ['XaxisLabel', { unit: 'm/s', position: 'bottom' }], //==['XaxisLabel_cust#2',{unit:'m/s',position:'bottom',unit_position:'right',min:0,max:80,step:10,coor_x:coor_x_asc}],
      ['YaxisLabel'],
      ['HeightCoor', { mode: 'standard' }],
      ['Mark'],
      ['WindSpeedProfile'],
      ['Wind', { xOn: 'wf', color: 'brown' }],
      ['Legend', { position: 'rt', fillStyle: "rgba(100%,100%,100%,0.9)", items: [{ color: 'black', lineWidth: 2, label: '风速' }, { color: '#777', lineWidth: 1, label: '风向' }] }]
    ]
  };

  target.tmgram.PluginMnt = PluginMnt;
  //插件管理器
  function PluginMnt(canv, dataMnt) {
    return {
      canv: canv,
      dataMnt: dataMnt,
      _plugins: [],
      draw: draw,
      register: register,
      find: find
    };

    function register(pid, funcname) {
      var id = pid.slice(0),
        n = pid.indexOf("#");
      if (n != -1)
        id = id.substring(0, n);
      var p = this.find(pid);
      if (p == null) {
        p = target.tmgram.tlnpplugin[id].create(this.canv);
        p._pluginMnt = this;
        p.id = pid;
        p.canv = this.canv;
        p.dataMnt = this.dataMnt;
        if (p._init)
          p._init();
        //if(p.default_settings){
        var st = util.extend({}, p.default_settings || {}, p.canv.settings.plugin_opt[pid]);
        p.canv.settings.plugin_opt[pid] = st;
        //}
      }
      if (funcname == null)
        funcname = "draw";
      this._plugins.push({ obj: p, funcname: funcname });
    }

    function find(pid) {
      for (var i = 0, len = this._plugins.length; i < len; i++) {
        if (pid == this._plugins[i].obj.id) {
          return this._plugins[i].obj;
        }
      }
      return null;
    }

    function draw(opt) {
      if (this.dataMnt.data) {
        for (var i in this._plugins) {
          var p = this._plugins[i].obj,
            funcname = this._plugins[i].funcname;
          var hide = this.canv.settings.plugin_opt[p.id].hide;
          if (!hide && p[funcname] != null)
            p[funcname]();
        }
      }
    }
  }
  //插件原型。
  var Tlnpplugin = {
    create: function(canv) {
      return create(this);
    },
    getSettings: function() {
      return this.canv.settings.plugin_opt[this.id];
    },
    _color_q: "green",
    _color_dryAdiabat: "#FF9966",
    _color_moistAdiabat: "#3366FF",
    _color_gridlines: "#FF9966",
    _color_background: "#FFEE77",
    _label_font_height: 12 //unit:px 标尺字体高度
      ,
    _label_fontstyle: "normal lighter 12px serif" // 标尺字体css style
      ,
    _isoline_fontstyle: "normal lighter 12px serif" // 等值线字体css style
      ,
    _labels: [],
    _addLabel: function(item) {
      this._labels.push(item);
    },
    label: function() {
        for (var i = 0, len = this._labels.length; i < len; i++) {
          this.draw_tplabels.apply(this, this._labels[i]);
        }
        this._labels.length = 0;
      }
      //描画的标记(集)。
      //@param pts:如,[label0,t0,p0,label1,t1,p1,..],t为温度(℃),p为气压(hPa)
      //@param opt:如,{label_color:"red",bg_color:"#FFE77",rotation:180,font_height:12(px)}
      //	label_color: 标值颜色
      //	bg_color: 背景色,缺省为 this._color_background
      //	rotation: 标值旋转角度，缺省为不旋转
      //	font_height: 字体大小(px)
      //@param ctx_opt:CanvasRenderingContext2D可接受的参数。其中，textAlign属性值缺省为"left"
      ,
    draw_tplabels: function(pts, opt, ctx_opt) {
      var canv = this.canv;
      opt = util.extend({ bg_color: this._color_background, font_height: this._label_font_height }, opt || {});
      ctx_opt = util.extend({ textAlign: "center", textBaseline: "middle", font: this._isoline_fontstyle }, ctx_opt || {});
      pts = pts.map(function(v, i) {
        switch (i % 3) {
          case 0:
            return v;
          case 1:
            return canv.coor_x(v);
          case 2:
            return canv.coor_y(v);
        }
      });
      canv.draw_labels(pts, opt, ctx_opt);
    },
    findSibling: function(pid) {
        return this._pluginMnt.find(pid);
      }
      //,draw:function(){} 必须由派生对象覆盖
      //,canv: 插件在注册到PluginMnt时由系统注入
      //,dataMnt: 插件在注册到PluginMnt时由系统注入
      //,_pluginMnt: 插件在注册到PluginMnt时由系统注入
      //,default_settings:{} 插件在注册到PluginMnt时，其default_settings的内容会填入this.canv.settings.plugin_opt[注册插件id]，但不会覆盖同名属性。插件注册后this.getSettings()指向this.canv.settings.plugin_opt[注册插件id]
  };
  //适合于制作原始的Tlnpplugin对象
  function create(ext) {
    var argu = Array.prototype.slice.call(arguments, 0);
    argu.unshift(Tlnpplugin);
    var o = util.create.apply(null, argu);
    //if(o._init)
    //o._init();
    tlnpplugin[o.id] = o;
    return o;
  };
  //适合于制作派生的Tlnpplugin对象
  function create2(parent, ext) {
    var o = util.create.apply(null, arguments);
    tlnpplugin[o.id] = o;
    return o;
  };
  //让外部能制作plugin
  tlnpplugin.create = create;
  //==================================================== 等比湿线 及 标值 ====================================================
  var CanvasReset = create({
    id: 'CanvasReset'
      //,default_settings:{}
      ,
    _init: function() {
      var canv = this.canv;
      canv.setOption(this.getSettings());
    }
  });
  //构建饱和比湿线(1050-50和1050-200/262.5-50Hpa)原型对象
  var Qs = create({
    id: 'Qs',
    _qs_low: [0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 1.3, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40]
      //override
      ,
    draw: function(opt) {
      var canv = this.canv,
        settings = canv.settings;
      for (var i = 0, len = this._qs_low.length; i < len; i++) {
        var L = tmutil.qs_curve(this._qs_low[i] / 1000, 1050, settings.pmin, 50);
        canv.draw_polyline(canv.toPx(L), { strokeStyle: this._color_q, lineWidth: 1 });
      }
    }
  });
  //构建饱和比湿线标值(Ema50-1050)原型对象
  var Ema50QsLabel = create2(Qs, {
    id: 'QsLabel',
    create: function(canv) {
      var diagram_mode = canv.diagram_mode;
      switch (diagram_mode) {
        case "ema200":
          return Object.create(Ema200QsLabel);
        default:
          return Object.create(Ema50QsLabel);
      }
    },
    draw: function(opt) {
      var canv = this.canv,
        settings = canv.settings,
        lbs = [];
      var p = 475; //指定的水平气压线值
      for (var j = 0, len = this._qs_low.length; j < len; j++) {
        var Q = this._qs_low[j];
        var T = phy.qs_T(Q / 1000, p);
        lbs.push(Q, phy.t(T), p);
      }
      this.draw_tplabels(lbs, { unit: "g/kg", label_color: this._color_q, rotation: -7 * Math.PI / 180 });
    }
  });
  //构建饱和比湿线标值(1050-200/262.5-50Hpa)原型对象
  var Ema200QsLabel = util.create(Ema50QsLabel, {
    _qs_high: [0.04, 0.2, 0.4, 0.8]
      //override
      ,
    draw: function(opt) {
      var canv = this.canv,
        settings = canv.settings,
        lbs = [];

      var p = 333; //指定高层的水汽压线值
      for (var i = 0, len = this._qs_high.length; i < len; i++) {
        var T = phy.qs_T(this._qs_low[i] / 1000, p); //实际是使用低层的饱和比湿线
        lbs.push("(" + this._qs_high[i] + ")", phy.t(T), p); //但标高层的值
      }
      p = 675; //指定低层的水汽压线值
      for (var j = 0, len = this._qs_low.length; j < len; j++) {
        var Q = this._qs_low[j];
        var T = phy.qs_T(Q / 1000, p);
        lbs.push(Q, phy.t(T), p);
      }
      this.draw_tplabels(lbs, { unit: "g/kg", label_color: this._color_q, rotation: -7 * Math.PI / 180 });
    }
  });
  //==================================================== 干绝热线 及 标值 ====================================================
  //构建干绝热线(Ema50-1050)原型对象
  var Ema50DryAdiabat = create({
    id: 'DryAdiabat'
      //θ取值范围
      ,
    _theta_min: -80,
    _theta_max: 300,
    create: function(canv) {
        var diagram_mode = canv.diagram_mode;
        switch (diagram_mode) {
          case "ema200":
            return Object.create(Ema200DryAdiabat);
          default:
            return Object.create(Ema50DryAdiabat);
        }
      }
      //override
      ,
    draw: function() {
      var canv = this.canv,
        settings = canv.settings;
      for (var t = this._theta_min; t <= this._theta_max; t += 10) {
        var L = tmutil.theta_curve(t, settings.pmax, settings.pmin, 50);
        canv.draw_polyline(canv.toPx(L), { strokeStyle: this._color_dryAdiabat });
      }
    }
  });
  //Ema200DryAdiabat(Label)共用的属性
  var Ema200DryAdiabat_extend_data = {
      //override
      _theta_max: 130
    }
    //构建干绝热线(1050-200/262.5-50Hpa)原型对象
  var Ema200DryAdiabat = util.create(Ema50DryAdiabat, Ema200DryAdiabat_extend_data);
  //构建干绝热线标值(Ema50-1050)原型对象
  var Ema50DryAdiabatLabel = create2(Ema50DryAdiabat, {
    id: 'DryAdiabatLabel',
    create: function(canv) {
        var diagram_mode = canv.diagram_mode;
        switch (diagram_mode) {
          case "ema200":
            return Object.create(Ema200DryAdiabatLabel);
          default:
            return Object.create(Ema50DryAdiabatLabel);
        }
      }
      //制作标记位置数据
      //v0,v1为直线两端点(温度K,气压hPa)
      ,
    _data: function(theta, v0, v1) {
      var pts = [];
      for (var i = 0, len = theta.length; i < len; i++) {
        var t = theta[i];
        var sol = tmutil.crosspoint_on_dryAdiabat(phy.T(t), v0, v1); //如果要加速，可设定直线函数。见crosspoint_on_dryAdiabat说明
        if (sol == null)
          continue;
        pts.push(t, phy.t(sol[0]), sol[1]);
      }
      return pts;
    },
    draw: function() {
      var canv = this.canv,
        theta = [];
      for (var t = this._theta_min; t <= this._theta_max; t += 10)
        theta.push(t);
      var opt = { unit: "℃", label_color: this._color_dryAdiabat, rotation: null };
      this.draw_tplabels(this._data(theta, [phy.T(-85), 1050], [phy.T(-15), 60]), opt); //取两端点构造一直线
    }
  });
  //构建干绝热线标值(1050-200/262.5-50Hpa)原型对象
  var Ema200DryAdiabatLabel = util.create(Ema50DryAdiabatLabel, Ema200DryAdiabat_extend_data, {
    //override
    draw: function() {
      var canv = this.canv,
        theta = [];
      for (var t = this._theta_min; t <= this._theta_max; t += 10)
        theta.push(t);
      var opt = { unit: "℃", label_color: this._color_dryAdiabat, rotation: -55 * Math.PI / 180 };
      this.draw_tplabels(this._data(theta, [phy.T(-85), 1050], [phy.T(-9), 230]), opt); //取两端点构造一直线
      //200hPa以上，修改标值和位置。
      var d2 = this._data(theta, [phy.T(-83), 950], [phy.T(-11), 220]);
      //覆盖200hPa以上高层标值。标值从气图5204读取（绘图时为节省地方，取整）
      var theta_h = [14.7, 29.6, 44.5, 59.4, 74.3, 89.2, 104.1, 119.0, 134.0, 148.9, 163.8, 178.7, 193.6, 208.5, 223.4, 238.3, 253.4, 263.1, 283.1, 298.0, 312.9, 327.8];
      for (var i = 0, len = theta_h.length; i < len; i++)
        d2[i * 3] = "(" + Math.round(theta_h[i]) + ")";
      delete opt.unit;
      this.draw_tplabels(d2, opt);
    }
  });
  //==================================================== 湿绝热线 及 标值 ====================================================
  //构建湿绝热线(Ema50-1050)原型对象
  var Ema50MoistAdiabat = create({
    id: 'MoistAdiabat',
    create: function(canv) {
        var diagram_mode = canv.diagram_mode;
        switch (diagram_mode) {
          case "ema200":
            return Object.create(Ema200MoistAdiabat);
          default:
            return Object.create(Ema50MoistAdiabat);
        }
      }
      //等θse线取值,由继承对象中提供
      ,
    _get_ar_theta: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 240, 280],
    draw: function() {
      var canv = this.canv,
        settings = canv.settings;
      var lps = _wet_adiabat_data(this._get_ar_theta).lines;
      for (var i = 0, len = lps.length; i < len; i++) {
        var points = [];
        var ls = lps[i];
        for (var j = 0, len2 = ls.length; j < len2; j += 2) {
          points.push(ls[j]);
          points.push(ls[j + 1]);
        }
        canv.draw_polyline(canv.toPx(points), { strokeStyle: this._color_moistAdiabat });
      }

      function _wet_adiabat_data(ar_theta) {
        var lps = []; //likes [[40,1050,33,800,20,500],[30,1050,20,800,3,500]...]
        for (var i = 0, len = ar_theta.length; i < len; i++) {
          var points = tmutil.discret_moistAdiabat(phy.T(ar_theta[i]), 1050, settings.pmin);
          lps.push(points);
        }
        return { lines: lps };
      }
    }
  });
  //Ema200MoistAdiabat(Label)共用的属性
  var Ema200MoistAdiabat_extend_data = {
      //override
      _get_ar_theta: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180]
    }
    //构建湿绝热线(1050-200/262.5-50Hpa)原型对象
  var Ema200MoistAdiabat = util.create(Ema50MoistAdiabat, Ema200MoistAdiabat_extend_data);
  //构建湿绝热线标值(Ema50-1050)原型对象
  var Ema50MoistAdiabatLabel = create2(Ema50MoistAdiabat, {
    id: 'MoistAdiabatLabel',
    create: function(canv) {
      var diagram_mode = canv.diagram_mode;
      switch (diagram_mode) {
        case "ema200":
          return Object.create(Ema200MoistAdiabatLabel);
        default:
          return Object.create(Ema50MoistAdiabatLabel);
      }
    },
    draw: function() {
        var canv = this.canv;
        this.draw_tplabels(this._drawLabels_data(this._get_ar_theta, [phy.T(-48.5), 890], this._drawLabels_point2), { unit: "℃", label_color: this._color_moistAdiabat, rotation: -55 * Math.PI / 180 });
      }
      //制作标记位置数据
      //v0,v1为直线两端点(温度℃,气压hPa)
      ,
    _drawLabels_data: function(theta, v0, v1) {
        var pts = [];
        for (var i = 0, len = theta.length; i < len; i++) {
          var t = theta[i];
          var sol = tmutil.crosspoint_on_moistAdiabat(phy.T(t), v0, v1); //如果要加速，可设定直线函数。见crosspoint_on_moistAdiabat说明
          if (sol == null)
            break;
          pts.push(t, phy.t(sol[0]), sol[1]);
        }
        return pts;
      }
      //确定标记所构成的直线的第2个端点
      ,
    _drawLabels_point2: [phy.T(-5), 150]
  });
  //构建湿绝热线标值(1050-200/262.5-50Hpa)原型对象
  var Ema200MoistAdiabatLabel = util.create(Ema50MoistAdiabatLabel, Ema200MoistAdiabat_extend_data, { _drawLabels_point2: [phy.T(4), 320] });
  //==================================================== 框架插件 ====================================================
  var Framework = create({
    id: 'Framework',
    default_settings: {
      gridlines_main_width: 1,
      step_t: 5
        //,color_background:null
    },
    _init: function() {
      this.default_settings.color_background = this.default_settings.color_background || this._color_background;
    },
    draw: function() {
      var canv = this.canv,
        ctx = canv.ctx,
        settings = canv.settings,
        ts = this.getSettings();
      //var x=settings.padding_left;
      //var y=settings.padding_top;
      var x = settings.viewport_left;
      var y = settings.viewport_top;
      var w = settings.viewport_width;
      var h = settings.viewport_height;
      //ctx.fillStyle=ts.color_background || this._color_background;
      ctx.fillStyle = ts.color_background;
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = this._color_gridlines;
      ctx.lineWidth = ts.gridlines_main_width;
      ctx.strokeRect(x, y, w, h);
      ctx.beginPath();
      //画主温度竖线
      for (var t = settings.tmin; t <= settings.tmax; t += ts.step_t) {
        ctx.moveTo(canv.coor_x(t), y);
        ctx.lineTo(canv.coor_x(t), y + h);
      }
      //画主气压横线
      for (var p = 1000; p >= settings.pmin; p = p > 100 ? p - 50 : p - 25) {
        ctx.moveTo(x, canv.coor_y(p));
        ctx.lineTo(x + w, canv.coor_y(p));
      }
      ctx.stroke();
      ctx.closePath();
    }
  });
  //==================================================== X-轴定制插件，可作为其它x轴插件原型 ====================================================
  var XaxisLabel_cust = create({
    id: 'XaxisLabel_cust',
    default_settings: {
      //step:
      //,min
      //,max
      //,unit_position:'right'	// right|left|each
      //,position:'bottom' // top|bottom
      //,unit:
      //,coor_x
    },
    _init: function() {
      var canv = this.canv,
        settings = canv.settings,
        ts = this.getSettings();
      ts.min = ts.min != null ? ts.min : settings.tmin;
      ts.max = ts.max != null ? ts.max : settings.tmax;
    },
    draw: function() {
      var canv = this.canv,
        settings = canv.settings,
        ts = this.getSettings(),
        coor_x = ts.coor_x != null ? ts.coor_x.bind(null, ts.min, ts.max, canv) : canv.coor_x.bind(canv);
      this._drawIt(ts.min, ts.max, coor_x);
    },
    _drawIt: function(min, max, coor) {
      var canv = this.canv,
        settings = canv.settings,
        ts = this.getSettings(),
        y = settings.padding_top,
        h = settings.viewport_height,
        opt = { label_color: this._color_gridlines, font_height: this._label_font_height },
        ctx_opt = { fillStyle: this._color_gridlines, font: this._label_fontstyle, textAlign: "center" },
        pts = [];
      //绘x-轴标尺
      for (var t = min; t <= max; t += ts.step) {
        var cx = coor(t),
          cy = ts.position == 'top' ? y : y + h + 1; //当作为下x-轴标尺时，加空隙"1"
        pts.push(t, cx, cy);
      }
      pts = reorder(pts);
      tofix(pts);
      ctx_opt.textBaseline = ts.position == "top" ? "bottom" : "top";
      canv.draw_labels(pts, opt, ctx_opt);

      //返回数组，其元素以pts内元素按3个一组倒排
      function reorder(pts) {
        if (pts.length <= 6 || pts[4] > pts[1]) //队列的x坐标是否从小到大排序
          return pts;
        var a = [];
        for (var i = 0, len = pts.length; i < len; i += 3) {
          a.unshift(pts[i], pts[i + 1], pts[i + 2]);
        }
        return a;
      }
      //添加单位，并调节头尾两个lable的x坐标，使其不超出两边
      function tofix(pts) {
        if (pts.length <= 3)
          return;
        var w = canv.ctx.measureText(ts.unit).width; //单位文字宽度
        //先对每个刻度标记都带单位的处理
        if (ts.unit && ts.unit_position == 'each') {
          for (var i = 0, len = pts.length; i < len; i += 3) {
            pts[i] = pts[i] + ts.unit;
            pts[i + 1] = pts[i + 1] + w / 2; //因为标记中间对齐，增加单位后需做调整
          }
        }
        var ih = 1,
          wh = canv.ctx.measureText(pts[ih - 1]).width //队列头
          ,
          it = pts.length - 2,
          wt = canv.ctx.measureText(pts[it - 1]).width; //队列尾
        //对头尾两个标记的x位置调整，使其不超出左右两y轴线
        if (pts[ih] - wh / 2 < settings.viewport_left)
          pts[ih] = settings.viewport_left + wh / 2;
        if (pts[it] + wt / 2 > settings.viewport_right)
          pts[it] = settings.viewport_right - wt / 2;
        //处理单位
        if (ts.unit && (ts.unit_position == 'left' || ts.unit_position == 'right')) {
          if (ts.unit_position == 'left') {
            if (settings.viewport_left + w > pts[ih] - wh / 2) { //如果单位会覆盖标记，改写
              pts[ih - 1] = ts.unit;
              pts[ih] = settings.viewport_left + w / 2;
            } else { //如果不会覆盖，追加
              pts.unshift(ts.unit, settings.viewport_left + w / 2, pts[ih + 1]);
            }
          } else {
            if (settings.viewport_right - w < pts[it] + wt / 2) {
              pts[it - 1] = ts.unit;
              pts[it] = settings.viewport_right - w / 2;
            } else {
              pts.push(ts.unit, settings.viewport_right - w / 2, pts[it + 1]);
            }
          }
        }
      }
    }
  });
  //==================================================== x(温度)-轴标值插件 ====================================================
  var XaxisLabel = create2(XaxisLabel_cust, {
    id: 'XaxisLabel',
    default_settings: {
      step: 10,
      position: 'bottom' // tlnp|top|bottom (tlnp=top & bottom)
        ,
      unit_position: 'right',
      unit: "℃"
    },
    draw: function() {
      var canv = this.canv,
        ts = this.getSettings(),
        min = Math.ceil(ts.min / 10) * 10,
        max = Math.floor(ts.max / 10) * 10,
        coor_x = canv.coor_x.bind(canv);
      this._drawIt(min, max, coor_x);
    }
  });
  //==================================================== x(高度)-轴标值插件 ====================================================
  var XaxisLabel_h = create2(XaxisLabel_cust, {
    id: 'XaxisLabel-h',
    default_settings: {
      min: 0
        //,max:25
        ,
      step: 1,
      position: 'bottom',
      unit_position: 'left',
      unit: "kgpm",
      coor_x: coor_x_desc
    },
    _init: function() {
      this.default_settings.max = this.canv.diagram_mode == "ema200" ? 12.5 : 25;
    }
  });
  //==================================================== x(绝对温标)-轴标值插件 ====================================================
  var XaxisLabel_K = create2(XaxisLabel_cust, {
    id: 'XaxisLabel_K',
    default_settings: {
      //min:185
      //,max:315
      //,t_ref:'CanvasReset' //如果指定，min,max用参考插件的tmin,tmax
      step: 10,
      position: 'top',
      unit_position: 'right',
      unit: "K"
    },
    _init: function() {
      var ts = this.getSettings(),
        refts = this.findSibling(ts.t_ref).getSettings(),
        min = refts.min != null ? refts.min : refts.tmin != null ? refts.tmin : 185,
        max = refts.max != null ? refts.max : refts.tmax != null ? refts.tmax : 315;
      ts.min = phy.T(min);
      ts.max = phy.T(max);
    },
    draw: function() {
      var canv = this.canv,
        settings = canv.settings,
        ts = this.getSettings(),
        min = Math.ceil(ts.min / 10) * 10,
        max = Math.floor(ts.max / 10) * 10,
        coor_x2 = canv.coor_x.bind(canv),
        coor_x = function(T) { return coor_x2(phy.t(T)); }
      this._drawIt(min, max, coor_x);
    }
  });
  //==================================================== y-轴标值(Ema50-1050)插件 ====================================================
  var Ema50YaxisLabel = create({
    id: 'YaxisLabel',
    default_settings: {
      mode: "left_outer" // tlnp|left_outer
    },
    create: function(canv) {
      var diagram_mode = canv.diagram_mode;
      switch (diagram_mode) {
        case "ema200":
          return Object.create(Ema200YaxisLabel);
        default:
          return Object.create(Ema50YaxisLabel);
      }
    },
    draw: function() {
      var canv = this.canv,
        settings = canv.settings,
        x = settings.padding_left,
        y = settings.padding_top,
        w = settings.viewport_width,
        opt = { label_color: this._color_gridlines, font_height: this._label_font_height },
        ctx_opt = { fillStyle: this._color_gridlines, font: this._label_fontstyle, textBaseline: "middle", textAlign: "right" },
        pts = [],
        pts2 = [];
      //外气压标尺
      for (var p = 1000; p >= settings.pmin; p = p > 300 ? p - 100 : p > 100 ? p - 50 : p - 25) { // 200hPa以下:间隔100,100以下:间隔50,以上:间隔25
        var cy = canv.coor_y(p);
        pts.push(p, x - 1, cy); //左气压标尺. "1"为空隙
        //pts2.push(p,x+w+1,cy); //右气压标尺. "1"为空隙
      }
      canv.draw_labels(pts, opt, ctx_opt);
      if (this.getSettings().mode != "left_outer") {
        ctx_opt.textAlign = "left";
        canv.draw_labels(pts2, opt, ctx_opt);
      }
    }
  });
  //==================================================== y-轴标值(1050-200/262.5-50Hpa)插件 ====================================================
  var Ema200YaxisLabel = create2(Ema50YaxisLabel, {
    draw: function() {
      Ema50YaxisLabel.draw.apply(this, arguments);
      if (this.getSettings().mode == "left_outer")
        return;
      var canv = this.canv,
        settings = canv.settings,
        x = settings.padding_left,
        ctx_opt = { fillStyle: this._color_gridlines, font: this._label_fontstyle, textAlign: "left", textBaseline: "middle" },
        bg_color = this.findSibling('Framework').getSettings().color_background,
        opt = { label_color: this._color_gridlines, font_height: this._label_font_height, bg_color: bg_color },
        pts = [];
      //左(内)气压标尺
      for (var p = 75; p <= 250; p += 25) {
        var hl = canv.coor_yhigh(p);
        pts.push("(" + p + ")", x + 2, hl); //"2"为空隙
      }
      canv.draw_labels(pts, opt, ctx_opt);
    }
  });
  //==================================================== 毛玻璃插件 ====================================================
  var Glass = create({
    id: "Glass",
    default_settings: {
      fillStyle: "rgba(100%,100%,100%,0.25)"
    },
    draw: function() {
      var canv = this.canv,
        ctx = canv.ctx,
        settings = canv.settings,
        x = settings.padding_left,
        y = settings.padding_top,
        w = settings.viewport_width,
        h = settings.viewport_height;
      ctx.beginPath();
      ctx.fillStyle = this.getSettings().fillStyle;
      ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
      ctx.closePath();
    }
  });
  //==================================================== 标识插件 ====================================================
  var Mark = create({
    id: "Mark",
    default_settings: {
      copyright_color: "#ff9900" //版权标识字体颜色
        ,
      x: 25,
      y: 19
    },
    draw: function() {
      var ts = this.getSettings(),
        canv = this.canv,
        settings = canv.settings,
        opt = { label_color: this.getSettings().copyright_color, font_height: this._label_font_height },
        ctx_opt = { textAlign: "left", textBaseline: "bottom", font: this._label_fontstyle },
        x = ts.x + settings.viewport_left + ts.x,
        y = settings.viewport_bottom - ts.y;

      //var pts=["佛山气象 2011",xcanv.coor_x(-77.5),canv.coor_y(1000)];
      var pts = ["佛山气象 2011", x, y];
      canv.draw_labels(pts, opt, ctx_opt);
    }
  });
  //==================================================== 高空风插件 ====================================================
  var Wind = create({
    id: 'Wind',
    default_settings: {
      color: 'black',
      shaftLength: 20,
      xOn: 't' // 't'|'wf' x-坐标使用温度t还是风速wf
        ,
      wrap: false
    },
    draw: function() { //描绘高空风符号
      var ts = this.getSettings(),
        core_radius = 0,
        shaftLength = ts.shaftLength,
        ctx_opt = { strokeStyle: ts.color },
        canv = this.canv,
        ctx = canv.getContext();
      if (ts.xOn == 't') {
        var wt = this.dataMnt.getSeries('w&t', true)
        for (var i = 0; i < wt.length; i += 4) {
          var wd = wt[i],
            wf = wt[i + 1],
            t = wt[i + 2],
            p = wt[i + 3];
          draw(wd, wf, t, p, ts.wrap);
        }
      } else if (ts.xOn == 'wf') {
        var wt = this.dataMnt.getSeries('w', true);
        for (var i = 0; i < wt.length; i += 3) {
          var wd = wt[i],
            wf = wt[i + 1],
            p = wt[i + 2];
          draw(wd, wf, wf, p, ts.wrap);
        }
      }

      function draw(wd, wf, t, p, wrap) {
        var tps = canv.toPx([t, p], wrap);
        for (var j = 0; j < tps.length; j += 2) {
          var x = tps[j],
            y = tps[j + 1];
          target.wsymbol.drawWind(ctx, wd, wf, { x: x, y: y }, core_radius, shaftLength, false, ctx_opt);
        }
      }
    }
  });
  //==================================================== 风速廓线插件 ====================================================
  var WindSpeedProfile = create({
    id: 'WindSpeedProfile',
    default_settings: {
      wf_color: 'black',
      wf_lineWidth: 2,
      wd_color: '#777',
      wd_lineWidth: 1
    },
    draw: function() { //描绘高空风符号
      var ts = this.getSettings(),
        Lf = [],
        Ld = [],
        ctx_opt_wf = { strokeStyle: ts.wf_color, lineWidth: ts.wf_lineWidth },
        ctx_opt_wd = { strokeStyle: ts.wd_color, lineWidth: ts.wd_lineWidth },
        canv = this.canv,
        ctx = canv.getContext(),
        wt = this.dataMnt.getSeries('w', true),
        coor_wd = coor_x_desc.bind(null, 0, 360, canv);

      for (var i = 0; i < wt.length; i += 3) {
        var wd = wt[i],
          wf = wt[i + 1],
          p = wt[i + 2];
        Lf.push(wf, p);
        Ld.push(coor_wd(wd), canv.coor_y(p));
      }
      canv.draw_polyline(Ld, ctx_opt_wd);
      canv.draw_polyline(canv.toPx(Lf), ctx_opt_wf);
    }
  });
  //==================================================== 图例插件 ====================================================
  var Legend = create({
    id: 'Legend',
    default_settings: {
      position: 'rt' //在视图内的位置，相对于上下左右边：lt|rt|lb|rb
        ,
      dx: 40 //legend外框到视图上(下)边距离
        ,
      dy: 20 //legend外框到视图左(右)边距离
        ,
      padding: 7 //外框与项目的间距
        ,
      border_strokeStyle: 'red' //legend外框颜色
        ,
      border_lineWidth: 1 //legend外框宽度
        //,fillStyle:"rgba(100%,100%,100%,0.25)"	//legend底色
        ,
      item_label_color: 'black' //label颜色
        ,
      item_height: 12 //item 高(应与item_font中对应项相同)
        ,
      item_font: "12px serif" // label 字体css style
        ,
      item_lineWidth: 1 //当icon=='line'时线宽
        ,
      item_type: '-' //icon类型 [-|/\]
        ,
      item_icon_width: 20 //icon宽
        ,
      item_hSpan: 5 //icon与label水平间距
        ,
      item_vSpan: 5 //每条目上下间距
        //,items:[{type:'line',color:'yellow',lineWidth:'1',label:''}]
    },
    draw: function() { //描绘
      var ts = this.getSettings(),
        canv = this.canv,
        settings = canv.settings,
        ctx = canv.ctx,
        wh = calcWH(),
        frame = canv.legend_frame(util.extend({}, ts, { width: wh[0], height: wh[1] })),
        x = frame.X(0),
        y = frame.Y(0);
      ctx.save();
      frame.draw();
      ctx.font = ts.item_font;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      for (var i = 0, len = ts.items.length; i < len; i++) {
        var item = ts.items[i];
        item.type = item.type || ts.item_type
        drawItem(x, y, item);
        y += ts.item_vSpan + ts.item_height;
      }
      ctx.restore();
      //计算lengend的长和宽
      function calcWH() {
        var len = ts.items.length,
          w = 0,
          h = len * ts.item_height + (len - 1) * ts.item_vSpan;
        for (var i = 0; i < len; i++) {
          w = Math.max(w, ctx.measureText(ts.items[i].label).width);
        }
        w += ts.item_icon_width + ts.item_hSpan;
        return [w, h];
      }

      function drawItem(x, y, item) {
        var x0, y0, x1, y1;
        switch (item.type) {
          case "|":
            x0 = x1 = x + ts.item_icon_width / 2;
            y0 = y;
            y1 = y0 + ts.item_height;
            break;
          case "\\":
            x0 = x, x1 = x + ts.item_icon_width;
            y0 = y;
            y1 = y + ts.item_height;
            break;
          case "/":
            x0 = x, x1 = x + ts.item_icon_width;
            y1 = y;
            y0 = y + ts.item_height;
            break;
          default:
            x0 = x;
            y0 = y1 = y + ts.item_height / 2;
            x1 = x + ts.item_icon_width; //"-"
        }
        ctx.strokeStyle = item.color
        ctx.lineWidth = item.lineWidth || ts.item_lineWidth;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = ts.item_label_color;
        ctx.fillText(item.label, x + ts.item_icon_width + ts.item_hSpan, y + ts.item_height / 2);
      }
    }
  });
  //==================================================== 指数插件 ====================================================
  var Idx = create({
    id: 'Idx',
    default_settings: {
      position: 'rt' //在视图内的位置，相对于上下左右边：lt|rt|lb|rb
        ,
      dx: 40 //legend外框到视图上(下)边距离
        ,
      dy: 20 //legend外框到视图左(右)边距离
        ,
      padding: 7 //外框与项目的间距
        ,
      border_strokeStyle: 'red' //legend外框颜色
        ,
      border_lineWidth: 1 //legend外框宽度
        //,fillStyle:"rgba(100%,100%,100%,0.25)"	//legend底色
        ,
      item_label_color: 'black' //label颜色
        ,
      item_note_color: '#777' //note颜色
        ,
      item_height: 12 //item 高(应与item_font中对应项相同)
        ,
      item_font: "12px serif" // label 字体css style
        ,
      item_font_note: "11px serif" // label 字体css style
        ,
      item_height_note: 11 //item 高(应与item_font_note中对应项相同)
        ,
      item_hSpan: 5 //icon与label水平间距
        ,
      item_vSpan: 5 //每条目上下间距
    },
    draw: function() { //描绘
        var ts = this.getSettings(),
          canv = this.canv,
          settings = canv.settings,
          ctx = canv.ctx,
          items = this._make_idx_items(),
          wh = calcWH(items),
          frame = canv.legend_frame(util.extend({}, ts, { width: wh[0], height: wh[1] })),
          x = frame.X(0),
          y = frame.Y(0);
        ctx.save();
        frame.draw();
        ctx.textBaseline = "middle";
        drawItems(x, y, items);
        ctx.restore();
        //计算lengend的长和宽
        function calcWH(items) {
          var len = items.length,
            w = 0,
            h = len * ts.item_height + (len - 1) * ts.item_vSpan;
          for (var i = 0; i < len; i++) {
            var item = items[i];
            ctx.font = ts.item_font;
            w = Math.max(w, ctx.measureText(item[0]).width);
            if (item.length > 1) {
              ctx.font = ts.item_font_note;
              for (var j = 1, jlen = item.length; j < jlen; j++) {
                w = Math.max(w, ctx.measureText(item[j]).width);
                h += ts.item_height + ts.item_vSpan;
              }
            }
          }
          return [w, h];
        }

        function drawItems(x, y, items) {
          for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            ctx.font = ts.item_font;
            ctx.fillStyle = ts.item_label_color;
            ctx.textAlign = 'left';
            ctx.fillText(item[0], x, y + ts.item_height / 2);
            if (item.length > 1) {
              ctx.font = ts.item_font_note;
              ctx.textAlign = 'right';
              ctx.fillStyle = ts.item_note_color;
              for (var j = 1, jlen = item.length; j < jlen; j++) {
                y += ts.item_vSpan + ts.item_height_note;
                ctx.fillText(item[j], x + wh[0], y + ts.item_height_note / 2);
              }
            }
            y += ts.item_vSpan + ts.item_height;
          }
        }
      }
      //@return [['SI(沙氏)指数: -9],...,['KY(山崎)指数: 10,'统计系数a=b=1,r=0']];
      ,
    _make_idx_items: function() {
      var idx = phy.index,
        items0 = { SI: 'SI沙氏指数', TT: 'TT全总指数', A: 'A指数', K: 'K指数', KY: 'KY山崎指数', SWEAT: 'SWEAT强天气威胁' },
        items = [],
        dm = this.dataMnt,
        la = dm.getSta().la,
        t500 = dm.calcT(500),
        td500 = dm.calcTd(500),
        t700 = dm.calcT(700),
        td700 = dm.calcTd(700),
        t850 = dm.calcT(850),
        td850 = dm.calcTd(850),
        W500 = dm.getW(500),
        W850 = dm.getW(850),
        wd500 = W500 != null ? W500[0] : null,
        wf500 = W500 != null ? W500[1] : null,
        wd850 = W850 != null ? W850[0] : null,
        wf850 = W850 != null ? W850[1] : null,
        T500 = phy.T(t500),
        Td500 = phy.T(td500),
        T850 = phy.T(t850),
        Td850 = phy.T(td850),
        SI, TT, A, K, KY_TA, KY, SWEAT;
      //console.log('la=',la,', t500=',t500,', td500=',td500,',t700=',t700,', td700=',td700,',t850=',t850,', td850=',td850,', thetase850=',phy.thetase(T850,Td850,850),', t500s=',phy.t(phy.thetase_T(phy.thetase(T850,Td850,850),500)))
      //A
      //if(t500!=null && td500!=null && t700!=null && td700!=null && t850!=null && td850!=null && (A=idx.A(t500,td500,t700,td700,t850,td850))!=null)
      if ((A = idx.A(t500, td500, t700, td700, td850)) != null)
        items.push([items0.A + ': ' + A.toFixed(1)]);
      else
        items.push([items0.A + ':']);
      //K
      if ((K = idx.K(t500, t700, td700, t850, td850)) != null)
        items.push([items0.K + ': ' + K.toFixed(1)]);
      else
        items.push([items0.K + ':']);
      //pre SI	
      SI = idx.SI(T500, T850, Td850);
      //KY
      if ((KY_TA = idx.KY_TA(la, wd500, wf500, wd850, wf850)) != null && (KY = idx.KY(SI, KY_TA, T850, Td850)) != null) {
        var den = 1 + T850 - Td850,
          s1 = KY_TA > SI ? 'TA>SI' : 'TA<=SI',
          item = [items0.KY + ': ' + KY.toFixed(1), ' 温度平流TA=' + KY_TA.toFixed(1) + ',' + s1];
        if (KY_TA > SI)
          item.push('KY=(TA-SI)/' + den.toFixed(1));
        else
          item.push('KY=0');
        items.push(item);
      } else
        items.push([items0.KY + ':']);
      //SI
      if (SI != null)
        items.push([items0.SI + ': ' + SI.toFixed(1)]);
      else
        items.push([items0.SI + ': ']);
      //pre TT
      TT = idx.TT(t500, t850, td850);
      //SWEAT
      if ((SWEAT = idx.SWEAT(TT, td850, wd500, wf500, wd850, wf850)) != null) {
        items.push([items0.SWEAT + ': ' + Math.round(SWEAT)]);
        //console.log("TT=",TT,",td850=",td850,",wd500=",wd500,",wf500=",wf500,",wd850=",wd850,",wf850=",wf850,",SWEAT=",SWEAT);
      } else
        items.push([items0.SWEAT + ':']);
      //TT
      if (TT != null)
        items.push([items0.TT + ': ' + TT.toFixed(1)]);
      else
        items.push([items0.TT + ':']);
      items.push(['', '待续...']);
      return items;
    }
  });
  //==================================================== 层结曲线插件 ====================================================
  var StratificationCurve = create({
    id: 'StratificationCurve',
    default_settings: {
      wrap: false
    },
    draw: function() { //描绘层结曲线
      //this.canv,this.dataMnt由外部设置
      this.canv.draw_wrapline(this.dataMnt.getSeries('t', true), { strokeStyle: 'red', lineWidth: 2 }, !this.getSettings().wrap);
      this.canv.draw_wrapline(this.dataMnt.getSeries('td', true), { strokeStyle: '#9900FF', lineWidth: 2 }, !this.getSettings().wrap);
    }
  });
  //==================================================== 压高曲线插件 ====================================================
  var PressHeightCurve = create({
    id: 'PressHeightCurve',
    draw: function() { //描绘层结曲线
      //this.canv,this.dataMnt由外部设置
      var canv = this.canv,
        settings = canv.settings,
        line_points = [],
        pts = this.dataMnt.getSeries('h', false),
        ctx_opt = { strokeStyle: 'black', lineWidth: 3 },
        min = 0,
        max = canv.diagram_mode == "ema200" ? 12.5 : 25,
        coor_x = coor_x_desc.bind(null, min, max, canv);
      if (pts == null)
        return;
      for (var j = 0, jlen = pts.length; j < jlen; j += 2) { //全层/半层的低层曲线段端点
        var t = pts[j],
          p = pts[j + 1];
        line_points.push(coor_x(t / 1000), canv.coor_y(p));
        //line_points.push(canv.coor_h(t/1000),canv.coor_y(p));
        if (p < settings.pmin) //超上界时，跳出
          break;
      }
      canv.draw_polyline(line_points, ctx_opt);
    }
  });
  //==================================================== 画折线插件 ====================================================
  var Polyline = create({
    id: 'Polyline',
    default_settings: {
      node_radius: 0,
      node_color: 'black',
      color: 'black',
      width: 1
        //,pts:[x0,y0,x1,y1,...]
    },
    draw: function() {
      var canv = this.canv,
        ctx = canv.getContext(),
        ts = this.getSettings(),
        pts = canv.toPx(ts.pts);
      canv.draw_polyline(pts, { strokeStyle: ts.color, lineWidth: ts.width });
      canv.draw_node(pts, { node_radius: ts.node_radius }, { strokeStyle: ts.node_color, fillStyle: ts.node_color });
    }
  });
  //==================================================== 状态曲线插件 ====================================================
  var StateCurve = create({
    id: 'StateCurve',
    draw: function(opt) { //描绘层结曲线
      var canv = this.canv,
        orgin = this.getSettings().orgin;
      //this.canv,this.dataMnt由外部设置
      var d4f = this.dataMnt.getData4State(orgin); //获取计算状态曲线所需要的数据
      if (d4f != null) {
        var T = d4f.Tps[0],
          Td = d4f.Td,
          p = d4f.Tps[1],
          thetase0 = phy.thetase(T, Td, p),
          lcl = phy.LCL(T, Td, p),
          Ls = tmutil.discret_moistAdiabat(thetase0, lcl.p - 25, d4f.Tps[d4f.Tps.length - 1], true, true); //lcl.p-25是因为lcl.p这个点上不需要重复算
        Ls.unshift(lcl.T, lcl.p);
        Ls.unshift(T, p);
        try {
          var lfe = tmutil.lfc_el_eal(d4f.Tps, Ls, lcl.p);
          fill(d4f.Tps, Ls, lfe, thetase0);
        } catch (e) { console.log(e) };
        canv.draw_polyline(canv.toPx(Ls.map(function(v, i) { return i % 2 == 0 ? phy.t(v) : v; })), { strokeStyle: 'brown', lineWidth: 2 });
      }
      //填充能量区域
      function fill(Ltp, Ls, lfe, thetase) {
        //在eal高度和湿绝热线过qs=0.01线的高度之间选个合适的气压下限(取两者中最小值)
        var pm = 250;
        if (lfe && lfe.EAL)
          pm = Math.min(pm, lfe.EAL[1])
        else
          pm = Math.min(pm, tmutil.getP_thetase_q001(thetase, pm));
        pm = Math.max(pm, Ls[Ls.length - 1]);
        pm = Math.max(pm, Ltp[Ltp.length - 1]);

        if (pm > Ls[Ls.length - 1])
          Ls = g2dlnp.getSubPolyline(Ls, pm);
        var res = g2dlnp.mark2polyline(Ltp, Ls),
          ctx_opt_p = { fillStyle: 'red', globalAlpha: 0.35 },
          ctx_opt_n = { fillStyle: 'blue', globalAlpha: 0.35 };
        for (var i = 0, len = res.length; i < len; i += 3) {
          var s = res[i],
            L0 = res[i + 1],
            L1 = res[i + 2];
          if (L0 != null && L1 != null) {
            var ctx_opt = s > 0 ? ctx_opt_p : ctx_opt_n,
              cir = g2dlnp.polyline2_circuit(L0, L1).map(function(v, i) { return i % 2 == 0 ? canv.coor_x(phy.t(v)) : canv.coor_y(v); });
            canv.fill(cir, ctx_opt);
          }
        }
      }
    }
  });
  //在气压轴描画高度坐标
  var HeightCoor = create({
    id: 'HeightCoor',
    default_settings: {
      mode: "tlnp" // tlnp|orgin|standard (orgin:实测位高，在纵坐标右内侧；standard:标准化位高，在纵坐标右外侧；tlnp:前2者皆有
    },
    draw: function() {
      var canv = this.canv,
        settings = canv.settings,
        hp = this.dataMnt.getSeries('h', true),
        label_ctx_opt = { fillStyle: this._color_gridlines, font: this._label_fontstyle, textBaseline: "middle" },
        opt = { label_color: this._color_gridlines, font_height: this._label_font_height },
        scale_ctx_opt = { strokeStyle: 'brown', lineWidth: 1.5 };
      if (hp == null)
        return;
      if (this.getSettings().mode == "tlnp" || this.getSettings().mode == "orgin") {
        label_ctx_opt.textAlign = "right";
        opt.bg_color = this.findSibling('Framework').getSettings().color_background;
        var pts = orgin(hp);
        canv.draw_labels(pts, opt, label_ctx_opt);
      }
      if (this.getSettings().mode == "tlnp" || this.getSettings().mode == "standard") {
        label_ctx_opt.textAlign = "left";
        opt.bg_color = null;
        var pts = standard(hp);
        drawScale(pts);
        canv.draw_labels(pts.map(function(v, i) { return i % 3 == 1 ? v + 2 : v; }), opt, label_ctx_opt);
      }

      function drawScale(pts) { //绘画刻度
        for (var i = 0, len = pts.length; i < len; i += 3) {
          var x = pts[i + 1],
            y = pts[i + 2];
          canv.draw_polyline([x - 4, y, x, y], scale_ctx_opt);
        }
      }

      function orgin(L, position) { //构建实测位高标值数据
        var pts = [],
          x = settings.viewport_right; //settings.padding_left+settings.viewport_width;
        for (var i = 0; i < L.length; i += 2) {
          var p = L[i + 1],
            h = Math.round(L[i] / 10); //高度单位用位势十米
          if (p < settings.pmin + 10)
            break;
          pts.push(h, x - 4, canv.coor_y(p));
        }
        return pts;
      }

      function standard(L, position) { //构建标准化位高标值数据
        var pts = [],
          h = Math.ceil(L[0] / 1000) * 1000,
          x = settings.viewport_right,
          p = settings.pmax,
          pmin = Math.max(L[L.length - 1], settings.pmin) + 10;
        while (p > pmin) {
          p = g2dlnp.getYonPolyline(h, L)[0];
          if (p > pmin) {
            var ha = Math.round(h / 10); //高度单位用位势十米
            pts.push(ha, x, canv.coor_y(p));
          }
          h += 1000;
        }
        return pts;
      }
    }
  });
  //==================================================== 抬升凝结高度LCL插件 ====================================================
  var LCL = create({
    id: "LCL",
    draw: function(opt) {
      //this.canv,this.dataMnt由外部设置
      var canv = this.canv,
        settings = canv.settings,
        orgin = this.getSettings().orgin,
        d4f = this.dataMnt.getData4State(orgin); //获取计算状态曲线所需要的数据
      if (d4f != null) {
        var T = d4f.Tps[0],
          Td = d4f.Td,
          p = d4f.Tps[1],
          lcl = phy.LCL(T, Td, p),
          theta0 = phy.theta(T, p),
          thetase0 = phy.thetase(T, Td, p);
        //qs
        //console.dir(tmutil.qs_curve(lcl.q,settings.pmax,settings.pmin,50));
        canv.draw_polyline(canv.toPx(tmutil.qs_curve(lcl.q, settings.pmax, settings.pmin, 50)), { strokeStyle: this._color_q, lineWidth: 1 });
        this._addLabel(qs_label(lcl.q, settings.pmin + 50));
        //θ
        canv.draw_polyline(canv.toPx(tmutil.theta_curve(phy.t(theta0), settings.pmax, settings.pmin, 50)), { strokeStyle: this._color_dryAdiabat, lineWidth: 1.5 });
        this._addLabel(theta_label(theta0));
        //p
        canv.draw_polyline(canv.toPx([settings.tmin, lcl.p, phy.t(lcl.T), lcl.p]), { strokeStyle: "black", lineWidth: 1 });
        //lcl
        this._addLabel(line_label(-80, lcl.p, [
          ["h", this.dataMnt.calcH(lcl.p, true), 0, "gpm"],
          ["p", lcl.p, 0, "hPa"],
          ["t", phy.t(lcl.T), 1, "℃"],
          ["t(env)", this.dataMnt.calcT(lcl.p, true), 1, "℃"],
          ["td(env)", this.dataMnt.calcTd(lcl.p, true), 1, "℃"]
        ], "【LCL】", { textAlign: "left" }));
        //lfc,el,eal
        var state = tmutil.discret_moistAdiabat(thetase0, lcl.p, d4f.Tps[d4f.Tps.length - 1], true, true),
          lfe = tmutil.lfc_el_eal(d4f.Tps, state, lcl.p);
        if (lfe.LFC) {
          var l_t = lfe.LFC[0],
            l_p = lfe.LFC[1];
          canv.draw_polyline(canv.toPx([settings.tmin, l_p, l_t, l_p]), { strokeStyle: "black", lineWidth: 1 });
          this._addLabel(line_label(l_t - 5, l_p, [
            ["h", this.dataMnt.calcH(l_p, true), 0, "gpm"],
            ["p", l_p, 0, "hPa"],
            ["t", l_t, 1, "℃"],
            ["td(env)", this.dataMnt.calcTd(l_p, true), 1, "℃"]
          ], "【LFC】", { textAlign: "right" }));
        }
        if (lfe.EL) {
          var l_t = lfe.EL[0],
            l_p = lfe.EL[1],
            l_tmin, l_tmax, l_ta, tAlign;
          if (l_t < (settings.tmin + settings.tmax) / 2) {
            l_tmin = l_t;
            l_tmax = settings.tmax;
            l_ta = l_t + 5;
            tAlign = "left";
          } else {
            l_tmin = settings.tmin;
            l_tmax = l_t;
            l_ta = l_t - 5;
            tAlign = "right";
          }
          canv.draw_polyline(canv.toPx([l_tmin, l_p, l_tmax, l_p]), { strokeStyle: "black", lineWidth: 1 });
          this._addLabel(line_label(l_ta, l_p, [
            ["h", this.dataMnt.calcH(l_p, true), 0, "gpm"],
            ["p", l_p, 0, "hPa"],
            ["t", l_t, 1, "℃"],
            ["td(env)", this.dataMnt.calcTd(l_p, true), 1, "℃"]
          ], "【EL】", { textAlign: tAlign }));
        }
        if (lfe.EAL) {
          var cp = lfe.EAL,
            l_t0 = cp[0],
            l_t1 = cp[2],
            l_p = cp[1];
          canv.draw_polyline(canv.toPx([l_t1, l_p, settings.tmax, l_p]), { strokeStyle: "black", lineWidth: 1 });
          this._addLabel(line_label(l_t0 + 5, l_p, [
            ["h", this.dataMnt.calcH(l_p, true), 0, "gpm"],
            ["p", l_p, 0, "hPa"],
            ["t", l_t0, 1, "℃"],
            ["t(env)", l_t1, 1, "℃"],
            ["td(env)", this.dataMnt.calcTd(l_p, true), 1, "℃"]
          ], "【EAL】", { textAlign: "left" }));
        }
      }
    }
  });
  //==================================================== 抬升凝结高度LCL插件 ====================================================
  var CCL = create({
    id: "CCL",
    default_settings: {
      when_inversion: "moist_adiabat_first"
    },
    draw: function() {
      //this.canv,this.dataMnt由外部设置
      var canv = this.canv,
        settings = canv.settings,
        dataMnt = this.dataMnt,
        d4f = dataMnt.getData4State('surf'); //获取计算状态曲线所需要的数据
      if (d4f != null) {
        var T0 = d4f.Tps[0],
          Td0 = d4f.Td,
          p0 = d4f.Tps[1],
          q0 = phy.q(phy.e(Td0), p0),
          qs_points, theta_points, thetase_points //构成等值线的离散点集合
          , ccl_theta, ccl_thetase //ccl处的theta和thetase值
          , cp = calc_cp_ccl(this.getSettings().when_inversion);
        //qs
        if (cp != null) {
          canv.draw_polyline(canv.toPx(qs_points), { strokeStyle: this._color_q, lineWidth: 1 });
          this._addLabel(qs_label(q0, settings.pmin + 50));
          //qs x StratificationCurve
          var t = cp[0],
            T = phy.T(t),
            p = cp[1],
            ts = phy.t(phy.theta_T(ccl_theta, p0));
          //p_CCL
          canv.draw_polyline(canv.toPx([settings.tmin, p, t, p]), { strokeStyle: "black", lineWidth: 1 });
          //ccl
          this._addLabel(line_label(-80, p, [
            ["h", this.dataMnt.calcH(p, true), 0, "gpm"],
            ["p", p, 0, "hPa"],
            ["t", t, 1, "℃"],
            ["td(env)", this.dataMnt.calcTd(p, true), 1, "℃"]
          ], "【CCL】", { textAlign: "left" }));
          //p0
          canv.draw_polyline(canv.toPx([settings.tmin, p0, ts, p0]), { strokeStyle: "black", lineWidth: 1 });
          var prefix = this.dataMnt.hasSurf() ? "【地面】" : "【探空底层】";
          this._addLabel(line_label(phy.t(Td0) - 5, p0, [
            ["p", p0, 0, "hPa"],
            ["t", phy.t(T0), 1, "℃"],
            ["ts", ts, 1, "℃"],
            ["td", phy.t(Td0), 1, "℃"]
          ], prefix, { textAlign: "right" }));
          //θ
          canv.draw_polyline(canv.toPx(theta_points), { strokeStyle: this._color_dryAdiabat, lineWidth: 1.5 });
          this._addLabel(theta_label(ccl_theta));
          //θse
          canv.draw_polyline(canv.toPx(thetase_points), { strokeStyle: this._color_moistAdiabat, lineWidth: 1 });
          this._addLabel(thetase_label(ccl_thetase, thetase_points));
        }
      }

      function calc_cp_ccl(when_inversion) { //有多个变量跟父环境共享，修改要小心！！！
        qs_points = tmutil.qs_curve(q0, settings.pmax, settings.pmin, 50);
        var tp_series = dataMnt.getSeries('t', true),
          cp = g2dlnp.crosspoint_of_polylines(qs_points, tp_series);
        if (cp != null) {
          var len = cp.length,
            tb = cp[len - 2],
            pb = cp[len - 1];
          cp = [tb, pb];
          ccl_theta = phy.theta(phy.T(tb), pb);
          var n = -1;
          if (when_inversion != "skip" && isInversion(tp_series, pb)) {
            for (var i = 2, len = tp_series.length; i < len && tp_series[i + 1] > pb; i += 2) {
              var t = tp_series[i],
                T = phy.T(t),
                p = tp_series[i + 1],
                theta = phy.theta(T, p);
              if (theta > ccl_theta) {
                ccl_theta = theta;
                n = i;
              }
            }
          }
          if (n > 0) { //找到最大逆温层顶
            var t = tp_series[n],
              T = phy.T(t),
              p = tp_series[n + 1];
            if (when_inversion == "dry_adiabat_first") {
              theta_points = tmutil.theta_curve(phy.t(ccl_theta), p0, settings.pmin, 50);
              cp = g2dlnp.crosspoint_of_polylines(theta_points, qs_points, true);
            } else { //moist_adiabat_first
              ccl_thetase = phy.thetase(T, T, p);
              thetase_points = tmutil.discret_moistAdiabat(ccl_thetase, p, settings.pmin, false);
              cp = g2dlnp.crosspoint_of_polylines(thetase_points, qs_points, true);
              ccl_theta = phy.theta(phy.T(cp[0]), cp[1]);
              theta_points = tmutil.theta_curve(phy.t(ccl_theta), p0, settings.pmin, 50);
            }
          }
          if (thetase_points == null) {
            var t = cp[0],
              T = phy.T(t),
              p = cp[1];
            ccl_thetase = phy.thetase(T, T, p);
            thetase_points = tmutil.discret_moistAdiabat(ccl_thetase, p - 25, settings.pmin, false)
            thetase_points.unshift(t, p);
          }
          if (theta_points == null)
            theta_points = tmutil.theta_curve(phy.t(ccl_theta), p0, settings.pmin, 50);
        }
        return cp;
      }

      function isInversion(points, maxp) {
        var pre_t = Number.MAX_VALUE,
          pre_p = Number.MAX_VALUE;
        for (var i = 0, len = points.length; i < len && points[i + 1] > maxp; i += 2) {
          var t = points[i],
            p = points[i + 1];
          if (t >= pre_t && p < pre_p - 10) { //气压限制是因为还有特征层等，防止等压层相同及过密
            return true;
          }
          pre_t = t;
          pre_p = p;
        }
        return false;
      }
    }
  });
  //==================================================== 几个特殊温度层插件 ====================================================
  var SpecialTempLayer = create({
    id: "SpecialTempLayer",
    draw: function() {
      //this.canv,this.dataMnt由外部设置
      var canv = this.canv,
        settings = canv.settings,
        Tps = this.dataMnt.getSeries('t', true);
      for (var t = 0; t >= -50; t -= 10) {
        var ys = g2dlnp.getYonPolyline(t, Tps);
        for (var i = 0, len = ys.length; i < len; i++) {
          var p = ys[i],
            l_tmin, l_tmax, l_ta, tAlign;
          if (p <= settings.pmin + 2 || p >= settings.pmax - 2)
            break;
          if (t < (settings.tmin + settings.tmax) / 2) {
            l_tmin = t;
            l_tmax = settings.tmax;
            l_ta = settings.tmax - 2;
            tAlign = "right";
          } else {
            l_tmin = settings.tmin;
            l_tmax = t;
            l_ta = settings.tmin + 2;
            tAlign = "left";
          }
          canv.draw_polyline(canv.toPx([l_tmin, p, l_tmax, p]), { strokeStyle: "black", lineWidth: 1 });
          this._addLabel(line_label(l_ta, p, [
            ["h", this.dataMnt.calcH(p, true), 0, "gpm"],
            ["p", p, 0, "hPa"],
            ["td", this.dataMnt.calcTd(p, true), 1, "℃"]
          ], "【" + t + "℃】", { textAlign: tAlign }));
        }
      }
    }
  });
  //==================================================== 比湿曲线插件 ====================================================
  var QCurve = create({
    id: 'QCurve',
    default_settings: {
      color: 'black',
      width: 2
    },
    draw: function() { //描绘曲线
      //this.canv,this.dataMnt由外部设置
      var canv = this.canv,
        ts = this.getSettings(),
        ls = this.dataMnt.getSeries('t&td', true),
        L = [];
      for (var i = 0, len = ls.length; i < len; i += 3) {
        var T = phy.T(ls[i]),
          Td = phy.T(ls[i + 1]),
          p = ls[i + 2];
        L.push(phy.q(phy.e(Td), p) * 1000, p);
      }
      canv.draw_polyline(canv.toPx(L), { strokeStyle: ts.color, lineWidth: ts.width });
    }
  });
  //==================================================== 相对湿度曲线插件 ====================================================
  var RhCurve = create({
    id: 'RhCurve',
    default_settings: {
      color: 'black',
      width: 2
    },
    draw: function() { //描绘曲线
      //this.canv,this.dataMnt由外部设置
      var canv = this.canv,
        ts = this.getSettings(),
        ls = this.dataMnt.getSeries('t&td', true),
        L = [];
      for (var i = 0, len = ls.length; i < len; i += 3) {
        var T = phy.T(ls[i]),
          Td = phy.T(ls[i + 1]),
          p = ls[i + 2];
        L.push(phy.rh(T, Td), p);
      }
      canv.draw_polyline(canv.toPx(L), { strokeStyle: ts.color, lineWidth: ts.width });
    }
  });
  //==================================================== V-3θ曲线插件 ====================================================
  var V_3theta = create({
    id: 'V_3theta',
    default_settings: {
      color_theta: 'black',
      color_thetased: 'red',
      color_thetaast: 'blue',
      shaftLength: 20 //风杆长度
        ,
      color_wind: 'brown',
      width: 2
    },
    draw: function() { //描绘曲线
      //this.canv,this.dataMnt由外部设置
      var canv = this.canv,
        ctx = canv.getContext(),
        ts = this.getSettings(),
        core_radius = 0,
        shaftLength = ts.shaftLength,
        ctx_opt = { strokeStyle: ts.color_wind },
        ls2 = this.dataMnt.getSeries('t&td', true),
        ls3 = this.dataMnt.getSeries('w&t', true),
        L = [],
        L_sed = [],
        L_ast = [],
        S_winds = [];
      for (var i = 0, len = ls2.length; i < len; i += 3) {
        var T = phy.T(ls2[i]),
          Td = phy.T(ls2[i + 1]),
          p = ls2[i + 2];
        L_sed.push(phy.t(phy.thetase(T, Td, p)), p);
      }
      for (var i = 0, len = ls3.length; i < len; i += 4) {
        var wd = ls3[i],
          wf = ls3[i + 1],
          T = phy.T(ls3[i + 2]),
          p = ls3[i + 3],
          thetaast = phy.t(phy.thetase(T, T, p));
        L.push(phy.t(phy.theta(T, p)), p);
        L_ast.push(thetaast, p);
        S_winds.push(wd, wf, canv.coor_x(thetaast), canv.coor_y(p));
      }
      canv.draw_polyline(canv.toPx(L), { strokeStyle: ts.color_theta, lineWidth: ts.width });
      canv.draw_polyline(canv.toPx(L_sed), { strokeStyle: ts.color_thetased, lineWidth: ts.width });
      canv.draw_polyline(canv.toPx(L_ast), { strokeStyle: ts.color_thetaast, lineWidth: ts.width });
      for (var i = 0, len = S_winds.length; i < len; i += 4) {
        target.wsymbol.drawWind(ctx, S_winds[i], S_winds[i + 1], { x: S_winds[i + 2], y: S_winds[i + 3] }, core_radius, shaftLength, false, ctx_opt);
      }
    }
  });
  //==================================================== 帮助函数 ====================================================
  function theta_label(Theta) {
    var _color_dryAdiabat = "#FF9966",
      point_t = -65,
      lbs = ["θ=" + phy.t(Theta).toFixed(1) + "℃", point_t, phy.theta_p(Theta, phy.T(point_t))];
    return [lbs, { label_color: _color_dryAdiabat }];
  }

  function qs_label(qs, point_p) {
    var _color_q = "green",
      point_t = phy.t(phy.qs_T(qs, point_p)),
      lbs = ["qs=" + (qs * 1000).toFixed(1) + "g/kg", point_t, point_p];
    return [lbs, { label_color: _color_q }];
  }

  function thetase_label(Thetase, thetase_points) {
    var _color_moistAdiabat = "#3366FF",
      n4 = thetase_points.length - 6,
      point_t = thetase_points[n4],
      point_p = thetase_points[n4 + 1] //取某个节点
      ,
      lbs = ["θse=" + phy.t(Thetase).toFixed(1) + "℃", point_t, point_p];
    return [lbs, { label_color: _color_moistAdiabat }];
  }

  function line_label(point_t, point_p, ar, prefix, ctx_opt) {
    var lbs = [createLabel(ar, prefix), point_t, point_p];
    return [lbs, { label_color: "black" }, ctx_opt];

    function createLabel(ar, prefix) {
      var label = prefix ? " " + prefix : "";
      for (var i = 0, len = ar.length; i < len; i++) {
        var name = ar[i][0],
          num = ar[i][1],
          f = ar[i][2],
          unit = ar[i][3];
        if (i > 0) { label += "," }
        if (label.length == 0 || label.charAt(label.length - 1) == ' ')
          label += ' ';
        label += name + "=";
        label += num != null ? num.toFixed(f) + unit : "?";
      }
      label += " ";
      return label;
    }
  }
}