import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, total, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div className="cart-left">
          <h2>Carrito de compras</h2>
          {cartItems.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>S/ {item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-right">
          <Summary
            total={total}
            count={cartItems.length}
            onContinue={() => navigate("/checkout/address")}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
