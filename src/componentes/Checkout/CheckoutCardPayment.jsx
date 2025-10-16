import { useNavigate } from "react-router-dom";
import Summary from "../Carrito/Summary/Summary";
import Header from "../Header/Header"
import "./Checkout.css";

const CheckoutCardPayment = () => {
  const navigate = useNavigate();

  const handlePay = (e) => {
    e.preventDefault();

    navigate("/Checkout5");
  };

  return (
    <div>
        <Header />
    <div className="container">
      <div className="checkout-layout">
        <main className="checkout-left">
          <h2>Pago con tarjeta</h2>
          <form onSubmit={handlePay}>
            <input placeholder="Número de tarjeta" required/>
            <div className="row">
              <input placeholder="MM/AA" required/>
              <input placeholder="CVV" required/>
            </div>
            <input placeholder="Nombre del titular" required/>
            <button type="submit" className="btn-primary">Pagar ahora</button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/Checkout2")}>Volver</button>
          </form>
        </main>

        <aside className="checkout-right">
          <Summary />
        </aside>
      </div>
    </div>
    </div>
  );
};

export default CheckoutCardPayment;
