import './App.css'
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import './componentes/landing.css';
import topGames from './componentes/TopGames.jsx';
import seriesApi from "./api/seriesApi.js";
import productosApi from './api/productosApi.js';
/*div className="product-card" */
const series = seriesApi.get();
const productos = productosApi.get();

function App() {

  return (
    <div className="landing-container">
      <Header />
      <main>
          <div className="banner">
            <div className="banner-content">
              <img src='src/imagenes/Banner-publicidad.png' alt="Publicidad" className='banner-img' />
            </div>
          </div>

        <b className='title-categoria'>Categorías populares</b> 
        <div className="categoria"> 
          <div className="categoria-card">Videojuegos</div>
          <div className="categoria-card">Consolas</div>
          <div className="categoria-card">Merch</div>
        </div>
        
        <div className="top-products">
          <h3>Videojuegos más vendidos</h3>
          <div className="top-products-list">
                {topGames.map((game, idx) => (
            <div className="product-card" key={idx}>
              <img src={game.img} alt={game.nombre} className="product-img" />
              <p>{game.nombre}</p>
            </div>
          ))} 
          </div>
        </div>
            
        <div className="new-series">
          <h4>Sagas de videojuegos</h4>
          <div className="new-series-list">
          {series.map((serie) => (
            <div key={serie.id} className="series-panel">
              <img src={serie.img} alt={serie.nombre} className="series-img" />
              <h3>{serie.nombre}</h3>
            </div>
        ))}
          </div>
        </div>

        
        <div className="new-series">
          <h5>Nuevos Productos</h5>
          <div className="new-series-list">
          {productos.map((producto) => (
            <div key={producto.id} className="series-panel">
              <img src={producto.img} alt={producto.nombre} className="series-img" />
              <h3>{producto.titulo}</h3>
              <p>S/{producto.precio}</p>
            </div>
        ))}
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;