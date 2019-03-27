<template>
  <div class="interaction-data">
    <h2 class="title">公共气象数据访问说明</h2>
    <table>
      <thead>
        <tr>
          <th class="first">数据名称</th>
          <th class="second">数据功能</th>
          <th class="third">数据功能说明</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(tableItem,index) in tableData">
          <tr :key="'tableItem-'+index">
            <td class="first">{{tableItem.name}}</td>
            <td class="second">
              <template v-for="(dataItem,dataIndex) in tableItem.data">
                <tr v-if="dataItem.type != 'code'" :key="'data-'+index+'-'+dataIndex">
                  <td class="data-name" :style="dataIndex==tableItem.data.length-1?'border-bottom:0':''">{{dataItem.name}}</td>
                  <td
                    v-if="dataItem.type == 'url'"
                    class="data-value"
                  >
                    <a
                      :href="dataItem.value"
                      target="blank"
                      style="color:#5f940a;"
                    >{{dataItem.textName}}</a>
                  </td>
                  <td
                    v-else-if="dataItem.type == 'format'"
                    class="data-value"
                    v-html="'<pre>'+dataItem.value+'</pre>'"
                  ></td>
                  <td
                    v-else
                    class="data-value"
                    :style="dataIndex==tableItem.data.length-1?'border-bottom:0':''"
                  >{{dataItem.value}}</td>
                </tr>
                <template v-else>
                  <tr v-for="(codeItem,codeIndex) in dataItem.value" :key="'data-'+index+'-'+dataIndex+'-'+codeIndex">
                    <td class="data-name">{{codeItem.name}}</td>
                    <td
                      class="data-value"
                      v-html="'<pre>'+codeItem.value+'</pre>'"
                    ></td>
                  </tr>
                </template>
              </template>
            </td>
          </tr>
          <tr
            v-if="index != tableData.length-1"
            class="empty-tr"
            :key="'tableItem-empty'+index"
          >
            <td colspan="3"></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      tableData: [
        {
          name: '1.佛山各区正在生效预警信号',
          data: [
            { name: '预警信号', value: '佛山5区当前预警信号' },
            { type: 'url', name: 'URL', textName: 'fswn.js', value: '/pub/1/fswn.js' },
            {
              type: 'format',
              name: '格式',
              value: "[<br/>&nbsp;{<br/>&nbsp;&nbsp;station: ”高明/南海/顺德/三水/禅城” //站号(五大地区预报区),<br/>&nbsp;&nbsp;datetime: ”2015-10-18 09: 12: 00” //发布日期时间,<br/>&nbsp;&nbsp;code: ”J4” //预警信号代码(编号),<br/>&nbsp;&nbsp;name: ”森林火险橙色预警信号”//预警信号名称(类型和等级) //见下说明<br/>&nbsp;},<br/>&nbsp;{<br/>&nbsp;&nbsp;station: ”南海”,<br/>&nbsp;&nbsp;datetime: ”2015-10-18 08: 50: 00”,<br/>&nbsp;&nbsp;code: ”J4”,<br/>&nbsp;&nbsp;name: ”森林火险橙色预警信号”<br/>&nbsp;},<br/>&nbsp;…<br/>]<br/>注意：如果当前无预警信号发布，数据为[ ]。<br/>"
            },
            {
              type: 'code',
              value: [
                {
                  name: '信号编码',
                  value: "A0:台风预警信号解除 A1:台风白色预警信号 A2:台风蓝色预警信号 A3:台风黄色预警信号<br/>A4:台风橙色预警信号 A5:台风红色预警信号<br/>B0:暴雨预警信号解除 B3:暴雨黄色预警信号 B4:暴雨橙色预警信号 B5:暴雨红色预警信号<br/>C0:高温预警信号解除 C3:高温黄色预警信号 C4:高温橙色预警信号 C5:高温红色预警信号<br/>D0:寒冷预警信号解除 D3:寒冷黄色预警信号 D4:寒冷橙色预警信号 D5:寒冷红色预警信号<br/>E0:大雾预警信号解除 E3:大雾黄色预警信号 E4:大雾橙色预警信号 E5:大雾红色预警信号<br/>F0:灰霾预警信号解除 F3:灰霾黄色预警信号 G0:雷雨大风预警信号解除<br/>G2:雷雨大风蓝色预警信号 G3:雷雨大风黄色预警信号 G4:雷雨大风橙色预警信号<br/>G5:雷雨大风红色预警信号<br/>H0:道路结冰预警信号解除 H3:道路结冰黄色预警信号 H4:道路结冰橙色预警信号<br/>H5:道路结冰红色预警信号<br/>I0:冰雹预警信号解除 I4:冰雹橙色预警信号 I5:冰雹红色预警信号<br/>J0:森林火险预警信号解除 J3:森林火险黄色预警信号 J4:森林火险橙色预警信号<br/>J5:森林火险红色预警信号<br/>型号颜色种类：0-解除 1-白 2-蓝 3-黄 4-橙 5-红"
                }
              ]
            },
            {
              name: '更新时间',
              value: '有预警信号发布、变更、解除时'
            }
          ]
        },
        {
          name: '2.最新短时天气预报',
          data: [
            { name: '短时预报', value: '佛山5区短时预报' },
            { type: 'url', name: 'URL', textName: 'fost.js', value: '/pub/1/fost.js' },
            {
              type: 'format',
              name: '格式',
              value: "[<br/>&nbsp;{<br/>&nbsp;&nbsp;station: ”三水”//区名,<br/>&nbsp;&nbsp;valid_datetime: ”2015-10-19 11: 00: 00”//预报起始时间,<br/>&nbsp;&nbsp;span: “9”//预报时效(小时)6、9、12等,<br/>&nbsp;&nbsp;tmax: “29”//最高气温(℃),<br/>&nbsp;&nbsp;tmin: “24”//最低气温(℃),<br/>&nbsp;&nbsp;hmax: ”40”//最高相对湿度(%),<br/>&nbsp;&nbsp;hmin: “25”//最低相对湿度(%),<br/>&nbsp;&nbsp;ws: ”晴朗干燥”//天气现象描述,<br/>&nbsp;&nbsp;wind: ”偏北风2级//风描述,<br/>&nbsp;&nbsp;efdate: ”预计今天中午到傍晚（有效时间：19日11时至19日20时）”//预报的时间段(预报的有效期)<br/>&nbsp;},<br/>&nbsp;{<br/>&nbsp;&nbsp;station: ”三水”,<br/>&nbsp;&nbsp;valid_datetime: ”,<br/>&nbsp;&nbsp;span: “12”,<br/>&nbsp;&nbsp;tmax: “24”,<br/>&nbsp;&nbsp;tmin: “20”,<br/>&nbsp;&nbsp;hmax: ”75”,<br/>&nbsp;&nbsp;hmin: “40”,<br/>&nbsp;&nbsp;ws: ”晴朗干燥”,<br/>&nbsp;&nbsp;wind: ”偏北风2级”,<br/>&nbsp;&nbsp;efdate: ”预计今天夜间（有效时间：19日20时至20日08时）”<br/>&nbsp;}……<br/>]"
            },
            {
              name: '更新时间',
              value: '每天早晨、上午、中午、下午、傍晚、晚上更新'
            }
          ]
        },
        {
          name: '3.全国主要城市天气预报',
          data: [
            { name: '天气预报', value: '全国主要城市天气预报信息' },
            { type: 'url', name: 'URL', textName: 'fomu20.js', value: '/pub/1/fomu20.js' },
            {
              type: 'format',
              name: '格式',
              value: "[<br/>&nbsp;{<br/>&nbsp;&nbsp;station:“北京/朝阳”//预报所在站，<br/>&nbsp;&nbsp;municipality: “北京市”//预报地区，<br/>&nbsp;&nbsp;date: ”2015-10-19”//预报日期，<br/>&nbsp;&nbsp;w1: “1”//前段天气代码。见下说明，<br/>&nbsp;&nbsp;wd1: “0”//风向编码，<br/>&nbsp;&nbsp;wf1: “0”//风速编码(m/s)，<br/>&nbsp;&nbsp;t1: “10”//24小时最低气温(℃)，<br/>&nbsp;&nbsp;t2: “21”//24小时最高气温(℃)，<br/>&nbsp;&nbsp;w2: “0”//后段天气代码，<br/>&nbsp;&nbsp;wd2: “0”//风向编码，<br/>&nbsp;&nbsp;wf2: “0”//风速编码<br/>&nbsp;}，{<br/>&nbsp;&nbsp;station: “天津城市气候监测站”，<br/>&nbsp;&nbsp;municipality: “天津市”，<br/>&nbsp;&nbsp;date: ”2015-10-19”，<br/>&nbsp;&nbsp;w1: “1”，<br/>&nbsp;&nbsp;wd1: “1”，<br/>&nbsp;&nbsp;wf1: “0”，<br/>&nbsp;&nbsp;t1: “12”，<br/>&nbsp;&nbsp;t2: “24”，<br/>&nbsp;&nbsp;w2: “0”，<br/>&nbsp;&nbsp;wd2: “4”，<br/>&nbsp;&nbsp;wf2: “0”<br/>&nbsp;}……<br/>]<br/>"
            },
            {
              type: 'code',
              value: [
                {
                  name: '天气代码',
                  value: "0:晴          1:多云          2:阴          3:阵雨          4:雷阵雨          5:雷阵雨并伴有冰雹<br/>6:雨夹雪      7:小雨          8:中雨        9:大雨          10:暴雨           11:大暴雨<br/>12:特大暴雨   13:阵雪         14:小雪       15:中雪         16:大雪           17:暴雪<br/>18:雾         19:冻雨         20:沙尘暴     21:小到中雨     22:中到大雨       23:大到暴雨<br/>24:暴雨到大暴雨               25:大暴雨到特大暴雨           26:小到中雪       27:中到大雪<br/>28:大到暴雪                   29:浮尘       30:扬沙         31:强沙尘暴       53:霾<br/>"
                }, {
                  name: '风向编码',
                  value: '0:微风时   1:东北    2:东    3:东南    4:南    5:西南    6:西    7:西北    8:北    9:不定'
                }, {
                  name: '风力编码',
                  value: '0:微风     1:3-4级    2:4-5级    3:5-6级    4:6-7级    5:7-8级    6:8-9级    7:9-10级<br>8:10-11级  9:12级'
                }
              ]
            },
            {
              name: '更新时间',
              value: '每天下午4~5点更新'
            }
          ]
        },
        {
          name: '4.逐3小时间预报',
          data: [
            { name: '天气预报', value: '含佛山5区，每3小时滚动预报' },
            { type: 'url', name: 'URL', textName: 'fohrs.js', value: '/pub/1/fohrs.js' },
            {
              type: 'format',
              name: '格式',
              value:'[<br/>&nbsp;{<br/>&nbsp;&nbsp;station: ”禅城”//区,<br/>&nbsp;&nbsp;datetime: ”2015-10-19 18: 00: 00”//预报起始时间,<br/>&nbsp;&nbsp;span: ”3”//预报间隔,<br/>&nbsp;&nbsp;tmax: ”27.0”//当日最高气温,<br/>&nbsp;&nbsp;tmin: ”25.0”//当日最低气温,<br/>&nbsp;&nbsp;w: ”0”//天气代码(天气现象编码)//见下说明,<br/>&nbsp;&nbsp;ws: ”晴”//天气现象描述,<br/>&nbsp;&nbsp;wd: ”8”//当时风向风向编码//见下说明,<br/>&nbsp;&nbsp;wf: ”0”//当时风速风速编码//见下说明,<br/>&nbsp;&nbsp;wind: ”北风，风力<三级”//风描述<br/>&nbsp;},<br/>&nbsp;{<br/>&nbsp;&nbsp;stationid: ”禅城”,<br/>&nbsp;&nbsp;datetime: ”2015-10-19 18: 00: 00”,<br/>&nbsp;&nbsp;span: ”3”,<br/>&nbsp;&nbsp;tmax: ”27.0”,<br/>&nbsp;&nbsp;tmin: ”25.0”,<br/>&nbsp;&nbsp;w: ”0”,<br/>&nbsp;&nbsp;ws: ”晴”,<br/>&nbsp;&nbsp;wd: ”8”,<br/>&nbsp;&nbsp;wf: ”0”,<br/>&nbsp;&nbsp;wind: ”北风，风力<三级”<br/>&nbsp;}，…<br/>]<br/>'
            },
            {
              type: 'code',
              value: [
                {
                  name: '天气代码',
                  value: "0:晴          1:多云          2:阴          3:阵雨          4:雷阵雨          5:雷阵雨并伴有冰雹<br/>6:雨夹雪      7:小雨          8:中雨        9:大雨          10:暴雨           11:大暴雨<br/>12:特大暴雨   13:阵雪         14:小雪       15:中雪         16:大雪           17:暴雪<br/>18:雾         19:冻雨         20:沙尘暴     21:小到中雨     22:中到大雨       23:大到暴雨<br/>24:暴雨到大暴雨               25:大暴雨到特大暴雨           26:小到中雪       27:中到大雪<br/>28:大到暴雪                   29:浮尘       30:扬沙         31:强沙尘暴       53:霾<br/>"
                }, {
                  name: '风向编码',
                  value: '0:微风时   1:东北    2:东    3:东南    4:南    5:西南    6:西    7:西北    8:北    9:不定'
                }, {
                  name: '风力编码',
                  value: '0:微风     1:3-4级    2:4-5级    3:5-6级    4:6-7级    5:7-8级    6:8-9级    7:9-10级<br>8:10-11级  9:12级'
                }
              ]
            },
            {
              name: '更新时间',
              value: '逐 3小时滚动更新'
            }
          ]
        },
        {
          name: '5.最新十天天气预报',
          data: [
            { name: '十天预报', value: '佛山市最新十天的天气预报' },
            { type: 'url', name: 'URL', textName: 'folo10d.js', value: '/pub/1/folo10d.js' },
            {
              type: 'format',
              name: '格式',
              value:'[<br/>&nbsp;{<br/>&nbsp;&nbsp;station: “佛山”//地区，<br/>&nbsp;&nbsp;datetime: ”2015-10-19 20: 00: 00”//预报起始时间，<br/>&nbsp;&nbsp;tmax1: ”30”//第1日最高温度(℃)，<br/>&nbsp;&nbsp;tmin1: ”20”//第1日最低温度(℃)，<br/>&nbsp;&nbsp;wa1: ”晴间多云”//第1日天气，<br/>&nbsp;&nbsp;wb1: ”0”//第1日天气编码见下说明，<br/>&nbsp;&nbsp;tmax2: ”31”//第2日最高温度，<br/>&nbsp;&nbsp;tmin2: ”21”//第2日最低温度，<br/>&nbsp;&nbsp;wa2: ”晴间多云”//第2日天气，<br/>&nbsp;&nbsp;wb2: ”0”//第2日天气编码，<br/>&nbsp;&nbsp;tmax3: ”32”//第3日最高温度，<br/>&nbsp;&nbsp;tmin3: ”21”//第3日最低温度，<br/>&nbsp;&nbsp;wa3: ”晴间多云”//第3日天气，<br/>&nbsp;&nbsp;wb3: ”0”//第3日天气编码，<br/>&nbsp;&nbsp;tmax4: ”32”//,<br/>&nbsp;&nbsp;tmin4: ”22”//,<br/>&nbsp;&nbsp;wa4: ”晴间多云”//,<br/>&nbsp;&nbsp;wb4: ”0”//,<br/>&nbsp;&nbsp;tmax5: ”32”//,<br/>&nbsp;&nbsp;tmin5: ”22”//,<br/>&nbsp;&nbsp;wa5: ”多云”//,<br/>&nbsp;&nbsp;wb5: ”1”//,<br/>&nbsp;&nbsp;tmax6: ”31”//,<br/>&nbsp;&nbsp;tmin6: ”22”//,<br/>&nbsp;&nbsp;wa6: ”多云”//,<br/>&nbsp;&nbsp;wb6: ”1”//,<br/>&nbsp;&nbsp;tmax7: ”30”//,<br/>&nbsp;&nbsp;tmin7: ”21”//,<br/>&nbsp;&nbsp;wa7: ”多云转阵雨”//,<br/>&nbsp;&nbsp;Wb7: ”3”//,<br/>&nbsp;&nbsp;tmax8: ”28”//,<br/>&nbsp;&nbsp;tmin8: ”20”//,<br/>&nbsp;&nbsp;wa8: ”阴天，有小到中雨”//,<br/>&nbsp;&nbsp;wb8: ”21”//,<br/>&nbsp;&nbsp;tmax9: ”29”//,<br/>&nbsp;&nbsp;tmin9: ”20”//,<br/>&nbsp;&nbsp;wa9: ”多云间阴天，有阵雨”//,<br/>&nbsp;&nbsp;wb9: ”3”//,<br/>&nbsp;&nbsp;tmax10: ”30”//第10日最高温度,<br/>&nbsp;&nbsp;tmin10: ”21”//第10日最低温度,<br/>&nbsp;&nbsp;wa10: ”多云间阴天”//第10日天气,<br/>&nbsp;&nbsp;wb10: ”1”//第10日天气编码,<br/>&nbsp;&nbsp;summary: ”“//预报概括<br/>&nbsp;}<br/>]'
            },
            {
              type: 'code',
              value: [
                {
                  name: '天气代码',
                  value: "0:晴          1:多云          2:阴          3:阵雨          4:雷阵雨          5:雷阵雨并伴有冰雹<br/>6:雨夹雪      7:小雨          8:中雨        9:大雨          10:暴雨           11:大暴雨<br/>12:特大暴雨   13:阵雪         14:小雪       15:中雪         16:大雪           17:暴雪<br/>18:雾         19:冻雨         20:沙尘暴     21:小到中雨     22:中到大雨       23:大到暴雨<br/>24:暴雨到大暴雨               25:大暴雨到特大暴雨           26:小到中雪       27:中到大雪<br/>28:大到暴雪                   29:浮尘       30:扬沙         31:强沙尘暴       53:霾<br/>"
                }, {
                  name: '风向编码',
                  value: '0:微风时   1:东北    2:东    3:东南    4:南    5:西南    6:西    7:西北    8:北    9:不定'
                }, {
                  name: '风力编码',
                  value: '0:微风     1:3-4级    2:4-5级    3:5-6级    4:6-7级    5:7-8级    6:8-9级    7:9-10级<br>8:10-11级  9:12级'
                }
              ]
            },
            {
              name: '更新时间',
              value: '每天下午17时更新'
            }
          ]
        },
        {
          name: '6.最新佛山环境气象预报',
          data: [
            { name: '环境预报', value: '最新佛山环境气象预报' },
            { type: 'url', name: 'URL', textName: 'foemi.js', value: '/pub/1/foemi.js' },
            {
              type: 'format',
              name: '格式',
              value:'[<br/>&nbsp;{<br/>&nbsp;&nbsp;datetime: ”2015-10-19 20: 00: 00”//预报生效时间,<br/>&nbsp;&nbsp;leadtime”: ”24”//预报时段(24、48、72小时等),<br/>&nbsp;&nbsp;type: ”carwash”//预报类型见下说明,<br/>&nbsp;&nbsp;index: ”1”//对应类型的指数值。见http: //www.fs121.com/pub/meteoId.htm<br/>&nbsp;},<br/>&nbsp;{<br/>&nbsp;&nbsp;datetime: ”2015-10-19 20: 00: 00”,<br/>&nbsp;&nbsp;”leadtime”: ”24”,<br/>&nbsp;&nbsp;type: ”carwash”,<br/>&nbsp;&nbsp;index: ”1”<br/>&nbsp;},<br/>&nbsp;……..<br/>]'
            },
            {
              type: 'code',
              value: [
                {
                  name: '预报类型',
                  value:'uv紫外线,  poll污染, comp舒适度等级,  ddre白天穿衣,   ndre早晚穿衣,   carwash洗车,<br/>umb雨伞,   moe晨练,  outing郊游,      cfd城市火险'
                }
              ]
            },
            {
              name: '更新时间',
              value: '每天下午15时更新'
            }
          ]
        },
        {
          name: '7.天气消息报告',
          data: [
            { name: '消息报告', value: '佛山天气消息报告' },
            { type: 'url', name: 'URL', textName: 'forpt.js', value: '/pub/1/forpt.js' },
            {
              type: 'format',
              name: '格式',
              value:'[<br/>&nbsp;{<br/>&nbsp;&nbsp;“title”: ”重阳节天气舒适宜人”,//天气类别<br/>&nbsp;&nbsp;“datetime”: ”2015-10-19 15: 10: 00”,//签发时间<br/>&nbsp;&nbsp;“content”: ”预计未来3天受干燥的偏北风影响，我市……..”//发布内容<br/>&nbsp;},<br/>&nbsp;……..<br/>]'
            },
            {
              name: '更新时间',
              value: '有天气消息时'
            }
          ]
        },
        {
          name: '8.最新佛山旬天气预报',
          data: [
            { name: '旬天气预报', value: '预报佛山最新的旬天气预报，每月分上、中、下 三旬' },
            { type: 'url', name: 'URL', textName: 'foxun.js', value: '/pub/1/foxun.js' },
            {
              type: 'format',
              name: '格式',
              value:'[<br/>&nbsp;{<br/>&nbsp;&nbsp;year:”2015”  //年份<br/>&nbsp;&nbsp;,month:”10”  //月份(1-12)<br/>&nbsp;&nbsp;,xun:”0”   //旬0-上旬; 1-中旬; 2-下旬<br/>&nbsp;&nbsp;,tavg:”25.5”  //旬平均气温(℃)<br/>&nbsp;&nbsp;,r:”40”  //旬雨量(mm)<br/>&nbsp;&nbsp;,s:”40”  //旬日照(hr)<br/>&nbsp;&nbsp;,dscr:”1、继续做好稻田、花生地的防鼠、灭鼠工作措施。<br/>&nbsp;&nbsp;2、继续做好秋植蔬菜的种植工作。3、继续做好菊花、芍药等年花种植的上盆移栽工作。” //说明描述<br/>&nbsp;},<br/>]'
            },
            {
              name: '更新时间',
              value: '每旬末'
            }
          ]
        },
        {
          name: '9.近日自动站日统计记录',
          data: [
            { name: '日记录', value: '近日佛山自动站日统计记录' },
            { type: 'url', name: 'URL', textName: 'awsday.js', value: '/pub/1/awsday.js' },
            {
              type: 'format',
              name: '格式',
              value:'[<br/>&nbsp;{<br/>&nbsp;&nbsp;“tmax”:”25.6” //日最高气温(℃)<br/>&nbsp;&nbsp;,”tmin”:”19.9” //日最低气温(℃)<br/>&nbsp;&nbsp;,”wd3smax”:”346” //日最大瞬间风向<br/>&nbsp;&nbsp;,”wf3smax”:”6.8” //日最大瞬间风速(m/s)<br/>&nbsp;&nbsp;,”r8”:”“ //前一日08时至当日08时降水量(mm)<br/>&nbsp;&nbsp;,”r20”:”“ //前一日20时至当日20时降水量(mm)<br/>&nbsp;&nbsp;,”station”:”佛山市气象台” //站名<br/>&nbsp;&nbsp;,”datetime”:”2015-10-12”}, //记录日期时间(北京时)<br/>&nbsp;……..<br/>]'
            },
            {
              name: '更新时间',
              value: '每日一次。注意：自动站易受通讯、供电和周边环境等因数影响，探测值可能会跟实际有偏差，数据仅供参考。'
            }
          ]
        },
        {
          name: '10.自动站整点记录',
          data: [
            { name: '时记录', value: '佛山自动站整点记录。' },
            { type: 'url', name: 'URL', textName: 'awsinst0.js', value: '/pub/1/awsinst0.js' },
            {
              type: 'format',
              name: '格式',
              value:'[<br/>&nbsp;{“t”:”27” //气温(℃)<br/>&nbsp;&nbsp;,”wd2”:”164” //2分钟平均风向<br/>&nbsp;&nbsp;,”wf2”:”3.5” //2分钟平均风速(m/s)<br/>&nbsp;&nbsp;,”r1h”:”“ //过去1小时降雨量(mm)，<br/>&nbsp;&nbsp;,”station”:”佛山市气象台” //站名<br/>&nbsp;&nbsp;,”datetime”:”2015-10-25 20:00:00” //记录日期时间(BT)<br/>&nbsp;},<br/>&nbsp;……..<br/>]'
            },
            {
              name: '更新时间',
              value: '每小时一次。注意：自动站易受通讯、供电和周边环境等因数影响，探测值可能会跟实际有偏差，数据仅供参考。'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.interaction-data {
  width: 100%;
  padding: 8px 26px;
  box-sizing: border-box;
  .title {
    height: 37px;
    line-height: 30px;
    font-size: 20px;
    font-family: "宋体";
    text-align: center;
  }
  .first {
    width: 180px;
  }
  .second {
    width: 80px;
  }
  .third {
    width: 668px;
  }
  // th,
  // td {
  //   border-right: 1px solid;
  // }
  table {
    width: 100%;
    display: block;
    box-sizing: border-box;
    border-spacing: 0;
    border: 0;
    thead {
      width: 100%;
      height: 38px;
      display: block;
      border: #4a4a4a solid;
      border-width: 1px 0 1px 1px;
      box-sizing: border-box;
      tr {
        height: 36px;
        th {
          border-right: 1px solid;
          color: #ffffff;
          border-color: #4a4a4a;
          background: -webkit-gradient(
            linear,
            0 0,
            0 100%,
            from(#2d79d1),
            to(#436bd5)
          );
          filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#2d79d1', endColorStr='#436bd5',gradientType='0');
        }
      }
    }
    tbody {
      display: block;
      border: solid #dbdbdb;
      border-width: 0 1px 1px;
      box-sizing: border-box;
      .first {
        border-bottom: 1px solid #dbdbdb;
        border-right: 1px solid #dbdbdb;
        font-size: 12px;
        font-family: "宋体";
        font-weight: bold;
      }
      .second {
        width: 748px;
        padding: 0;
        border: 0;
      }
      .data-name {
        width: 80px;
        border-bottom: 1px solid #dbdbdb;
      }
      .data-value {
        width: 668px;
        border-left: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
      }
      tr {
        td {
          padding: 3px 5px;
          line-height: 18px;
          box-sizing: border-box;
        }
      }
      .empty-tr {
        width: 100%;
        height: 26px;
        border: solid #dbdbdb;
        border-width: 0 0 1px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
