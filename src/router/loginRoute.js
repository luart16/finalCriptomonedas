import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/userStore'
import LoginView from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: () => {
      const userStore = useUserStore()
      return userStore.userId ? '/home' : '/login'
    }
  }
 
]

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
