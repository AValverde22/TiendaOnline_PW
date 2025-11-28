import base from './base.js';

const endpoint = 'series';

const seriesApi = {
    // Obtener todas las series (Para el Home)
    findAll: async () => await base.get(endpoint),

    // Obtener una serie por ID (Para ver el detalle y sus juegos)
    findById: async (id) => await base.get(`${endpoint}/${id}`),

    // Crear serie (Admin)
    insert: async (serie) => await base.post(endpoint, serie)
};

export default seriesApi;