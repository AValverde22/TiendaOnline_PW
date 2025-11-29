import base from './base.js';

const endpoint = 'usuarios';

const usuariosApi = {
  // POST /api/usuarios/login
  login: async (creds) => await base.post(`${endpoint}/login`, creds),

  // POST /api/usuarios/register (Si lo necesitas luego)
  registrar: async (datos) => await base.post(`${endpoint}/register`, datos),

  // GET /api/usuarios (Solo admin)
  findAll: async () => {
    const token = localStorage.getItem('token');
    return await base.get(endpoint, token);
  },

  // PUT /api/usuarios/:id (Solo admin)
  put: async (id, datos) => {
    const token = localStorage.getItem('token');
    const objPayload = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(datos)
    };
    return await fetch(`http://localhost:3005/api/${endpoint}/${id}`, objPayload)
      .then(response => response.json())
      .then(data => { return data; });
  }
};

export default usuariosApi;