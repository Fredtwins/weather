export default {
  setNavList(state,data){
    // console.log(state)
    // console.log(data)
    state.weatherList = data.navs
    state.catalog = data.navList
    state.website = data.website
    state.status = true
  }
}
