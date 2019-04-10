import Vue from 'vue'
import Router from 'vue-router'

// 子路由
import weatherForecastRouter from './weatherForecast'
import weatherMonitorRouter from './weatherMonitor'
import emergencyWarningRouter from './emergencyWarning'
import climateServicesRouter from './climateServices'
import tornadoResearchRouter from './tornadoResearch'
import sunGovernmentAffairsRouter from './sunGovernmentAffairs'
import polularScienceRouter from './polularScience'
import disasterReductionRouter from './disasterReduction'
import weatherInteractRouter from './weatherInteract'

Vue.use(Router)

// 登录
const home = () =>
  import('components/home/home')

const article = () =>
  import('components/article/article')

const router = new Router({
  routes: [{
    path: '*',
    redirect: '/'
  }, {
    path: '/',
    component: home,
    meta: {
      nologin: true,
    },
    name: 'home'
  }, {
    path: '/weatherForecast',
    name: 'weatherForecast',
    component: article,
    children: weatherForecastRouter
  }, {
    path: '/weatherMonitor',
    name: 'weatherMonitor',
    component: article,
    children: weatherMonitorRouter
  }, {
    path: '/emergencyWarning',
    name: 'emergencyWarning',
    component: article,
    children: emergencyWarningRouter
  }, {
    path: '/climateServices',
    name: 'climateServices',
    component: article,
    children: climateServicesRouter
  }, {
    path: '/tornadoResearch',
    name: 'tornadoResearch',
    component: article,
    children: tornadoResearchRouter
  }, {
    path: '/sunGovernmentAffairs',
    name: 'sunGovernmentAffairs',
    component: article,
    children: sunGovernmentAffairsRouter
  },{
    path: '/polularScience',
    name: 'polularScience',
    component: article,
    children: polularScienceRouter
  },{
    path: '/disasterReduction',
    name: 'disasterReduction',
    component: article,
    children: disasterReductionRouter
  },{
    path:'/weatherInteract',
    name:'weatherInteract',
    component:article,
    children:weatherInteractRouter
  }]
})

export default router
