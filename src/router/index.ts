import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactoView from '../views/ContactoView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactoView },
  { path: '/login', name: 'login', component: LoginView },
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, isAdmin, initAuth } = useAuth()
  
  initAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if (to.meta.requiresAdmin && !isAdmin.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
