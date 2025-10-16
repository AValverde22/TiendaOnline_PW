import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import seriesApi from "../../api/seriesApi.js";
import "./Header.css";

const Header = () => {
  const [busqueda, setBusqueda] = useState("");
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    setUsuario(null);
    navigate("/login");
  };

  const manejarBusqueda = (e) => setBusqueda(e.target.value);

  const ejecutarBusqueda = () => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return;

    const productos = productosApi.get();
    const series = seriesApi.get();

    const productoEncontrado = productos.find(
      (p) => p.titulo.toLowerCase() === texto
    );

    if (productoEncontrado) {
      navigate(`/Producto/${productoEncontrado.id}`);
      return;
    }

    const serieEncontrada = series.find(
      (s) => s.nombre.toLowerCase() === texto
    );

    if (serieEncontrada) {
      navigate(`/serie/${serieEncontrada.id}`);
      return;
    }

    navigate(`/Producto?query=${encodeURIComponent(texto)}`);
  };

  return (
    <header className="header-bar">
      {/* Contenedor principal centrado */}
      <div className="container">
        <div className="header-top">
          {/* LOGO */}
          <Link to="/" className="marca Link-sin-estilo">
            <img
              src="/src/imagenes/logo-generico-2.jpg"
              alt="logo"
            />
            <div className="logo">GamePlay</div>
          </Link>

          {/* BUSCADOR */}
          <div className="buscador">
            <input
              placeholder="Buscar producto, serie o marca..."
              value={busqueda}
              onChange={manejarBusqueda}
            />
            <button onClick={ejecutarBusqueda}>🔍</button>
          </div>

          {/* ACCIONES */}
          <div className="acciones">
            <button
              className="btn-cart"
              onClick={() => navigate("/Carrito")}
            >
              🛒 Carrito
            </button>

            {!usuario ? (
              // Usuario no logueado
              <Link to="/login">
                <button className="btn-user">👤 Iniciar Sesión</button>
              </Link>
            ) : usuario.rol === "admin" ? (
              // Usuario admin
              <div className="user-menu">
                <Link to="/DashboardAdmin">
                  <button className="btn-user">⚙️ Panel Admin</button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              // Usuario normal logueado
              <div className="user-menu">
                <Link to="/MainPageUser">
                  <button className="btn-user">
                    👤 {usuario.nombre || "Mi Perfil"}
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú inferior */}
      <nav className="barra-menu">
        <div className="container">
          <ul>
            <Link to="/mostrarcategorias" className="Link-sin-estilo">
              <li>Categorías</li>
            </Link>
            <Link to="/Producto" className="Link-sin-estilo">
              <li>Productos</li>
            </Link>
            <Link to="/nosotros" className="Link-sin-estilo">
              <li>Nosotros</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
