import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Importamos Contextos y APIs
import { useCart } from "../../api/context/CartContext.jsx";
import { useUser } from "../../api/context/UserContext.jsx";
import OrdenesApi from "../../api/OrdenesApi.js"; // 👈 Asumimos esta API

import Summary from "../Carrito/Summary/Summary";
import Header from "../Header/Header"
import "./Checkout.css";

const CheckoutCardPayment = () => {
  const navigate = useNavigate();

  // Obtener datos del carrito y usuario
  const { items, total, count, vaciarCarrito } = useCart();
  const { user, token, isAuthenticated } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⚠️ Estado local para simular la recolección de datos de la tarjeta.
  // En una aplicación real, estos datos irían a un servicio de pago seguro (Stripe, PayPal, etc.).
  const [cardDetails, setCardDetails] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated || !token) {
      setError("No estás autenticado. Por favor, inicia sesión.");
      return;
    }

    if (items.length === 0) {
      setError("El carrito está vacío. Agrega productos para completar la compra.");
      return;
    }

    setLoading(true);

    try {
      // 1. Preparar el Payload para el Backend
      // Los ítems del carrito ya contienen la estructura necesaria (ID de producto y cantidad)
      const orderPayload = {
        usuarioId: user.id,
        total: total,
        metodoPago: 'Tarjeta',
        // Enviamos solo los datos esenciales para la orden
        items: items.map(item => ({
          productoId: item.producto.id,
          cantidad: item.cantidad,
          precioUnitario: Number(item.producto.precio)
        })),
        // Aquí se añadirían la dirección de envío (obtenida de Checkout1)
        // y los datos de pago simulados (cardDetails)
      };

      // 2. Llamada Asíncrona para CREAR la Orden
      // ⚠️ Necesitas crear la función crearOrden en tu OrdenesApi.js
      const nuevaOrden = await OrdenesApi.crearOrden(orderPayload, token);

      // 3. Éxito: Vaciar el carrito y Navegar
      vaciarCarrito(); // Limpiamos el estado local (y la DB si tu API de órdenes lo hace)

      // 4. Navegar a la página de detalle de la orden recién creada
      navigate(`/DetalleDeOrden/${nuevaOrden.id}`);

    } catch (err) {
      console.error("Error al procesar el pago y crear la orden:", err);
      setError(err.message || "Fallo en el pago. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="checkout-layout">
          <main className="checkout-left">
            <h2>Pago con tarjeta</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handlePay} className="address-form">
              <div className="row">
                <input
                  placeholder="Nombre del titular"
                  required
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleInputChange}
                />
              </div>
              <div className="row">
                <input
                  placeholder="Número de tarjeta"
                  required
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  maxLength="16"
                />
              </div>
              <div className="row">
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
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  maxLength="4"
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || items.length === 0}
              >
                {loading ? 'Procesando Pago...' : 'Pagar ahora'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/Checkout2")}
                disabled={loading}
              >
                Volver
              </button>
            </form>
          </main>

          <aside className="checkout-right">
            {/* Summary recibe props del Context */}
            <Summary total={total} count={count} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCardPayment;