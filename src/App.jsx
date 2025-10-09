import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header';

import Footer from './Footer';
import './landing.css';
import publicidad from './imagenes/Banner-publicidad.png';
import topGames from './TopGames.jsx';

/* Página Principal (incluye top bar y footer)
Resultados de búsqueda
Detalle de producto (antes de agregar a carrito)
*/

function App() {

  return (
    <div className="landing-container">
      <Header />
      <main>
        <div className="top-part">
          <div className="top-part-content">
            <div className="top-part-card">Categorías</div>
            <div className="top-part-card">Productos</div>
            <div className="top-part-card">Nosotros</div>
          </div>
        </div>
        
          <div className="banner">
            <div className="banner-content">
              <img src={publicidad} alt="Publicidad" className='banner-img' />
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
                {game.nombre}
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

export default App
