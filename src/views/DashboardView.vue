<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {{ user?.role }}
            </span>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              Bienvenido, {{ user?.nombre }}
            </span>
            <button
              @click="handleLogout"
              class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-sm min-h-screen">
        <nav class="p-6">
          <ul class="space-y-2">
            <li>
              <button
                @click="activeSection = 'leads'"
                :class="[
                  'w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200',
                  activeSection === 'leads'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Formularios ({{ formularios.length }})
              </button>
            </li>
            <li>
              <router-link
                to="/"
                class="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-50"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Ir al sitio web
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Content Area -->
      <main class="flex-1 p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Leads</p>
                <p class="text-3xl font-bold text-gray-900">{{ formularios.length }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m0-10V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h10a2 2 0 002-2V8"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Este Mes</p>
                <p class="text-3xl font-bold text-gray-900">{{ thisMonthCount }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Promedio Diario</p>
                <p class="text-3xl font-bold text-gray-900">{{ averagePerDay }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter and Search -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="Buscar por nombre, email o teléfono..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              
              <select 
                v-model="dateFilter"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las fechas</option>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
              </select>
            </div>

            <button
              @click="refreshData"
              :disabled="isLoading"
              class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
            >
              <svg 
                :class="['w-4 h-4 mr-2', isLoading ? 'animate-spin' : '']" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ isLoading ? 'Actualizando...' : 'Actualizar' }}
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">
              Formularios de Contacto ({{ filteredFormularios.length }})
            </h3>
          </div>

          <div v-if="isLoading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-3 text-gray-600">Cargando formularios...</span>
          </div>

          <div v-else-if="error" class="p-6 text-center">
            <div class="text-red-600 mb-4">
              <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg font-medium">Error al cargar los datos</p>
              <p class="text-sm mt-2">{{ error }}</p>
            </div>
            <button
              @click="refreshData"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Reintentar
            </button>
          </div>

          <div v-else-if="filteredFormularios.length === 0" class="p-12 text-center">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay formularios</h3>
            <p class="text-gray-600">
              {{ searchTerm ? 'No se encontraron resultados para tu búsqueda' : 'Aún no se han enviado formularios' }}
            </p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Información
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mensaje
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="formulario in paginatedFormularios" 
                  :key="formulario.id"
                  class="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 font-medium text-sm">
                          {{ formulario.nombreCompleto?.charAt(0)?.toUpperCase() || 'L' }}
                        </span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ formulario.nombreCompleto }}
                        </div>
                        <div class="text-sm text-gray-500">
                          ID: {{ formulario.id }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ formulario.correo }}</div>
                    <div class="text-sm text-gray-500">{{ formulario.telefono }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 max-w-xs truncate">
                      {{ formulario.mensaje }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ formatDate(formulario.fecha) }}
                  </td>
                  <td class="px-6 py-4 text-sm font-medium">
                    <button
                      @click="viewDetails(formulario)"
                      class="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="filteredFormularios.length > itemsPerPage" class="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredFormularios.length) }} de {{ filteredFormularios.length }} resultados
              </div>
              <div class="flex space-x-2">
                <button
                  @click="currentPage--"
                  :disabled="currentPage <= 1"
                  class="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <span class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
                  {{ currentPage }}
                </span>
                <button
                  @click="currentPage++"
                  :disabled="currentPage >= totalPages"
                  class="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal de detalles -->
    <div v-if="selectedFormulario" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">Detalles del Formulario #{{ selectedFormulario.id }}</h3>
            <button
              @click="selectedFormulario = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Información de Contacto</h4>
              <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span class="text-gray-900">{{ selectedFormulario.nombreCompleto }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                  <a :href="`mailto:${selectedFormulario.correo}`" class="text-blue-600 hover:text-blue-800">
                    {{ selectedFormulario.correo }}
                  </a>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <a :href="`tel:${selectedFormulario.telefono}`" class="text-blue-600 hover:text-blue-800">
                    {{ selectedFormulario.telefono }}
                  </a>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-gray-900">{{ formatDate(selectedFormulario.fecha) }}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Mensaje</h4>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-gray-900 whitespace-pre-wrap">{{ selectedFormulario.mensaje }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              @click="selectedFormulario = null"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Cerrar
            </button>
            <a
              :href="`mailto:${selectedFormulario.correo}?subject=Re: Su consulta&body=Hola ${selectedFormulario.nombreCompleto},%0D%0A%0D%0AGracias por contactarnos...`"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Responder por Email
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useFormularios } from '../composables/useFormularios';
import type { Formulario } from '../types/auth';

const router = useRouter();
const { user, logout, isAdmin } = useAuth();
const { formularios, isLoading, error, fetchFormularios } = useFormularios();

// Estados del componente
const activeSection = ref('leads');
const searchTerm = ref('');
const dateFilter = ref('all');
const selectedFormulario = ref<Formulario | null>(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Verificar si es admin al montar el componente
onMounted(async () => {
  if (!isAdmin.value) {
    router.push('/login');
    return;
  }
  await fetchFormularios();
});

// Computadas para estadísticas
const thisMonthCount = computed(() => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return formularios.value.filter(f => new Date(f.fecha) >= startOfMonth).length;
});

const averagePerDay = computed(() => {
  if (formularios.value.length === 0) return 0;
  const days = 30; // Últimos 30 días
  const recent = formularios.value.filter(f => {
    const date = new Date(f.fecha);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - days);
    return date >= thirtyDaysAgo;
  });
  return Math.round((recent.length / days) * 10) / 10;
});

// Filtrado de formularios
const filteredFormularios = computed(() => {
  let filtered = [...formularios.value];

  // Filtro por búsqueda
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(f =>
      f.nombreCompleto.toLowerCase().includes(term) ||
      f.correo.toLowerCase().includes(term) ||
      f.telefono.includes(term)
    );
  }

  // Filtro por fecha
  if (dateFilter.value !== 'all') {
    const now = new Date();
    let startDate: Date;

    switch (dateFilter.value) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        startDate = new Date(0);
    }

    filtered = filtered.filter(f => new Date(f.fecha) >= startDate);
  }

  return filtered.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
});

// Paginación
const totalPages = computed(() => Math.ceil(filteredFormularios.value.length / itemsPerPage.value));

const paginatedFormularios = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredFormularios.value.slice(start, end);
});

// Métodos
const handleLogout = () => {
  logout();
  router.push('/login');
};

const refreshData = async () => {
  await fetchFormularios();
};

const viewDetails = (formulario: Formulario) => {
  selectedFormulario.value = formulario;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Resetear página cuando cambian los filtros
const resetPage = () => {
  currentPage.value = 1;
};

// Watchers para resetear página
import { watch } from 'vue';
watch([searchTerm, dateFilter], resetPage);
</script> 