import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 1. Importar el Contexto de Usuario
import { useUser } from '../../api/context/UserContext.jsx';
import categoriasApi from "../../api/categoriasApi";
import productosApi from '../../api/productosApi';

import GameCard from '../GameCard/GameCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './DetalleDeCategoria.css'

const Detalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. Obtener estado de usuario y token del Context
    const { user, token, isAuthenticated, loading: userLoading } = useUser();

    const [categoria, setCategoria] = useState(null);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    // El rol de administrador se determina directamente del Context
    const isAdmin = isAuthenticated && user && (user.rol === "admin" || user.rol === "ADMIN");

    // 3. Función de Carga (CORREGIDA: Ahora usa Token)
    const handleOnLoad = useCallback(async () => {
        // Si no hay token aún, no intentamos cargar para evitar 401
        if (!token) return;

        setDataLoading(true);
        try {
            // 3.1 Cargar el detalle de la categoría
            // ⚠️ IMPORTANTE: Pasamos el token como segundo parámetro
            const cat = await categoriasApi.findOne(id, token);
            setCategoria(cat);

            // 3.2 Cargar los productos relacionados
            // Nota: Esto es costoso (traer todos). Idealmente tu backend debería tener:
            // productosApi.findByCategory(id)
            const allProducts = await productosApi.findAll();
            
            // Filtramos asegurando que la comparación de tipos sea correcta (String vs Number)
            const productosPorCategoria = allProducts.filter((item) => item.ID_Categoria == id);
            setProductosFiltrados(productosPorCategoria);

        } catch (error) {
            console.error("Error al cargar detalles:", error);
            // Opcional: Si es 404 o 401, redirigir
            if(error.response && error.response.status === 404) navigate('/Categoria');
        } finally {
            setDataLoading(false);
        }
    }, [id, token, navigate]); // 👈 'token' agregado a dependencias

    // 4. Efecto de Carga y Seguridad
    useEffect(() => {
        // Esperamos a que userContext termine de verificar sesión
        if (userLoading) return;

        if (!isAdmin) {
            console.warn("Acceso denegado en Detalle Categoría");
            navigate("/"); // Redirigir al home si no es admin
            return;
        }

        // Si es admin y tenemos token, cargamos los datos
        if (token) {
            handleOnLoad();
        }
    }, [userLoading, isAdmin, token, navigate, handleOnLoad]);

    // 5. Funciones de Administración

    const EliminarCategoria = async () => {
        if (!token) return alert("Sesión inválida.");

        if (window.confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) {
            try {
                await categoriasApi.remove(id, token);
                alert("Categoría Eliminada correctamente.");
                navigate("/ListarCategorias"); // Volver al listado
            } catch (error) {
                console.error(error);
                alert("Error al eliminar. Verifica que no tenga productos asociados.");
            }
        }
    }

    const GuardarCambios = async () => {
        if (!token || !categoria) return;

        try {
            // Pasamos ID, Payload y Token
            await categoriasApi.update(categoria.id, categoria, token);
            alert("Categoría actualizada con éxito.");
            // Opcional: No navegar, solo avisar para seguir editando
            // navigate("/Categoria"); 
        } catch (error) {
            console.error(error);
            alert("Error al guardar cambios.");
        }
    }

    const DirigirseListarCategoria = () => navigate("/ListarCategorias");

    // --- Renderizado Condicional ---

    if (userLoading || dataLoading) {
        return (
            <div className="page-container">
                <Header />
                <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Cargando información... 🔄</h2>
                </div>
                <Footer />
            </div>
        );
    }

    if (!categoria) {
        return (
            <div className="page-container">
                <Header />
                <div className="error-container" style={{ textAlign: 'center', padding: '50px' }}>
                    <h1>⚠️ Categoría no encontrada</h1>
                    <button className="btn-primary" onClick={DirigirseListarCategoria}>Volver</button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-container">
            <Header />
            <div className="main-content detail-layout">
                
                {/* 1. Barra Superior de Navegación */}
                <div className="top-nav-bar">
                    <button className="btn-back" onClick={DirigirseListarCategoria}>
                        ← Volver al Listado
                    </button>
                </div>

                {/* 2. Tarjeta Principal de Edición */}
                <div className="edit-card">
                    <div className="card-header">
                        <h1>Editar Categoría <span className="id-badge">#{categoria.id}</span></h1>
                        <p className="subtitle">Edita los detalles y guarda los cambios.</p>
                    </div>

                    <div className="card-body-grid">
                        
                        {/* COLUMNA IZQUIERDA: IMAGEN */}
                        <div className="column-visual">
                            <label className="section-label">Imagen de Portada</label>
                            <div className="img-preview-container">
                                <img 
                                    src={categoria.img || 'https://via.placeholder.com/150'} 
                                    alt="Vista previa" 
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Sin+Imagen'}
                                />
                            </div>
                            <div className="form-group">
                                <label>URL de la imagen</label>
                                <input
                                    type="text"
                                    className="input-modern"
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    value={categoria.img || ''}
                                    onChange={(e) => setCategoria({ ...categoria, img: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: INFORMACIÓN */}
                        <div className="column-info">
                            <div className="form-group">
                                <label>Nombre de la Categoría</label>
                                <input
                                    type="text"
                                    className="input-modern input-title"
                                    placeholder="Ej: Aventura, RPG..."
                                    value={categoria.nombre || ''}
                                    onChange={(e) => setCategoria({ ...categoria, nombre: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    className="input-modern textarea-modern"
                                    rows="6"
                                    placeholder="Describe de qué trata esta categoría..."
                                    value={categoria.descripcion || ''}
                                    onChange={(e) => setCategoria({ ...categoria, descripcion: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* PIE DE TARJETA: ACCIONES */}
                    <div className="card-footer">
                        <button className="btn-action btn-delete" onClick={EliminarCategoria}>
                            🗑️ Eliminar Categoría
                        </button>
                        <button className="btn-action btn-save" onClick={GuardarCambios}>
                            💾 Guardar Cambios
                        </button>
                    </div>
                </div>

                {/* 3. Sección de Productos */}
                <div className="products-section">
                    <div className="products-header">
                        <h2>Productos Asociados</h2>
                        <span className="badge-count">{productosFiltrados.length}</span>
                    </div>
                    
                    <div className="products-grid">
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map((p) => <GameCard key={p.id} {...p} />)
                        ) : (
                            <div className="empty-state-products">
                                <p>No hay productos vinculados a esta categoría.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Detalle;