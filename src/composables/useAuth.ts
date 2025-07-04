import { ref, computed } from 'vue';
import axios from 'axios';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { config } from '../config/env';

const API_BASE_URL = config.API_BASE_URL;

const user = ref<User | null>(null);
const token = ref<string | null>(localStorage.getItem('token'));
const isLoading = ref(false);

if (token.value) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
}

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value && !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  const initAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token.value) {
      try {
        user.value = JSON.parse(storedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    }
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message: string }> => {
    try {
      isLoading.value = true;
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, credentials);
      
      if (response.data.success) {
        user.value = response.data.data.user;
        token.value = response.data.data.accessToken;
        
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accessToken}`;
        
        return { success: true, message: response.data.message };
      }
      
      return { success: false, message: response.data.message };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      return { success: false, message };
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      isLoading.value = true;
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, userData);
      
      if (response.data.success) {
        user.value = response.data.data.user;
        token.value = response.data.data.accessToken;
        
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accessToken}`;
        
        return { success: true, message: response.data.message };
      }
      
      return { success: false, message: response.data.message };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al registrarse';
      return { success: false, message };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    delete axios.defaults.headers.common['Authorization'];
  };

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    isAdmin,
    isLoading: computed(() => isLoading.value),
    login,
    register,
    logout,
    initAuth
  };
} 