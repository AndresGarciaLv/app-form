<script setup lang="ts">
import Header from '../components/Header.vue'
</script>

<template>
   <Header />
  <section class="min-h-screen flex items-center justify-center bg-[var(--body-bg)] text-[var(--body-text)] px-5 py-16">
    <div class="w-full max-w-2xl bg-white light:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Contáctanos</h2>

      <!-- Success message -->
      <div v-if="showSuccess"
        class="mb-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-lg shadow-sm animate-fade-in">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-medium">¡Mensaje enviado exitosamente!</p>
              <p class="text-sm mt-1">Nos pondremos en contacto contigo pronto.</p>
            </div>
          </div>
          <button @click="showSuccess = false" class="text-green-500 hover:text-green-700">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="error"
        class="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg shadow-sm animate-fade-in">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-medium">Error al enviar el mensaje</p>
              <p class="text-sm mt-1">{{ error }}</p>
            </div>
          </div>
          <button @click="error = ''" class="text-red-500 hover:text-red-700">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- Nombre completo -->
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Nombre completo</label>
          <input id="name" v-model="formData.nombreCompleto" type="text" placeholder="Juan Pérez" required
            :disabled="isLoading"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed" />
        </div>

        <!-- Correo -->
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Correo electrónico</label>
          <input id="email" v-model="formData.correo" type="email" placeholder="ejemplo@correo.com" required
            :disabled="isLoading"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed" />
        </div>

        <!-- Teléfono -->
        <div>
          <label for="phone" class="block text-sm font-medium mb-1">Teléfono</label>
          <input id="phone" v-model="formData.telefono" type="tel" placeholder="55 1234 5678" required
            :disabled="isLoading"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed" />
        </div>

        <!-- Mensaje -->
        <div>
          <label for="message" class="block text-sm font-medium mb-1">Mensaje</label>
          <textarea id="message" v-model="formData.mensaje" rows="4" placeholder="Escribe tu mensaje" required
            :disabled="isLoading"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"></textarea>
        </div>

        <!-- Botón enviar -->
        <button type="submit" :disabled="isLoading || !isFormValid"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span v-if="isLoading">Enviando mensaje...</span>
          <span v-else>Enviar mensaje</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// Reactive form data
const formData = reactive({
  nombreCompleto: '',
  correo: '',
  telefono: '',
  mensaje: ''
})

// State management
const isLoading = ref(false)
const showSuccess = ref(false)
const error = ref('')

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return formData.nombreCompleto.trim() !== '' &&
    formData.correo.trim() !== '' &&
    formData.telefono.trim() !== '' &&
    formData.mensaje.trim() !== ''
})

// Auto-dismiss success message after 5 seconds
watch(showSuccess, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  }
})

// Auto-dismiss error message after 8 seconds
watch(error, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      error.value = ''
    }, 8000)
  }
})

// Form submission handler
const submitForm = async () => {
  // Prevent multiple submissions
  if (isLoading.value) {
    return
  }

  // Clear previous messages
  error.value = ''
  showSuccess.value = false

  isLoading.value = true

  try {
    const response = await fetch('http://localhost:3000/api/formulario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      showSuccess.value = true
      // Reset form
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
    } else {
      const errorData = await response.json()
      error.value = errorData.message || 'Error al enviar el formulario. Por favor, intenta nuevamente.'
    }
  } catch (err) {
    error.value = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.'
    console.error('Error submitting form:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
