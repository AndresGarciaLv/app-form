<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo/Título -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="h-8 w-auto" />
            <span class="text-xl font-bold text-gray-900">Niux Leads</span>
          </router-link>
        </div>

        <!-- Navegación -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/' }"
          >
            Inicio
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/contact' }"
          >
            Contacto
          </router-link>
        </nav>

        <!-- Botones de autenticación -->
        <div class="flex items-center space-x-4">
          <!-- Usuario no autenticado -->
          <div v-if="!isAuthenticated" class="flex items-center space-x-3">
            <router-link
              to="/login"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Iniciar Sesión
            </router-link>
          </div>

          <!-- Usuario autenticado -->
          <div v-else class="flex items-center space-x-4">
            <!-- Botón Dashboard para admin -->
            <router-link
              v-if="isAdmin"
              to="/dashboard"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Dashboard</span>
            </router-link>

            <!-- Dropdown de usuario -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                                 <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                   <span class="text-blue-600 font-medium text-xs">
                     {{ user?.nombre?.charAt(0)?.toUpperCase() || 'U' }}
                   </span>
                 </div>
                <span class="hidden sm:block">{{ user?.nombre }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                v-if="showUserMenu"
                v-click-outside="() => showUserMenu = false"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              >
                <div class="px-4 py-2 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-900">{{ user?.nombre }}</p>
                  <p class="text-xs text-gray-500">{{ user?.email }}</p>
                  <span class="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {{ user?.role }}
                  </span>
                </div>
                
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Menú móvil -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menú móvil -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 pt-4 pb-3">
        <nav class="space-y-1">
          <router-link
            to="/"
            @click="showMobileMenu = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/' }"
          >
            Inicio
          </router-link>
          <router-link
            to="/contact"
            @click="showMobileMenu = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/contact' }"
          >
            Contacto
          </router-link>
          
          <div v-if="!isAuthenticated" class="border-t border-gray-200 pt-3 mt-3">
            <router-link
              to="/login"
              @click="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
            >
              Iniciar Sesión
            </router-link>
          </div>

          <div v-else class="border-t border-gray-200 pt-3 mt-3">
            <router-link
              v-if="isAdmin"
              to="/dashboard"
              @click="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
            >
              Dashboard
            </router-link>
            <button
              @click="handleLogout"
              class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50 transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

interface Props {
  logoUrl?: string;
}

defineProps<Props>();

const router = useRouter();
const { user, isAuthenticated, isAdmin, logout } = useAuth();

const showUserMenu = ref(false);
const showMobileMenu = ref(false);

const handleLogout = () => {
  logout();
  showUserMenu.value = false;
  showMobileMenu.value = false;
  router.push('/');
};

// Directiva click-outside simple
const vClickOutside = {
  beforeMount(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
</script> 