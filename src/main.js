// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(Loading)
Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://typist.test/',
  timeout: 1000
})

Vue.filter('localTime', function (value) {
  let systemDate = new Date(value + ' UTC')
  let userDate = new Date()
  let diff = Math.floor((userDate - systemDate) / 1000)
  if (diff <= 1) { return 'just now' }
  if (diff < 20) { return diff + ' seconds ago' }
  if (diff < 40) { return 'half a minute ago' }
  if (diff < 60) { return 'less than a minute ago' }
  if (diff <= 90) { return 'one minute ago' }
  if (diff <= 3540) { return Math.round(diff / 60) + ' minutes ago' }
  if (diff <= 5400) { return '1 hour ago' }
  if (diff <= 86400) { return Math.round(diff / 3600) + ' hours ago' }
  if (diff <= 129600) { return '1 day ago' }
  if (diff < 604800) { return Math.round(diff / 86400) + ' days ago' }
  if (diff <= 777600) { return '1 week ago' }
  return systemDate.toDateString().toLocaleString()
})

Vue.filter('localTimeDetail', function (value) {
  return new Date(value + ' UTC').toLocaleString()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
