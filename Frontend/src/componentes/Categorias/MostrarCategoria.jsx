import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import categoriasApi from "../../api/categoriasApi.js";
import "./MostrarCategoria.css";

function MostrarCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Añadimos estado de carga
  const [error, setError] = useState(null); // 👈 Añadimos estado de error
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamada asíncrona al API
        const data = await categoriasApi.findAll();

        // ⚠️ Aseguramos que la respuesta sea un array, si tu API lo devuelve anidado, ajusta aquí.
        const categoriasArray = Array.isArray(data) ? data : (data.categorias || data.data || []);

        setCategorias(categoriasArray);

      } catch (err) {
        console.error("Error al cargar categorías:", err);
        setError("Error al cargar las categorías. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    obtenerCategorias();
  }, []);

  const irAProductosDeCategoria = (nombreCategoria) => {
    // Usamos el endpoint que definiste: /Producto/categoria/nombre
    navigate(`/Producto/categoria/${encodeURIComponent(nombreCategoria)}`);
  };

  // --- Renderizado Condicional ---

  if (loading) {
    return (
      <>
        <Header />
        <main className="categorias-container">
          <h1 className="categorias-titulo">Cargando Categorías... 🔄</h1>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="categorias-container">
          <h1 className="categorias-titulo">Error de Carga</h1>
          <p className="error-message">{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (categorias.length === 0) {
    return (
      <>
        <Header />
        <main className="categorias-container">
          <h1 className="categorias-titulo">Categorías</h1>
          <p className="categorias-intro">No se encontraron categorías disponibles en este momento.</p>
        </main>
        <Footer />
      </>
    );
  }

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

        {/* Renderizado de las tarjetas de categoría */}
        <div className="categorias-grid">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="categoria-card"
              onClick={() => irAProductosDeCategoria(categoria.nombre)}
            >
              {/* ⚠️ Nota: Asegúrate que el campo 'img' exista en tu base de datos o ajusta el nombre si es diferente (ej: urlLogo) */}
              <img
                src={categoria.img || 'placeholder.jpg'} // Uso de placeholder por si falta la imagen
                alt={categoria.nombre}
                className="categoria-img"
              />
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