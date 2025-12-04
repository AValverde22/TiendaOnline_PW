import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Importamos Contextos y APIs
import { useCart } from "../../api/context/CartContext.jsx";
import { useUser } from "../../api/context/UserContext.jsx";
import { useCheckout } from "../../api/context/CheckoutContext.jsx"; // 👈 Importante para la dirección
import OrdenesApi from "../../api/OrdenesApi.js"; 

import Summary from "../Carrito/Summary/Summary";
import Header from "../Header/Header"
import "./Checkout.css";

const CheckoutCardPayment = () => {
  const navigate = useNavigate();

  // 1. Obtener datos globales
  // Nota: corregí 'vaciarCarrito' por 'vaciarCarritoCompleto' según tu Context
  const { items, total, count, vaciarCarritoCompleto } = useCart();
  const { user, token, isAuthenticated } = useUser();
  const { shippingAddress } = useCheckout(); // Recuperamos la dirección del paso 1

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Estado local del formulario de tarjeta
  const [cardDetails, setCardDetails] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Validación de seguridad: Si no hay dirección, volver al inicio
  useEffect(() => {
    if (!shippingAddress) {
        alert("Falta la dirección de envío.");
        navigate("/Checkout1");
    }
  }, [shippingAddress, navigate]);

  const handleInputChange = (e) => {
    // Validación simple para números (opcional)
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated || !token) {
      setError("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }

    setLoading(true);

    try {
      // 3. Preparar el Payload Completo
      const orderPayload = {
        usuarioId: user.id,
        total: total,
        metodoPago: 'Tarjeta',
        items: items.map(item => ({
          productoId: item.id, // O item.producto.id dependiendo de tu estructura
          cantidad: item.cantidad,
          precioUnitario: Number(item.precio || item.producto?.precio),
          nombre: item.nombre || item.producto?.nombre // Opcional, para logs en backend
        })),
        direccionEnvio: shippingAddress, // 👈 Enviamos la dirección guardada
        datosPago: { // NUNCA guardar CVV en BD real, esto es solo didáctico
            mascaraTarjeta: cardDetails.cardNumber.slice(-4),
            titular: cardDetails.cardHolder
        }
      };

      // 4. Llamada al Backend
      const respuesta = await OrdenesApi.crearOrden(orderPayload, token);
      
      // Asumiendo que tu backend devuelve la orden creada en 'respuesta' o 'respuesta.orden'
      const ordenId = respuesta.id || respuesta.orden?.id || Date.now(); 

      // 5. Limpieza y Redirección
      await vaciarCarritoCompleto(); // Limpia BD y Contexto
      
      navigate(`/DetalleDeOrden/${ordenId}`); // Redirigir a éxito

    } catch (err) {
      console.error(err);
      setError(err.message || "Error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <Header />
      <div className="container">
        <h1 className="checkout-title">Pago con Tarjeta</h1>
        
        <div className="checkout-layout">
          <main className="checkout-left">
            <div className="checkout-card">
                <h3>Ingresa los datos de tu tarjeta</h3>
                
                {error && <div className="error-banner" style={{marginBottom: 15}}>{error}</div>}

                <form onSubmit={handlePay} className="address-form">
                <div className="form-row">
                    <input
                    placeholder="Nombre del titular"
                    required
                    name="cardHolder"
                    value={cardDetails.cardHolder}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-row">
                    <input
                    placeholder="Número de tarjeta (16 dígitos)"
                    required
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                    />
                </div>
                <div className="form-row">
                    <input
                    placeholder="MM/AA"
                    required
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleInputChange}
                    maxLength="5"
                    />
                    <input
                    placeholder="CVV"
                    required
                    name="cvv"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                    />
                </div>
                
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={() => navigate("/Checkout2")}
                        disabled={loading}
                    >
                        Atrás
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        onClick={() => navigate("/ConfirmarOrden")}
                        disabled={loading || items.length === 0}
                    >
                        {loading ? 'Procesando...' : `Pagar S/ ${total.toFixed(2)}`}
                    </button>
                </div>
                </form>
            </div>
          </main>

          <aside className="checkout-right">
             <div className="summary-card">
                <h3>Resumen</h3>
                <Summary total={total} count={count} />
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCardPayment;