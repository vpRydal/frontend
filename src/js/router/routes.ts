import {RouteConfig} from "vue-router"

const routes: Array<RouteConfig> = [
    {path: '/', name: 'home', component: () => import('@/js/views/Home/Home.vue')},
    {path: '/catalog', name: 'catalog', component: () => import('@/js/views/Catalog/Catalog.vue')},
    {path: '/view-realty/:category/:id', name: 'viewRealty', component: () => import('@/js/views/ViewRealty/ViewRealty.vue')}
]

export default routes
