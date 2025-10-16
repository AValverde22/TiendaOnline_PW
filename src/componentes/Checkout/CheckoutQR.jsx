import { useNavigate } from "react-router-dom";
import Summary from "../Carrito/Summary/Summary";
import "./Checkout.css";
import Header from "../Header/Header"


const CheckoutQR = () => {
  const navigate = useNavigate();

  return (
    <div>      
    <Header />
    <div className="container">
      <div className="checkout-layout">
        <main className="checkout-left" style={{textAlign:"center"}}>
          <h2>Pago con QR</h2>
          <img src="https://qrcg-free-editor.qr-code-generator.com/latest/assets/images/websiteQRCode_noFrame.png" alt="QR" style={{width:220,height:220}}/>
          <p>Escanea con Yape o Plin para pagar.</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
            <button className="btn-primary" onClick={() => navigate("/Checkout5")}>Ya realicé el pago</button>
            <button className="btn-secondary" onClick={() => navigate("/Checkout2")}>Volver</button>
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

export default CheckoutQR;
