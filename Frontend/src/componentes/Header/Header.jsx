import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Asumiendo que estas rutas siguen existiendo en tu proyecto
import productosApi from "../../api/productosApi.js";
import seriesApi from "../../api/seriesApi.js";
import "./Header.css";

// IMPORTAMOS EL CONTEXTO
import { useUser } from "../../api/context/UserContext.jsx";

const Header = () => {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  // CONECTAMOS CON EL CONTEXTO
  // Extraemos lo que necesitamos: el usuario actual, si está logueado y la función de salir
  const { user, isAuthenticated, logout } = useUser();

  const handleLogout = () => {
    logout(); // El contexto se encarga de limpiar el localStorage y el estado
    navigate("/login");
  };

  // --- Lógica de Búsqueda (Se mantiene igual) ---
  const manejarBusqueda = (e) => setBusqueda(e.target.value);

  const ejecutarBusqueda = async () => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return;

    try {
      // Usamos findAll que es la función correcta y es asíncrona
      const productos = await productosApi.findAll() || [];
      const series = await seriesApi.findAll() || [];

      const productoEncontrado = productos.find(
        (p) => p.titulo && p.titulo.toLowerCase() === texto
      );

      if (productoEncontrado) {
        navigate(`/Producto/${productoEncontrado.id}`);
        return;
      }

      const serieEncontrada = series.find(
        (s) => s.nombre && s.nombre.toLowerCase() === texto
      );

      if (serieEncontrada) {
        navigate(`/serie/${serieEncontrada.id}`);
        return;
      }

      navigate(`/Producto?query=${encodeURIComponent(texto)}`);
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  };
  // ---------------------------------------------

  return (
    <header className="header-bar">
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
              onChange={(e) => manejarBusqueda(e)}
              onKeyDown={(e) => e.key === 'Enter' && ejecutarBusqueda()} // UX: Buscar al dar Enter
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

            {/* === AQUÍ OCURRE LA MAGIA DEL CONTEXTO === */}

            {!isAuthenticated ? (
              // CASO 1: NO LOGUEADO
              <Link to="/login">
                <button className="btn-user">👤 Iniciar Sesión</button>
              </Link>
            ) : (
              // CASO 2: LOGUEADO (Verificamos Rol)
              // Nota: En BD insertamos 'ADMIN', así que comparamos con mayúsculas
              user?.rol === "ADMIN" ? (
                // Sub-caso: Es Admin
                <div className="user-menu">
                  {/* Botón extra solo para ver que es admin */}
                  <span style={{ fontSize: '12px', marginRight: '5px', fontWeight: 'bold' }}>[ADMIN]</span>

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
                // Sub-caso: Usuario Normal
                <div className="user-menu">
                  <Link to="/MainPageUser">
                    <button className="btn-user">
                      {/* Usamos user.nombre del contexto */}
                      👤 {user?.nombre || "Mi Perfil"}
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-logout"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )
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