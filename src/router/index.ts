import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactoView from '../views/ContactoView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactoView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
