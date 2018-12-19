import Vue from 'vue'
import router from './router'
import App from './App'
import './theme/common.scss'
import './theme/default/variables.scss'
import ElementUI from 'element-ui'
import http from '@/plugins/axios/http'
import apiList from '@/plugins/axios/api'

Vue.use(ElementUI)
Vue.use(http, {
  apiList
})

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */
window.a = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />'
})
