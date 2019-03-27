/**
 * Created by Administrator on 2019/3/25.
 */
import { getLocalStorage } from 'common/js/dom'

export function getCodeUrl (code) {
  let apis = getLocalStorage('APIS')
  let data = {}
  if (apis.length > 0) {
    data = apis.find((item) => item.code === code)
  }
  return data.url
}
