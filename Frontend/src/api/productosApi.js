import base from './base.js';

const endpoint = 'productos';

const productosApi = {
  // --- MÉTODOS PÚBLICOS (No necesitan token) ---
  findAll: async () => await base.get(endpoint),

  findByCategoria: async (nombreCategoria) => {
    const categoriaCodificada = encodeURIComponent(nombreCategoria);
    return await base.get(`${endpoint}/categoria/${categoriaCodificada}`);
  },

  findById: async (id) => await base.get(`${endpoint}/${id}`),

  // --- MÉTODOS PRIVADOS (Aquí estaba el error) ---
  
  // 1. CREATE: Debe recibir (data, token) y pasar (endpoint, data, token)
  create: async (data, token) => {
      return await base.post(endpoint, data, token);
  },

  // 2. UPDATE: Debe recibir (id, data, token) y pasar (endpoint/id, data, token)
  update: async (id, data, token) => {
      return await base.put(`${endpoint}/${id}`, data, token);
  },

  // 3. REMOVE: Debe recibir (id, token) y pasar (endpoint/id, token)
  // OJO: base.remove solo acepta (endpoint, token) como definimos antes
  remove: async (id, token) => {
      return await base.remove(`${endpoint}/${id}`, token);
  }
};

export default productosApi;