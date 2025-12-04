import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import categoriasApi from "../../api/categoriasApi.js";
import Header from "../Header/Header";
import Footer from "../Footer/Footer.jsx";
import CarritoApi from "../../api/carritoApi.js";
import "./Producto.css";
import "../Carrito/AgregarCarritoBoton/BotondeCarrito.css";

function Producto() {
  const navigate = useNavigate();
  const { nombreCategoria } = useParams();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const listaCategorias = await categoriasApi.findAll();
        setCategorias(listaCategorias);

        let listaProductos;
        if (nombreCategoria) {
          listaProductos = await productosApi.findByCategoria(nombreCategoria);
          console.log("Lista de productos:", listaProductos);
          const catEncontrada = listaCategorias.find(
            (c) => c.nombre.toLowerCase() === nombreCategoria.toLowerCase()
          );
          setCategoriaActiva(catEncontrada?.id || null);

        } else {
          listaProductos = await productosApi.findAll();
          setCategoriaActiva(null);
        }

        setProductos(listaProductos || []);

      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    cargarDatos();

  }, [nombreCategoria]);

  const handleAgregarCarrito = (producto) => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    CarritoApi.agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.img,
      cantidad: 1
    });
    alert(`✅ ${producto.nombre} fue agregado al carrito.`);
  };

  const handleFiltro = (idCategoria) => {
    if (!idCategoria) {
      navigate("/Producto");
      return;
    }
    const cat = categorias.find((c) => c.id === idCategoria);
    if (cat) {
      // Usamos encodeURIComponent por si la categoría tiene espacios o caracteres raros
      navigate(`/Producto/categoria/${encodeURIComponent(cat.nombre)}`);
    }
  };

  return (
    <>
      <Header />
      <div className="Producto-pagina">
        {/* SIDEBAR DE CATEGORÍAS */}
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

        {/* LISTA DE PRODUCTOS */}
        <div className="Producto-contenido">
          <h1>
            {nombreCategoria
              ? `Productos de ${decodeURIComponent(nombreCategoria)}`
              : "Todos los productos"}
          </h1>

          <div className="Producto-grupos">
            {productos.length > 0 ? (
              productos.map((item) => (
                <div
                  key={item.id}
                  className="Producto-tarjeta"
                  onClick={() => navigate(`/Producto/${item.id}`)}
                >
                  <img src={item.img} alt={item.nombre} />

                  {/* CAMBIO: titulo -> nombre */}
                  <h2>{item.nombre}</h2>

                  <p className="categoria">
                    {/* Buscamos el nombre de la categoría usando el ID */}
                    {item.categoriaProducto?.nombre || "General"}
                  </p>

                  <p className="precio">S/ {item.precio}</p>

                  <button
                    className="boton-agregar"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgregarCarrito(item);
                    }}
                  >
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