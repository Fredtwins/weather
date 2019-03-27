import { responseModule } from 'common/js/module'
const state = {
  User: {},
  Role: null,
  RouterFrom: '',
  active: {},
  form_name: '',
  Institution: [],
  DepartReportInfo: {},
  IsShow: '',
  DepReportList: [],
  ifCommand: false,
  responseModule: responseModule,
  SHUIKU: {},
  ID: '',
  NOTICEID: '',
  MESSAGEID: '',
  STATUS: '',
  STTUS: '',
  timeOut: '',
  RESJUMPPATH: '',
  navList: [{
    title: '天气预报',
    path: '/weatherForecast',
    name: 'weatherForecast',
    children: [{
      path: '/weatherForecast/refine',
      name: 'refine',
      title: '精细化预报',
      icon: require('components/article/img/content-nav/L1_2.png'),
      iconCurrent: require('components/article/img/content-nav/L1_2_2.png')
    },
    {
      path: '/weatherForecast/town',
      name: 'town',
      title: '乡镇天气预报',
      icon: require('components/article/img/content-nav/L1_13.png'),
      iconCurrent: require('components/article/img/content-nav/L1_13_2.png')
    },
    {
      path: '/weatherForecast/scenicSpot',
      name: 'scenicSpot',
      title: '景区预报',
      icon: require('components/article/img/content-nav/L2_9.png'),
      iconCurrent: require('components/article/img/content-nav/L2_9_2.png')
    },
    {
      path: '/weatherForecast/local',
      name: 'local',
      title: '本地预报',
      icon: require('components/article/img/content-nav/L1_3.png'),
      iconCurrent: require('components/article/img/content-nav/L1_3_2.png')
    },
    {
      name: 'internal',
      path: '/weatherForecast/internal',
      title: '国内七日预报',
      icon: require('components/article/img/content-nav/L1_4.png'),
      iconCurrent: require('components/article/img/content-nav/L1_4_2.png')
    },
    {
      name: 'environment',
      path: '/weatherForecast/environment',
      title: '环境气象',
      icon: require('components/article/img/content-nav/L1_5.png'),
      iconCurrent: require('components/article/img/content-nav/L1_5_2.png')
    },
    {
      name: 'weatherReport',
      path: '/weatherForecast/weatherReport',
      title: '天气报告',
      icon: require('components/article/img/content-nav/L4_2.png'),
      iconCurrent: require('components/article/img/content-nav/L4_2_2.png')
    },
    {
      name: 'weatherNews',
      path: '/weatherForecast/weatherNews',
      title: '天气消息',
      icon: require('components/article/img/content-nav/L1_8.png'),
      iconCurrent: require('components/article/img/content-nav/L1_8_2.png')
    },
    {
      name: 'weatherVideo',
      path: '/weatherForecast/weatherVideo',
      title: '天气视频',
      icon: require('components/article/img/content-nav/L1_10.png'),
      iconCurrent: require('components/article/img/content-nav/L1_10_2.png')
    },
    {
      name: 'traffic',
      path: '/weatherForecast/traffic',
      title: '道路交通预报',
      icon: require('components/article/img/content-nav/L1_7.png'),
      iconCurrent: require('components/article/img/content-nav/L1_7_2.png')
    }
    ]
  },
  {
    title: '天气监测',
    path: '/monitor',
    name: 'monitor',
    children: [
      {
        name: 'awshou',
        path: '/monitor/awshou',
        title: '自动站',
        icon: require('components/article/img/content-nav/L1_7.png'),
        iconCurrent: require('components/article/img/content-nav/L1_7_2.png')
      }, {
        name: 'cloud',
        path: '/monitor/cloud',
        title: '卫星云图',
        icon: require('components/article/img/content-nav/L1_7.png'),
        iconCurrent: require('components/article/img/content-nav/L1_7_2.png')
      }, {
        name: 'radar',
        path: '/monitor/radar',
        title: 'S波段雷达图',
        icon: require('components/article/img/content-nav/L1_7.png'),
        iconCurrent: require('components/article/img/content-nav/L1_7_2.png')
      }, {
        name: 'tlnp',
        path: '/monitor/tlnp',
        title: 'T-LnP',
        icon: require('components/article/img/content-nav/L2_13.png'),
        iconCurrent: require('components/article/img/content-nav/L2_13_2.png')
      }]
  },
  {
    title: '应急预警',
    path: '/warning',
    name: 'warning',
    children: [{
      path: '/warning/foshan',
      name: 'foshan',
      title: '佛山气象预警',
      icon: require('components/article/img/content-nav/L3_1.png'),
      iconCurrent: require('components/article/img/content-nav/L3_1_2.png')
    }, {
      path: '/warning/province',
      name: 'province',
      title: '全省气象预警',
      icon: require('components/article/img/content-nav/L3_1.png'),
      iconCurrent: require('components/article/img/content-nav/L3_1_2.png')
    }, {
      path: '/warning/meaning',
      name: 'meaning',
      title: '预警信号含义',
      icon: require('components/article/img/content-nav/L3_3.png'),
      iconCurrent: require('components/article/img/content-nav/L3_3_2.png')
    }, {
      path: '/warning/disaster',
      name: 'disaster',
      title: '地质灾害预警',
      icon: require('components/article/img/content-nav/L3_2.png'),
      iconCurrent: require('components/article/img/content-nav/L3_2_2.png')
    }]
  },
  {
    title: '气候服务',
    path: '/service',
    name: 'service',
    children: [{
      path: '/service/foshan',
      name: 'foshan',
      title: '佛山气候',
      icon: require('components/article/img/content-nav/L4_4.png'),
      iconCurrent: require('components/article/img/content-nav/L4_4_2.png')
    }, {
      path: '/service/prediction',
      name: 'prediction',
      title: '生态气象预报',
      icon: require('components/article/img/content-nav/L4_1.png'),
      iconCurrent: require('components/article/img/content-nav/L4_1_2.png')
    }, {
      path: '/service/notice',
      name: 'notice',
      title: '档案公报',
      icon: require('components/article/img/content-nav/L4_2.png'),
      iconCurrent: require('components/article/img/content-nav/L4_2_2.png')
    }]
  },
  {
    title: '天气互动',
    path: '/interaction',
    name: 'interaction',
    children: [{
      name: 'message',
      path: '/affairs/communication/suggestion/1',
      title: '留言版',
      icon: require('components/article/img/content-nav/L3_5.png'),
      iconCurrent: require('components/article/img/content-nav/L3_5_2.png')
    }, {
      name: 'virtual',
      path: '/interaction/virtual',
      title: '虚拟观测场',
      icon: require('components/article/img/content-nav/hd_3.png'),
      iconCurrent: require('components/article/img/content-nav/hd_3_2.png')
    }, {
      name: 'equipment',
      path: '/interaction/equipment',
      title: '观测场设备介绍',
      icon: require('components/article/img/content-nav/L1_12.png'),
      iconCurrent: require('components/article/img/content-nav/L1_12_2.png')
    }, {
      name: 'share',
      path: '/interaction/share',
      title: '共享',
      icon: require('components/article/img/content-nav/L1_11.png'),
      iconCurrent: require('components/article/img/content-nav/L1_11_2.png')
    }, {
      name: 'data',
      path: '/interaction/data',
      title: '数据访问',
      icon: require('components/article/img/content-nav/L3_4.png'),
      iconCurrent: require('components/article/img/content-nav/L3_4_2.png')
    }]
  },
  {
    title: '阳光政务',
    path: '/affairs',
    name: 'affairs',
    children: [{
      path: '/affairs/public',
      name: 'public',
      title: '政务公开',
      icon: require('components/article/img/content-nav/zw_1.png'),
      iconCurrent: require('components/article/img/content-nav/zw_1_2.png')
    }, {
      path: '/affairs/service',
      name: 'service',
      title: '办事服务',
      icon: require('components/article/img/content-nav/L8_2.png'),
      iconCurrent: require('components/article/img/content-nav/L8_2_2.png')
    }, {
      path: '/affairs/communication',
      name: 'communication',
      title: '互动交流',
      icon: require('components/article/img/content-nav/zw_3.png'),
      iconCurrent: require('components/article/img/content-nav/zw_3_2.png')
    }, {
      path: '/affairs/notice',
      name: 'notice',
      title: '通知公告',
      icon: require('components/article/img/content-nav/zw_5.png'),
      iconCurrent: require('components/article/img/content-nav/zw_5_2.png')
    }, {
      path: '/affairs/news',
      name: 'news',
      title: '气象新闻',
      icon: require('components/article/img/content-nav/L8_2.png'),
      iconCurrent: require('components/article/img/content-nav/L8_2_2.png')
    }, {
      path: '/affairs/suggestion',
      name: 'suggestion',
      title: '党风廉政意见箱',
      icon: require('components/article/img/content-nav/L4_2.png'),
      iconCurrent: require('components/article/img/content-nav/L4_2_2.png')
    }]
  },
  {
    title: '气象科普',
    path: '/popularize',
    name: 'popularize',
    children: [{
      path: '/popularize/news',
      name: 'news',
      title: '气象科普',
      icon: require('components/article/img/content-nav/kp_1.png'),
      iconCurrent: require('components/article/img/content-nav/kp_1_2.png')
    }]
  },
  {
    title: '防雷减灾',
    path: '/lightning',
    name: 'lightning',
    children: [{
      path: '/lightning/online',
      name: 'online',
      title: '在线办事',
      icon: require('components/article/img/content-nav/L8_2.png'),
      iconCurrent: require('components/article/img/content-nav/L8_2_2.png')
    }]
  },
  {
    title: '龙卷研究',
    path: '/tornado',
    name: 'tornado',
    children: [{
      path: '/tornado/introduce',
      name: 'introduce',
      title: '机构简介',
      icon: require('components/article/img/content-nav/L8_7.png'),
      iconCurrent: require('components/article/img/content-nav/L8_7_2.png')
    }, {
      path: '/tornado/news',
      name: 'news',
      title: '科普咨讯',
      icon: require('components/article/img/content-nav/L8_2.png'),
      iconCurrent: require('components/article/img/content-nav/L8_2_2.png')
    }]
  }
  ]
}

export default state
