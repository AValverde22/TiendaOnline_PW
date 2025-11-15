import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import productosApi from '../../api/productosApi';
import "./AgregarProducto.css";

const inicial = {
  nombre: '',
  presentacion: '',
  categoria: '',
  descripcion: '',
  stock: 0,
  img: '',

};
function AgregarProducto(){
    const { id } = useParams();
    const navigate = useNavigate();

    const Editar = Boolean(id); 

    const [producto, setProducto] = useState(inicial);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (Editar) {
            try {
                
                const productoFiltradoArray = productosApi.get().filter(p => p.id == id);

                
                if (productoFiltradoArray.length > 0) {
                    
                    setProducto(productoFiltradoArray[0]); 
                } else {
                    console.error(`Producto con ID ${id} no encontrado.`);
                    
                    navigate('/admin/productos');
                }
            } catch (error) {
                console.error("Error al filtrar los productos:", error);
            }
        }
  
    }, [id, Editar, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            if (Editar) { 

                productosApi.update(id, producto);
                alert('Producto actualizado con éxito');

            } else {

                productosApi.insert(producto);
                alert('Producto creado con éxito');
            }
            

        } catch (error) {
            console.error("Error al guardar el producto:", error);
            alert('Hubo un error al guardar el producto');
        }
    };


    return (
        
        <div className="form-container">
            <Header />

            <h1>{Editar ? 'Editar' : 'Agregar un producto'}</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="form-left">
                <label>Nombre del producto</label>
                <input type="text" name="nombre" value={producto.nombre} onChange={handleInputChange} />
                
                <label>Presentación</label>
                <input type="text" name="presentacion" value={producto.presentacion} onChange={handleInputChange} />

                <label>Categoría</label>
                <select name="categoria" value={producto.categoria} onChange={handleInputChange}>
                    <option value="">Seleccione una categoría</option>
                    <option value="Consola">Consola</option>
                    <option value="Videojuegos">Videojuegos</option>
                    <option value="Coleccionable">Coleccionable</option>
                </select>
                
                <label>Descripción</label>
                <textarea name="descripcion" value={producto.descripcion} onChange={handleInputChange}></textarea>
                </div>

                <div className="form-right">
                <label>Imagen</label>
                <div className="image-uploader">
                    {producto.img ? <img src={producto.img} alt="Vista previa"/> : <span>Arrastra tu imagen o selecciónala</span>}
                </div>
                <input type="text" name="img" placeholder="URL de la imagen" value={producto.img} onChange={handleInputChange} />


                <label>Stock</label>
                <input type="number" name="stock" value={producto.stock} onChange={handleInputChange} />
                
                <button type="submit" className="btn-submit">
                    {Editar ? '✓ Editar producto' : '✓ Crear producto'}
                </button>
                </div>
            </form>
            <Footer />
        </div>
  );
}
export default AgregarProducto;