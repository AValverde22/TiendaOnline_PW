import "./Carrito.css";

const ProductoGuardado = ({ producto, moverAlCarrito, eliminarGuardado }) => {
  return (
    <div className="item-guardado">
      <div className="left-guardado">
        <div className="thumb-small"><img src={producto.img} alt={producto.titulo} /></div>
        <div>
          <div className="titulo">{producto.titulo}</div>
          <div className="small">S/ {producto.precio.toFixed(2)}</div>
        </div>
      </div>

      <div className="acciones-guardado">
        <button className="small-btn" onClick={() => moverAlCarrito(producto.id)}>Mover al carrito</button>
        <button className="small-btn danger" onClick={() => eliminarGuardado(producto.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default ProductoGuardado;
