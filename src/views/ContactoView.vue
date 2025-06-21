<template>
  <section class="min-h-screen flex items-center justify-center bg-[var(--body-bg)] text-[var(--body-text)] px-5 py-16">
    <div class="w-full max-w-2xl bg-white light:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Contáctanos</h2>
      <form class="space-y-5">
        <!-- Nombre completo -->
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Nombre completo</label>
          <input
            id="name"
            type="text"
            placeholder="Juan Pérez"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Correo -->
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Teléfono -->
        <div>
          <label for="phone" class="block text-sm font-medium mb-1">Teléfono</label>
          <input
            id="phone"
            type="tel"
            placeholder="55 1234 5678"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Mensaje -->
        <div>
          <label for="message" class="block text-sm font-medium mb-1">Mensaje</label>
          <textarea
            id="message"
            rows="4"
            placeholder="Escribe tu mensaje"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Botón enviar -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  </section>
</template>
