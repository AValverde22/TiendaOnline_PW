import './App.css'
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import seriesApi from "./api/seriesApi.js";
import productosApi from './api/productosApi.js';
import bannerImg from './imagenes/Banner-publicidad.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState } from "react";
import CarritoApi from "./api/CarritoApi.js";
import "./componentes/Carrito/AgregarCarritoBoton/BotondeCarrito.css";

const series = seriesApi.get();
const productos = productosApi.get();
const topProducts = productos.slice(6,12);
const newProducts = productos.slice(0, 6);
const handleAgregarCarrito = (producto) => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuario) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    navigate("/login");
    return;
  }
  CarritoApi.agregarProducto({
    id: producto.id,
    nombre: producto.titulo,
    precio: producto.precio,
    imagen: producto.img,
    cantidad: 1
  });
  alert(`✅ ${producto.titulo} fue agregado al carrito.`);
};

function App() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const irACategoria = (nombreCategoria) => {
    navigate(`/Producto/categoria/${encodeURIComponent(nombreCategoria)}`);
  };
const banners = [
    "/src/imagenes/Banner-publicidad.png",
    "https://images.prismic.io/gamersfy/aIyAIKTt2nPbZovR_CABECERA-3-.png?auto=format,compress&rect=0,0,960,280&w=960&h=280",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/79ce18c9-5ca4-4487-a048-320543d4cbb6.__CR0,0,970,300_PT0_SX970_V1___.jpg"
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="landing-container">
      <Header />
      <main className='main-content'>

      {/* Banner */}
      <div className="banner">
        <button className="banner-arrow left" onClick={handlePrev}>
          ❮
        </button>

        <div className="banner-content">
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="banner-img"
          />
        </div>

        <button className="banner-arrow right" onClick={handleNext}>
          ❯
        </button>
      </div>

        <h2 className="title-categoria">Categorías populares</h2>
      <div className="categoria">
        <div className="categoria-card" onClick={() => irACategoria("Videojuegos")}>
          Videojuegos
        </div>
        <div className="categoria-card" onClick={() => irACategoria("Consolas")}>
          Consolas
        </div>
        <div className="categoria-card" onClick={() => irACategoria("Merch")}>
           Merch
        </div>
      </div>
        
        <div className="top-products">
          <h3>Videojuegos más vendidos</h3>
          <div className="top-products-list">
            {topProducts.map((game) => (
              <Link
                key={game.id}
                to={`/Producto/${game.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="product-card">
                  <img src={game.img} alt={game.titulo} className="product-img" />
                  <p>{game.titulo}</p>
                  <p>S/ {game.precio}</p>
                  <button className="boton-agregar" onClick={() => handleAgregarCarrito(game)}>
                    Agregar al carrito
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
            
        <div className="new-series">
          <h4>Sagas de videojuegos</h4>
          <div className="new-series-list">
          {series.map((serie) => (
            <Link
                key={serie.id}
                to={`/Serie/${serie.id}`} 
                style={{ textDecoration: "none", color: "inherit" }}
              >
            <div key={serie.id} className="series-panel">
              <img src={serie.img} alt={serie.nombre} className="series-img" />
              <h3>{serie.nombre}</h3>
            </div>
            </Link>
        ))}
          </div>
        </div>

        
        <div className="new-products">
          <h5>Nuevos Productos</h5>
          <div className="new-series-list">
            {newProducts.map((producto) => (
              <Link
                key={producto.id}
                to={`/Producto/${producto.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="product-card">
                  <img src={producto.img} alt={producto.titulo} className="product-img" />
                  <h3>{producto.titulo}</h3>
                  <p>S/ {producto.precio}</p>
                  <button className="boton-agregar" onClick={() => handleAgregarCarrito(game)}>
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