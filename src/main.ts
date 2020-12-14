import Vue from 'vue'
import App from './js/App.vue'
import router from './js/router'
import store from './js/store'
import '@/stylus/index.styl'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import $ from "jquery";
import Vue2TouchEvents from 'vue2-touch-events'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false;

Vue.component('ibg', () => import('@/js/components/common/Ibg.vue'));


Vue.directive('scroll', {
  inserted: function (el, binding) {
    let coled = false;
    const f = function () {
      if (window.scrollY + window.innerHeight > $(el).position().top && !binding.value.breakPoint) {
        binding.value.handler.call();
        coled = true;
      }

      if (coled && (binding.value.once === undefined || binding.value.once))
          window.removeEventListener('scroll', f);
    };
    window.addEventListener('scroll', f);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
