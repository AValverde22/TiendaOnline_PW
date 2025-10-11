import './App.css'
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import './componentes/landing.css';
import topGames from './componentes/TopGames.jsx';

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


        <div className="categoria">
          <div className="categoria-card">Acción</div>
          <div className="categoria-card">Fantasía</div>
          <div className="categoria-card">Competitivo</div>
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
          <h4>Nuevas Series</h4>
          <div className="new-series-list">
            <div className="series-panel">Serie nueva 1</div>
            <div className="series-panel">Serie nueva 2</div>
            <div className="series-panel">Serie nueva 3</div>
            </div>
        </div>
        <div className="new-products">
          <h5>Nuevos Productos</h5>
          {[...Array(6)].map((_, i) => (
            <div className="product-card" key={i}>Producto nuevo #{i+1}</div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;