import axios from 'axios';

// 1. Crear la instancia base
const api = axios.create({
    baseURL: 'http://localhost:3005/api', // Ajusta a tu puerto
    headers: {
        'Content-Type': 'application/json'
    }
});

// 2. Interceptor de Solicitud (Request)
// Antes de que salga la petición, le pegamos el token si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // ¡Aquí ocurre la magia que satisface a tu middleware!
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;