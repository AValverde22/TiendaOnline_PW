import { useNavigate } from "react-router-dom";
import productosApi from "../../api/productosApi.js";
import Header from '../Header/Header';
import "./Producto.css"

const productos = productosApi.get();

function Producto(){
    const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="Producto-lista">
        <h1>Lista de Productos</h1>

        <div className="Producto-grupos">
          {productos.map((item) => (
            <div key={item.id} className="Producto-tarjeta" onClick={() => navigate(`/Producto/${item.id}`)}>
              <img src={item.img} alt={item.nombre} />
              <h2>{item.titulo}</h2>
              <p>{item.ID_Categoria}</p>
              <p>S/ {item.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </>
    
  );
}

export default Producto;