import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(router) // 🔴 Esto es obligatorio
app.mount('#app')
