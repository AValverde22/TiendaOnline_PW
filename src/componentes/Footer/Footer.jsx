import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <b>Contáctanos por:</b>
      <div className="footer-links">
        Correo: <a className="footer-link" href="#">gameplay@email.com</a>
        Telf: <a className="footer-link" href="#"> +51 999 999 998</a>
        LinkedIn:<a className="footer-link" href="#">Gameplay-videojuegos</a>
      </div>
    </footer>
  );
}

export default Footer;
