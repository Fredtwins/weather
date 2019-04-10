import axios from 'axios'
import * as api from 'api/config'

export default {
  getInitData(context) {
    axios.get(api.request_init).then(res => {
      // console.log(api)
      // console.log(res)
      if (res.data && res.data.data) {
        const data = res.data.data
        const { columns, navs, friendlyLinks, website } = data
        const childrenList = {}
        const navObj = {}
        const navList = []
        // 底部友情链接
        const footerList = []
        for (let nav of navs) {
          let { parentId, id } = nav
          if (parentId == 71) {
            navObj[id] = nav
            navList.push(nav)
          } else {
            !childrenList[parentId] && (childrenList[parentId] = [])
            childrenList[parentId].push(nav)
          }
        }
        for (const key in childrenList) {
          navObj[key] && (navObj[key].children = childrenList[key])
        }
        for (let nav of navs) {
          if (nav.parentId != 0 && navObj[nav.parentId]) {
            let parentName = navObj[nav.parentId].alias
            let name = nav.alias
            if (context.state.iconData[parentName]) {
              let iconData = context.state.iconData[parentName][name]
              nav.icon = iconData.icon
              nav.iconCurrent = iconData.iconCurrent
            }
          }
        }
        context.commit('setNavList', { navList, website })
      }
    })
  }
}
