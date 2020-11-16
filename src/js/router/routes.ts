import {RouteConfig} from "vue-router"

const routes: Array<RouteConfig> = [
    {path: '/', name: 'home', component: () => import('@/js/views/home/Home.vue')}
]

export default routes