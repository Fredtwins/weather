import { ajaxGet } from './axios'
import { getCodeUrl } from 'common/js/getCodeUrl'

// 天气预报-天气报告
export function getWeatherReport (page = 1) {
  let url = 'http://10.0.1.184:8080/mpsp/web/article/list'

  let data = {
    page: page,
    limit: 5,
    columnId: 28
  }

  return ajaxGet(url, data)
}

// 天气预报-天气消息
export function getWeatherNews (page = 1) {
  let url = 'http://10.0.1.184:8080/mpsp/web/article/list'

  let data = {
    page: page,
    limit: 5,
    columnId: 29
  }

  return ajaxGet(url, data)
}

// 天气预报-天气视频
export function getWeatherVideo () {
  let url = getCodeUrl('video')

  let data = {}

  return ajaxGet(url, data)
}

// 天气预报-道路交通预报
export function GetRoadTrafficForcast () {
  let url = getCodeUrl('roadTraffic')

  let data = {
    columnId: 31
  }

  return ajaxGet(url, data)
}

// 天气监测-能见度站点信息
export function getVisibilityMsg () {
  let url = 'http://10.0.1.184:8080/mpsp/web/weatherMonitor/visStation'

  let data = {}

  return ajaxGet(url, data)
}

// 天气监测-能见度
export function getVisibilityData (id) {
  let url = `http://10.0.1.184:8080/mpsp/web/weatherMonitor/vis/${id}`

  let data = {}

  return ajaxGet(url, data)
}

// 天气监测-天气实景
export function getRealScene () {
  let url = 'http://10.0.1.184:8080/mpsp/web/weatherMonitor/realScene'

  let data = {}

  return ajaxGet(url, data)
}

// 气象预警-佛山气象预警
export function getFoshanEmergency () {
  let url = 'http://10.0.1.184:8080/mpsp/web/emergencyWarning/FoShan'

  let data = {}

  return ajaxGet(url, data)
}

// 气象预警-地质灾害预警
export function getGeologicHazard () {
  let url = 'http://10.0.1.184:8080/mpsp/web/emergencyWarning/geologicHazard'

  let data = {}

  return ajaxGet(url, data)
}

// 气候服务-佛山气候
export function GetFoshanClimate () {
  let url = 'http://10.0.1.184:8080/mpsp/web/article/select'

  let data = {
    columnId: 47
  }

  return ajaxGet(url, data)
}

// 气候服务-生态气象预报服务
export function getEcologyData () {
  let url = 'http://10.0.1.184:8080/mpsp/web/climateService/ecology'

  let data = {}

  return ajaxGet(url, data)
}

// 气候服务-档案公报
export function getArchives (page = 1) {
  let url = 'http://10.0.1.184:8080/mpsp/web/article/list'

  let data = {
    page: page,
    limit: 6,
    columnId: 50
  }

  return ajaxGet(url, data)
}

// 天气互动-观测场设备介绍
export function getEquipmentData () {
  let url = 'http://10.0.1.184:8080/mpsp/web/article/select'

  let data = {
    columnId: 54
  }

  return ajaxGet(url, data)
}

// 阳光政务-政务公开-机构职能
export function getOpenResponsibility (page = 1) {
  let url = getCodeUrl('organizationFunction')

  let data = {
    page: page,
    limit: 10,
    columnId: 98
  }

  return ajaxGet(url, data)
}

// 阳光政务-政务公开-工作动态
export function getOpenWorkStatus (page = 1) {
  let url = getCodeUrl('workDynamic')

  let data = {
    page: page,
    limit: 10,
    columnId: 99
  }

  return ajaxGet(url, data)
}

// 阳光政务-政务公开-工作动态图片
export function getOpenWorkImg (page = 1) {
  let url = getCodeUrl('workDynamic')

  let data = {
    page: page,
    limit: 5,
    columnId: 107
  }

  return ajaxGet(url, data)
}

// 阳光政务-政务公开-政策法规
export function getOpenLaw (page = 1) {
  let url = getCodeUrl('policyLaw')

  let data = {
    page: page,
    limit: 10,
    columnId: 100
  }

  return ajaxGet(url, data)
}

// 阳光政务-政务公开-规划计划
export function getOpenPlan (page = 1) {
  let url = getCodeUrl('plan')

  let data = {
    page: page,
    limit: 10,
    columnId: 101
  }

  return ajaxGet(url, data)
}

// 阳光政务-政务公开-人事信息
export function getOpenMsg (page = 1) {
  let url = getCodeUrl('personnelInfo')

  let data = {
    page: page,
    limit: 10,
    columnId: 102
  }

  return ajaxGet(url, data)
}

// 阳光政务-政务公开-资金信息
export function getOpenFund (page = 1) {
  let url = getCodeUrl('fund')

  let data = {
    page: page,
    limit: 10,
    columnId: 103
  }

  return ajaxGet(url, data)
}

// 阳光政务-办事服务
export function getWorkService () {
  let url = getCodeUrl('workService')

  let data = {
    columnId: 59
  }

  return ajaxGet(url, data)
}

// 阳光政务-互动交流-意见征集
export function GetSuggestion (page = 1) {
  let url = getCodeUrl('suggestion')

  let data = {
    page: page,
    limit: 10
  }

  return ajaxGet(url, data)
}

// 阳光政务-互动交流-网上调查列表
export function getResearchList (page = 1) {
  let url = getCodeUrl('onlineSurvey')

  let data = {
    page: page,
    limit: 10,
    columnId: 97
  }

  return ajaxGet(url, data)
}

// 阳光政务-互动交流-意见征集
export function SubmitSuggestion (obj) {
  let url = getCodeUrl('submitMessage')

  return ajaxPost(url, obj);
}

// 阳光政务-获取通知公告列表
export function getNoticeList (page = 1) {
  let url = getCodeUrl('notice')

  let data = {
    page: page,
    limit: 20,
    columnId: 61
  }

  return ajaxGet(url, data)
}

// 阳光政务-获取气象新闻列表
export function getAtmosNewsList (page = 1) {
  let url = getCodeUrl('news')

  let data = {
    page: page,
    limit: 20,
    columnId: 62
  }

  return ajaxGet(url, data)
}

// 阳光政务-党风廉政意见箱-提交内容
export function SubmitContent (obj) {
  let url = getCodeUrl('submitContent')

  let data = {
    ...obj
  }

  return ajaxPost(url, data);
}

// 气象科普-获取气象科普详情
export function getScienceList (page = 1) {
  let url = getCodeUrl('polularScience')

  let data = {
    page: page,
    limit: 5,
    columnId: 65
  }

  return ajaxGet(url, data)
}

// 防雷减灾-在线办事
export function onlineWork () {
  let url = getCodeUrl('onlineWork')

  let data = {
    columnId: 67
  }

  return ajaxGet(url, data)
}

// 刷新浏览数
export function refreshNum (id) {
  let url = `http://10.0.1.184:8080/mpsp/web/article/browse/${id}`

  let data = {}

  return ajaxGet(url, data)
}

// 龙卷研究-机构简介
export function GetTornado () {
  let url = getCodeUrl('organizationSynopsis')

  let data = {
    columnId: 22
  }

  return ajaxGet(url, data)
}

// 龙卷研究-科普资讯
export function getNewsList (page = 1) {
  let url = getCodeUrl('scienceInformation')

  let data = {
    page: page,
    limit: 5,
    columnId: 68
  }

  return ajaxGet(url, data)
}
