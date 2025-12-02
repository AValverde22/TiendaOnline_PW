import base from './base.js';

const CarritoApi = {

  calcularTotal: (items) => {
    if (!items) return 0;
    return items.reduce((total, item) => {
      const precio = Number(item.producto.precio);
      return total + (precio * item.cantidad);
    }, 0);
  },

  obtenerCarrito: async (userId, token) => {
    if (!token || !userId) return [];
    try {
      const data = await base.get(`carrito/${userId}`, token);
      return data && data.items ? data.items : [];
    } catch (error) {
      throw error;
    }
  },

  agregarProducto: async (userId, token, producto, cantidad = 1) => {
    if (!token || !userId) throw new Error("Debe iniciar sesión para agregar productos.");

    const payload = {
      idUsuario: userId,
      idProducto: producto.id,
      cantidad
    };
    // CORREGIDO: Endpoint coincide con backend
    const response = await base.post('carrito/item', payload, token);
    return response;
  },

  actualizarCantidad: async (token, idItem, cantidad) => {
    if (!token) throw new Error("Debe iniciar sesión para modificar el carrito.");
    const response = await base.put('carrito/item', { id: idItem, cantidad }, token);
    return response;
  },

  eliminarProducto: async (token, idItem) => {
    if (!token) throw new Error("Debe iniciar sesión para eliminar productos.");
    const response = await base.remove(`carrito/item/${idItem}`, token);
    return response;
  },

  vaciarCarrito: async () => true
};

export default CarritoApi;
