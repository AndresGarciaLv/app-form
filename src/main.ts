import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { useAuth } from './composables/useAuth'

const app = createApp(App)

// Inicializar autenticación al arrancar la app
const { initAuth } = useAuth()
initAuth()

app.use(router).mount('#app')
