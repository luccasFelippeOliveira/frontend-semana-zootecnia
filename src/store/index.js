import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isAuthorized: false
  },
  mutations: {},
  actions: {
    login ({commit}, payload) {
      // Set user here.
    }
  },
  getters: {}
})
