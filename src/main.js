// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// import router from './router/indexinfo';
import router from './router'
import store from './store'
// import axios from 'axios'
import iView from 'iview'
import VideoPlayer from 'vue-video-player'
import 'swiper/dist/css/swiper.css';
// import vueAMap from 'vue-amap'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import 'iview/dist/styles/iview.css'
import 'common/scss/reset.scss'
import 'common/scss/iconfont.scss'
import 'common/scss/loading.scss'
import 'common/scss/media.scss'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ol from 'openlayers'
import 'openlayers/dist/ol.css'
import 'common/scss/index.scss'
import 'swiper/dist/css/swiper.css';

Vue.config.productionTip = false
Vue.use(iView)
// Vue.use(vueAMap)
Vue.use(VideoPlayer)
Vue.use(vueQuillEditor)
Vue.prototype.$ol = ol
Vue.ol = ol

// vueAMap.initAMapApiLoader({
//   key: 'dfaee2d616de7ddd29f6b50657fa7bd6',
//   plugin: ['Geocoder', 'MouseTool', 'MapType', 'DistrictSearch']
// })

Vue.filter('datefml', (input) => {
  var date = new Date()
  var y = date.getFullYear()
  var m = date.getMonth()
  var d = date.getDate()
  return y + '-' + m + '-' + d
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
