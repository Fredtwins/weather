// const weatherMonitor = () =>
//   import('components/article/weatherMonitor')

const cloud = () =>
  import('components/article/weatherMonitor/cloud')

const sRadar = () =>
  import('components/article/weatherMonitor/sRadar')

const xradar = () =>
  import('components/article/weatherMonitor/xradar')

// 自动站
const aws = () =>
  import('components/article/weatherMonitor/aws')

// 能见度
const visibility = () =>
  import('components/article/weatherMonitor/visibility')

// 天气实景
const realScene = () =>
  import('components/article/weatherMonitor/realScene')

// 台风路径图
const typhoon = () =>
  import('components/article/weatherMonitor/typhoon')

// 地球此时
const earthNow = () =>
  import('components/article/weatherMonitor/earthNow')

const tlnp = () =>
  import('components/article/weatherMonitor/tlnp')

// const earthNow = () =>
//   import('components/article/weatherMonitor/sugis')

export default [{
  path: '/weatherMonitor',
  redirect: '/weatherMonitor/aws'
}, {
  path: 'cloud',
  name: 'cloud',
  component: cloud
}, {
  path: 'sRadar',
  name: 'sRadar',
  component: sRadar
}, {
  path: 'xradar',
  name: 'xradar',
  component: xradar
}, {
  path: 'aws',
  name: 'aws',
  component: aws
}, {
  path: 'visibility',
  name: 'visibility',
  component: visibility
}, {
  path: 'realScene',
  name: 'realScene',
  component: realScene
}, {
  path: 'typhoon',
  name: 'typhoon',
  component: typhoon
}, {
  path: 'earthNow',
  name: 'earthNow',
  component: earthNow
}, {
  path: 'T-lnP/:id',
  name: 'T-lnP',
  component: tlnp,
  children: [{
    path: '/weatherMonitor/T-lnP',
    redirect: '/weatherMonitor/T-lnP/T-lnP'
  }]
}]
