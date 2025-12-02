import { useNavigate } from "react-router-dom";
import { useCart } from "../../../api/context/CartContext.jsx"; 
import CartItem from "../CartItem/CartItem";
import Summary from "../Summary/Summary";
import Header from "../../Header/Header";
import "./Carrito.css";

const Carrito = () => {
  const {
    items,              // Array de items desde el Context
    total,              // Calculado en el Context
    count,              // Cantidad total de productos
    loading,            // Estado de carga (true en fetch o updates)
    cartError,          // Objeto error si falla la API
    actualizarCantidad, // Función del Context -> API PUT
    eliminarProducto,   // Función del Context -> API DELETE
    vaciarCarritoCompleto
  } = useCart();

  const navigate = useNavigate();

  // --- Handlers (Controladores de Eventos) ---

  const handleAumentar = async (idItem) => {
    if (loading) return; // Bloqueo anti-spam de clics
    
    const item = items.find((p) => p.id === idItem);
    if (item) {
      // Llamamos a actualizarCantidad con el ID del ITEM (tabla intermedia)
      await actualizarCantidad(idItem, item.cantidad + 1);
    }
  };

  const handleDisminuir = async (idItem) => {
    if (loading) return;
    
    const item = items.find((p) => p.id === idItem);
    if (item && item.cantidad > 1) {
      await actualizarCantidad(idItem, item.cantidad - 1);
    }
  };

  const handleEliminar = async (idItem) => {
    if (loading) return;
    
    // Confirmación nativa simple
    if (window.confirm("¿Deseas eliminar este producto del carrito?")) {
      await eliminarProducto(idItem);
    }
  };

  const handleVaciar = () => {
    if (items.length === 0) return;
    if (window.confirm("¿Estás seguro de vaciar el carrito?")) {
        vaciarCarritoCompleto();
    }
  };

  const handleContinuarCompra = () => {
    navigate("/Checkout1"); // Ruta hacia tu CheckoutContext flow
  };

  // --- Renderizado Condicional ---

  // CASO 1: Carga Inicial (Pantalla completa solo si está vacío y cargando)
  if (loading && items.length === 0) {
    return (
      <div className="carrito-page">
        <Header />
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando tu carrito... 🔄</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <Header />
      
      {/* Banner de Errores (Si falla el token o el servidor) */}
      {cartError && (
        <div className="error-banner">
            ⚠️ {cartError.message || "Ocurrió un error. Intenta recargar."}
        </div>
      )}

      {/* Clase 'is-updating': Baja la opacidad si se está actualizando 
         para dar feedback visual sin borrar el contenido 
      */}
      <div className={`carrito-container ${loading ? 'is-updating' : ''}`}>
        
        {/* COLUMNA IZQUIERDA: ITEMS */}
        <div className="carrito-left">
          <h2>Tu Carrito ({count} productos)</h2>

          {items.length === 0 ? (
            <div className="empty-cart-state">
                <p>Tu carrito está vacío 🛍️</p>
                <button className="btn-primary" onClick={() => navigate('/')}>
                    Ir a la Tienda
                </button>
            </div>
          ) : (
            <div className="cart-list">
              {items.map((item) => (
                <CartItem
                  key={item.id} // Key es el ID único de la tabla intermedia
                  item={item}   // Pasamos todo el objeto item
                  onAumentar={() => handleAumentar(item.id)}
                  onDisminuir={() => handleDisminuir(item.id)}
                  onEliminar={() => handleEliminar(item.id)}
                  disabled={loading} // Deshabilitamos botones individuales
                />
              ))}
              
              <button 
                className="vaciar-btn" 
                onClick={handleVaciar}
                disabled={loading}
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: RESUMEN */}
        {items.length > 0 && (
            <div className="carrito-right">
              {/* Indicador sutil de carga */}
              {loading && <p className="mini-loader">Actualizando precios...</p>}
              
              <Summary total={total} count={count} />
              
              <button
                className="continuar-btn"
                onClick={handleContinuarCompra}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Continuar Compra'}
              </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;