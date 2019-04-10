export const User = state => state.User

export const Role = state => state.Role

export const RouterFrom = state => state.RouterFrom

export const Institution = state => state.Institution

export const FormName = state => state.form_name

export const ID = state => state.ID

export const DepartReportInfo = state => state.DepartReportInfo

export const IsShow = state => state.IsShow

export const DepReportList = state => state.DepReportList

export const SHUIKU = state => state.SHUIKU

export const ifCommand = state => state.ifCommand

export const responseModule = state => state.responseModule

export const RESJUMPPATH = state => state.RESJUMPPATH

export const responseIng = state => {
  let arr = []

  state.responseModule.map(items => {
    items.map(item => {
      if (item.isChecked) {
        arr.push(item)
      }
    })
  })

  return arr
}

export const NOTICEID = state => state.NOTICEID

export const MESSAGEID = state => state.MESSAGEID

export const STATUS = state => state.STATUS

export const STTUS = state => state.STTUS

export const TIMEOUT = state => state.TIMEOUT

export const CANVASTEN = state => state.CANVASTEN

export const CANVASFIVE = state => state.CANVASFIVE
