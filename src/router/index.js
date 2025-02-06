import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/userStore'
import LoginForm from '../components/LoginForm.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/',
    redirect: () => {
      const userStore = useUserStore()
      return userStore.userId ? '/dashboard' : '/login'
    }
  }
  // Aquí puedes agregar más rutas protegidas
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.path !== '/login' && !userStore.userId) {
    next('/login')
  } else if (to.path === '/login' && userStore.userId) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
