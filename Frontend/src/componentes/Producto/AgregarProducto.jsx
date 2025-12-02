import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import productosApi from '../../api/productosApi';
import categoriasApi from '../../api/categoriasApi';
import { useUser } from '../../api/context/UserContext.jsx'; 
import "./AgregarProducto.css";

// Estado inicial (Sin presentación)
const inicial = {
  nombre: '',
  marca: '',
  categoriaId: '', 
  descripcion: '',
  stock: 0,
  precio: 0,       
  img: '',
};

function AgregarProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const esEdicion = Boolean(id);

    const { token } = useUser();              // <-- AÑADIDO

    const [producto, setProducto] = useState(inicial);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Cargar Datos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar Categorías
                const respCategorias = await categoriasApi.findAll();
                const cats = Array.isArray(respCategorias) ? respCategorias : (respCategorias.data || []);
                setListaCategorias(cats);

                // Cargar Producto si es edición
                if (esEdicion) {
                    const dataProducto = await productosApi.findById(id);
                    if (dataProducto) {
                        setProducto({
                            ...dataProducto,
                            idCategoria: dataProducto.categoriaProducto?.id || '', // actualizar el idCategoria
                            stock: Number(dataProducto.stock),
                            precio: Number(dataProducto.precio)
                        });
                    } else {
                        alert("Producto no encontrado");
                        navigate('/ListadoProductos');
                    }
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        cargarDatos();
    }, [id, esEdicion, navigate]);


    // 2. Manejo de Inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: ['idCategoria', 'stock', 'precio'].includes(name) ? Number(value) : value
        });
    };



    // 3. Guardar
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const datosAEnviar = {
            nombre: producto.nombre,
            marca: producto.marca,
            descripcion: producto.descripcion,
            img: producto.img,
            stock: Number(producto.stock),
            precio: Number(producto.precio),
            idCategoria: Number(producto.idCategoria),
        };

        try {
            if (esEdicion) { 
                await productosApi.update(id, datosAEnviar, token);   // <-- TOKEN AÑADIDO
                alert('✅ Producto actualizado con éxito');
            } else {
                await productosApi.create(datosAEnviar, token);       // <-- TOKEN AÑADIDO
                alert('✅ Producto creado con éxito');
            }

            navigate('/ListadoProductos');

        } catch (error) {
            console.error("Error al guardar:", error);
            alert('❌ Hubo un error al guardar. Revisa la consola.');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page-container">
            <Header />
            <div className="form-content-wrapper">
                <h1 className="form-title">{esEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h1>
                
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-grid">
                        {/* COLUMNA IZQUIERDA */}
                        <div className="form-column">
                            <div className="form-group">
                                <label>Nombre del producto</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    value={producto.nombre} 
                                    onChange={handleInputChange} 
                                    required 
                                    placeholder="Ej: Laptop Gamer"
                                />
                            </div>

                            <div className="form-group">
                                <label>Marca</label>
                                <input 
                                    type="text" 
                                    name="marca" 
                                    value={producto.marca} 
                                    onChange={handleInputChange} 
                                    required 
                                    placeholder="Ej: Sony, Dell, Nintendo"
                                />
                            </div>

                            <div className="form-group">
                                <label>Categoría</label>
                                    <select
                                    name="idCategoria"
                                    value={producto.idCategoria || producto.categoriaProducto?.id || ''}
                                    onChange={handleInputChange}
                                    required
                                    >
                                    <option value="">Seleccione una categoría</option>
                                    {listaCategorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                    </select>

                            </div>
                            
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea 
                                    name="descripcion" 
                                    value={producto.descripcion} 
                                    onChange={handleInputChange}
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA */}
                        <div className="form-column">
                            <label>Imagen</label>
                            <div className="image-preview-box">
                                {producto.img ? (
                                    <img src={producto.img} alt="Vista previa" />
                                ) : (
                                    <div className="placeholder-text">Vista previa</div>
                                )}
                            </div>
                            <input 
                                type="text" 
                                name="img" 
                                className="img-input"
                                placeholder="Pega la URL de la imagen aquí" 
                                value={producto.img} 
                                onChange={handleInputChange} 
                            />

                            <div className="form-row-split">
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input 
                                        type="number" 
                                        name="stock" 
                                        value={producto.stock} 
                                        onChange={handleInputChange} 
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio (S/)</label>
                                    <input 
                                        type="number" 
                                        name="precio" 
                                        value={producto.precio} 
                                        onChange={handleInputChange} 
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>
                            
                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? 'Guardando...' : (esEdicion ? 'Guardar Cambios' : 'Crear Producto')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AgregarProducto;