<script setup lang="ts">
import Header from '../components/Header.vue'
</script>

<template>
  <Header />

  <main class="bg-white text-gray-800 transition-colors">
    <!-- Hero principal -->
    <section class="max-w-6xl px-6 py-20 mx-auto">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-12">
        <!-- Texto -->
        <div class="md:w-1/2">
          <h1 class="text-5xl font-bold leading-tight mb-6">
            <span class="block">Bienvenido a</span>
            <span class="block text-blue-600">AppForm</span>
            <span class="block">Tu punto de contacto confiable</span>
          </h1>

          <p class="text-lg text-gray-600 mb-8">
            Explora nuestras herramientas y conéctate fácilmente mediante nuestro formulario de contacto.
          </p>

          <RouterLink
            :to="{ name: 'contact' }"
            class="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Contáctanos
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>
        </div>

        <!-- Imagen -->
        <transition
          appear
          enter-active-class="transition-opacity duration-700"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="md:w-1/2">
            <div class="bg-gray-200 rounded-xl overflow-hidden">
              <img
                src="@/assets/img/home-hero.jpg"
                alt="Imagen de portada"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- Catálogo -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <!-- Texto -->
        <div class="md:w-1/2">
          <h2 class="text-4xl font-bold text-blue-700 mb-6">
            Explora Nuestro Catálogo
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            Descubre una colección completa de herramientas y recursos pensados para ti.
          </p>

          <ul class="space-y-3 text-gray-700 font-medium mb-8">
            <li class="flex items-center gap-2">
              <span class="text-green-600">✔</span> Acceso gratuito
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✔</span> No necesitas registrarte
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✔</span> Disponible 24/7
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✔</span> Ideal para todos los perfiles
            </li>
          </ul>

          <RouterLink
            to="/contact"
            class="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Ir al formulario
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>
        </div>

        <!-- Imagen -->
        <transition
          appear
          enter-active-class="transition-opacity duration-700"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="md:w-1/2">
            <div class="bg-gray-200 rounded-xl overflow-hidden">
              <img
                src="@/assets/img/home-biblioteca.jpg"
                alt="Biblioteca"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>
