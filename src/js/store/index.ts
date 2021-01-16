import Vue from 'vue'
import Vuex from 'vuex'
import Common from './common'
import CatalogQueryParams from "@/js/store/catalogQueryParams";


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
    common: Common,
    queryParams: CatalogQueryParams
  }
})
