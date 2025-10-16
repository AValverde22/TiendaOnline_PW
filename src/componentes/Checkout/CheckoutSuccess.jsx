import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarritoApi from "../../api/CarritoApi.js";
import Summary from "../Carrito/Summary/Summary.jsx";
import Header from "../Header/Header.jsx";
import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Mostrar los productos del pedido antes de vaciar el carrito
    const items = CarritoApi.obtenerCarrito();
    setProductos(items);
  }, []);

  const handleVolverCarrito = () => {
    CarritoApi.vaciarCarrito(); // Vacía el carrito
    navigate("/carrito"); // Redirige a carrito vacío
  };

  const total = productos.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <div className="checkout-success-page">
        <Header />
      <div className="checkout-success-container">
        <div className="checkout-success-left">
          <h2>¡Orden completada con éxito! 🎉</h2>
          <p>
            Gracias por tu compra. Esperamos que el servicio haya sido de tu agrado.
          </p>

          <button className="btn-volver" onClick={handleVolverCarrito}>
            Volver al carrito vacio
          </button>
        </div>

        <div className="checkout-success-right">
          <Summary total={total} count={productos.length} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
