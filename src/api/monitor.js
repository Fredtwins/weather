import { ajaxGet } from './axios'

// 雷达图
export function GetRaBar () {
  let url = 'mpsp/web/SRadar/list'

  let data = {}

  return ajaxGet(url, data)
}

// 卫星云图
export function GetCloudList () {
  let url = 'mpsp/web/cloud/list'

  let data = {}

  return ajaxGet(url, data)
}

// 底部友情链接
export function Getfirend () {
  let url = 'http://10.0.1.184:8080/mpsp/web/website/content/9'

  let data = {}

  return ajaxGet(url, data)
}
