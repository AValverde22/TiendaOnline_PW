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
    const [dataLoading, setDataLoading] = useState(true); // Nuevo estado de carga

    // El rol de administrador se determina directamente del Context
    const isAdmin = isAuthenticated && user && user.rol === "admin";

    // 3. Función de Carga Consolidada (usando token y APIs)
    const handleOnLoad = useCallback(async () => {
        setDataLoading(true);
        try {
            // 3.1 Cargar el detalle de la categoría
            const cat = await categoriasApi.findOne(id);
            setCategoria(cat);

            // 3.2 Cargar los productos relacionados
            // ⚠️ Usamos el endpoint del Backend: findByCategoria
            // Si el backend no tiene un endpoint por ID, se usa el nombre:
            // const prods = await productosApi.findByCategoria(cat.nombre);

            // Supondremos que la tabla `productos` del backend devuelve el ID_Categoria
            const allProducts = await productosApi.findAll();
            const productosPorCategoria = allProducts.filter((item) => item.ID_Categoria == id);

            setProductosFiltrados(productosPorCategoria);

        } catch (error) {
            console.error("Error al cargar detalles de categoría:", error);
            // Mostrar un error en la UI o navegar a 404
        } finally {
            setDataLoading(false);
        }
    }, [id]);

    // 4. Efecto de Carga y Redirección
    useEffect(() => {
        // Esperar a que el Context de Usuario termine de cargar
        if (!userLoading) {
            if (!isAdmin) {
                alert("¡No es administrador! Acceso denegado.");
                navigate("/");
            } else {
                handleOnLoad(); // Cargar datos solo si es Admin
            }
        }
    }, [userLoading, isAdmin, navigate, handleOnLoad]);

    // 5. Funciones de Administración

    const EliminarCategoria = async () => {
        // Aseguramos que haya token
        if (!token) return alert("Error de autenticación. Intente loguearse de nuevo.");

        if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoria.nombre}"?`)) {
            try {
                // Envío del token
                await categoriasApi.remove(id, token);
                alert("Categoría Eliminada");
                navigate("/Categoria");
            } catch (error) {
                alert(`Error al eliminar: ${error.message || 'Error de comunicación con el servidor.'}`);
            }
        }
    }

    const GuardarCambios = async () => {
        // Aseguramos que haya token y categoría para actualizar
        if (!token || !categoria || !categoria.id) return alert("Error: Datos incompletos o sesión expirada.");

        try {
            // Pasamos el ID, el objeto de la categoría (con los cambios en el estado) y el token
            await categoriasApi.update(categoria.id, categoria, token);
            alert("Categoría modificada con éxito.");
            navigate("/Categoria");
        } catch (error) {
            alert(`Error al guardar cambios: ${error.message || 'Error de comunicación con el servidor.'}`);
        }
    }

    const DirigirseListarCategoria = () => navigate("/Categoria");

    // --- Renderizado Condicional ---

    if (userLoading || dataLoading) {
        return (
            <>
                <Header />
                <h1 style={{ textAlign: 'center', margin: '50px' }}>Cargando detalles de categoría... 🔄</h1>
                <Footer />
            </>
        );
    }

    // Si la carga terminó y no es admin, ya fue redirigido en el useEffect

    if (!categoria) {
        return (
            <>
                <Header />
                <h1 style={{ textAlign: 'center', margin: '50px' }}>⚠️ Categoría no encontrada.</h1>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <>
                <div className="grid-container-DDC">
                    <button className="BotonExterno" onClick={DirigirseListarCategoria}>Listado de Categorías</button>
                    <div></div>
                </div>

                <div className="DetalleDeCategoriaParent">
                    <div className="DetalleDeCategoria">
                        <h1>Detalle de categoría</h1>
                        <div className="grid-container2-DDC">
                            <h3>ID</h3>
                            <h3>Nombre</h3>
                            <h3>Descripción</h3>
                            <h3>Logo</h3>
                            <h3>Cantidad de Productos</h3>

                            <div>{categoria.id}</div>
                            {/* Inputs de edición */}
                            <textarea
                                value={categoria.nombre || ''}
                                onChange={(e) => setCategoria({ ...categoria, nombre: e.target.value })}
                            />
                            <textarea
                                className="descripcion"
                                value={categoria.descripcion || ''}
                                onChange={(e) => setCategoria({ ...categoria, descripcion: e.target.value })}
                            />

                            <div>
                                <img src={categoria.img || 'placeholder.jpg'} alt="Logo Categoría" />
                                <input
                                    type="text"
                                    value={categoria.img || ''}
                                    onChange={(e) => setCategoria({ ...categoria, img: e.target.value })}
                                />
                            </div>

                            <div>{productosFiltrados.length}</div>
                        </div>
                    </div>
                </div>

                <div className="ContenedorProductos">
                    <h2>Productos en "{categoria.nombre}" ({productosFiltrados.length})</h2>
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((p) => <GameCard key={p.id} {...p} />)
                    ) : (
                        <p>No hay productos asociados a esta categoría.</p>
                    )}
                </div>

                <div className="grid-container-DDC">
                    <button className="BotonExterno" onClick={EliminarCategoria}>Eliminar Categoría</button>
                    <button className="BotonExterno" onClick={GuardarCambios}>Guardar Cambios</button>
                </div>
            </>
            <Footer />
        </>
    );
};

export default Detalle;