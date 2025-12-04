import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import categoriasApi from "../../api/categoriasApi.js";
import CarritoApi from "../../api/carritoApi.js";
import { useUser } from "../../api/context/UserContext"; 

import Header from "../Header/Header";
import Footer from "../Footer/Footer.jsx";
import "./DetalledeProducto.css";
import "../Carrito/AgregarCarritoBoton/BotondeCarrito.css"; // Asegúrate de que esta ruta sea correcta

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("Cargando...");
  const [loading, setLoading] = useState(true); // Estado de carga para mejor UX

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        // A. Obtener producto actual
        const dataProducto = await productosApi.findById(id);

        if (!dataProducto) {
          setProducto(null);
          return;
        }
        setProducto(dataProducto);

        // Identificar el ID de la categoría (normalizando nombres posibles)
        // A veces las APIs devuelven 'idCategoria', 'categoriaId' o 'category_id'
        const catId = dataProducto.idCategoria || dataProducto.categoriaId;

        // B. Obtener nombre de la categoría
        if (catId) {
          try {
             // Verificamos si existe la función, si no, intentamos un fallback seguro
             const dataCategoria = categoriasApi.findOne 
                ? await categoriasApi.findOne(catId) 
                : null;
             
             setNombreCategoria(dataCategoria?.nombre || "Categoría");
          } catch (err) {
             setNombreCategoria("General");
          }

          // C. Obtener relacionados (Lógica Temporal del lado del Cliente)
          // NOTA: Idealmente esto debe ser un endpoint del backend: /productos?categoria=X
          try {
            const todosLosProductos = await productosApi.findAll();
            const listaProductos = Array.isArray(todosLosProductos) ? todosLosProductos : todosLosProductos.data;

            if (Array.isArray(listaProductos)) {
              const filtrados = listaProductos
                .filter(p => {
                  // Normalizamos la comparación de IDs
                  const pCatId = p.idCategoria || p.categoriaId;
                  // Debe ser misma categoría Y NO ser el mismo producto actual
                  return pCatId === catId && String(p.id) !== String(id);
                })
                .slice(0, 3); // Tomamos solo 3

              setRelacionados(filtrados);
            }
          } catch (error) {
            console.warn("No se pudieron cargar relacionados", error);
          }
        }
      } catch (error) {
        console.error("Error crítico al cargar detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
    window.scrollTo(0, 0); 
  }, [id]);

  const handleAgregarCarrito = async (prod) => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login"); // Ajusta la ruta a tu Login real
      return;
    }

    try {
        await CarritoApi.agregarProducto({
          id: prod.id,
          nombre: prod.nombre,
          precio: prod.precio,
          imagen: prod.img,
          cantidad: 1
        });
        alert(`✅ ${prod.nombre} fue agregado al carrito.`);
    } catch (error) {
        console.error(error);
        alert("Error al agregar al carrito.");
    }
  };

  if (loading) return <div style={{padding: "100px", textAlign: "center"}}>Cargando producto...</div>;

  if (!producto) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", padding: "100px 20px", minHeight: "50vh" }}>
          <h2>Producto no encontrado</h2>
          <button className="btn-volver" onClick={() => navigate("/ListadoProductos")}>
            Ver catálogo
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="detalle-wrapper"> {/* Wrapper para centrar contenido */}
          <div className="detalle-container">
            <div className="detalle-imagen">
              <img src={producto.img || 'https://via.placeholder.com/300'} alt={producto.nombre} />
            </div>

            <div className="detalle-info">
              <h1 className="detalle-titulo">{producto.nombre}</h1>
              <p className="detalle-categoria">Categoría: <strong>{nombreCategoria}</strong></p>
              <p className="detalle-descripcion">{producto.descripcion}</p>
              <p className="detalle-precio">S/ {Number(producto.precio).toFixed(2)}</p>

              <div className="botones-detalle">
                <button className="boton-agregar" onClick={() => handleAgregarCarrito(producto)}>
                  Agregar al carrito
                </button>
                <button className="btn-volver" onClick={() => navigate(-1)}>
                  ⬅ Volver
                </button>
              </div>
            </div>
          </div>

          {/* Sección de productos relacionados */}
          {relacionados.length > 0 && (
            <div className="relacionados-section">
              <h2 className="relacionados-titulo">También te podría interesar</h2>
              <div className="relacionados-grid">
                {relacionados.map((item) => (
                  <div
                    key={item.id}
                    className="relacionado-tarjeta"
                    onClick={() => navigate(`/Producto/${item.id}`)}
                  >
                    <div className="img-container">
                        <img src={item.img} alt={item.nombre} />
                    </div>
                    <h3>{item.nombre}</h3>
                    <p className="precio-relacionado">S/ {Number(item.precio).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <Footer />
    </>
  );
}

export default DetalleProducto;