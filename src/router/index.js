import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/userStore'
import LoginForm from '../components/LoginComponent.vue'

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
      return userStore.userId ? '/about' : '/login' // 🔹 Cambia '/dashboard' por '/about' si ya existe
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

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
