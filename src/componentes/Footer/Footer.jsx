import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Descripción */}
        <div className="footer-section">
          <div className="footer-logo">
              <img src="/src/imagenes/logo-generico-2.jpg" alt="logo" className="footer-logo-img" />
              <h2>GamePlay</h2>
          </div>
          <p className="footer-description">
            Tu tienda gamer de confianza. Consolas, videojuegos, coleccionables y mucho más.
          </p>
        </div>

        {/* Enlaces */}
        <div className="footer-section">
          <h3>Enlaces útiles</h3>
          <ul className="footer-list">
            <li><a href="/" className="footer-link">Inicio</a></li>
            <li><a href="/Producto" className="footer-link">Productos</a></li>
            <li><a href="/nosotros" className="footer-link">Nosotros</a></li>
          </ul>
        </div>

        {/* Contactos */}
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <ul className="footer-list">
            <li>📧 <a href="mailto:gameplay@email.com" className="footer-link">gameplay@email.com</a></li>
            <li>📞 <a href="tel:+51999999998" className="footer-link">+51 999 999 998</a></li>
            <li>📍 Av. Los Olivos 123, Lima, Perú</li>
          </ul>
        </div>

        </div>
        {/* Declaración de copyright*/}
        <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GamePlay. Todos los derechos reservados.</p>
      </div>
    </footer>
  
  );
}

export default Footer;
