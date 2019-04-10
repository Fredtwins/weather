$(function () {
  InitMap();
  Sugis.Init();
  Sugis.Dingwei();
  /*---2016-11-18---start---*/
  wapAutoHeight();
  wapCloseWindow();
  /*---2016-11-18---end-----*/
});
//初始化地图
var map_dqck=null;
InitMap = function () {
  // 百度地图-地球此时
  /*---2016-11-18---start---*/
  /*---2016-11-18---prev----*/
  /*
  map_dqck = new BMap.Map("map_dqck");
  map_dqck.centerAndZoom(new BMap.Point(106.466666666667, 29.5833333333333), 6);
  //map_dqck.centerAndZoom(new BMap.Point(113.115, 23.0145), 13);
  map_dqck.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
  map_dqck.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
  map_dqck.addEventListener("zoomend", function () {
      //alert("地图缩放至：" + this.getZoom() + "级");
      Sugis.CreateMarker();
  });
  map_dqck.addEventListener("dragend", function () {
      Sugis.CreateMarker();
  });
  //map_dqck.clearOverlays()//清除地图上所有覆盖物
  //$("#map_dqck").append("<div id='svg_content' style='width:100%;height:100%'>")
  */

  /*---2016-11-18---now-----*/
  if( location.pathname == "/wap/Sugis.aspx" ){
      map_dqck = new BMap.Map("map_dqck",{minZoom:10,maxZoom:10});
      map_dqck.centerAndZoom(new BMap.Point(113.115, 22.6445), 10);
      map_dqck.addEventListener("dragend", function () {
          Sugis.CreateMarker();
      });
  }else{
      map_dqck = new BMap.Map("map_dqck");
      map_dqck.centerAndZoom(new BMap.Point(113.127318,23.017562), 8);
      //启用滚轮放大缩小，默认禁用
      map_dqck.enableScrollWheelZoom();
      //添加默认缩放平移控件
      map_dqck.addControl(new BMap.NavigationControl());
      map_dqck.addEventListener("zoomend", function () {
          //alert("地图缩放至：" + this.getZoom() + "级");
          Sugis.CreateMarker();
      });
      map_dqck.addEventListener("dragend", function () {
          Sugis.CreateMarker();
      });
  }
  /*---2016-11-18---end-----*/
};
var Sugis = {
  postUrl: "/Sugis/Handler.aspx",
  TQList_josn: null,
  //map_dqck: null,
  curr_grade: null,//当前的级数
  currDataTime: "",//当前时间戳
  StationList: new Dictionary(),//需要显示的站点
  ListSnum: Array(),//时间序列数据分区key
  dicListData: new Dictionary(),//时间序列数据分区数组
  c_i:0,
  Init: function () {
      var tqysControl = $("#tqysControl");
      tqysControl.bind("click", function () {
          if ($(this).attr('checked') != undefined) {
              $("input:radio[name='tqys']").removeAttr("disabled")
              Sugis.TQYS_chang(true);
          }
          else {
              $("input:radio[name='tqys']").attr("disabled", true)
              Sugis.TQYS_chang(false);
          }
      })
      $("input:[name='tqys']").bind("click", function () {
          Sugis.TQYS_chang(true);
      })
      //时间选择区域
      var timeChoseArea = [2, 8, 14, 20];
      for (var i = 1; i >= 0; i--) {
          var timeChoseArea_html_li = $("<li>");
          var curDate = this.SubDay(i);
          var month = curDate.getMonth() + 1;
          month = month < 10 ? "0" + month : month;
          var days = curDate.getDate();
          days = days < 10 ? "0" + days : days;
          $("<p>" + (curDate.getMonth() + 1) + "月" + curDate.getDate() + "日</p>").appendTo(timeChoseArea_html_li);
          for (var k = 0; k < timeChoseArea.length; k++) {
              var housr = timeChoseArea[k];

              this.currDataTime = curDate.getFullYear() + "" + month + "" + days + "" + (housr < 10 ? "0" + housr : housr);
              if (curDate.getDate() == new Date().getDate()) {
                  if (curDate.getHours() >= housr) {//同一天
                      if (curDate.getHours() == housr && curDate.getMinutes() >= 30) {//同一小时大于30分钟
                          $("<a href=\"#\" rel=\"" + this.currDataTime + "\">" + housr + "时</a>").appendTo(timeChoseArea_html_li);
                      } else {
                          $("<a href=\"#\" rel=\"" + this.currDataTime + "\">" + housr + "时</a>").appendTo(timeChoseArea_html_li);
                      }
                  }
              } else {
                  $("<a href=\"#\" rel=\"" + this.currDataTime + "\">" + housr + "时</a>").appendTo(timeChoseArea_html_li);
              }
          }
          $(".sugis_TimeChoseArea").append(timeChoseArea_html_li);
      }

      //$(".sugis_TimeChoseArea").append("<li><p>5月12日</p><a rel='2014051202' href='#' class=''>2时</a><a rel='2014051208' href='#' class=''>8时</a><a rel='2014051214' href='#' class=''>14时</a><a rel='2014051220' href='#' class=''>20时</a></li><li><p>5月13日</p><a rel='2014051302' href='#' class=''>2时</a><a rel='2014051308' href='#'>8时</a></li>");
      //时间区域选择事件
      $(".sugis_TimeChoseArea li a").bind("click", function () {
          $(".sugis_TimeChoseArea li a").removeClass("on");
          $(this).addClass("on");
          Sugis.TqList($(this).attr("rel"));
      })

      //首次加载站点数据
      $(".sugis_TimeChoseArea li a:last").click();
      //console.log(this.currDataTime);
  },
  //天气信息
  TqList: function (date) {
      $("<div class='load'><img src='images/BouncingLoader.gif' alt='loading'> 数据加载中...</div>").appendTo($("#map_dqck"))
      $.getJSON("/Sugis/data/" + date + ".js", function (json) {
          TQList_josn = json;
          Sugis.CreateMarker();
      });
  },
  ////初始化地图
  //InitMap: function () {
  //    // 百度地图-地球此时
  //    map_dqck = new BMap.Map("map_dqck");
  //    map_dqck.centerAndZoom(new BMap.Point(106.466666666667, 29.5833333333333), 6);
  //    //map_dqck.centerAndZoom(new BMap.Point(113.115, 23.0145), 13);
  //    map_dqck.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
  //    map_dqck.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
  //    map_dqck.addEventListener("zoomend", function () {
  //        //alert("地图缩放至：" + this.getZoom() + "级");
  //        Sugis.CreateMarker();

  //    });
  //    map_dqck.addEventListener("dragend", function () {
  //        Sugis.CreateMarker();
  //    });
  //    //map_dqck.clearOverlays()//清除地图上所有覆盖物
  //    //$("#map_dqck").append("<div id='svg_content' style='width:100%;height:100%'>")
  //},
  CreateMarker: function () {

      var zoom = map_dqck.getZoom();
      if (zoom <= 4) {
          Sugis.CreateInfoBox("c");//只显示直辖省市
      }
      else if (zoom <= 9) {
          Sugis.CreateInfoBox("d");//显示地级市
      }
      else if (zoom <= 11) {
          Sugis.CreateInfoBox("x1");//显示区、县级
      }
      else {//(zoom >= 12) {/
          Sugis.CreateInfoBox("x");//显示县级
      }

  },
  //创建覆盖物
  CreateInfoBox: function (grade) {
      var bs = map_dqck.getBounds();   //获取可视区域
      var bssw = bs.getSouthWest();   //可视区域左下角
      var bsne = bs.getNorthEast();   //可视区域右上角
      var lngmin = bssw.lng;
      var latmin = bssw.lat;
      var lngmax = bsne.lng;
      var latmax = bsne.lat;
      //console.log("当前地图可视范围是：" + bssw.lng + "," + bssw.lat + "到" + bsne.lng + "," + bsne.lat);

      map_dqck.clearOverlays()//清除地图上所有覆盖物

      /*天气要素的控制*/
      var tqysControl = $("#tqysControl").attr('checked') != undefined ? true : false;//天气要素显示控制
      var tqys = $("input:[name='tqys']:checked").val();//显示的天气要素
      var tx_wd_sname_checked = $("input:checkbox[name='tqys']:checked");
      var txshow = function (vldVal) {
          for (var i = 0; i < tx_wd_sname_checked.length; i++) {
              if (tx_wd_sname_checked[i].value == vldVal) {
                  return true;
                  break;
              }
          }
      }
      var tx_tx_status = txshow("tx") ? "block" : "none";//天象是否显示
      var tx_wd_status = txshow("wd") ? "block" : "none";//风是否显示
      var tx_snam_status = txshow("sname") ? "block" : "none";//站点是否显示

      Sugis.c_i = 0;

      $.each(TQList_josn, function (index, content) {
          if (content.territory_grade.indexOf(grade) != -1 || content.territory_grade == 'gw') {
              //判断是否在可视经纬度范围内：
              if ((content.lo >= lngmin && content.lo <= lngmax) &&
                  (content.la >= latmin && content.la <= latmax)) {
                  //console.log(content.name+"  可视：" + content.lo + "," + content.la);
                  //国外站点，3-6显示 grad 1-2 zoom>7显示 全部

                  if (content.territory_grade == 'gw' && map_dqck.getZoom() <= 6) {

                      if (content.grade != "1" && content.grade != "2")
                          return true;
                  }

                  var _sid = content.sid;
                  var _sid_sort = _sid.substr(0, 1);//站点id第一位作为key,
                  var _StationList = Sugis.StationList.get(_sid_sort);
                  if (_StationList == undefined) {
                      _StationList = new Array();
                      _StationList.push(_sid);
                      Sugis.StationList.put(_sid_sort, _StationList);
                  } else {
                      _StationList.push(_sid);
                     // Sugis.StationList.put(_sid_sort, _StationList);
                  }

                  if (Sugis.ListSnum.indexOf(_sid_sort) == -1) {
                      Sugis.ListSnum.push(_sid_sort);
                  }
              }
          }
      })
      //加载分区数据
      $.each(Sugis.ListSnum, function (index, value) {
          var _List_josn = Sugis.dicListData.get(value);//从缓存获取区数据
          if (_List_josn == undefined) {
              $.getJSON("/Sugis/data/" + value + "xing24.js", function (jsondayList) {
                  Sugis.dicListData.put(value, jsondayList);
                  Sugis.CreateMarkerInfo(jsondayList, tx_snam_status, tx_wd_status, tx_tx_status, tqys, Sugis.StationList.get(value));
              });
          } else {
              Sugis.CreateMarkerInfo(_List_josn, tx_snam_status, tx_wd_status, tx_tx_status, tqys, Sugis.StationList.get(value));
          }
      })


      if (tx_tx_status == "none") {
          $(".BMap_Marker").hide();
      }
  },
  CreateMarkerInfo: function (TQdayList_josn, tx_snam_status, tx_wd_status, tx_tx_status, tqys,_stationList) {

      $.each(TQList_josn, function (index, content) {
          if (_stationList.indexOf(content.sid) == -1) {
              return true;
          }
          //创建标注 --天象

          var tqicon = 100;
          tqicon = Surfrecord.getPhImgindex(content.ww, content.cn);

          var myIcon = new BMap.Icon("images/surf/" + tqicon + ".gif", new BMap.Size(25, 20));
          var point = new BMap.Point(content.lo, content.la);
          var markerjt01 = new BMap.Marker(point, { icon: myIcon });  // 创建标注
          markerjt01.setTitle(content.sid)
          map_dqck.addOverlay(markerjt01);              // 将标注添加到地图中

          var lable_style = {
              color: "red",
              fontSize: "11px",
              height: "15px",
              lineHeight: "15px",
              backgroundColor: "none",
              border: "none",
              display: "",
              fontWeight: 'bold'
          };


          // 创建文本标注对象
          var opts = {
              position: point,    // 指定文本标注所在的地理位置
              offset: new BMap.Size(-10, 10)    //设置文本偏移量
          }



          //气压-p 气温-temp  湿度-rh 6小时降水-rain

          var tqys_Array = ["p", "temp", "rh", "rain"];//天气要素
          var tqysColor_Array = ["Purple", "red", "green", "blue"];
          for (var i = 0; i < tqys_Array.length; i++) {
              var label = new BMap.Label(content["" + tqys_Array[i] + ""], opts);
              lable_style.color = tqysColor_Array[i];
              lable_style.display = tqys_Array[i] == tqys ? "block" : "none";
              if (!tqysControl)
                  lable_style.display = "none";
              label.setStyle(lable_style);
              label.setTitle(tqys_Array[i])
              map_dqck.addOverlay(label);
          }

          // 创建文本标注对象
          var opts = {
              position: point,    // 指定文本标注所在的地理位置
              offset: new BMap.Size(0, 0)    //设置文本偏移量
          }
          //天象 风 站名
          var tx_wd_sname = $("input:checkbox[name='tqys']");

          function p(x, y) {
              this.x = x;
              this.y = y;
              return this;
          }

          for (var i = 0; i < tx_wd_sname.length; i++) {
              switch (tx_wd_sname[i].value) {
                  case "wd"://风
                      var wf = !isNaN(content.wf) ? parseInt(content.wf) : 2;
                      if (wf > 40)
                          wf = "40g"
                      else {
                          wf = wf % 2 == 0 ? wf : wf + 1;
                          wf = wf == 0 ? 2 : wf;
                      }
                      var wfImg = "<img id='wf_" + Sugis.c_i + "' angle='" + content.wd + "' class='wf_translate' src='images/wf/" + wf + ".gif' width='25' height='61' />";
                      var opts_wd = opts;
                      opts_wd.offset = new BMap.Size(-13, -32)
                      var label = new BMap.Label(wfImg, opts_wd);
                      lable_style.height = "61px";
                      lable_style.width = "25px";
                      // lable_style.color = tqysColor_Array[i];
                      //lable_style.display = "block";
                      lable_style.display = tx_wd_status;
                      label.setStyle(lable_style);
                      label.setTitle("wd")
                      map_dqck.addOverlay(label);
                      Sugis.c_i++;
                      break;
                  case "sname":
                      //站名
                      var opts_sname = opts;
                      opts_sname.offset = new BMap.Size(20, 10)
                      var label_sNam = new BMap.Label(content.name, opts_sname);
                      lable_style.color = '#000000';
                      lable_style.display = tx_snam_status;
                      label_sNam.setStyle(lable_style);
                      label_sNam.setTitle("sname")
                      map_dqck.addOverlay(label_sNam);
                      break;
              }
          }

          //创建信息窗口
          //表格展现天气数据
          var tableHtml = "<p>" + content.name + "</p><table border='0' cellspacing='0' ><thead><tr align='center'><th>北京时<br></th><th>天气<br>&nbsp;</th><th>温度<br>℃</th><th>气压<br>hPa</th><th>风向<br>&nbsp;</th><th>风速<br>m/s</th><th>湿度<br>%</th><th>雨量<br>mm/6时</th></tr></thead><tbody>";

          //$.each(TQdayList_josn, function (key, tqList) {
          for (var i = TQdayList_josn.length-1; i > 0; i-- ){
              var tqList = TQdayList_josn[i];
              if (content.sid == tqList.stationid) {

                  var cn = tqList.cn != "" ? parseInt(tqList.cn) : null;
                  var tx_text = Surfrec._getCurrentWeather2(cn, tqList.ww, "&nbsp;");
                  var _tr = "<tr><td nowrap='nowrap'>" + new Date(tqList.datetime.replace(/\-/g, "\/")).format('dd日hh时') + "</td><td nowrap='nowrap'>" + tx_text + "</td><td>" + tqList.t + "</td><td>" + tqList.p + "</td><td nowrap='nowrap'>" +(tqList.wd2 == ""?"":wd8[tqList.wd2][0]) + "</td><td>" + tqList.wf2 + "</td><td>" + tqList.rh + "</td><td>" + tqList.r6 + "<br></td></tr>";
                  tableHtml += _tr;
                  //console.log(tableHtml);
              }
          }

          tableHtml += "</tbody></table>";

          var sContentjt01 = "<div class=\"map_dqck\">" + tableHtml + "</div>";
          var infoBoxjt01 = new BMapLib.InfoBox(map_dqck, sContentjt01, {
              offset: { width: 0, height: 0 },
              boxStyle: {
                  width: "420px",
                  height: "280px"
              },
              //boxClass: "infobox ibox_" + content.sid,
              boxClass: "infobox",
              closeIconMargin: "5px 8px 0 0",
              closeIconUrl: "images/iw_close1d3.gif",
              enableAutoPan: true,
              align: INFOBOX_AT_TOP
          });
          markerjt01.addEventListener("click", function () {
              //关闭全部infobox
              $(".infobox").hide();
              infoBoxjt01.open(markerjt01)
          })
      })
      if (tx_wd_status == "block")
          Sugis.wf_translate();
      $(".load").remove();

  },

  //天气要素显示隐藏控制
  TQYS_chang: function (statu) {
      if (statu)//显示天气要素
      {
          var tqys_arr = $("input:[name='tqys']:checked");//显示的天气要素
          $(".BMapLabel").hide();
          $(".BMap_Marker").hide();
          for (var i = 0; i < tqys_arr.length; i++) {
              if (tqys_arr[i].value == "tx") {//天象
                  if ($(".tx_tx").attr('checked') != undefined)
                      $(".BMap_Marker").show();
                  else
                      $(".BMap_Marker").hide();
              }
              else
                  $(".BMapLabel:[title='" + tqys_arr[i].value + "']").show();
          }
          this.wf_translate();
      } else {//隐藏
          $(".BMapLabel").hide();
          //风 站名不受 显示隐藏控制
          var tx_arr = $("input:[class='tx']:checked");
          for (var i = 0; i < tx_arr.length; i++) {
              $(".BMapLabel:[title='" + tx_arr[i].value + "']").show();
          }
      }
  },
  //处理风向图片旋转
  wf_translate: function () {
      //setTimeout(function () {
      //    $(".wf_translate").each(function () {
      //        $(this).rotate(parseInt($(this).attr("angle")))
      //    })
      //}, 200);
      $(".wf_translate").each(function () {
          $(this).rotate(parseInt($(this).attr("angle")))
      })
  },
  //减去天数
  SubDay: function (days) {

      //date = date.replace(/-/g, "/"); //更改日期格式

      var nd = new Date();

      nd = nd.valueOf();

      nd = nd - days * 24 * 60 * 60 * 1000;

      nd = new Date(nd);
      return nd;
  },
  //快速定位
  Dingwei: function () {
      $(".dingwei a").click(function () {
          $(".dingwei").hide();
          var sid = $(this).text();
          $.each(TQList_josn, function (index, content) {
              if (content.name == sid) {
                  map_dqck.centerAndZoom(new BMap.Point(content.lo, content.la), 9);
                  $(".BMap_Marker:[title=" + content.sid + "]").click()
                  return false;
              }
          })
      })
  }

}
Surfrec = {};
Surfrec.CW_PHE = { "04": ["烟", 40], "05": ["霾", 50], "06": ["浮尘", 60], "07": ["扬沙", 70], "08": ["尘卷风", 80], "09": ["沙尘暴", 90], "10": ["轻雾", 100], "11": ["片状浅雾", 110], "12": ["连续浅雾", 120], "13": ["闪电", 130], "14": ["视区内降水,未达地面", 140], "15": ["测站外有降水", 150], "16": ["测站附近有降水", 160], "17": ["雷暴,未降水", 170], "18": ["飑", 180], "19": ["龙卷", 190], "20": ["毛毛雨或米雪(观测前)", 200], "21": ["雨(观测前)", 210], "22": ["雪,冰粒(观测前)", 220], "23": ["雨夹雪或冰粒(观测前)", 230], "24": ["雨结成雨淞(观测前)", 240], "25": ["阵雨(观测前)", 250], "26": ["阵雪或雨夹雪(观测前)", 260], "27": ["冰雹或霰(观测前)", 270], "28": ["雾或冰雾(观测前)", 280], "29": ["雷暴(观测前)", 290], "30": ["中轻度沙尘暴减弱", 300], "31": ["中轻度沙尘暴持续", 310], "32": ["中轻度沙尘暴增强", 320], "33": ["强沙尘暴减弱", 330], "34": ["强沙尘暴持续", 340], "35": ["强沙尘暴增强", 350], "36": ["中轻度低吹雪", 360], "37": ["强低吹雪", 370], "38": ["中轻度高吹雪", 380], "39": ["强高吹雪或雪暴", 390], "40": ["近处有雾", 400], "41": ["散片雾", 410], "42": ["雾(变薄,天空可辨)", 420], "43": ["雾(变薄,天空难辨)", 430], "44": ["雾(持续,天空可辨)", 440], "45": ["雾(持续,天空难辨)", 450], "46": ["雾(变浓,天空可辨)", 460], "47": ["雾(变浓,天空难辨)", 470], "48": ["雾(结成雾凇,天空可辨)", 480], "49": ["雾(结成雾凇,天空难辨)", 490], "50": ["间歇性轻毛毛雨", 500], "51": ["连续性轻毛毛雨", 510], "52": ["间歇性中常毛毛雨", 520], "53": ["连续性中常毛毛雨", 530], "54": ["间歇性浓毛毛雨", 540], "55": ["连续性浓毛毛雨", 550], "56": ["轻毛毛雨结成雨凇", 560], "57": ["中浓毛毛雨结成雨凇", 570], "58": ["轻毛毛雨夹雨", 580], "59": ["中浓毛毛雨夹雨", 590], "60": ["间歇性小雨", 600], "61": ["连续性小雨", 610], "62": ["间歇性中雨", 620], "63": ["连续性中雨", 630], "64": ["间歇性大雨", 640], "65": ["连续性大雨", 650], "66": ["小雨结成雨凇", 660], "67": ["中大雨结成雨凇", 670], "68": ["小雨夹雪", 680], "69": ["中大雨夹雪", 690], "70": ["间歇性小雪", 700], "71": ["连续性小雪", 710], "72": ["间歇性中雪", 720], "73": ["连续性中雪", 730], "74": ["间歇性大雪", 740], "75": ["连续性大雪", 750], "76": ["冰针", 760], "77": ["米雪", 770], "78": ["星状雪晶", 780], "79": ["冰粒", 790], "80": ["小阵雨", 800], "81": ["中阵雨", 810], "82": ["大阵雨", 820], "83": ["小阵雨夹雪", 830], "84": ["中大阵雨夹雪", 840], "85": ["小阵雪", 850], "86": ["中大阵雪", 860], "87": ["小阵性霰", 870], "88": ["中大阵性霰", 880], "89": ["轻冰雹", 890], "90": ["中强冰雹", 900], "91": ["小雨(前有雷暴)", 910], "92": ["中大雨(前有雷暴)", 920], "93": ["轻雪,霰,雹(前有雷暴)", 930], "94": ["中强雪,霰,雹(前有雷暴)", 940], "95": ["中小雷暴", 950], "96": ["中小雷暴,伴冰雹、霰", 960], "97": ["大雷暴", 970], "98": ["大雷暴,伴沙尘暴降水", 980], "99": ["大雷暴,伴冰雹、霰", 990], "A04": ["霾、烟或尘(轻)", 61], "A05": ["霾、烟或尘(重)", 62], "A10": ["轻雾", 101], "A11": ["冰针", 761], "A12": ["远电", 131], "A18": ["飑", 181], "A20": ["雾(观测前)", 281], "A21": ["降水(观测前)", 212], "A22": ["毛毛雨或米雪(观测前)", 201], "A23": ["雨(观测前)", 211], "A24": ["雪(观测前)", 221], "A25": ["雨结成雨凇(观测前)", 241], "A26": ["雷暴(观测前)", 291], "A27": ["吹雪或扬沙", 391], "A28": ["1km外吹雪或扬沙", 392], "A29": ["1km内吹雪或扬沙", 393], "A30": ["雾", 401], "A31": ["散片雾", 411], "A32": ["雾(变薄)", 431], "A33": ["雾(持续)", 451], "A34": ["雾(变浓)", 471], "A35": ["雾,结成雾凇", 491], "A40": ["降水", 598], "A41": ["中轻度降水", 612], "A42": ["较强降水", 652], "A43": ["中轻度液体降水", 613], "A44": ["较强液体降水", 653], "A45": ["中轻度固体降水", 712], "A46": ["较强固体降水", 752], "A47": ["中轻度冻的降水", 662], "A48": ["较强冻的降水", 672], "A50": ["毛毛雨", 499], "A51": ["轻毛毛雨", 511], "A52": ["中毛毛雨", 531], "A53": ["浓毛毛雨", 551], "A54": ["轻毛毛雨结成雨凇", 561], "A55": ["中毛毛雨结成雨凇", 571], "A56": ["浓毛毛雨结成雨凇", 572], "A57": ["轻毛毛雨夹雨", 581], "A58": ["中大毛毛雨夹雨", 591], "A60": ["雨", 599], "A61": ["小雨", 611], "A62": ["中雨", 631], "A63": ["大雨", 651], "A64": ["小雨结成雨凇", 661], "A65": ["中雨结成雨凇", 671], "A66": ["大雨结成雨凇", 672], "A67": ["小雨夹雪", 681], "A68": ["中大雨夹雪", 691], "A70": ["雪", 699], "A71": ["小雪", 711], "A72": ["中雪", 731], "A73": ["大雪", 751], "A74": ["小冰丸", 761], "A75": ["中冰丸", 762], "A76": ["大冰丸", 763], "A77": ["米雪", 771], "A78": ["冰晶", 781], "A80": ["阵性降水", 799], "A81": ["小阵雨", 801], "A82": ["中阵雨", 811], "A83": ["大阵雨", 821], "A84": ["阵性暴雨", 822], "A85": ["小阵雪", 851], "A86": ["中阵雪", 861], "A87": ["大阵雪", 862], "A89": ["冰雹", 901], "A90": ["雷暴", 949], "A91": ["中小雷暴", 951], "A92": ["中小雷暴,伴阵雨或雪", 952], "A93": ["中小雷暴,伴冰雹", 961], "A94": ["大雷暴", 971], "A95": ["大雷暴,伴阵雨或雪", 972], "A96": ["大雷暴,伴冰雹", 991], "A99": ["龙卷", 191] };
Surfrec.PW_PHE = {
  //"0":"云占天空≤1/2",
  //"1":"云占天空有时>1/2,有时≤1/2",
  //"2":"云占天空>1/2",
  "3": "沙尘暴,吹雪或雪暴",
  "4": "雾,冰雾或浓霾",
  "5": "毛毛雨",
  "6": "雨",
  "7": "固体降水或混合降水",
  "8": "阵性降水",
  "9": "雷暴",
  "A1": "能见度降低",
  "A2": "扬沙",
  "A3": "雾",
  "A4": "降水",
  "A5": "毛毛雨",
  "A6": "雨",
  "A7": "雪或冰丸",
  "A8": "阵性降水",
  "A9": "雷暴"
};

Surfrec.CLOUDINESS = ['无云', '微量云', '少云', '少到多云', '少到多云', '少到多云', '多云', '多云到阴', '阴', null];
Surfrec.WD8 = ['静', '东北', '东', '东南', '南', '西南', '西', '西北', '北'];
/*
* 获取天气描述
* @param cn 总云码
* @param ww 现在天象码
* @return 长度为2的1维数组。[0]--天气描述，[1]--顺序号
*/
Surfrec._getCurrentWeather = function (cn, ww, null_str) {
  var n = nullif(cn, -1);
  var w = nullif(ww, -1);
  var s2 = null;
  var i = 0;
  var s1 = Surfrec.CLOUDINESS[n];
  var phe = Surfrec.CW_PHE[w];
  if (phe != null) {
      s2 = phe[0];
      i = phe[1];
  }
  //var s = fs121.util.join(s1, s2, ',');
  var s = s1 + "," + s2;
  i += n * 1000;
  return [nullif(s, null_str), i];
};

Surfrec._getCurrentWeather2 = function (cn, ww, null_str) {

  if (ww != null && ww != "") {

      //接天气代码
      var n = cn;// nullif(cn, -1);
      var w = nullif(ww, -1);
      var s2 = "";
      var i = 0;

      var s1 = Surfrec.CLOUDINESS[n];
      if (n == 9 || n == null)
          s1 = "晴";
      var phe = Surfrec.CW_PHE[w];
      if (phe != null) {
          s2 = phe[0];
          i = phe[1];
      }
      //var s = fs121.util.join(s1, s2, ',');
      var s = "";
      if (s2 == "") {
          s = s1;
      } else {
          s = s1 + "," + s2;
      }
      i += n * 1000;
      return s;


  } else if (cn == null || cn == "") {
      return "晴";
  } else if (cn != 9) {
      return Surfrec.CLOUDINESS[cn];
  } else {
      return "";
  }



};
//如果参数为3个，当v不为null时，返回arg1,否则返回arg2;
//如果参数为2个，当v不为null时，返回v,否则返回arg1;
//其它情况都返回v
nullif = function (v, arg1, arg2) {
  if (arguments.length == 2)
      return v != null ? v : arg1;
  else if (arguments.length == 3)
      return v != null ? arg1 : arg2;
  else
      return v;
};

Surfrec._getPastWeather = function (w1, w2) {
  var phe1 = Surfrec.PW_PHE[w1];
  var phe2 = Surfrec.PW_PHE[w2];
  if (w1 != w2)
      return fs121.util.join(phe1, phe2, ';');
  else
      return phe1;
};

//气象图片码
Surfrecord = {
  //@param ww 天象代码
  //@param n 总云量代码
  getPhImgindex: function (ww, n) {
      var i = 0;
      if (ww == null || ww == "")
          i = 0;
      else if (ww.indexOf('A') != -1)
          i = this.Aww2ww[ww];
      else
          i = ww * 1;
      if (i >= 4)
          return i;
      else if (i != null && (n != null && n != ""))
          return 100 + parseInt(n);
      return 0;
  },
  Aww2ww: {
      A00: 00, A01: 01, A02: 02, A03: 03, A04: 05, A05: 05,
      A10: 10, A11: 76, A12: 13, A18: 18,
      A20: 28, A21: 25, A22: 20, A23: 21, A24: 22, A25: 24, A26: 29, A27: 36, A28: 37, A29: 36,
      A30: 41, A31: 40, A32: 42, A33: 44, A34: 47, A35: 48,
      A40: 60, A41: 62, A42: 65, A43: 62, A44: 65, A45: 72, A46: 75, A47: 66, A48: 67,
      A50: 50, A51: 51, A52: 52, A53: 55, A54: 56, A55: 57, A56: 57, A57: 58, A58: 59,
      A60: 60, A61: 61, A62: 61, A63: 65, A64: 66, A65: 67, A66: 67, A67: 68, A68: 69,
      A70: 70, A71: 71, A72: 72, A73: 75, A74: 79, A75: 79, A76: 79, A77: 77, A78: 78,
      A80: 80, A81: 80, A82: 81, A83: 82, A84: 82, A85: 85, A86: 86, A87: 86, A89: 96,
      A90: 90, A91: 17, A92: 95, A93: 96, A94: 17, A95: 97, A96: 99, A99: 19
  }
};

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
      this.splice(index, 1);
  }
};

/*---2016-11-18---start---*/
function wapAutoHeight(){
  if( location.pathname == "/wap/Sugis.aspx"){
      //自适应屏幕
      $("#map_dqck").height(document.documentElement.clientHeight - $("#footer").height() - $("#map_dqck")[0].offsetTop - 70 );
  }
}

function wapCloseWindow(){
  if( location.pathname == "/wap/Sugis.aspx"){
      //关闭快速定位窗口
      $("#divClose").click(function(){
          $(".dingwei").hide();
      });
  }
}
/*---2016-11-18---end-----*/
