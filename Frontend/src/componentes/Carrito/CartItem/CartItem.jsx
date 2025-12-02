import React from 'react';
// import './CartItem.css'; 

const CartItem = ({ item, onAumentar, onDisminuir, onEliminar, disabled }) => {
  // 1. Desestructuración basada en TU JSON REAL
  // Nota: Agregamos 'cantidad = 1' por defecto por si el backend no la envía en este momento.
  const { id, cantidad = 1, producto } = item;
  
  // 2. Validación de seguridad: Si no hay producto anidado, no renderizamos nada
  if (!producto) return null;

  // 3. Extracción de propiedades del producto (según tu JSON)
  // Usamos 'img' en lugar de 'imagen'
  const { nombre, precio, img } = producto;

  // Conversión segura de precio (de string "250.00" a número)
  const precioNumerico = Number(precio);
  const subtotal = precioNumerico * cantidad;

  return (
    <div className="cart-item">
      {/* Columna Imagen */}
      <div className="item-image-col">
          <img 
            src={img || "https://via.placeholder.com/150"} 
            alt={nombre} 
            className="cart-img"
            onError={(e) => e.target.src = "https://via.placeholder.com/150"} // Fallback si la URL falla
          />
      </div>
      
      {/* Columna Detalles */}
      <div className="item-info-col">
        <h3>{nombre}</h3>
        <p className="item-price">Precio: ${precioNumerico.toFixed(2)}</p>
        <p className="item-subtotal">
            Subtotal: <strong>${subtotal.toFixed(2)}</strong>
        </p>
      </div>

      {/* Columna Controles (+ / -) */}
      <div className="item-controls-col">
        <div className="qty-selector">
            <button 
                onClick={onDisminuir} 
                disabled={disabled || cantidad <= 1}
                className="qty-btn"
            >
                -
            </button>
            <span className="qty-number">{cantidad}</span>
            <button 
                onClick={onAumentar} 
                disabled={disabled}
                className="qty-btn"
            >
                +
            </button>
        </div>
      </div>

      {/* Columna Eliminar */}
      <div className="item-delete-col">
        <button 
            className="delete-icon-btn" 
            onClick={onEliminar}
            disabled={disabled}
            aria-label="Eliminar producto"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;