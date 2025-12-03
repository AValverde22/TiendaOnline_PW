import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Summary from "../Carrito/Summary/Summary";
import { useCart } from "../../api/context/CartContext";
import { useCheckout } from "../../api/context/CheckoutContext";
import "./Checkout.css";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { total, count, items } = useCart();
  const { paymentMethod, setPaymentMethod, shippingAddress } = useCheckout();

  useEffect(() => {
    if (items.length === 0) navigate("/carrito");
    else if (!shippingAddress) {
        alert("Falta la dirección de envío.");
        navigate("/Checkout1");
    }
  }, [items, shippingAddress, navigate]);

  const handleSelect = (metodo) => {
    setPaymentMethod(metodo);
  };

  const handleContinue = () => {
    if (!paymentMethod) {
        alert("Por favor selecciona un método de pago.");
        return;
    }
    if (paymentMethod === "qr") navigate("/Checkout3");
    else if (paymentMethod === "card") navigate("/Checkout4");
  };

  return (
    <div className="checkout-page">
      <Header />
      <div className="container">
        <h1 className="checkout-title">Método de Pago</h1>
        
        <div className="checkout-layout">
          
          <main className="checkout-left">
            <div className="checkout-card">
              <h3>Selecciona una opción</h3>
              
              <div className="payment-grid">
                  
                  {/* --- OPCIÓN 1: QR (Yape/Plin) --- */}
                  <div 
                    className={`payment-card ${paymentMethod === "qr" ? "active" : ""}`} 
                    onClick={() => handleSelect("qr")}
                  >
                    {/* El indicador visual de Radio Button */}
                    <div className="radio-header">
                        <div className={`custom-radio ${paymentMethod === "qr" ? "checked" : ""}`}>
                            {paymentMethod === "qr" && <div className="radio-dot"></div>}
                        </div>
                        <span className="badge-promo">Más rápido</span>
                    </div>

                    <div className="card-content">
                        <span className="payment-icon">📱</span>
                        <div className="text-group">
                            <span className="card-title">Yape / Plin</span>
                            <span className="card-desc">Escanea el QR y paga desde tu celular al instante.</span>
                        </div>
                    </div>
                  </div>

                  {/* --- OPCIÓN 2: TARJETA --- */}
                  <div 
                    className={`payment-card ${paymentMethod === "card" ? "active" : ""}`} 
                    onClick={() => handleSelect("card")}
                  >
                    <div className="radio-header">
                        <div className={`custom-radio ${paymentMethod === "card" ? "checked" : ""}`}>
                            {paymentMethod === "card" && <div className="radio-dot"></div>}
                        </div>
                    </div>

                    <div className="card-content">
                        <span className="payment-icon">💳</span>
                        <div className="text-group">
                            <span className="card-title">Tarjeta Crédito / Débito</span>
                            <span className="card-desc">Procesado seguro (Visa, MC, Amex).</span>
                        </div>
                    </div>
                  </div>

              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={() => navigate("/Checkout1")}>
                    Atrás
                </button>
                <button className="btn-primary" onClick={handleContinue}>
                    Continuar ➝
                </button>
              </div>
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

export default CheckoutPayment;