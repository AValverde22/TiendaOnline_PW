import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../api/context/CartContext.jsx"; // 👈 Importamos el Contexto
import CartItem from "../CartItem/CartItem.jsx";
import Summary from "../Summary/Summary.jsx";
import Header from "../../Header/Header.jsx";
import "./Carrito.css";

const Carrito = () => {
  // 1. Usar el hook useCart para obtener el estado y las funciones asíncronas
  const {
    items,
    total,
    loading,
    cartError,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito, // Aunque es un placeholder, lo mantenemos
    fetchCart // Necesario si queremos forzar una recarga inicial (aunque el useEffect del Context ya lo hace)
  } = useCart();

  const navigate = useNavigate();

  // El useEffect inicial ya NO es necesario, el CartContext se encarga de cargar
  // automáticamente el carrito al detectar la autenticación del usuario.

  // --- Funciones de Manejo ---

  // Las funciones ahora son ASÍNCRONAS y usan el ID del ITEM (Backend PK)
  const handleAumentar = async (idItem) => {
    // Buscar el item actual para obtener la cantidad antes de actualizar
    const item = items.find((p) => p.id === idItem);
    if (item) {
      // Llamada asíncrona al Contexto (que llama al Backend)
      await actualizarCantidad(idItem, item.cantidad + 1);
    }
  };

  const handleDisminuir = async (idItem) => {
    const item = items.find((p) => p.id === idItem);
    if (item && item.cantidad > 1) {
      // Llamada asíncrona al Contexto
      await actualizarCantidad(idItem, item.cantidad - 1);
    }
  };

  const handleEliminar = async (idItem) => {
    // Llamada asíncrona al Contexto
    await eliminarProducto(idItem);
  };

  const handleVaciar = () => {
    // Llama a la función del Contexto
    vaciarCarrito();
  };

  const handleContinuarCompra = () => {
    navigate("/Checkout1");
  };

  // Si está cargando, mostramos un loader
  if (loading) {
    return (
      <div className="carrito-page">
        <Header />
        <p className="loading">Cargando carrito... 🔄</p>
      </div>
    );
  }

  // Si hay error, lo mostramos
  if (cartError) {
    // Usar el error exportado del contexto
    return (
      <div className="carrito-page">
        <Header />
        <div className="error-container">
          <p className={`error-message ${cartError.type}`}>
            ❌ {cartError.message}
          </p>
          <p>Por favor, inténtalo de nuevo o revisa tu sesión.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <Header />
      <div className="carrito-container">
        <div className="carrito-left">
          <h2>Tu carrito</h2>

          {items.length === 0 ? (
            <p className="vacio">Tu carrito está vacío 🛍️</p>
          ) : (
            <>
              {items.map((item) => ( // 👈 Iteramos sobre 'items'
                <CartItem
                  key={item.id} // 👈 Usamos el ID del ITEM (no del producto)
                  // 👈 Pasamos el ITEM completo, que contiene el producto anidado
                  item={item}
                  onAumentar={() => handleAumentar(item.id)}
                  onDisminuir={() => handleDisminuir(item.id)}
                  onEliminar={() => handleEliminar(item.id)}
                />
              ))}
              <button className="vaciar-btn" onClick={handleVaciar}>
                Vaciar carrito
              </button>
            </>
          )}
        </div>

        <div className="carrito-right">
          {/* El total y el count vienen calculados del Context */}
          <Summary total={total} count={items.length} />
          <button
            className="continuar-btn"
            onClick={handleContinuarCompra}
            disabled={items.length === 0} // Deshabilitar si está vacío
          >
            Continuar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;