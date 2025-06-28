<template>
  <div class="recaptcha-container">
    <div 
      ref="recaptchaWidget"
      class="g-recaptcha"
      :data-sitekey="siteKey"
      data-theme="light"
      data-size="normal"
    ></div>
    <div v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  siteKey: string
}

interface Emits {
  (e: 'verified', token: string): void
  (e: 'error', error: string): void
  (e: 'expired'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const error = ref('')
const recaptchaWidget = ref<HTMLElement>()
const widgetId = ref<number | null>(null)

const checkRecaptchaLoaded = (): boolean => {
  return typeof window !== 'undefined' && 'grecaptcha' in window
}

const getResponse = (): string => {
  if (!checkRecaptchaLoaded()) {
    throw new Error('reCAPTCHA no está cargado')
  }
  
  // @ts-ignore 
  return window.grecaptcha.getResponse(widgetId.value)
}

const reset = (): void => {
  if (!checkRecaptchaLoaded()) {
    return
  }
  // @ts-ignore 
  window.grecaptcha.reset(widgetId.value)
}

const renderWidget = (): void => {
  if (!checkRecaptchaLoaded() || !recaptchaWidget.value) {
    return
  }

  try {
    // @ts-ignore 
    widgetId.value = window.grecaptcha.render(recaptchaWidget.value, {
      sitekey: props.siteKey,
      theme: 'light',
      size: 'normal',
      callback: (token: string) => {
        error.value = ''
        emit('verified', token)
      },
      'expired-callback': () => {
        emit('expired')
      },
      'error-callback': () => {
        error.value = 'Error en reCAPTCHA. Por favor, intenta nuevamente.'
        emit('error', 'Error en reCAPTCHA')
      }
    } as any)
  } catch (err: any) {
    error.value = 'Error al cargar reCAPTCHA: ' + err.message
    emit('error', err.message)
  }
}

defineExpose({
  getResponse,
  reset,
  isReady: checkRecaptchaLoaded
})

onMounted(() => {
  const checkLoaded = () => {
    if (checkRecaptchaLoaded()) {
      renderWidget()
    } else {
      setTimeout(checkLoaded, 100)
    }
  }
  checkLoaded()
})

onUnmounted(() => {
  if (widgetId.value !== null && checkRecaptchaLoaded()) {
    try {
      // @ts-ignore 
      window.grecaptcha.reset(widgetId.value)
    } catch (err) {
      console.warn('Error cleaning up reCAPTCHA:', err)
    }
  }
})
</script>

<style scoped>
.recaptcha-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style> 