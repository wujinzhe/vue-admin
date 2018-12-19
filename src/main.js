import Vue from 'vue'
import router from './router'
import App from './App'
import './theme/common.scss'
import './theme/default/variables.scss'
import ElementUI from 'element-ui'
import http from '@/plugins/axios/http'

Vue.use(ElementUI)
Vue.use(http)

Vue.config.errorHandler = function (err, vm, info) {
  console.log('vue error', err)
  console.log(vm)
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
}

window.addEventListener('unhandledrejection', event => {
  console.log('window 全局获取', event.reason) // 打印"Hello, Fundebug!"
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
