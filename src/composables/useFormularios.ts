import { ref } from 'vue';
import axios from 'axios';
import type { Formulario } from '../types/auth';
import { config } from '../config/env';

const API_BASE_URL = config.API_BASE_URL;

export function useFormularios() {
  const formularios = ref<Formulario[]>([]);
  const isLoading = ref(false);
  const error = ref<string>('');

  const fetchFormularios = async () => {
    try {
      isLoading.value = true;
      error.value = '';
      
      const response = await axios.get(`${API_BASE_URL}/formulario`);
      
      if (response.data.success) {
        formularios.value = response.data.data;
      } else {
        error.value = response.data.message || 'Error al obtener formularios';
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al conectar con el servidor';
      console.error('Error fetching formularios:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    formularios,
    isLoading,
    error,
    fetchFormularios
  };
} 