import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Importamos el hook del contexto
import { useUser } from '../../api/context/UserContext.jsx';
import productosApi from '../../api/productosApi';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ConfirmModal from './ConfirmModal';
import TableComponent from '../Admin/TableComponent.jsx';
import "./ListadoProductos.css";

function ListadoProductos() {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // 1. CORRECCIÓN: Ejecutamos el hook con paréntesis ()
  const { token } = useUser();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await productosApi.findAll();
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

  // 2. CORRECCIÓN: Implementación completa de eliminar
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      // Pasamos el ID y el TOKEN (requerido por tu productosApi.js)
      await productosApi.remove(productToDelete.id, token);

      // Actualizamos el estado visualmente (Optimistic update o post-delete)
      setProductos(prevProductos => 
        prevProductos.filter(p => p.id !== productToDelete.id)
      );
      
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      // Manejo de errores de permisos
      if (error.status === 401 || error.status === 403) {
        alert("No tienes autorización para eliminar productos.");
      } else {
        alert("No se pudo eliminar el producto. Intente nuevamente.");
      }
    } finally {
      handleCloseModal();
    }
  };

  // --- Definición de Columnas ---
  const columns = [
    {
      header: "Img",
      width: "8%",
      render: p => (
        <div className="product-cell">
          <img 
            src={p.img || 'https://via.placeholder.com/80'} 
            alt={p.nombre} 
            className="product-img-first" 
          />
        </div>
      )
    },
    {
      header: "ID",
      width: "8%",
      accessor: "id",
      render: p => <span className="id-badge">#{p.id.toString().padStart(4, "0")}</span>
    },
    {
      header: "Nombre",
      width: "20%",
      accessor: "nombre",
      render: p => <strong className="product-name">{p.nombre}</strong>
    },
    {
      header: "Presentación",
      width: "15%",
      accessor: "presentacion"
    },
    {
      header: "Categoría",
      width: "15%",
      render: p => (p.categoria?.nombre || p.categoria || '—')
    },
    {
      header: "Stock",
      width: "10%",
      accessor: "stock",
      render: p => (
        <span className={`stock-badge ${p.stock < 10 ? 'low-stock' : 'ok-stock'}`}>
          {p.stock}
        </span>
      )
    },
    {
      header: "Acciones",
      width: "15%",
      render: p => (
        <div className="product-actions">
          <Link to={`/EditarProducto/${p.id}`} className="bton-editar" title="Editar">
             ✏️
          </Link>
          <button 
            className="bton-borrar" 
            onClick={() => handleOpenModal(p)}
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="product-list-container">
      <Header />

      <div className="list-header">
        <h1>Listado de productos</h1>
        <div className="action-buttons-group">
          <Link to="/AgregarProducto">
            <button className="btn-filter btn-primary">Agregar Producto</button>
          </Link>
        </div>
      </div>

      <div className="table-wrapper-products">
        <TableComponent
            columns={columns}
            data={productos}
            emptyMessage="No hay productos registrados."
            itemsPerPage={6} 
        />
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.nombre || ''}
      />

      <Footer />
    </div>
  );
}

export default ListadoProductos;