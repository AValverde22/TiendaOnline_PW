import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import categoriasApi from "../../api/categoriasApi.js";
import CarritoApi from "../../api/CarritoApi.js";
import { useUser } from "../../api/context/UserContext"; // <--- 1. IMPORTAR CONTEXTO

import Header from "../Header/Header";
import Footer from "../Footer/Footer.jsx";
import "./DetalledeProducto.css";
import "../Carrito/AgregarCarritoBoton/BotondeCarrito.css";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 2. USAR EL CONTEXTO (Para saber si está logueado de verdad)
  const { isAuthenticated } = useUser();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("Cargando...");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // A. Obtener producto
        const dataProducto = await productosApi.findById(id);

        if (!dataProducto) {
          setProducto(null);
          return;
        }

        setProducto(dataProducto);

        // B. Obtener categoría y relacionados
        if (dataProducto.categoriaId) {
          // Obtener nombre categoría
          try {
             // Asumiendo que tu API de categorías tiene findById o findOne
             const dataCategoria = await categoriasApi.findOne 
                ? await categoriasApi.findOne(dataProducto.categoriaId)
                : { nombre: "Categoría" }; // Fallback por si la función no existe
             
             setNombreCategoria(dataCategoria ? dataCategoria.nombre : "Sin categoría");
          } catch (err) {
             setNombreCategoria("General");
          }

          // Obtener relacionados
          const todosLosProductos = await productosApi.findAll();
          const listaProductos = Array.isArray(todosLosProductos) ? todosLosProductos : todosLosProductos.data;
          
          if (Array.isArray(listaProductos)) {
              const filtrados = listaProductos
                .filter(p => p.categoriaId === dataProducto.categoriaId && p.id !== dataProducto.id)
                .slice(0, 3);
              setRelacionados(filtrados);
          }
        }
      } catch (error) {
        console.error("Error al cargar detalle:", error);
      }
    };

    cargarDatos();
    window.scrollTo(0, 0); // Truco: Subir al inicio al cargar
  }, [id]);

  const handleAgregarCarrito = (prod) => {
    // 3. VALIDACIÓN USANDO CONTEXTO (Más seguro)
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/"); // Redirige al Login (que está en la raíz '/')
      return;
    }

    try {
        CarritoApi.agregarProducto({
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

  if (!producto) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", padding: "100px 20px", minHeight: "50vh" }}>
          <h2>Producto no encontrado</h2>
          <p>Lo sentimos, el producto que buscas no existe o fue eliminado.</p>
          <button className="btn-volver" onClick={() => navigate("/ListadoProductos")} style={{marginTop: '20px'}}>
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
          <h2>Productos relacionados</h2>
          <div className="relacionados-grid">
            {relacionados.map((item) => (
              <div
                key={item.id}
                className="relacionado-tarjeta"
                onClick={() => {
                  navigate(`/Producto/${item.id}`);
                }}
              >
                <img src={item.img} alt={item.nombre} />
                <h3>{item.nombre}</h3>
                <p className="precio-relacionado">S/ {Number(item.precio).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default DetalleProducto;