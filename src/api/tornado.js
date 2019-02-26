import { ajaxGet, ajaxPost } from './axios'

// 龙卷研究
export function GetTornado () {
  let url = 'mpsp/web/article/select'

  let data = {
    columnId: 22
  }

  return ajaxGet(url, data)
}

// 阳光政务-互动交流-意见征集
export function GetSuggestion (page = 1) {
  let url = 'mpsp/web/opinion/messageBoard'

  let data = {
    page: page,
    limit: 10
  }

  return ajaxGet(url, data)
}

// 阳光政务-互动交流-意见征集
export function SubmitSuggestion (obj) {
  let url = 'mpsp/web/opinion/submitMessage'

  return ajaxPost(url, obj);
}

// 阳光政务-党风廉政意见箱-提交内容
export function SubmitContent (obj) {
  let url = 'mpsp/web/governmentOpinion/submitContent'

  return ajaxPost(url, obj);
}
