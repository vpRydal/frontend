import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import catalog from './modules/catalog'
import queryParams from "@/js/store/modules/catalogQueryParams";
import router from "@/js/router";


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

      router.onReady(() => {
        this.commit('queryParams/init')
      })
    }
  },
  modules: {
    common,
    queryParams,
    catalog
  }
})
