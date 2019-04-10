import { ajaxGet } from './axios'
<<<<<<< HEAD
import { getCodeUrl } from 'common/js/getCodeUrl'

// 首页，获取网站内容（接口地址，顶部轮播图，漂浮广告，友情链接，版权信息）
export function getContent () {
  let url = 'http://10.0.1.184:8080/mpsp/web/website/content/9'

  let data = {}

  return ajaxGet(url, data)
}

// 首页-站内搜索
export function searchAll (page = 1, title = '') {
  let url = 'http://10.0.1.184:8080/mpsp/web/article/list'

  let data = {
    page: page,
    limit: 10,
    title: title
  }

  return ajaxGet(url, data)
}

// 首页，顶部向上滚动通知
export function getRecommend () {
  let url = 'http://10.0.1.184:8080/mpsp/web/article/select'

  let data = {
    recommend: 1
=======

// 首页-综合
export function Gethomemore (obj) {
  let url = 'mpsp/web/index/synthesis'

  let data = {
    ...obj
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5
  }

  return ajaxGet(url, data)
}

<<<<<<< HEAD
// 首页-综合本地预报
export function Gethomemore () {
  let url = getCodeUrl('localForecast')

  let data = {}

  return ajaxGet(url, data)
}

// 首页-十天天气预报图
export function Getshare10 (obj) {
  let url = getCodeUrl('10dForecast')
=======
// 首页-十天天气预报图
export function Getshare10 (obj) {
  let url = 'mpsp/web/folo10dLastShare/list'
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 首页-十五天天气预报
export function Getshare15 (obj) {
<<<<<<< HEAD
  let url = getCodeUrl('15dForecast')
=======
  let url = 'mpsp/web/folo15dLastShare/list'
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}
<<<<<<< HEAD

// 首页，本地交通预报图片
export function GetTracfficImg () {
  let url = getCodeUrl('roadTraffic')

  let data = {
    columnId: 31
  }

  return ajaxGet(url, data)
}

// 首页，佛山景点预报轮播图
export function GetImgList () {
  let url = getCodeUrl('scenicSpot')

  let data = {}

  return ajaxGet(url, data)
}

// 首页，获取气象科普的列表
export function GetScenice (page = 1) {
  let url = getCodeUrl('polularScience')

  let data = {
    page: page,
    limit: 16,
    columnId: 65,
    indexDisplay: 1
  }

  return ajaxGet(url, data)
}
=======
>>>>>>> b9eea966b6c640adea089e0f12d3a4e841b641c5
