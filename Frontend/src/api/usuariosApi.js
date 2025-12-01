import base from './base.js';

const endpoint = 'usuarios';

const usuariosApi = {

  // --- Públicos ---
  login: async (creds) =>
    await base.post(`${endpoint}/login`, creds),

  registrar: async (datos) =>
    await base.post(`${endpoint}/register`, datos),

  // --- Privados (requieren token) ---
  findAll: async (token) =>
    await base.get(endpoint, token),

  findById: async (id, token) =>
    await base.get(`${endpoint}/${id}`, token),

  put: async (id, datos, token) =>
    await base.put(`${endpoint}/${id}`, datos, token),

  // --- Helpers / Utilidades ---

  /**
   * Calcula el total gastado por un usuario basándose en sus órdenes.
   * Esta función es puramente lógica (no hace fetch), pero es útil tenerla aquí.
   */
  getTotalSpent: (usuario) => {
    if (!usuario || !usuario.ordenes || !Array.isArray(usuario.ordenes)) {
      return 0;
    }

    return usuario.ordenes.reduce((accGeneral, orden) => {
      // 1. Si la orden tiene un campo 'total' directo, úsalo.
      if (orden.total) {
        return accGeneral + Number(orden.total);
      }

      // 2. Si no, intenta sumar los totales de los productos dentro de la orden.
      if (orden.productos && Array.isArray(orden.productos)) {
        const totalOrden = orden.productos.reduce((acc, prod) => {
          return acc + (Number(prod.total) || 0);
        }, 0);
        return accGeneral + totalOrden;
      }

      return accGeneral;
    }, 0);
  }
};

export default usuariosApi;