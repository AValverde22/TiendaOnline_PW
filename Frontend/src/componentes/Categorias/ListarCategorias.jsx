import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriasApi from "../../api/categoriasApi";
import { useUser } from '../../api/context/UserContext'; // Importación corregida

import './ListarCategorias.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ListarCategorias = () => {
    // 1. Usamos el Contexto (Fuente única de verdad)
    const { user, isAuthenticated, loading } = useUser();
    
    const [categoriasOriginales, setCategoriasOriginales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    
    const navigate = useNavigate();

    // 2. Efecto de Carga y Seguridad
    useEffect(() => {
        // Si el contexto aún está cargando (verificando token), esperamos
        if (loading) return;

        // Validación de Seguridad: Si no está logueado o no es admin
        if (!isAuthenticated || !user || (user.rol !== "ADMIN" && user.rol !== "admin")) {
            // alert("Acceso denegado. Se requiere ser Administrador."); // Opcional
            navigate("/"); // Redirigir al login o home
            return;
        }

        // Si pasó la seguridad, cargamos los datos
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

    }, [user, isAuthenticated, loading, navigate]); // Se ejecuta cuando el estado del usuario cambia

    // 3. Efecto de Búsqueda (Filtrado en memoria)
    useEffect(() => {
        if (textoBusqueda === "") {
            setCategorias(categoriasOriginales);
        } else {
            const filtrados = categoriasOriginales.filter((item) => 
                item.id.toString().includes(textoBusqueda) || 
                item.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
                (item.descripcion && item.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase()))
            );
            setCategorias(filtrados);
        }
    }, [textoBusqueda, categoriasOriginales]);

    // 4. Funciones de Acción
    const DirigirseAgregarCategoria = () => navigate("/Categoria/Agregar");
    const DirigirseDetalleCategoria = (id) => navigate(`/Categoria/${id}`);

    const EliminarCategoria = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) return;

        try {
            await categoriasApi.remove(id);
            alert('Categoría Eliminada.');
            const nuevasCats = categoriasOriginales.filter(c => c.id !== id);
            setCategoriasOriginales(nuevasCats);
            setCategorias(nuevasCats);
        } catch (error) {
            console.error(error);
            alert("Error al eliminar.");
        }
    };

    // 5. Renderizado Condicional (Mientras carga sesión)
    if (loading) {
        return <div className="loading-screen">Verificando permisos...</div>;
    }

    // Si no hay usuario (y aún no redirige), no mostramos nada para proteger la vista
    if (!user) return null;

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
                            onChange={(event) => setTextoBusqueda(event.target.value)}
                        />
                    </div>
                    <button className="btn-primary" onClick={DirigirseAgregarCategoria}>
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
                                            <div className="action-buttons-group">
                                                <button className="bton-editar" onClick={() => DirigirseDetalleCategoria(c.id)} title="Editar">✏️</button>
                                                <button className="bton-borrar" onClick={() => EliminarCategoria(c.id)} title="Eliminar">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" style={{textAlign:'center'}}>No se encontraron categorías.</td></tr>
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