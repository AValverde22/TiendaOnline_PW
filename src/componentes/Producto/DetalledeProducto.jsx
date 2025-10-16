import { useParams, useNavigate } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import Header from '../Header/Header';
import "./DetalledeProducto.css";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productos = productosApi.get();
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <div className="Producto-elemento">
      <img src={producto.img} alt={producto.titulo} />
      <h1>{producto.titulo}</h1>
      <h3> ID de categoria: {producto.ID_Categoria}</h3>
      <p>{producto.descripcion}</p>
      <p className="Producto-precio" >Precio: S/ {producto.precio}</p>

    </div>
  );
}

export default DetalleProducto;