import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, obj) {
    state.User = obj
  },
  [types.SET_ROLE] (state, roles) {
    // 过滤权限
    if (Array.isArray(roles)) {
      const data = {}
      const filterRole = (arr) => {
        arr.map(item => {
          data[item.id] = true
          if (item.children) {
            filterRole(item.children)
          }
        })
      }
      filterRole(roles)
      state.Role = data
    } else {
      state.Role = roles
    }
  },
  [types.SET_ROUTERFROM] (state, str) {
    state.RouterFrom = str
  },
  [types.SET_ISSHOW] (state, str) {
    state.IsShow = str
  },
  [types.SET_ID] (state, str) {
    state.ID = str
  },
  [types.SET_INSTITUTION] (state, arr) {
    state.Institution = arr
  },
  [types.SET_FORMNAME] (state, edg) {
    state.form_name = edg
  },
  [types.SET_DEPARTREPORTINFO] (state, obj) {
    state.DepartReportInfo = obj
  },
  [types.SET_DEPREPORTLIST] (state, ary) {
    state.DepartReportInfo = ary
  },
  [types.SET_SHUIKU] (state, ary) {
    state.SHUIKU = ary
  },
  [types.SET_IFCOMMAND] (state, bol) {
    state.ifCommand = bol
  },
  [types.SET_TIMEOUT] (state, str) {
    state.timeOut = str
  },
  [types.SET_NOTICEID] (state, str) {
    state.NOTICEID = str
  },
  [types.SET_MESSAGEID] (state, obj) {
    state.MESSAGEID = obj
  },
  [types.SET_STATUS] (state, bol) {
    state.STATUS = bol
  },
  [types.SET_STTUS] (state, bal) {
    state.STTUS = bal
  },
  [types.SET_RESJUMPPATH] (state, str) {
    state.RESJUMPPATH = str
  },
  [types.SET_CANVASTEN] (state, arr) {
    state.CANVASTEN = arr
  },
  [types.SET_CANVASFIVE] (state, arr) {
    state.CANVASFIVE = arr
  }
}

export default mutations
