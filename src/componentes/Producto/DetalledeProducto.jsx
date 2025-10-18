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

  const productos = productosApi.get();
  const categorias = categoriasApi.get();

  const producto = productos.find((p) => p.id === parseInt(id));

  const handleAgregarCarrito = (producto) => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuario) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    navigate("/login");
    return;
  }
  CarritoApi.agregarProducto({
    id: producto.id,
    nombre: producto.titulo,
    precio: producto.precio,
    imagen: producto.img,
    cantidad: 1
  });
  alert(` ${producto.titulo} fue agregado al carrito.`);
};

  if (!producto) {
    return (
      <>
        <Header />
        <h2>
          Producto no encontrado 
        </h2>
        <Footer />
      </>
    );
  }

  
  const categoria =
    categorias.find((c) => c.id === producto.ID_Categoria)?.nombre ||
    "Sin categoría";

  
  const relacionados = productos
    .filter(
      (p) =>
        p.ID_Categoria === producto.ID_Categoria && p.id !== producto.id
    )
    .slice(0, 3); 

  return (
    <>
      <Header />
      <div className="detalle-container">
        <div className="detalle-imagen">
          <img src={producto.img} alt={producto.titulo} />
        </div>

        <div className="detalle-info">
          <h1 className="detalle-titulo">{producto.titulo}</h1>
          <p className="detalle-categoria">Categoría: {categoria}</p>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          <p className="detalle-precio">S/ {producto.precio}</p>
          <button className="boton-agregar" onClick={() => handleAgregarCarrito(producto)} >
            Agregar al carrito
          </button>
          <button className="btn-volver" onClick={() => navigate(-1)}>
            ⬅ Volver
          </button>
        </div>
      </div>

      {/*Sección de productos relacionados */}
      {relacionados.length > 0 && (
        <div className="relacionados-section">
          <h2>Productos relacionados</h2>
          <div className="relacionados-grid">
            {relacionados.map((item) => (
              <div
                key={item.id}
                className="relacionado-tarjeta"
                onClick={() => navigate(`/Producto/${item.id}`)}
              >
                <img src={item.img} alt={item.titulo} />
                <h3>{item.titulo}</h3>
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
