import { useParams, Link } from "react-router-dom";
import seriesApi from "../../api/seriesApi";
import productosApi from "../../api/productosApi";
import "./Serie.css";

function Serie() {
  const { id } = useParams();
  const serie = seriesApi.get().find((s) => s.id === parseInt(id));
  const productos = productosApi.get();
  const juegosDeSerie = productos.filter((p) => p.id_serie === parseInt(id));

  if (!serie) return <h2>Serie no encontrada</h2>;

  return (
    <div className="serie-container">
      <div className="serie-header">
        <img src={serie.img} alt={serie.nombre} className="serie-banner" />
        <h1 className="serie-titulo">{serie.nombre}</h1>
        <p className="serie-descripcion">{serie.descripción}</p>
      </div>

      <h2 className="serie-subtitulo">Juegos de la saga</h2>
      <div className="serie-juegos-lista">
        {juegosDeSerie.map((juego) => (
          <Link key={juego.id} to={`/producto/${juego.id}`} className="serie-juego-card">
            <img src={juego.img} alt={juego.titulo} className="serie-juego-img" />
            <div className="serie-juego-info">
              <h3>{juego.titulo}</h3>
              <p>{juego.descripcion}</p>
              <p className="serie-precio">S/ {juego.precio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Serie;