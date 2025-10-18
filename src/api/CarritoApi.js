
const _carrito = [];

const obtenerCarrito = () => {
  return _carrito.map((p) => ({ ...p }));
};

const agregarProducto = (producto) => {
  const existe = _carrito.find((p) => p.id === producto.id);
  if (existe) {
    existe.cantidad = (existe.cantidad || 0) + (producto.cantidad || 1);
  } else {
    _carrito.push({ ...producto, cantidad: producto.cantidad || 1 });
  }
  return obtenerCarrito();
};

const actualizarCantidad = (id, cantidad) => {
  const prod = _carrito.find((p) => p.id === id);
  if (prod) prod.cantidad = Math.max(1, cantidad);
  return obtenerCarrito();
};

const eliminarProducto = (id) => {
  const index = _carrito.findIndex((p) => p.id === id);
  if (index !== -1) _carrito.splice(index, 1);
  return obtenerCarrito();
};

const vaciarCarrito = () => {
  _carrito.length = 0;
  return obtenerCarrito();
};

const CarritoApi = {
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
  vaciarCarrito,
};

export default CarritoApi;
