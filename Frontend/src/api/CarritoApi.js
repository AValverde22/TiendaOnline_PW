import base from './base.js';

const CarritoApi = {

  // Helper utilitario
  // NOTA: Esta función DEBE recibir el array de items con la estructura del backend
  calcularTotal: (items) => {
    if (!items) return 0;
    return items.reduce((total, item) => {
      // Estructura obligatoria del Backend: item.producto.precio
      const precio = Number(item.producto.precio);
      return total + (precio * item.cantidad);
    }, 0);
  },

  // 1. OBTENER CARRITO (Requiere Autenticación)
  obtenerCarrito: async (userId, token) => {
    if (!token || !userId) {
      // No hay usuario, no hay carrito. El Context deberá manejar el mensaje de error/login.
      console.warn("🛒 Acceso al carrito denegado: Usuario no autenticado.");
      return [];
    }

    try {
      // GET /api/carrito/:idUsuario
      const data = await base.get(`carrito/${userId}`, token);

      // Retorna los items (array anidado)
      return data && data.items ? data.items : [];
    } catch (error) {
      console.error("Error obteniendo carrito remoto:", error);
      // Podrías relanzar el error o retornar vacío, dependiendo del Context.
      throw error;
    }
  },

  // 2. AGREGAR PRODUCTO (Requiere Autenticación)
  agregarProducto: async (userId, token, producto, cantidad = 1) => {
    if (!token || !userId) throw new Error("Debe iniciar sesión para agregar productos.");

    const payload = {
      idUsuario: userId,
      idProducto: producto.id,
      cantidad: cantidad
    };
    // POST /api/carrito/agregar
    const response = await base.post('carrito/agregar', payload, token);
    return response; // Retorna el mensaje de éxito del Backend
  },

  // 3. ACTUALIZAR CANTIDAD (Requiere Autenticación)
  // idItem es el ID del ItemCarrito (no del producto)
  actualizarCantidad: async (token, idItem, cantidad) => {
    if (!token) throw new Error("Debe iniciar sesión para modificar el carrito.");

    // PUT /api/carrito/item
    const response = await base.put('carrito/item', { id: idItem, cantidad }, token);
    return response;
  },

  // 4. ELIMINAR ITEM (Requiere Autenticación)
  // idItem es el ID del ItemCarrito (no del producto)
  eliminarProducto: async (token, idItem) => {
    if (!token) throw new Error("Debe iniciar sesión para eliminar productos.");

    // DELETE /api/carrito/item/:id
    const response = await base.remove(`carrito/item/${idItem}`, token);
    return response;
  },

  // 5. VACIAR (Placeholder: La lógica de vaciar debería ir en el Checkout)
  vaciarCarrito: async () => {
    // En un flujo real, la función de Checkout vacía el carrito en el servidor.
    return true;
  }
};

export default CarritoApi;