import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    init():void {
      addEventListener('resize', () => {
        this.commit('common/setWindowWidth')
      })
      this.commit('common/setWindowWidth')
    }
  },
  modules: {
    common
  }
})
