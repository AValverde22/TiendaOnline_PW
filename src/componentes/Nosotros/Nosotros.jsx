import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Nosotros.css";

function Nosotros() {
  return (
    <>
      <Header />
      <main className="nosotros-container">
        <section className="nosotros-info">
          <h1 className="nosotros-titulo">🎮 GamePlay</h1>
          <p className="nosotros-descripcion">
            En <strong>GamePlay</strong>, vivimos y respiramos videojuegos. 
            Somos una tienda creada por y para gamers, donde encontrarás todo lo que necesitas 
            para llevar tu experiencia de juego al siguiente nivel. 
            Desde las consolas más potentes y videojuegos de última generación, 
            hasta periféricos, ropa temática y artículos coleccionables de tus sagas favoritas.  
          </p>

          <p className="nosotros-descripcion">
            Nos apasiona brindar una atención cercana y personalizada, 
            garantizando productos 100% originales y un servicio confiable. 
            Nuestro objetivo es ser el punto de encuentro de todos los jugadores, 
            un lugar donde la pasión por los videojuegos une a toda la comunidad gamer.
          </p>

          <p className="nosotros-descripcion">
            Con <strong>GamePlay</strong>, no solo compras videojuegos: 
            entras a formar parte de una experiencia gamer completa, 
            llena de diversión, tecnología y emoción. 🚀
          </p>
        </section>

        <section className="nosotros-imagen">
          <img
            src="/src/imagenes/logo-generico-2.jpg"
            alt="GamePlay logo"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Nosotros;
