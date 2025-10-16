import "./Summary.css";
import { useCart } from "../../context/CartContext";


const Summary = ({ total, count }) => {
  const ctx = useCart();
  const displayTotal = typeof total === "number" ? total : ctx.cartTotal;
  const displayCount = typeof count === "number" ? count : ctx.cartCount;

  return (
    <div className="summary-card">
      <h3>Resumen de la compra</h3>
      <div className="summary-row">
        <span>Productos ({displayCount})</span>
        <span>S/ {displayTotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Delivery</span>
        <span className="free">GRATIS</span>
      </div>
      <div className="summary-row total">
        <strong>Total</strong>
        <strong>S/ {displayTotal.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Summary;
