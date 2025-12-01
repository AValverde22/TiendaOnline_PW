// src/api/OrdenesApi.js

import base from './base.js';

const endpoint = 'ordenes'; // 👈 Ruta del Backend para la gestión de órdenes

const OrdenesApi = {

    /**
     * Crea una nueva orden de compra en el Backend. Esta es la función CLAVE para el Checkout.
     *
     * @param {object} payload - El cuerpo de la orden (usuarioId, items, total, métodoPago, etc.).
     * @param {string} token - Token de autenticación del usuario.
     * @returns {Promise<object>} La orden creada.
     */
    crearOrden: async (payload, token) => {
        // Esto se mapea a POST /api/ordenes
        return await base.post(endpoint, payload, token);
    },

    // (Puedes añadir más funciones si las necesitas en otras vistas)

    // findById: async (id, token) => { ... },
    // findAll: async (token) => { ... },
};

export default OrdenesApi;