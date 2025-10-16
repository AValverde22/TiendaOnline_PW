import React, { useState, useEffect } from 'react';
import productosApi from '../../api/productosApi';
import "./ListadoProductos.css";

function ListadoProductos() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const productos1 = productosApi.get();
        setProductos(productos1);
    }, []);


    return (
        <div className="product-list-container">
            <h1>Listado de productos</h1>


            <div className="filter-bar">
                <div className="search-box">
                <input type="text" placeholder="Buscar un producto..." />
                <button className="btn-search">Buscar</button>
                </div>
                <div className="action-buttons-group">
                <button className="btn-filter">Categorías</button>
                <button className="btn-primary">Agregar producto</button>
                </div>
            </div>

            {/* --- Tabla de Productos --- */}
            <div className="table-wrapper">
                <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Presentación</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((product) => (
                    <tr key={product.id}>
                        <td className="product-id">#{product.id}</td>
                        <td>
                        <div className="product-name-cell">
                            <img 
                            src={product.img || 'https://via.placeholder.com/40'} 
                            alt={product.nombre} 
                            className="product-image" 
                            />
                            <span>{product.nombre}</span>
                        </div>
                        </td>
                        <td>{product.presentacion}</td>
                        <td className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...</td>
                        <td>{product.categoria}</td>
                        <td>{product.stock}</td>
                        <td>
                        <div className="product-actions">
                            <button className="action-icon">✏️</button>
                            <button className="action-icon">🗑️</button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>


                <div className="pagination">
                <button>&lt;</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>10</button>
                <button>&gt;</button>
            </div>
        </div>
  );
}

export default ListadoProductos;
    
    
