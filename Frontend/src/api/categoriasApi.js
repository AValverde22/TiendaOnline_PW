import base from './base.js';

const endpoint = 'categorias';

const categoriasApi = {
  // findAll suele ser público, pero si es privado, agrégale token también
  findAll: async () => await base.get(endpoint),

  create: async (payload, token) =>
    await base.post(endpoint, payload, token),

  update: async (id, payload, token) =>
    await base.put(`${endpoint}/${id}`, payload, token),

  remove: async (id, token) =>
    await base.remove(`${endpoint}/${id}`, token),

  findOne: async (id, token) =>
    await base.get(`${endpoint}/${id}`, token), // 👈 Pasamos el token a base.get

  findByName: async (name, token) =>
    await base.get(`${endpoint}/buscar/${encodeURIComponent(name)}`, token)
};

export default categoriasApi;