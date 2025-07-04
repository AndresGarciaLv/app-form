<template>
   <AuthHeader />
  <section class="min-h-screen flex items-center justify-center bg-[var(--body-bg)] text-[var(--body-text)] px-5 py-16">
    <div class="w-full max-w-2xl bg-white light:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Contáctanos</h2>

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

        <!-- Términos y condiciones -->
        <div class="flex items-start space-x-3">
          <input 
            id="terms" 
            v-model="formData.aceptaTerminos" 
            type="checkbox" 
            :disabled="isLoading"
            class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100 disabled:cursor-not-allowed" 
          />
          <label for="terms" class="text-sm text-gray-700 leading-relaxed">
            Acepto los 
            <a href="#" @click.prevent="showTermsModal = true" class="text-blue-600 hover:text-blue-800 underline">
              términos y condiciones
            </a> 
            y la 
            <a href="#" @click.prevent="showPrivacyModal = true" class="text-blue-600 hover:text-blue-800 underline">
              política de privacidad
            </a>
            <span class="text-red-500">*</span>
          </label>
        </div>

        <ReCaptcha 
          ref="recaptchaRef"
          :site-key="recaptchaSiteKey"
          @verified="onRecaptchaVerified"
          @error="onRecaptchaError"
          @expired="onRecaptchaExpired"
        />

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

  <div v-if="showTermsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Términos y Condiciones</h3>
          <button @click="showTermsModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="prose prose-sm max-w-none">
          <h4>1. Aceptación de los Términos</h4>
          <p>Al utilizar este formulario de contacto, usted acepta estar sujeto a estos términos y condiciones de uso.</p>
          
          <h4>2. Uso del Servicio</h4>
          <p>Este formulario está destinado únicamente para contactos legítimos y comerciales. Se prohíbe el uso para spam o actividades fraudulentas.</p>
          
          <h4>3. Información Proporcionada</h4>
          <p>Usted es responsable de proporcionar información precisa y completa. Nos reservamos el derecho de verificar la información proporcionada.</p>
          
          <h4>4. Privacidad</h4>
          <p>Su información será tratada de acuerdo con nuestra política de privacidad. Al enviar el formulario, usted consiente el procesamiento de sus datos personales.</p>
          
          <h4>5. Limitaciones</h4>
          <p>No garantizamos que el servicio esté disponible en todo momento. Nos reservamos el derecho de modificar o discontinuar el servicio sin previo aviso.</p>
          
          <h4>6. Responsabilidad</h4>
          <p>No seremos responsables por daños indirectos, incidentales o consecuentes que puedan resultar del uso de este servicio.</p>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="showTermsModal = false" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Entendido
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showPrivacyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Política de Privacidad</h3>
          <button @click="showPrivacyModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="prose prose-sm max-w-none">
          <h4>1. Recopilación de Información</h4>
          <p>Recopilamos la información que usted proporciona voluntariamente a través de este formulario de contacto, incluyendo nombre, correo electrónico, teléfono y mensaje.</p>
          
          <h4>2. Uso de la Información</h4>
          <p>Utilizamos su información para:</p>
          <ul>
            <li>Responder a sus consultas y solicitudes</li>
            <li>Proporcionar servicios y soporte al cliente</li>
            <li>Mejorar nuestros servicios</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>
          
          <h4>3. Protección de Datos</h4>
          <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          
          <h4>4. Compartir Información</h4>
          <p>No vendemos, alquilamos o compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cuando lo requiera la ley.</p>
          
          <h4>5. Sus Derechos</h4>
          <p>Usted tiene derecho a:</p>
          <ul>
            <li>Acceder a su información personal</li>
            <li>Corregir información inexacta</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Oponerse al procesamiento de sus datos</li>
          </ul>
          
          <h4>6. Retención de Datos</h4>
          <p>Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos para los que fue recopilada o según lo requiera la ley.</p>
          
          <h4>7. Contacto</h4>
          <p>Si tiene preguntas sobre esta política de privacidad, puede contactarnos a través de este mismo formulario.</p>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="showPrivacyModal = false" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Entendido
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import AuthHeader from '../components/AuthHeader.vue'
import ReCaptcha from '../components/ReCaptcha.vue'
import { config } from '../config/env';

const API_BASE_URL = config.API_BASE_URL;
// import RecaptchaTest from '../components/RecaptchaTest.vue'

const recaptchaSiteKey = '6LdBk2wrAAAAAIHk39O0LNm7EYsgl0f5Naptxor3' 
const recaptchaRef = ref(null)

const formData = reactive({
  nombreCompleto: '',
  correo: '',
  telefono: '',
  mensaje: '',
  aceptaTerminos: false
})

const isLoading = ref(false)
const showSuccess = ref(false)
const error = ref('')
const recaptchaToken = ref('')
const showTermsModal = ref(false)
const showPrivacyModal = ref(false)

const isFormValid = computed(() => {
  return formData.nombreCompleto.trim() !== '' &&
    formData.correo.trim() !== '' &&
    formData.telefono.trim() !== '' &&
    formData.mensaje.trim() !== '' &&
    formData.aceptaTerminos
})

watch(showSuccess, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  }
})

watch(error, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      error.value = ''
    }, 8000)
  }
})

const onRecaptchaVerified = (token) => {
  recaptchaToken.value = token
}

const onRecaptchaError = (errorMessage) => {
  error.value = `Error de reCAPTCHA: ${errorMessage}`
}

const onRecaptchaExpired = () => {
  recaptchaToken.value = ''
  error.value = 'reCAPTCHA ha expirado. Por favor, verifica que no eres un robot e intenta nuevamente.'
}

const submitForm = async () => {
  if (isLoading.value) {
    return
  }

  error.value = ''
  showSuccess.value = false

  try {
    if (recaptchaRef.value) {
      const token = recaptchaRef.value.getResponse()
      if (!token) {
        error.value = 'Por favor, verifica que no eres un robot antes de enviar el formulario.'
        return
      }
      recaptchaToken.value = token
    }
  } catch (err) {
    error.value = `Error de reCAPTCHA: ${err.message}`
    return
  }

  isLoading.value = true

  try {
    const response = await fetch(''+API_BASE_URL+'/formulario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        recaptchaToken: recaptchaToken.value
      })
    })

    if (response.ok) {
      showSuccess.value = true
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      formData.aceptaTerminos = false
      recaptchaToken.value = ''
      if (recaptchaRef.value) {
        recaptchaRef.value.reset()
      }
    } else {
      const errorData = await response.json()
      error.value = errorData.message || 'Error al enviar el formulario. Por favor, intenta nuevamente.'
      if (recaptchaRef.value) {
        recaptchaRef.value.reset()
      }
    }
  } catch (err) {
    error.value = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.'
    console.error('Error submitting form:', err)
    if (recaptchaRef.value) {
      recaptchaRef.value.reset()
    }
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
