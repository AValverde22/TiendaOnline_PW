import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Summary from "../Carrito/Summary/Summary";
import "./Checkout.css";
import Header from "../Header/Header"


const CheckoutPayment = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if(!method){alert("Selecciona un método"); return;}
    if(method==="qr") navigate("/Checkout3");
    else navigate("/Checkout4");
  };

  return (
    <div>
        <Header />
    <div className="container">
      <div className="checkout-layout">
        <main className="checkout-left">
          <h2>Método de pago</h2>
          <div className={`option ${method==="qr"?"sel":""}`} onClick={() => setMethod("qr")}>
            <input type="radio" checked={method==="qr"} readOnly/> Pago con código QR
          </div>
          <div className={`option ${method==="card"?"sel":""}`} onClick={() => setMethod("card")}>
            <input type="radio" checked={method==="card"} readOnly/> Tarjeta de crédito o débito
          </div>
          <div style={{marginTop:12}}>
            <button className="btn-primary" onClick={handleContinue}>Continuar</button>
          </div>
        </main>

        <aside className="checkout-right">
          <Summary />
        </aside>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPayment;
