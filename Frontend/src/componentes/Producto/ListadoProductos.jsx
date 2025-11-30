import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import productosApi from '../../api/productosApi'; // Asegúrate de que este archivo exista
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ConfirmModal from './ConfirmModal';
import "./ListadoProductos.css";

function ListadoProductos() {
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    
    // --- 1. CORRECCIÓN DE LA CARGA DE DATOS ---
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                // Usamos findAll y await
                const respuesta = await productosApi.findAll();
                
                // Validación de seguridad (Array vs Objeto)
                const lista = Array.isArray(respuesta) ? respuesta : (respuesta.data || []);
                setProductos(lista);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };

        cargarProductos();
    }, []);

    const handleOpenModal = (product) => {
        setProductToDelete(product); 
        setIsModalOpen(true);       
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToDelete(null);
    };

    // --- 2. CORRECCIÓN DEL BORRADO (CONEXIÓN A BD) ---
    const handleConfirmDelete = async () => {
        if (productToDelete) {
            try {
                // Llamamos a la API para borrar en la Base de Datos
                await productosApi.remove(productToDelete.id);

                // Si la API responde bien, actualizamos la UI
                const updatedProducts = productos.filter(p => p.id !== productToDelete.id);
                setProductos(updatedProducts);
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                alert("No se pudo eliminar el producto.");
            }
        }
        handleCloseModal();
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    
    // Validación por si productos es undefined al inicio
    const safeProducts = Array.isArray(productos) ? productos : [];
    const currentProducts = safeProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(safeProducts.length / productsPerPage);

    return (
        <div className="product-list-container">
            <Header />
            <div className="list-header">
                    <h1>Listado de productos</h1>
                    <div className="filter-bar">
                        <div className="search-box">
                            <input type="text" placeholder="Buscar un producto..." />
                            <button className="btn-search">Buscar</button>
                        </div>
                        <div className="action-buttons-group">
                            <Link to="/ListarCategorias">
                                <button className="btn-filter btn-primary">Categorías</button>
                            </Link>
                            <Link to="/AgregarProducto">
                                <button className="btn-filter btn-primary">Agregar Producto</button>
                            </Link>
                        </div>
                    </div>
                </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Imagen</th>
                            <th>Presentación</th>
                            <th>Descripción</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="product-id">#{product.id}</td>
                                    <td>
                                        <div className="product-name-cell">
                                            <img 
                                                src={product.img || 'https://via.placeholder.com/40'} 
                                                alt={product.nombre} 
                                                className="producto-imagen" 
                                            />
                                            <span>{product.nombre}</span>
                                        </div>
                                    </td>
                                    <td>{product.presentacion}</td>
                                    <td className="product-description">{product.descripcion}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <div className="product-actions">
                                            <Link to={`/EditarProducto/${product.id}`} className="bton-editar">✏️</Link>
                                            <button className="bton-borrar" onClick={() => handleOpenModal(product)}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                                    No hay productos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={`page-${i + 1}`} 
                        onClick={() => setCurrentPage(i + 1)} 
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                productName={productToDelete ? productToDelete.nombre : ''} // Cambié .titulo por .nombre (según tu DB)
            />
            <Footer />
        </div>
    );
}

export default ListadoProductos;