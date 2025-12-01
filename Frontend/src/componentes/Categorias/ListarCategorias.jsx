import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriasApi from "../../api/categoriasApi";
import { useUser } from '../../api/context/UserContext';

import './ListarCategorias.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ListarCategorias = () => {
    // 1. Usamos el Contexto (Fuente única de verdad)
    // ⚠️ Se añade 'token' a la desestructuración
    const { user, token, isAuthenticated, loading } = useUser();

    const [categoriasOriginales, setCategoriasOriginales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const navigate = useNavigate();

    // Verificación de administrador (simplificada)
    const isAdmin = isAuthenticated && user && (user.rol === "ADMIN" || user.rol === "admin");

    // 2. Efecto de Carga y Seguridad
    useEffect(() => {
        // Si el contexto aún está cargando (verificando token), esperamos
        if (loading) return;

        // Validación de Seguridad: Si no es admin (ya cargado)
        if (!isAdmin) {
            console.warn("Acceso denegado: Usuario no es administrador.");
            navigate("/"); // Redirigir al home
            return;
        }

        // Si pasó la seguridad, cargamos los datos
        const cargarDatos = async () => {
            try {
                // El findAll no requiere token si es una ruta pública, pero lo enviamos
                // por si el backend se vuelve más estricto. (En este caso, no es necesario, pero es seguro).
                const respuesta = await categoriasApi.findAll();
                // Aseguramos que 'respuesta' es un array o un array dentro de 'data'
                const data = Array.isArray(respuesta) ? respuesta : (respuesta.data || []);

                setCategoriasOriginales(data);
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
                // Aquí podrías añadir una alerta de que la carga falló
            }
        };

        cargarDatos();

    }, [isAdmin, loading, navigate]); // Se ejecuta cuando el estado de autenticación/rol cambia

    // 3. Efecto de Búsqueda (Filtrado en memoria) - Sin cambios, es eficiente para un listado admin
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

    // 4. Funciones de Acción
    const DirigirseAgregarCategoria = () => navigate("/Categoria/Agregar");
    const DirigirseDetalleCategoria = (id) => navigate(`/Categoria/${id}`);

    // ⚠️ CORRECCIÓN CLAVE: Pasamos el token a categoriasApi.remove()
    const EliminarCategoria = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) return;

        if (!token) {
            alert("Error de autenticación. Intente iniciar sesión nuevamente.");
            return;
        }

        try {
            await categoriasApi.remove(id, token); // 👈 Pasando el token
            alert('Categoría Eliminada.');

            // Actualizar estados locales sin recargar todo el listado
            const nuevasCats = categoriasOriginales.filter(c => c.id !== id);
            setCategoriasOriginales(nuevasCats);
            setCategorias(nuevasCats);
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
            alert(`Error al eliminar: ${error.message || 'Error de comunicación con el servidor.'}`);
        }
    };

    // 5. Renderizado Condicional
    if (loading) {
        return <div className="loading-screen">Verificando permisos...</div>;
    }

    // Si no es administrador, el useEffect ya redirigió. 
    // Si llegamos aquí y no hay datos, es un error de carga o está vacío.

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

                {/* Tabla de Listado */}
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
                                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No se encontraron categorías.</td></tr>
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