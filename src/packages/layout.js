import Layout from '../components/TheAppLayout.vue'
export default Layout
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('Layout', Layout)
}
