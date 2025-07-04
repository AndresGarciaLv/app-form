<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <!-- Logo/Título -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
        <p class="text-gray-600">Inicia sesión o crea una cuenta nueva</p>
      </div>

      <!-- Card principal -->
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <!-- Tabs -->
        <div class="flex bg-gray-50">
          <button
            @click="activeTab = 'login'"
            :class="[
              'flex-1 py-4 px-6 text-sm font-medium transition-all duration-200',
              activeTab === 'login'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Iniciar Sesión
          </button>
          <button
            @click="activeTab = 'register'"
            :class="[
              'flex-1 py-4 px-6 text-sm font-medium transition-all duration-200',
              activeTab === 'register'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Registrarse
          </button>
        </div>

        <!-- Contenido del formulario -->
        <div class="p-8">
          <!-- Mensajes de error/éxito -->
          <div v-if="message.text" 
            :class="[
              'mb-6 p-4 rounded-lg border-l-4',
              message.type === 'success' 
                ? 'bg-green-50 border-green-400 text-green-700' 
                : 'bg-red-50 border-red-400 text-red-700'
            ]"
          >
            <div class="flex items-center">
              <svg v-if="message.type === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ message.text }}</span>
            </div>
          </div>

          <!-- Formulario de Login -->
          <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="loginEmail" class="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="loginEmail"
                v-model="loginForm.email"
                type="email"
                required
                :disabled="isLoading"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label for="loginPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div class="relative">
                <input
                  id="loginPassword"
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :disabled="isLoading"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading || !loginForm.email || !loginForm.password"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
            </button>
          </form>

          <!-- Formulario de Registro -->
          <form v-else @submit.prevent="handleRegister" class="space-y-6">
            <div>
              <label for="registerName" class="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <input
                id="registerName"
                v-model="registerForm.nombre"
                type="text"
                required
                :disabled="isLoading"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label for="registerEmail" class="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="registerEmail"
                v-model="registerForm.email"
                type="email"
                required
                :disabled="isLoading"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label for="registerPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div class="relative">
                <input
                  id="registerPassword"
                  v-model="registerForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :disabled="isLoading"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Mínimo 6 caracteres, debe incluir mayúsculas, minúsculas y números
              </p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                :disabled="isLoading"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <p v-if="registerForm.password && registerForm.confirmPassword && registerForm.password !== registerForm.confirmPassword" 
                class="text-xs text-red-500 mt-1">
                Las contraseñas no coinciden
              </p>
            </div>

            <button
              type="submit"
              :disabled="isLoading || !isRegisterFormValid"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Link de vuelta -->
      <div class="text-center mt-6">
        <router-link 
          to="/" 
          class="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          ← Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import type { LoginCredentials, RegisterData } from '../types/auth';

const router = useRouter();
const { login, register, isLoading } = useAuth();

// Estado del componente
const activeTab = ref<'login' | 'register'>('login');
const showPassword = ref(false);
const message = ref<{ text: string; type: 'success' | 'error' }>({ text: '', type: 'success' });

// Formularios
const loginForm = ref<LoginCredentials>({
  email: '',
  password: ''
});

const registerForm = ref<RegisterData>({
  nombre: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// Validaciones
const isRegisterFormValid = computed(() => {
  return (
    registerForm.value.nombre &&
    registerForm.value.email &&
    registerForm.value.password &&
    registerForm.value.confirmPassword &&
    registerForm.value.password === registerForm.value.confirmPassword &&
    registerForm.value.password.length >= 6
  );
});

// Limpiar mensajes cuando se cambia de tab
const clearMessage = () => {
  message.value = { text: '', type: 'success' };
};

// Handlers
const handleLogin = async () => {
  clearMessage();
  
  const result = await login(loginForm.value);
  
  if (result.success) {
    message.value = { text: result.message, type: 'success' };
    // Redireccionar después del login exitoso
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  } else {
    message.value = { text: result.message, type: 'error' };
  }
};

const handleRegister = async () => {
  clearMessage();
  
  if (!isRegisterFormValid.value) {
    message.value = { text: 'Por favor completa todos los campos correctamente', type: 'error' };
    return;
  }
  
  const result = await register(registerForm.value);
  
  if (result.success) {
    message.value = { text: result.message, type: 'success' };
    // Redireccionar después del registro exitoso
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  } else {
    message.value = { text: result.message, type: 'error' };
  }
};
</script> 