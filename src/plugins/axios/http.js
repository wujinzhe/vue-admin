export default {
  install (Vue, options) {
    Vue.prototype.$Http = options.apiList
  }
}
