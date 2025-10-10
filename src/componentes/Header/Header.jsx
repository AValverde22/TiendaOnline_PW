import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [busqueda, setBusqueda] = useState("");

  const manejarBusqueda = (e) => setBusqueda(e.target.value);
  const ejecutarBusqueda = () => alert(`Buscar: ${busqueda || "(vacío)"}`);

  return (
    <header className="header-bar">
      <div className="header-top container">
        <div className="marca">
          <div className="logo">GamePlay <span className="logo-dot">•</span></div>
        </div>

        <div className="buscador">
          <input
            placeholder="Buscar producto, serie o marca..."
            value={busqueda}
            onChange={manejarBusqueda}
          />
          <button onClick={ejecutarBusqueda}>🔍</button>
        </div>

        <div className="acciones">
          <button className="btn-cart">🛒 Carrito</button>
          <Link to="Login">
            <button className="btn-user">👤 Usuario</button>
          </Link>
        </div>
      </div>

      <nav className="barra-menu">
        <div className="container">
          <ul>
            <li>Categorías</li>
            <li>Productos</li>
            <li>Nosotros</li>
            <li className="oferta">Ofertas</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
