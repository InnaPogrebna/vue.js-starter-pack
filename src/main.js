// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Autorization from './components/Autorization'
import Calendly from './components/Calendly'

const routes = [
	{ path: '/', component: Autorization },
  { path: '/calendly', component: Calendly }
]

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  base: process.env.BASE_URL,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

