import './App.css'
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import seriesApi from "./api/seriesApi.js";
import productosApi from './api/productosApi.js';
import bannerImg from './imagenes/Banner-publicidad.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const series = seriesApi.get();
const productos = productosApi.get();
const topProducts = productos.slice(6,12);
const newProducts = productos.slice(0, 6);

function App() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Header />
      <main className='main-content'>
          <div className="banner">
            <div className="banner-content">
              <img src={bannerImg} alt="Publicidad" className='banner-img' />
            </div>
          </div>

        <h2 className='title-categoria'>Categorías populares</h2> 
        <div className="categoria"> 
          <div className="categoria-card" onClick={() => {navigate("/DetalleDeCategoria")}}> Videojuegos</div>
          <div className="categoria-card">Consolas</div>
          <div className="categoria-card">Merch</div>
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
                to={`/Serie/${serie.id}`} // 👈 Aquí redirige a la página de esa saga
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