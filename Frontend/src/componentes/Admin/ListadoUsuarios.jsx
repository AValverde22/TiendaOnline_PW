import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import { useUser } from "../../api/context/UserContext"; 
import TableComponent from './TableComponent';
import './ListadoUsuarios.css';

const ListadoUsuarios = () => {
    const { token } = useUser(); 
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Cargar usuarios
    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const respuesta = await usuariosApi.findAll(token);

                const lista = Array.isArray(respuesta)
                    ? respuesta
                    : (respuesta.data || []);

                const procesados = lista
                    .filter(u => u.rol !== "ADMIN" && u.rol !== "admin")
                    .map(u => ({
                        ...u,
                        // Mantenemos la fecha cruda, no formateada
                        fechaRegistro: u.fechaRegistro || u.createdAt,
                    }));

                setAllUsers(procesados);
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            }
        };

        if (token) cargarUsuarios();
    }, [token]);

    // 2. Cambiar estado (optimista)
    const handleToggleStatus = async (user) => {
        const isActive = user.estado?.toUpperCase() === "ACTIVO";
        const nuevoEstado = isActive ? "INACTIVO" : "ACTIVO";

        const backup = [...allUsers];

        const actualizados = allUsers.map(u =>
            u.id === user.id ? { ...u, estado: nuevoEstado } : u
        );

        setAllUsers(actualizados);

        try {
            await usuariosApi.put(user.id, { estado: nuevoEstado }, token);
        } catch (error) {
            console.error("Error al actualizar:", error);
            setAllUsers(backup);
            alert("No se pudo cambiar el estado.");
        }
    };

    // 3. Filtro en memoria
    const filteredUsers = useMemo(() => {
        if (!searchTerm) return allUsers;
        const term = searchTerm.toLowerCase();

        return allUsers.filter(user =>
            (user.nombre || "").toLowerCase().includes(term) ||
            (user.apellido || "").toLowerCase().includes(term) ||
            (user.correo || "").toLowerCase().includes(term) ||
            (user.username || "").toLowerCase().includes(term)
        );
    }, [searchTerm, allUsers]);

    // 4. Columnas
    const columns = [
        {
            header: "Usuario",
            className: "user-col",
            width: "30%",
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
            ),
        },
        {
            header: "Fecha Registro",
            accessor: "fechaRegistro",
            className: "date-col",
            width: "27%",
            render: (user) => {
                if (!user.fechaRegistro) return "—";
                return new Date(user.fechaRegistro).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            }
        },
        {
            header: "Estado",
            className: "status-col",
            width: "15%",
            render: (user) => {
                const isActive = user.estado?.toUpperCase() === "ACTIVO";
                return (
                    <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
                        {user.estado}
                    </span>
                );
            },
        },
        {
            header: "Acciones",
            className: "actions-col",
            render: (user) => {
                const isActive = user.estado?.toUpperCase() === "ACTIVO";
                return (
                    <div className="action-buttons-wrapper">
                        <button
                            className={`btn-status-toggle ${isActive ? "btn-deactivate" : "btn-activate"}`}
                            onClick={() => handleToggleStatus(user)}
                        >
                            {isActive ? "Desactivar" : "Activar"}
                        </button>

                        <Link to={`/admin/users/${user.id}`}>
                            <button className="btn-view-profile">Ver Perfil</button>
                        </Link>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="AllUsersPage">
            <Header />
            <main className="main-content">
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
