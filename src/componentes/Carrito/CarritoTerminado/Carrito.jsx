import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import CarritoApi from "../../../api/CarritoApi.js";
import CartItem from "../CartItem/CartItem.jsx";
import Summary from "../Summary/Summary.jsx";
import Header from "../../Header/Header.jsx";
import "./Carrito.css";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProductos(CarritoApi.obtenerCarrito());
  }, []);

  const handleAumentar = (id) => {
    const item = productos.find((p) => p.id === id);
    CarritoApi.actualizarCantidad(id, item.cantidad + 1);
    setProductos(CarritoApi.obtenerCarrito());
  };

  const handleDisminuir = (id) => {
    const item = productos.find((p) => p.id === id);
    CarritoApi.actualizarCantidad(id, Math.max(1, item.cantidad - 1));
    setProductos(CarritoApi.obtenerCarrito());
  };

  const handleEliminar = (id) => {
    CarritoApi.eliminarProducto(id);
    setProductos(CarritoApi.obtenerCarrito());
  };

  const handleVaciar = () => {
    CarritoApi.vaciarCarrito();
    setProductos([]);
  };

  const total = productos.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  const handleContinuarCompra = () => {
    navigate("/Checkout1"); 
  };

  return (
    <div className="carrito-page">
      <Header />
      <div className="carrito-container">
        <div className="carrito-left">
          <h2>Tu carrito</h2>
          {productos.length === 0 ? (
            <p className="vacio">Tu carrito está vacío 🛍️</p>
          ) : (
            <>
              {productos.map((p) => (
                <CartItem
                  key={p.id}
                  producto={p}
                  onAumentar={() => handleAumentar(p.id)}
                  onDisminuir={() => handleDisminuir(p.id)}
                  onEliminar={() => handleEliminar(p.id)}
                />
              ))}
              <button className="vaciar-btn" onClick={handleVaciar}>
                Vaciar carrito
              </button>
            </>
          )}
        </div>

        <div className="carrito-right">
          <Summary total={total} count={productos.length} />
          <button
            className="continuar-btn"
            onClick={handleContinuarCompra}
          >
            Continuar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
