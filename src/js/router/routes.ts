import {RouteConfig} from "vue-router"

const routes: Array<RouteConfig> = [
    {path: '/', name: 'home', component: () => import('@/js/views/home/Home.vue')},
    {path: '/catalog', name: 'catalog', component: () => import('@/js/views/Catalog/Catalog.vue')}
]

export default routes