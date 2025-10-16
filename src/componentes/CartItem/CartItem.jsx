import "./CartItem.css";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQty, removeItem } = useCart();

  const onIncrease = () => updateQty(item.id, item.quantity + 1);
  const onDecrease = () => {
    if (item.quantity <= 1) return; // don't go below 1
    updateQty(item.id, item.quantity - 1);
  };

  return (
    <div className="cart-item-card">
      <div className="ci-left">
        <div className="ci-info">
          <div className="ci-name">{item.name}</div>
          <div className="ci-price">S/ {item.price.toFixed(2)}</div>
        </div>
      </div>

      <div className="ci-right">
        <div className="qty-controls">
          <button className="qty-btn" onClick={onDecrease}>−</button>
          <div className="qty-value">{item.quantity}</div>
          <button className="qty-btn" onClick={onIncrease}>+</button>
        </div>

        <button className="remove" onClick={() => removeItem(item.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default CartItem;
