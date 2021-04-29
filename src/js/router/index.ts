import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {Position} from "vue-router/types/router";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(from, to, savedPosition) {
    if (from.name === to.name) {
      return savedPosition
    }

    return {y: 0} as Position
  },
})

export default router
