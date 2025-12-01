import base from './base.js';

const endpoint = 'categorias';

const categoriasApi = {
  findAll: async () => await base.get(endpoint),

  create: async (payload, token) =>
    await base.post(endpoint, payload, token),

  update: async (id, payload, token) =>
    await base.put(`${endpoint}/${id}`, payload, token),

  remove: async (id, token) =>
    await base.remove(`${endpoint}/${id}`, token),

  findOne: async (id) =>
    await base.get(`${endpoint}/${id}`),

  findByName: async (name) =>
    await base.get(`${endpoint}/buscar/${encodeURIComponent(name)}`)
};

export default categoriasApi;
