import { createRouter, createWebHistory } from 'vue-router'
import ContactoView from '../views/ContactoView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/contact',
      name: 'contact',
      component: ContactoView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/contact'
    }
  ]
})

export default router
