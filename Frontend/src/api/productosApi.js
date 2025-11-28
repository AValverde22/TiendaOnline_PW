import base from './base.js';

// El endpoint debe coincidir con tu Backend (app.js: app.use('/api/productos', ...))
const endpoint = 'productos';

const productosApi = {
  // 1. Obtener todos (Reemplaza a tu antiguo .get())
  findAll: async () => await base.get(endpoint),

  // 2. Obtener por categoría (Nuevo requerimiento para tu filtro)
  findByCategoria: async (nombreCategoria) => {
    // Encodeamos para que espacios o caracteres raros no rompan la URL
    const categoriaCodificada = encodeURIComponent(nombreCategoria);
    return await base.get(`${endpoint}/categoria/${categoriaCodificada}`);
  },

  // 3. Obtener uno solo por ID (Para ver el detalle)
  findById: async (id) => await base.get(`${endpoint}/${id}`),

  // 4. Crear (Solo para Admin)
  insert: async (producto) => await base.post(endpoint, producto),

  // 5. Actualizar (Solo para Admin)
  update: async (id, producto) => await base.put(`${endpoint}/${id}`, producto)
};

export default productosApi;