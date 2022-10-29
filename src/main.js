import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './store';

Vue.use(VueRouter)
import Registration from './components/Registration'
import Autorization from './components/Autorization'
import Calendly from './components/Calendly'

const routes = [
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
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

// Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
  .$mount('#app')
