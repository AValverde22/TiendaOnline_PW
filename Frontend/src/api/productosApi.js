import base from './base.js';

const endpoint = 'productos';

const productosApi = {

  // --- Públicos ---
  findAll: async () => await base.get(endpoint),

  findByCategoria: async (nombreCategoria) => {
    const categoriaCodificada = encodeURIComponent(nombreCategoria);
    return await base.get(`${endpoint}/categoria/${categoriaCodificada}`);
  },

  findById: async (id) => await base.get(`${endpoint}/${id}`),

  // --- Privados (con token) ---
  create: async (data, token) =>
    await base.post(endpoint, data, token),

  update: async (id, data, token) =>
    await base.put(`${endpoint}/${id}`, data, token),

  remove: async (id, token) =>
    await base.remove(`${endpoint}/${id}`, token)
};

export default productosApi;
