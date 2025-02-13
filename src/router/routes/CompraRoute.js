import NuevaCompraView from '@/views/NuevaCompraView.vue'

const routes = [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/about', component: () => import('@/views/AboutView.vue') },
    { path: '/nueva-compra', component: NuevaCompraView }
]

export default routes
