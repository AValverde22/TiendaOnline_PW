import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import TableComponent from './TableComponent';
import "./DashboardAdmin.css";

// 1. Componente de Detalle (Sub-componente)
const UserDetail = ({ user }) => {
    if (!user) {
        return <p className="user-detail-placeholder">Selecciona un usuario para ver sus detalles.</p>;
    }

    const estadoClass = user.estado?.toLowerCase() === 'activo' ? 'estado-activo' : 'estado-inactivo';

    const orderHistoryColumns = [
        { header: '#ID', render: (orden) => `#${orden.id.toString().padStart(4, '0')}` },
        { header: 'Fecha', render: (orden) => new Date(orden.fecha).toLocaleDateString() },
        { header: 'Total', render: (orden) => `S/ ${(Number(orden.total) || 0).toFixed(2)}` }
    ];

    return (
        <div className="user-detail-card">
            <div className="user-info">
                <div className="user-text">
                    <h2>{user.nombre} {user.apellido}</h2>
                    <p><strong>Correo:</strong> {user.correo}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Estado:</strong> <span className={estadoClass}>{user.estado}</span></p>
                    <p><strong>Rol:</strong> {user.rol}</p>
                </div>
                <img
                    src={user.img || `https://i.pravatar.cc/150?u=${user.id}`}
                    alt={`Avatar de ${user.nombre}`}
                    className="user-avatar"
                />
            </div>
            <div className="order-history">
                <h3>Historial de Órdenes</h3>
                <TableComponent
                    columns={orderHistoryColumns}
                    data={user.ordenes}
                    emptyMessage="Este usuario no tiene órdenes."
                />
            </div>
        </div>
    );
};

// 2. Componente Principal
const DashboardAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [orderCurrentPage, setOrderCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const todosLosUsuarios = await usuariosApi.findAll();

                if (!Array.isArray(todosLosUsuarios)) {
                    console.error("Respuesta inesperada al obtener usuarios:", todosLosUsuarios);
                    setUsuarios([]);
                    return;
                }

                // Filtramos admins para no auto-eliminarnos
                const usuariosFiltrados = todosLosUsuarios.filter(user => user.rol !== 'ADMIN');

                setUsuarios(usuariosFiltrados);

                if (usuariosFiltrados.length > 0) {
                    setSelectedUser(usuariosFiltrados[0]);
                }
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleToggleStatus = async (user) => {
        const nuevoEstado = user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

        const usuariosActualizados = usuarios.map(u =>
            u.id === user.id ? { ...u, estado: nuevoEstado } : u
        );
        setUsuarios(usuariosActualizados);

        if (selectedUser && selectedUser.id === user.id) {
            setSelectedUser({ ...selectedUser, estado: nuevoEstado });
        }

        try {
            await usuariosApi.put(user.id, { estado: nuevoEstado });
        } catch (error) {
            console.error("Error al actualizar en servidor:", error);
            alert("Error al guardar cambios. Reversando...");
            // Aquí podrías revertir el estado si falla
        }
    };

    const allOrders = useMemo(() => {
        return usuarios.flatMap(user => {
            if (!user.ordenes) return [];

            return user.ordenes.map(orden => ({
                ...orden,
                userId: user.id,
                username: user.username,
                userImg: user.img,
                total: Number(orden.total) || 0
            }));
        });
    }, [usuarios]);

    // Paginación
    const indexOfLastUser = userCurrentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);
    const totalUserPages = Math.ceil(usuarios.length / itemsPerPage);

    const indexOfLastOrder = orderCurrentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalOrderPages = Math.ceil(allOrders.length / itemsPerPage);

    // --- COLUMNAS CORREGIDAS PARA CSS ---
    // --- COLUMNAS CON ESTILOS FIJOS ---
    const userColumns = [
        {
            header: 'Nombre',
            // No necesitamos clase fija aquí, dejamos que ocupe el espacio restante
            render: (user) => (
                <div className="user-cell">
                    <img src={user.img || `https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" />
                    <span>{`${user.nombre} ${user.apellido}`}</span>
                </div>
            )
        },
        {
            header: 'Estado',
            className: 'status-col', // <--- APLICAMOS CLASE FIJA
            render: (user) => {
                // Normalizamos mayúsculas/minúsculas
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
            className: 'actions-col', // <--- APLICAMOS CLASE FIJA
            // Nota: Aquí NO usamos div wrapper en la celda TD porque TableComponent
            // ya nos da el TD. Usamos el wrapper interno para los botones.
            render: (user) => {
                const isActive = user.estado?.toUpperCase() === 'ACTIVO';
                return (
                    <div className="action-buttons-wrapper"> {/* Flexbox Wrapper */}
                        <button
                            className="btn-ver-detalle"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(user);
                            }}
                        >
                            Ver Detalle
                        </button>
                        
                        <button
                            // Usamos la nueva clase .btn-status-toggle que tiene min-width
                            className={`btn-status-toggle ${isActive ? 'btn-deactivate' : 'btn-activate'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStatus(user);
                            }}
                        >
                            {isActive ? 'Desactivar' : 'Activar'}
                        </button>
                    </div>
                );
            }
        }
    ];
    
    const orderColumns = [
        { header: '#ID', render: (order) => `#${order.id.toString().padStart(4, '0')}` },
        {
            header: 'Usuario',
            render: (order) => (
                <div className="user-cell"> {/* Wrapper DIV con Flexbox */}
                    <img src={order.userImg || `https://i.pravatar.cc/150?u=${order.userId}`} alt="avatar" />
                    <span>{order.username}</span>
                </div>
            )
        },
        { header: 'Fecha', render: (order) => new Date(order.fecha).toLocaleDateString() },
        { header: 'Total', render: (order) => `S/ ${(Number(order.total) || 0).toFixed(2)}` },
        {
            header: 'Estado',
            render: (order) => (
                <span className={`status-badge ${order.estado === 'entregado' ? 'status-entregado' : 'status-p-entregar'}`}>
                    {order.estado}
                </span>
            )
        }
    ];

    if (loading) return <div className="loading-screen">Cargando Dashboard...</div>;

    return (
        <div className='DashboardAdmin'>
            <Header />
            <main className='main-content'>
                <h1>Dashboard Admin</h1>

                <section className='cards'>
                    <ul>
                        <li>Usuarios Registrados: <span>{usuarios.length}</span></li>
                        <li>Órdenes Totales: <span>{allOrders.length}</span></li>
                        <li>Ingresos Totales:
                            {/* Corrección del reduce para evitar error .toFixed */}
                            <span> S/ {allOrders.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0).toFixed(2)}</span>
                        </li>
                    </ul>
                </section>

                <div className="dashboard-layout">
                    <div className="top-row">
                        <div className="column-left">
                            <div className="column-header">
                                <h2>Gestión de Usuarios</h2>
                                <Link to="/ListadoUsuariosAdmin">
                                    <button className='btn-ver-todos'>Ver Todos</button>
                                </Link>
                            </div>

                            <TableComponent
                                columns={userColumns}
                                data={currentUsers}
                                onRowClick={setSelectedUser}
                                rowClassName={(user) => selectedUser?.id === user.id ? 'selected-row' : ''}
                            />

                            <div className="pagination">
                                {Array.from({ length: totalUserPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setUserCurrentPage(i + 1)}
                                        className={userCurrentPage === i + 1 ? 'active' : ''}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="column-right">
                            <div className="column-header">
                                <h2>Detalles</h2>
                            </div>
                            <UserDetail user={selectedUser} />
                        </div>
                    </div>

                    <div className="bottom-row">
                        <div className="column-header">
                            <h2>Últimas Órdenes</h2>
                            <div className="separation">
                                <Link to="/ListadoProductos">
                                    <button className='btn-ver-todos'>Productos</button>
                                </Link>
                                <Link to="/ListadoOrdenesAdmin">
                                    <button className='btn-ver-todos'>Ver Órdenes</button>
                                </Link>
                            </div>
                        </div>

                        <TableComponent
                            columns={orderColumns}
                            data={currentOrders}
                            emptyMessage="No hay órdenes para mostrar."
                        />

                        <div className="pagination" id='abajo'>
                            {Array.from({ length: totalOrderPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setOrderCurrentPage(i + 1)}
                                        className={orderCurrentPage === i + 1 ? 'active' : ''}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardAdmin;