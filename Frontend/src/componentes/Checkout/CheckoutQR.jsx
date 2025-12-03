import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header/Header";
import Summary from "../Carrito/Summary/Summary";

// Importamos Contextos (Solo para leer datos y validar)
import { useCart } from "../../api/context/CartContext";
import { useCheckout } from "../../api/context/CheckoutContext";
import "./Checkout.css";

const CheckoutQR = () => {
  const navigate = useNavigate();

  // 1. Datos del Contexto
  const { total, count } = useCart();
  const { shippingAddress } = useCheckout();

  // Validación de seguridad: Si no hay dirección, volver al paso 1
  useEffect(() => {
    if (!shippingAddress) {
        navigate("/Checkout1");
    }
  }, [shippingAddress, navigate]);

  // Función simple de navegación
  const handleContinuar = () => {
    // No guardamos nada en BD todavía.
    // Lo enviamos a la pantalla de REVISIÓN FINAL.
    navigate("/DetalleDeOrden"); 
  };

  return (
    <div className="checkout-page">      
    <Header />
    <div className="container">
      <h1 className="checkout-title">Pago con QR</h1>
      
      <div className="checkout-layout">
        <main className="checkout-left">
          <div className="checkout-card" style={{textAlign:"center"}}>
             <h3>Escanea para pagar</h3>
             
             <div style={{margin: "30px 0"}}>
                {/* QR de Ejemplo */}
                <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=YAPE-999999999" 
                    alt="QR Yape" 
                    style={{border: "1px solid #ddd", padding: 10, borderRadius: 8}}
                />
                <p style={{marginTop: 15, fontSize: "1.1rem"}}>
                    Total a pagar: <strong>S/ {total.toFixed(2)}</strong>
                </p>
                <p style={{color: "#666", fontSize: "0.9rem"}}>
                    Abre tu app de Yape o Plin y escanea el código.
                </p>
             </div>

             <div className="form-actions" style={{justifyContent: "center", gap: 20}}>
                {/* Botón Volver (Estilo gris btn-back) */}
                <button 
                    className="btn-primary" 
                    onClick={() => navigate("/Checkout2")}
                >
                    Volver
                </button>
                
                {/* Botón Continuar (Lleva a ConfirmarOrden) */}
                <button 
                    className="btn-primary" 
                    onClick={handleContinuar}
                >
                    Ya realicé el pago ➝
                </button>
             </div>
          </div>
        </main>

        <aside className="checkout-right">
           <div className="summary-card">
              <h3>Resumen</h3>
              <Summary total={total} count={count}/>
           </div>
        </aside>
      </div>
    </div>
    </div>
  );
};

export default CheckoutQR;