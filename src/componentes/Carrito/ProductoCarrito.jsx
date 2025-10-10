import "./Carrito.css";

const ProductoCarrito = ({ producto, actualizarCantidad, eliminarDelCarrito, moverAGuardados }) => {
  const subtotal = producto.precio * producto.cantidad;

  return (
    <div className="item-carrito">
      <div className="left">
        <input type="checkbox" defaultChecked />
        <div className="thumb">
          <img src={producto.img} alt={producto.titulo} />
        </div>
      </div>

      <div className="middle">
        <div className="titulo">{producto.titulo}</div>
        <div className="meta small">{producto.categoria}</div>
        <div className="entrega">Llega mañana</div>
      </div>

      <div className="right">
        <div className="precio">S/ {producto.precio.toFixed(2)}</div>

        <div className="qty">
          <button onClick={() => actualizarCantidad(producto.id, Math.max(1, producto.cantidad - 1))}>-</button>
          <input value={producto.cantidad} readOnly />
          <button onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}>+</button>
        </div>

        <div className="acciones">
          <button className="small-btn" onClick={() => moverAGuardados(producto.id)}>Guardar</button>
          <button className="small-btn danger" onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
        </div>

        <div className="subtotal small">Subtotal: S/ {subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductoCarrito;
