import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriasApi from "../../api/categoriasApi";
import { useUser } from '../../api/context/UserContext';

import './ListarCategorias.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ListarCategorias = () => {
    const { user, token, isAuthenticated, loading } = useUser();
    const [categoriasOriginales, setCategoriasOriginales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const navigate = useNavigate();

    // Verificación de Admin
    const isAdmin = isAuthenticated && user && (user.rol === "ADMIN" || user.rol === "admin");

    // 1. Efecto de Carga
    useEffect(() => {
        if (loading) return;

        if (!isAdmin) {
            navigate("/"); 
            return;
        }

        const cargarDatos = async () => {
            try {
                const respuesta = await categoriasApi.findAll();
                const data = Array.isArray(respuesta) ? respuesta : (respuesta.data || []);
                setCategoriasOriginales(data);
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        cargarDatos();
    }, [isAdmin, loading, navigate]);

    // 2. Efecto de Búsqueda
    useEffect(() => {
        if (textoBusqueda === "") {
            setCategorias(categoriasOriginales);
        } else {
            const lowerCaseSearch = textoBusqueda.toLowerCase();
            const filtrados = categoriasOriginales.filter((item) =>
                item.id.toString().includes(lowerCaseSearch) ||
                item.nombre.toLowerCase().includes(lowerCaseSearch) ||
                (item.descripcion && item.descripcion.toLowerCase().includes(lowerCaseSearch))
            );
            setCategorias(filtrados);
        }
    }, [textoBusqueda, categoriasOriginales]);

    // --- ACCIONES CORREGIDAS ---

    const DirigirseAgregarCategoria = () => {
        navigate("/Categoria/Agregar");
    };

    // CORRECCIÓN 1: Debugging y validación de ID para Editar
    const DirigirseDetalleCategoria = (id) => {
        console.log("Navegando a editar categoría ID:", id); // 👈 Verifica si sale esto en consola
        if (id) {
            navigate(`/Categoria/${id}`);
        } else {
            console.error("Error: ID de categoría indefinido");
        }
    };

    // CORRECCIÓN 2: Debugging y manejo de API para Eliminar
    const EliminarCategoria = async (id) => {
        console.log("Intentando eliminar categoría ID:", id); // 👈 Debug

        if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) return;

        if (!token) {
            alert("No se detectó token de sesión. Recarga la página.");
            return;
        }

        try {
            // Verifica en tu archivo api/categoriasApi.js que 'remove' acepte (id, token)
            await categoriasApi.remove(id, token);
            
            // Actualización optimista del estado
            const nuevasCats = categoriasOriginales.filter(c => c.id !== id);
            setCategoriasOriginales(nuevasCats);
            
            // Importante: Actualizar también la lista filtrada actual
            // Si hay búsqueda activa, filtramos sobre lo que quedó
            if (textoBusqueda) {
                setCategorias(categorias.filter(c => c.id !== id));
            } else {
                setCategorias(nuevasCats);
            }
            
            alert('Categoría eliminada con éxito.');

        } catch (error) {
            console.error("Error al eliminar:", error);
            const mensaje = error.response?.data?.message || error.message || "Error desconocido";
            alert(`No se pudo eliminar: ${mensaje}`);
        }
    };

    if (loading) return <div className="loading-screen">Cargando...</div>;

    return (
        <div className="page-container">
            <Header />
            <div className="ListarCategoria main-content">
                <h1>Listado de categorías</h1>

                <div className="grid-container-ListarCategoria">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder='Buscar categoría...'
                            value={textoBusqueda}
                            onChange={(e) => setTextoBusqueda(e.target.value)}
                        />
                    </div>
                    <button 
                        className="btn-primary" 
                        onClick={DirigirseAgregarCategoria}
                        type="button" // 👈 Buena práctica
                    >
                        Agregar Categoría
                    </button>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th className="LCId">ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th className="LCAcciones">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.length > 0 ? (
                                categorias.map((c) => (
                                    <tr key={c.id}>
                                        <td className="LCId">#{c.id}</td>
                                        <td><strong>{c.nombre}</strong></td>
                                        <td className="descripcion">{c.descripcion}</td>
                                        <td className="LCAcciones">
                                            {/* CORRECCIÓN 3: Estructura de botones explícita */}
                                            <div className="action-buttons-group">
                                                <button 
                                                    className="bton-editar" 
                                                    // Usamos una función anónima limpia
                                                    onClick={() => DirigirseDetalleCategoria(c.id)} 
                                                    title="Editar"
                                                    type="button" // 👈 Evita submits accidentales
                                                >
                                                    ✏️
                                                </button>
                                                
                                                <button 
                                                    className="bton-borrar" 
                                                    onClick={() => EliminarCategoria(c.id)} 
                                                    title="Eliminar"
                                                    type="button" // 👈 Evita submits accidentales
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No hay datos.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ListarCategorias;