import { useNavigate } from "react-router-dom";
import { useCart } from "../../../api/context/CartContext.jsx"; 
import { useUser } from "../../../api/context/UserContext.jsx"; // Importamos UserContext
import CartItem from "../CartItem/CartItem";
import Summary from "../Summary/Summary";
import Header from "../../Header/Header";
import "./Carrito.css";

const Carrito = () => {
  const {
    items,
    total,
    count,
    loading,
    cartError,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarritoCompleto
  } = useCart();

  const { isAuthenticated } = useUser(); // Para validar login
  const navigate = useNavigate();

  // --- Handlers ---

  const handleAumentar = async (idItem) => {
    if (loading) return;
    const item = items.find((p) => p.id === idItem);
    if (item) {
      // OJO: Asegúrate si tu API espera el ID del producto o el ID de la línea del carrito
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
    if (window.confirm("¿Deseas eliminar este producto?")) {
      await eliminarProducto(idItem);
    }
  };

  const handleVaciar = () => {
    if (items.length === 0) return;
    if (window.confirm("¿Estás seguro de vaciar todo el carrito?")) {
        vaciarCarritoCompleto();
    }
  };

  const handleContinuarCompra = () => {
    // Validación de seguridad antes de ir al Checkout
    if (!isAuthenticated) {
        alert("Por favor inicia sesión para continuar con la compra.");
        navigate("/login"); // O abre tu modal de login
        return;
    }
    
    if (items.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Navegamos al primer paso del Checkout (Dirección)
    navigate("/Checkout1"); 
  };

  // --- Renderizado ---

  // Spinner de carga inicial
  if (loading && items.length === 0) {
    return (
      <div className="carrito-page">
        <Header />
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando tu carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <Header />
      
      {cartError && (
        <div className="error-banner">
            ⚠️ {cartError.message || "Ocurrió un error."}
        </div>
      )}

      <div className={`carrito-container ${loading ? 'is-updating' : ''}`}>
        
        {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
        <div className="carrito-left">
          <div className="cart-header">
             <h2>Tu Carrito</h2>
             <span className="cart-count">{count} items</span>
          </div>

          {items.length === 0 ? (
            <div className="empty-cart-state">
                <p>Tu carrito está vacío 🛍️</p>
                <button className="btn-secondary" onClick={() => navigate('/')}>
                    Ir a la Tienda
                </button>
            </div>
          ) : (
            <div className="cart-list">
              {items.map((item) => (
                <CartItem
                  key={item.id} // ID único (ej: cart_item_id)
                  item={item}
                  onAumentar={() => handleAumentar(item.id)}
                  onDisminuir={() => handleDisminuir(item.id)}
                  onEliminar={() => handleEliminar(item.id)}
                  disabled={loading}
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

        {/* COLUMNA DERECHA: RESUMEN (Sticky) */}
        {items.length > 0 && (
            <div className="carrito-right">
              {loading && <p className="mini-loader">Actualizando...</p>}
              
              {/* Usamos tu componente Summary */}
              <Summary total={total} count={count} />
              
              <button
                className="continuar-btn"
                onClick={handleContinuarCompra}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Ir a Pagar'}
              </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;