import Vue from 'vue'
import App from './js/App.vue'
import router from './js/router'
import store from './js/store'
import '@/stylus/index.styl'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Vue2TouchEvents from 'vue2-touch-events'
import VueMeta from 'vue-meta'
import './js/directives/index'


Vue.use(VueMeta)
Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false;

Vue.component('ibg', () => import('@/js/components/common/Ibg.vue'));
store.dispatch('init')


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
