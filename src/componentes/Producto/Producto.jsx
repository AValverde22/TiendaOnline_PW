import { useNavigate, useParams } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import categoriasApi from "../../api/categoriasApi.js";
import Header from "../Header/Header";
import Footer from "../Footer/Footer.jsx";
import "./Producto.css";
import { useState, useEffect } from "react";
import CarritoApi from "../../api/CarritoApi.js";
import "../Carrito/AgregarCarritoBoton/BotondeCarrito.css";

function Producto() {
  const navigate = useNavigate();
  const { nombreCategoria } = useParams();
  const productos = productosApi.get();
  const categorias = categoriasApi.get();

  const [categoriaActiva, setCategoriaActiva] = useState(null);
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
  alert(`✅ ${producto.titulo} fue agregado al carrito.`);
};


  useEffect(() => {
    if (nombreCategoria) {
      const encontrada = categorias.find(
        (c) => c.nombre.toLowerCase() === nombreCategoria.toLowerCase()
      );
      console.log("Buscando categoría:", nombreCategoria, "Encontrada:", encontrada);
      setCategoriaActiva(encontrada?.id || null);
    } else {
      setCategoriaActiva(null);
    }
  }, [nombreCategoria]);

  const productosFiltrados = categoriaActiva
    ? productos.filter((p) => p.ID_Categoria === categoriaActiva)
    : productos;

  const handleFiltro = (idCategoria) => {
    setCategoriaActiva(idCategoria);
    if (!idCategoria) {
      navigate("/Producto");
      return;
    }
    const cat = categorias.find((c) => c.id === idCategoria);
    navigate(`/Producto/categoria/${cat.nombre}`);
  };

  return (
    <>
      <Header />
      <div className="Producto-pagina">
        <aside className="Producto-sidebar">
          <h2>Categorías</h2>
          <ul>
            <li
              className={!categoriaActiva ? "activo" : ""}
              onClick={() => handleFiltro(null)}
            >
              Todas
            </li>
            {categorias.map((cat) => (
              <li
                key={cat.id}
                className={categoriaActiva === cat.id ? "activo" : ""}
                onClick={() => handleFiltro(cat.id)}
              >
                {cat.nombre}
              </li>
            ))}
          </ul>
        </aside>

        <div className="Producto-contenido">
          <h1>
            {nombreCategoria
              ? `Productos de ${nombreCategoria}`
              : "Todos los productos"}
          </h1>

          <div className="Producto-grupos">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="Producto-tarjeta"
                  onClick={() => navigate(`/Producto/${item.id}`)}
                >
                  <img src={item.img} alt={item.titulo} />
                  <h2>{item.titulo}</h2>
                  <p className="categoria">
                    {categorias.find((c) => c.id === item.ID_Categoria)?.nombre}
                  </p>
                  <p className="precio">S/ {item.precio}</p>
                  <button className="boton-agregar" onClick={(e) => { e.stopPropagation();handleAgregarCarrito(item);}}>
                     Agregar al carrito
                  </button>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles en esta categoría.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Producto;
