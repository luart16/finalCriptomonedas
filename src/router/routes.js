import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import NuevaCompraView from '@/views/NuevaCompraView.vue'
import LoginView from '@/views/HomeView.vue' // Verifica si este es el login correcto
import { useUserStore } from '@/store/userStore'

const routes = [
  {
    path: '/',
    redirect: () => {
      const userStore = useUserStore()
      return userStore.userId ? '/home' : '/login'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/nueva-compra',
    name: 'nueva-compra',
    component: NuevaCompraView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

export default routes
