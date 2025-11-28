import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import categoriasApi from "../../api/categoriasApi.js";
import "./MostrarCategoria.css";

function MostrarCategoria() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const data = await categoriasApi.findAll();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    obtenerCategorias();
  }, []);

  const irAProductosDeCategoria = (nombreCategoria) => {
    navigate(`/Producto/categoria/${encodeURIComponent(nombreCategoria)}`);
  };

  return (
    <>
      <Header />
      <main className="categorias-container">
        <h1 className="categorias-titulo">Categorías de productos</h1>
        <p className="categorias-intro">
          Explora todas las categorías que tenemos en <strong>GamePlay</strong>.
          Desde consolas y videojuegos hasta accesorios, ropa y merchandising.
          ¡Encuentra lo que necesitas para llevar tu experiencia gamer al siguiente nivel!
        </p>

        <div className="categorias-grid">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="categoria-card" onClick={() => irAProductosDeCategoria(categoria.nombre)}>
              <img src={categoria.img} alt={categoria.nombre} className="categoria-img" />
              <h2 className="categoria-nombre">{categoria.nombre}</h2>
              <p className="categoria-descripcion">{categoria.descripcion}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MostrarCategoria;
