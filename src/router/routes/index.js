import compraRoute from '../routes/CompraRoute.js'

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },
    compraRoute,
    {
        path: '/nueva-compra',
        name: 'nueva-compra',
        component: () => import('@/views/NuevaCompraView.vue')
    }
]
