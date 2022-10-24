import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: {
      employeesStore: [],
      localStorage: {}
    }
  },
  mutations: {
    setLocalStorage(state) {
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state.data, JSON.parse(localStorage.getItem('store')))
        );
      }
    },

    setEmployees(state, payload) {
      state.data.employeesStore = payload;
      state.data.localStorage.employeesStore = value
      localStorage.setItem('formData', JSON.stringify(state.data.localStorage))
      console.log(state.data.employeesStore)
    },
  },
  actions: {},
  getters: {
  },
});


export default store;
