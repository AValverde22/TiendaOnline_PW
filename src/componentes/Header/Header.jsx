import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import seriesApi from "../../api/seriesApi.js";
import "./Header.css";

const Header = () => {
  const [busqueda, setBusqueda] = useState("");
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuarioLogueado');
        if (usuarioGuardado) {
            // Si hay un usuario en localStorage, lo guardamos en el estado
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);
    
  const handleLogout = () => {
        localStorage.removeItem('usuarioLogueado'); // Limpia el localStorage
        setUsuario(null); // Limpia el estado del componente
        navigate('/login'); // Redirige al login
    };

    
  const manejarBusqueda = (e) => setBusqueda(e.target.value);
  const ejecutarBusqueda = () => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return;

    // Buscar primero en productos
    const productos = productosApi.get();
    const productoEncontrado = productos.find((p) =>
      p.titulo.toLowerCase().includes(texto)
    );

    if (productoEncontrado) {
      navigate(`/Producto/${productoEncontrado.id}`);
      return;
    }

    // Buscar en series
    const series = seriesApi.get();
    const serieEncontrada = series.find((s) =>
      s.nombre.toLowerCase().includes(texto)
    );

    if (serieEncontrada) {
      navigate(`/serie/${serieEncontrada.id}`);
      return;
    }

    // Nada encontrado
    alert("No se encontró ningún producto o serie con ese nombre 😕");
  };

  return (
    <header className="header-bar">
      <div className="header-top container">
        <div className="marca">
        <img src="/src/imagenes/logo-generico-2.jpg" alt="logo" /><div className="logo">GamePlay</div>
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
          {!usuario ? (
                    // CASO 1: Usuario NO logueado
                    <Link to="/login">
                        <button className="btn-user">👤 Iniciar Sesión</button>
                    </Link>
                ) : usuario.rol === 'admin' ? (
                    // CASO 2: Usuario es ADMIN
                    <div className="user-menu">
                        <Link to="/DashboardAdmin">
                            <button className="btn-user">⚙️ Panel Admin</button>
                        </Link>
                    <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
                    </div>
                ) : (
                    // CASO 3: Usuario NORMAL logueado
                    <div className="user-menu">
                        <Link to="/perfil">
                            {/* Mostramos el nombre del usuario si está disponible */}
                            <button className="btn-user">👤 {usuario.nombre || 'Mi Perfil'}</button>
                        </Link>
                    <div className="user-menu">
                      <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
                    </div>
                    </div>
                )}
          
        </div>
        
      </div>

      <nav className="barra-menu">
        <div className="container">
          <ul>
            <li>Categorías</li>
            <Link to="/Producto" className="Link-sin-estilo" ><li>Productos</li></Link>
            <li>Nosotros</li>
            <li className="oferta">Ofertas</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
