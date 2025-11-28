import base from './base.js';

const endpoint = 'usuarios';

const usuariosApi = {
  // POST /api/usuarios/login
  login: async (creds) => await base.post(`${endpoint}/login`, creds),

  // POST /api/usuarios/register (Si lo necesitas luego)
  registrar: async (datos) => await base.post(`${endpoint}/register`, datos),

  // GET /api/usuarios (Solo admin)
  findAll: async () => await base.get(endpoint)
};

export default usuariosApi;