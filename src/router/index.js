import Vue from 'vue'
import hook from './hook'
import Router from 'vue-router'
console.log(window.apps)

console.log(window.apps.app2._router.options.routes)

// import menu from './menu'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      title: '首页',
      name: 'Home',
      component: () => import('../views/ViewHome.vue')
    },
    ...window.apps.app2._router.options.routes
  ]
})

for (let h in hook) router[h](hook[h])

export default router
