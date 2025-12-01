import React from "react";
import "../CarritoTerminado/Carrito.css";

// ⚠️ CAMBIO CRUCIAL: Recibe 'item' en lugar de 'producto'
const CartItem = ({ item, onAumentar, onDisminuir, onEliminar }) => {

  // Desestructuramos el objeto para facilitar el acceso a los datos
  const { cantidad, producto } = item;

  // Verificación de existencia del producto (por seguridad, si el include falla)
  if (!producto) {
    return <div className="cart-item-error">Item no encontrado.</div>;
  }

  // El precio viene como string o número del Backend. Lo convertimos a número y lo formateamos.
  const precioUnitario = Number(producto.precio);
  const totalItem = precioUnitario * cantidad;

  return (
    <div className="cart-item">
      <img
        // 1. IMAGEN: El campo podría llamarse 'urlImagen' o 'img' en la tabla Producto
        src={producto.urlImagen || producto.imagen || 'placeholder.jpg'}
        alt={producto.nombre}
        className="cart-img"
      />
      <div className="cart-info">
        <h3>{producto.nombre}</h3>
        {/* 2. PRECIO UNITARIO Y CANTIDAD */}
        <p>S/ {precioUnitario.toFixed(2)} c/u</p>
        <p>Total Item: **S/ {totalItem.toFixed(2)}**</p>

        <div className="cart-controls">
          {/* 3. CONTROLES: La cantidad viene de item.cantidad */}
          <button onClick={onDisminuir} disabled={cantidad <= 1}>-</button>
          <span>{cantidad}</span>
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