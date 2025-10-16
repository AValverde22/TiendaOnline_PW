import React from "react";
import "../CarritoTerminado/Carrito.css";

const CartItem = ({ producto, onAumentar, onDisminuir, onEliminar }) => {
  return (
    <div className="cart-item">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="cart-img"
      />
      <div className="cart-info">
        <h3>{producto.nombre}</h3>
        <p>S/ {producto.precio.toFixed(2)}</p>
        <div className="cart-controls">
          <button onClick={onDisminuir}>-</button>
          <span>{producto.cantidad}</span>
          <button onClick={onAumentar}>+</button>
        </div>
      </div>
      <button className="eliminar" onClick={onEliminar}>
        ❌
      </button>
    </div>
  );
};

export default CartItem;
