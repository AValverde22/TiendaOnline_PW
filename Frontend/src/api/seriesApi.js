import base from './base.js';

const endpoint = 'series';

const seriesApi = {
  findAll: async () => await base.get(endpoint),

  findById: async (id) =>
    await base.get(`${endpoint}/${id}`),

  create: async (serie, token) =>
    await base.post(endpoint, serie, token)
};

export default seriesApi;
