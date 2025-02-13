import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// Configuración global de navegación si la necesitas
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const userId = localStorage.getItem('userId')
        if (!userId) {
            next({ 
                name: 'login',
                query: { redirect: to.fullPath } 
            })
            return
        }
    }
    next()
})

export default router