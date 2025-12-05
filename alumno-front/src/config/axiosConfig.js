import axios from 'axios';

// 1. Configura la URL base de tu API Gateway/Reverse Proxy en Railway.
// Todas las llamadas relativas (ej. axios.get('/auth/login')) irán a esta dirección.
const API_BASE_URL = "https://render-production-d894.up.railway.app/";

axios.defaults.baseURL = API_BASE_URL;

/**
 * Configura un interceptor de peticiones que añade el token JWT
 * a la cabecera 'Authorization' para todas las llamadas al backend.
 *
 * NOTA: Como ahora usamos un único API Gateway (API_BASE_URL),
 * el token se adjuntará automáticamente a todas las peticiones a ese dominio.
 */
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 

        // Si existe un token, lo adjuntamos.
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor de respuestas para manejar el 401.
 * Si el servidor dice 401 (token expirado/inválido), borra el token y redirige al login.
 */
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.error("Sesión expirada o no válida. Redirigiendo a /login.");
            localStorage.removeItem('token');
            // Usamos window.location.href para forzar la navegación (fuera de React Router si aplica)
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);
