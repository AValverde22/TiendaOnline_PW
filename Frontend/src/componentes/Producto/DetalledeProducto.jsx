import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import categoriasApi from "../../api/categoriasApi.js";
import CarritoApi from "../../api/CarritoApi.js";
import Header from "../Header/Header";
import Footer from "../Footer/Footer.jsx";
import "./DetalledeProducto.css";
import "../Carrito/AgregarCarritoBoton/BotondeCarrito.css";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Estados para manejar los datos asíncronos
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("Cargando...");

  // 3. Efecto: Cargar los datos cuando cambia el ID
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // A. Obtener el producto principal
        const dataProducto = await productosApi.findById(id);

        // Si no existe, seteamos null y terminamos
        if (!dataProducto) {
          setProducto(null);
          return;
        }

        setProducto(dataProducto);

        // B. Obtener el nombre de la categoría (usando el ID que viene en el producto)
        if (dataProducto.categoriaId) {
          const dataCategoria = await categoriasApi.findOne(dataProducto.categoriaId);
          setNombreCategoria(dataCategoria ? dataCategoria.nombre : "Sin categoría");

          // C. Obtener productos relacionados
          // Nota: Lo ideal sería un endpoint backend para esto, pero por ahora traemos todos y filtramos
          const todosLosProductos = await productosApi.findAll();
          const filtrados = todosLosProductos
            .filter(p => p.categoriaId === dataProducto.categoriaId && p.id !== dataProducto.id)
            .slice(0, 3);

          setRelacionados(filtrados);
        }

      } catch (error) {
        console.error("Error al cargar detalle:", error);
      }
    };

    cargarDatos();
  }, [id]); // Se ejecuta cada vez que cambia el ID en la URL

  const handleAgregarCarrito = (prod) => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    CarritoApi.agregarProducto({
      id: prod.id,
      nombre: prod.nombre, // CAMBIO: titulo -> nombre
      precio: prod.precio,
      imagen: prod.img,
      cantidad: 1
    });
    alert(`✅ ${prod.nombre} fue agregado al carrito.`);
  };

  if (!producto) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Producto no encontrado</h2>
          <button className="btn-volver" onClick={() => navigate("/Producto")}>
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
          <img src={producto.img} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          {/* CAMBIO: titulo -> nombre */}
          <h1 className="detalle-titulo">{producto.nombre}</h1>

          <p className="detalle-categoria">Categoría: {nombreCategoria}</p>

          <p className="detalle-descripcion">{producto.descripcion}</p>
          <p className="detalle-precio">S/ {producto.precio}</p>

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
                  window.scrollTo(0, 0); // Sube al inicio al cambiar de producto
                }}
              >
                <img src={item.img} alt={item.nombre} />
                <h3>{item.nombre}</h3>
                <p className="precio-relacionado">S/ {item.precio}</p>
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