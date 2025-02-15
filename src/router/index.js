import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import { useUserStore } from '@/store/userStore'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.userId) {
    next('/login')
  } else if (to.path === '/login' && userStore.userId) {
    next('/home')
  } else {
    next()
  }
})

export default router
