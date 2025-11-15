import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import productosApi from '../../api/productosApi';
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
    
    useEffect(() => {

                const productos1 =  productosApi.get();
                setProductos(productos1)
         
    }, []);

    const handleOpenModal = (product) => {
        setProductToDelete(product); 
        setIsModalOpen(true);       
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToDelete(null);
    };


    const handleConfirmDelete = () => {
        if (productToDelete) {

            const updatedProducts = productos.filter(p => p.id !== productToDelete.id);
            setProductos(updatedProducts);
        }

        handleCloseModal();
    };


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const totalPages = Math.ceil(productos.length / productsPerPage);

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
                            <Link to="/ListarCategorias" className="btn-primary">
                            <button className="btn-filter">Categorías</button>
                            </Link>
                            <Link to="/AgregarProducto" className="btn-primary">
                                <button className="btn-filter">Agregar Producto</button>
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

                        {currentProducts.map((product) => (
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
                        ))}
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
                productName={productToDelete ? productToDelete.titulo : ''}
            />
            <Footer />
        </div>
    );
}

export default ListadoProductos;
    
    
