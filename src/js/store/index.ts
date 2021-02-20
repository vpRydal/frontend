import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import catalog from './modules/catalog'
import queryParams from "@/js/store/modules/catalogQueryParams";


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
    common,
    queryParams,
    catalog
  }
})
