// src/api/OrdenesApi.js
import base from './base.js';

const endpoint = 'ordenes';

const OrdenesApi = {

    // ... (tu función crearOrden que ya tienes) ...
    crearOrden: async (payload, token) => {
        return await base.post(endpoint, payload, token);
    },

    /**
     * Obtiene los detalles de una orden específica por su ID.
     * Vital para la pantalla de "CheckoutSuccess".
     */
    findById: async (id, token) => {
        // GET /api/ordenes/:id
        return await base.get(`${endpoint}/${id}`, token);
    }
};

export default OrdenesApi;