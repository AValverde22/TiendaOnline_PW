// 1. Intentamos leer del almacenamiento local al iniciar
const cargarCarrito = () => {
  const guardado = localStorage.getItem("tienda_carrito");
  return guardado ? JSON.parse(guardado) : [];
};

let _carrito = cargarCarrito(); // Inicializamos con lo que haya guardado

const guardarEnStorage = () => {
  localStorage.setItem("tienda_carrito", JSON.stringify(_carrito));
};

const obtenerCarrito = () => {
  // Retornamos una copia para evitar mutaciones externas
  return [..._carrito];
};

const agregarProducto = (producto) => {
  const existe = _carrito.find((p) => p.id === producto.id);
  if (existe) {
    existe.cantidad = (existe.cantidad || 0) + (producto.cantidad || 1);
  } else {
    _carrito.push({ ...producto, cantidad: producto.cantidad || 1 });
  }

  guardarEnStorage(); // <--- IMPORTANTE: Guardar cambios
  return obtenerCarrito();
};

const actualizarCantidad = (id, cantidad) => {
  const prod = _carrito.find((p) => p.id === id);
  if (prod) {
    prod.cantidad = Math.max(1, cantidad);
    guardarEnStorage(); // <--- IMPORTANTE
  }
  return obtenerCarrito();
};

const eliminarProducto = (id) => {
  const index = _carrito.findIndex((p) => p.id === id);
  if (index !== -1) {
    _carrito.splice(index, 1);
    guardarEnStorage(); // <--- IMPORTANTE
  }
  return obtenerCarrito();
};

const vaciarCarrito = () => {
  _carrito = []; // Reiniciamos el array
  localStorage.removeItem("tienda_carrito"); // Borramos del storage
  return [];
};

const calcularTotal = () => {
  return _carrito.reduce((total, p) => total + (p.precio * p.cantidad), 0);
};

const CarritoApi = {
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
  vaciarCarrito,
  calcularTotal
};

export default CarritoApi;