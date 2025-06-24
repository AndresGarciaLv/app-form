<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// Estado para mostrar/ocultar menú en móvil
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Ocultar header al hacer scroll hacia abajo (opcional)
const isHeaderHidden = ref(false)
const lastScrollTop = ref(0)

function handleScroll() {
  const st = window.pageYOffset || document.documentElement.scrollTop
  isHeaderHidden.value = st > lastScrollTop.value && st > 300
  lastScrollTop.value = st <= 0 ? 0 : st
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    :class="[
      'fixed top-0 w-full z-50 transition-transform duration-300',
      isHeaderHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div
      class="max-w-[1200px] mt-5 mx-auto px-6 py-4 flex items-center justify-between border border-gray-300 rounded-full bg-white shadow-md"
    >
      <!-- Logo e Identidad -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-blue-700 font-bold text-xl"
      >
        <span>AppForm</span>
      </RouterLink>

      <!-- Menú desktop -->
      <nav class="hidden md:flex space-x-8 text-gray-700 font-medium">
        <RouterLink
          :to="{ name: 'home' }"
          class="hover:text-blue-600 transition-colors"
        >
          Inicio
        </RouterLink>
        <RouterLink
          :to="{ name: 'contact' }"
          class="hover:text-blue-600 transition-colors"
        >
          Contacto
        </RouterLink>
      </nav>

      <!-- Botón hamburguesa en móvil -->
      <button @click="toggleMenu" class="md:hidden text-blue-700">
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Menú móvil desplegable -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white px-6 py-4 shadow">
        <nav class="flex flex-col space-y-2 text-blue-700">
          <RouterLink
            to="/"
            class="hover:text-blue-600 transition-colors"
            @click="isMenuOpen = false"
          >
            Inicio
          </RouterLink>
          <RouterLink
            to="/contact"
            class="hover:text-blue-600 transition-colors"
            @click="isMenuOpen = false"
          >
            Contacto
          </RouterLink>
        </nav>
      </div>
    </transition>
  </div>
</template>
