import Vue from 'vue'
import hook from './hook'
import Router from 'vue-router'
const apps = window.apps
console.log('注册的应用', window.apps)
const routeList = []

for (let app in apps) {
  console.log(app)
  routeList.push(...apps[app].router.options.routes)
}

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      title: '首页',
      name: 'Home',
      component: () => import('../views/ViewHome.vue')
    },
    ...routeList

  ]
})

for (let h in hook) router[h](hook[h])

export default router
