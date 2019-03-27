const fine = () =>
  import ('components/article/weatherForecast/fine')

const township = () =>
  import ('components/article/weatherForecast/township')

const scenicSpot = () =>
  import ('components/article/weatherForecast/scenicSpot')

const local = () =>
  import ('components/article/weatherForecast/local')

const domesticSevenDays = () =>
  import ('components/article/weatherForecast/domesticSevenDays')

const environment = () =>
  import ('components/article/weatherForecast/environment')

const report = () =>
  import ('components/article/weatherForecast/report')

const news = () =>
  import ('components/article/weatherForecast/news')

const video = () =>
  import ('components/article/weatherForecast/video')

const roadTraffic = () =>
  import ('components/article/weatherForecast/roadTraffic')

const listPage = () =>
  import ('components/article/common-component/listPage')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [{
  path: '/weatherForecast',
  redirect: '/weatherForecast/fine'
},
{
  path: 'fine',
  name: 'fine',
  component: fine
}, {
  path: 'township',
  name: 'township',
  component: township
}, {
  path: 'scenicSpot',
  name: 'scenicSpot',
  component: scenicSpot
}, {
  path: 'local',
  name: 'local',
  component: local
}, {
  path: 'domesticSevenDays',
  name: 'domesticSevenDays',
  component: domesticSevenDays
},
{
  path: 'environment',
  name: 'environment',
  component: environment
}, {
  path: 'report',
  name: 'report',
  component: report,
  children: [{
    path: '/weatherForecast/report',
    redirect: '/weatherForecast/report/page/1'
  }, {
    path: 'page/:page',
    name: 'report_page',
    component: listPage,
    children: [{
      path: '/weatherForecast/report/page',
      redirect: '/weatherForecast/report/page/1'
    }]
  }, {
    path: 'content/:id',
    name: 'report_content',
    component: contentPage,
    children: [{
      path: '/weatherForecast/report/content',
      redirect: '/weatherForecast/report/page/1'
    }]
  }]
}, {
  path: 'news',
  name: 'news',
  component: news,
  meta:{
    title:'ffff',
    content:'dss'
  },
  children: [{
    path: '/weatherForecast/news',
    redirect: '/weatherForecast/news/page/1'
  }, {
    path: 'page/:page',
    name: 'news_page',
    component: listPage,
    children: [{
      path: '/weatherForecast/news/page',
      redirect: '/weatherForecast/news/page/1'
    }]
  }, {
    path: 'content/:id',
    name: 'news_content',
    component: contentPage,
    children: [{
      path: '/weatherForecast/news/content',
      redirect: '/weatherForecast/news/page/1'
    }]
  }]
}, {
  path: 'video',
  name: 'video',
  component: video
}, {
  path: 'roadTraffic',
  name: 'roadTraffic',
  component: roadTraffic
}]
