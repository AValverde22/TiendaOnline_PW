import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import TableComponent from './TableComponent';
import './ListadoUsuarios.css';

const ListadoUsuarios = () => {
    const [allUsers, setAllUsers] = useState([]); // Guardamos TODOS los usuarios aquí
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Carga Inicial (Traemos todo de una vez)
    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const respuesta = await usuariosApi.findAll();
                const listaUsuarios = Array.isArray(respuesta) ? respuesta : (respuesta.data || []);

                const usuariosProcesados = listaUsuarios
                    .filter(user => user.rol !== 'ADMIN' && user.rol !== 'admin')
                    .map(user => ({
                        ...user,
                        // Usamos la fecha real de la BD o createdAt
                        fechaRegistro: new Date(user.fechaRegistro || user.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }));

                setAllUsers(usuariosProcesados);
            } catch (error) {
                console.error("Error al cargar listado:", error);
            }
        };
        cargarUsuarios();
    }, []);

    // 2. Función de Cambio de Estado
    const handleToggleStatus = async (user) => {
        const isActive = user.estado?.toUpperCase() === 'ACTIVO';
        const nuevoEstado = isActive ? 'INACTIVO' : 'ACTIVO';

        // Copia de seguridad
        const usuariosOriginales = [...allUsers];

        // Actualización Optimista (UI Inmediata)
        const usuariosActualizados = allUsers.map(u =>
            u.id === user.id ? { ...u, estado: nuevoEstado } : u
        );
        setAllUsers(usuariosActualizados);

        try {
            await usuariosApi.put(user.id, { estado: nuevoEstado });
            // Éxito silencioso
        } catch (error) {
            console.error("Error al actualizar:", error);
            setAllUsers(usuariosOriginales); // Revertimos si falla
            alert("Error de conexión. No se pudo cambiar el estado.");
        }
    };

    // 3. Filtrado en Memoria (Rápido y estable)
    const filteredUsers = useMemo(() => {
        if (!searchTerm) return allUsers;
        const term = searchTerm.toLowerCase();

        return allUsers.filter(user =>
            (user.nombre || '').toLowerCase().includes(term) ||
            (user.apellido || '').toLowerCase().includes(term) ||
            (user.correo || '').toLowerCase().includes(term) ||
            (user.username || '').toLowerCase().includes(term)
        );
    }, [searchTerm, allUsers]);

    // 4. Columnas (Con las clases CSS para el ancho fijo)
    const columns = [
        {
            header: 'Usuario',
            className: 'user-col', // Definida en CSS
            render: (user) => (
                <div className="user-cell-content">
                    <img
                        src={user.img || `https://i.pravatar.cc/150?u=${user.id}`}
                        alt="avatar"
                        className="user-avatar-small"
                    />
                    <div className="user-info-text">
                        <span className="user-name">{`${user.nombre} ${user.apellido}`}</span>
                        <small className="user-email">{user.correo}</small>
                    </div>
                </div>
            )
        },
        {
            header: 'Fecha Registro',
            accessor: 'fechaRegistro',
            className: 'date-col'
        },
        {
            header: 'Estado',
            className: 'status-col', // <--- AQUÍ APLICAMOS EL ANCHO FIJO
            render: (user) => {
                const isActive = user.estado?.toUpperCase() === 'ACTIVO';
                return (
                    <span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
                        {user.estado}
                    </span>
                );
            }
        },
        {
            header: 'Acciones',
            className: 'actions-col', // <--- AQUÍ APLICAMOS EL ANCHO FIJO
            render: (user) => {
                const isActive = user.estado?.toUpperCase() === 'ACTIVO';
                return (
                    <div className="action-buttons-wrapper">
                        <button
                            className={`btn-status-toggle ${isActive ? 'btn-deactivate' : 'btn-activate'}`}
                            onClick={() => handleToggleStatus(user)}
                        >
                            {isActive ? 'Desactivar' : 'Activar'}
                        </button>

                        <Link to={`/admin/users/${user.id}`}>
                            <button className="btn-view-profile">Ver Perfil</button>
                        </Link>
                    </div>
                )
            }
        }
    ];

    return (
        <div className='AllUsersPage'>
            <Header />
            <main className='main-content'>
                <div className="page-header">
                    <h1>Gestión de Usuarios</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar usuario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <TableComponent
                        columns={columns}
                        data={filteredUsers}
                        emptyMessage="No se encontraron usuarios."
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ListadoUsuarios;