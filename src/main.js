import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
// import store from '../store';

Vue.use(VueRouter)

import Autorization from './components/Autorization'
import Calendly from './components/Calendly'

const routes = [
  {
    path: "/authorization",
    name: "Autorization",
    component: Autorization,
  },
  {
    path: "/calendly",
    name: "Calendly",
    component: Calendly,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
.$mount('#app')
