import {RouteConfig} from "vue-router"

const routes: Array<RouteConfig> = [
    {path: '/', name: 'home', component: () => import('@/js/views/home/Home.vue')},
    {path: '/catalog', name: 'catalog', component: () => import('@/js/views/Catalog/Catalog.vue')},
    {path: '/view-object/:category/:id', name: 'viewObject', component: () => import('@/js/views/ViewObject/ViewObject.vue')}
]

export default routes