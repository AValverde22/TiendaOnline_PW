import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './App.css';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import seriesApi from "./api/seriesApi.js";
import productosApi from './api/productosApi.js';
import CarritoApi from "./api/CarritoApi.js";
import "./componentes/Carrito/AgregarCarritoBoton/BotondeCarrito.css";

// 1. IMPORTAR EL HOOK DEL CONTEXTO
import { useUser } from "./api/context/UserContext.jsx"; // <--- Asegúrate de que la ruta sea correcta

function App() {
  const navigate = useNavigate();

  // 2. USAR EL HOOK CORRECTAMENTE (Como función, arriba del todo)
  // Esto reemplaza a: const usuario = JSON.parse(localStorage...)
  const { user } = useUser();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [productos, setProductos] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [listaProductos, listaSeries] = await Promise.all([
          productosApi.findAll(),
          seriesApi.findAll()
        ]);
        setProductos(listaProductos || []);
        setSeries(listaSeries || []);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const topProducts = productos.slice(6, 12);
  const newProducts = productos.slice(0, 6);

  const irACategoria = (nombreCategoria) => {
    navigate(`/Producto/categoria/${encodeURIComponent(nombreCategoria)}`);
  };

  const handleAgregarCarrito = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();

    // 3. USAR LA VARIABLE 'user' QUE OBTUVIMOS DEL HOOK
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    CarritoApi.agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.img,
      cantidad: 1
    });
    alert(`✅ ${producto.nombre} fue agregado al carrito.`);
  };

  const banners = [
    "/src/imagenes/Banner-publicidad.png",
    "https://images.prismic.io/gamersfy/aIyAIKTt2nPbZovR_CABECERA-3-.png?auto=format,compress&rect=0,0,960,280&w=960&h=280",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/79ce18c9-5ca4-4487-a048-320543d4cbb6.__CR0,0,970,300_PT0_SX970_V1___.jpg"
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => prev === banners.length - 1 ? 0 : prev + 1);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => prev === 0 ? banners.length - 1 : prev - 1);
  };

  if (loading) return <div className="loading" style={{ textAlign: 'center', padding: '50px' }}>Cargando tienda...</div>;

  return (
    <div className="landing-container">
      <Header />
      <main className='main-content'>

        {/* Banner */}
        <div className="banner">
          <button className="banner-arrow left" onClick={handlePrev}>❮</button>
          <div className="banner-content">
            <img src={banners[currentIndex]} alt="Banner" className="banner-img" />
          </div>
          <button className="banner-arrow right" onClick={handleNext}>❯</button>
        </div>

        {/* Categorías */}
        <h2 className="title-categoria">Categorías populares</h2>
        <div className="categoria">
          <div className="categoria-card" onClick={() => irACategoria("Videojuegos")}>Videojuegos</div>
          <div className="categoria-card" onClick={() => irACategoria("Consolas")}>Consolas</div>
          <div className="categoria-card" onClick={() => irACategoria("Merch")}>Merch</div>
        </div>

        {/* Top Products */}
        <div className="top-products">
          <h3>Videojuegos más vendidos</h3>
          <div className="top-products-list">
            {topProducts.map((game) => (
              <Link key={game.id} to={`/Producto/${game.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="product-card">
                  <img src={game.img} alt={game.nombre} className="product-img" loading="lazy" />
                  <p className="product-title">{game.nombre}</p>
                  <p className="product-price">S/ {game.precio}</p>
                  <button className="boton-agregar" onClick={(e) => handleAgregarCarrito(e, game)}>
                    Agregar al carrito
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Series */}
        <div className="new-series">
          <h4>Sagas de videojuegos</h4>
          <div className="new-series-list">
            {series.map((serie) => (
              <Link key={serie.id} to={`/Serie/${serie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="series-panel">
                  <img src={serie.img} alt={serie.nombre} className="series-img" loading="lazy" />
                  <h3>{serie.nombre}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Nuevos Productos */}
        <div className="new-products">
          <h5>Nuevos Productos</h5>
          <div className="new-series-list">
            {newProducts.map((producto) => (
              <Link key={producto.id} to={`/Producto/${producto.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="product-card">
                  <img src={producto.img} alt={producto.nombre} className="product-img" loading="lazy" />
                  <h3>{producto.nombre}</h3>
                  <p>S/ {producto.precio}</p>
                  <button className="boton-agregar" onClick={(e) => handleAgregarCarrito(e, producto)}>
                    Agregar al carrito
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default App;