import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../api/context/UserContext.jsx';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import TableComponent from './TableComponent';
import "./DashboardAdmin.css";

// 1. Sub-componente: Detalle de Usuario
const UserDetail = ({ user }) => {
    if (!user) {
        return <p className="user-detail-placeholder">Selecciona un usuario para ver sus detalles.</p>;
    }

    const estadoClass = user.estado?.toLowerCase() === 'activo' ? 'estado-activo' : 'estado-inactivo';

    // Columnas para la tabla interna del detalle
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
                    itemsPerPage={3} // Muestra menos items en el detalle
                />
            </div>
        </div>
    );
};

// 2. Componente Principal
const DashboardAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { token } = useUser();

    // --- CARGA DE DATOS ---
    useEffect(() => {
        const fetchUsuarios = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Pasamos el token a la API
                const todosLosUsuarios = await usuariosApi.findAll(token);

                if (!Array.isArray(todosLosUsuarios)) {
                    console.error("Respuesta inválida:", todosLosUsuarios);
                    setUsuarios([]);
                    return;
                }

                // Excluir admins
                const usuariosFiltrados = todosLosUsuarios.filter(user => user.rol !== 'ADMIN');
                setUsuarios(usuariosFiltrados);

                // Seleccionar primer usuario por defecto si no hay selección
                if (usuariosFiltrados.length > 0) {
                    if (!selectedUser || !usuariosFiltrados.find(u => u.id === selectedUser.id)) {
                        setSelectedUser(usuariosFiltrados[0]);
                    }
                } else {
                    setSelectedUser(null);
                }
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, [token]);

    // --- MANEJO DE ESTADO (ACTIVAR/DESACTIVAR) ---
    const handleToggleStatus = async (user) => {
        const nuevoEstado = user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        const estadoAnterior = user.estado;

        // 1. Optimistic Update
        const usuariosActualizados = usuarios.map(u =>
            u.id === user.id ? { ...u, estado: nuevoEstado } : u
        );
        setUsuarios(usuariosActualizados);

        if (selectedUser && selectedUser.id === user.id) {
            setSelectedUser({ ...selectedUser, estado: nuevoEstado });
        }

        // 2. Llamada API
        try {
            await usuariosApi.put(user.id, { estado: nuevoEstado }, token);
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al guardar cambios. Reversando...");

            // 3. Rollback en caso de error
            const usuariosRevertidos = usuarios.map(u =>
                u.id === user.id ? { ...u, estado: estadoAnterior } : u
            );
            setUsuarios(usuariosRevertidos);

            if (selectedUser && selectedUser.id === user.id) {
                setSelectedUser({ ...selectedUser, estado: estadoAnterior });
            }
        }
    };

    // --- DATOS CALCULADOS ---
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

    const totalIngresos = useMemo(() => {
        return allOrders.reduce((acc, curr) => acc + (curr.total || 0), 0).toFixed(2);
    }, [allOrders]);

    // --- DEFINICIÓN DE COLUMNAS ---
    const userColumns = [
        {
            header: 'Nombre',
            render: (user) => (
                <div className="user-cell">
                    <img src={user.img || `https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" />
                    <span>{`${user.nombre} ${user.apellido}`}</span>
                </div>
            ),
            width: '40%' // Ancho explícito para ayudar al ajuste
        },
        {
            header: 'Estado',
            render: (user) => {
                const estadoClass = user.estado?.toLowerCase() === 'activo' ? 'estado-activo' : 'estado-inactivo';
                return <span className={estadoClass}>{user.estado}</span>;
            },
            width: '20%'
        },
        {
            header: 'Acciones',
            render: (user) => (
                <div className="action-buttons">
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
                        className={`btn-action ${user.estado === 'ACTIVO' ? 'btn-deactivate' : 'btn-activate'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(user);
                        }}
                    >
                        {user.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
            ),
            width: '40%' // Espacio suficiente para los botones
        }
    ];

    const orderColumns = [
        { header: '#ID', render: (order) => `#${order.id.toString().padStart(4, '0')}`, width: '15%' },
        {
            header: 'Usuario',
            render: (order) => (
                <div className="user-cell">
                    <img src={order.userImg || `https://i.pravatar.cc/150?u=${order.userId}`} alt="avatar" />
                    <span>{order.username}</span>
                </div>
            ),
            width: '30%'
        },
        { header: 'Fecha', render: (order) => new Date(order.fecha).toLocaleDateString(), width: '20%' },
        { header: 'Total', render: (order) => `S/ ${order.total.toFixed(2)}`, width: '15%' },
        {
            header: 'Estado',
            render: (order) => (
                <span className={`status-action ${order.estado === 'entregado' ? 'status-entregado' : 'status-p-entregar'}`}>
                    {order.estado}
                </span>
            ),
            width: '20%'
        }
    ];

    if (loading) return <div className="loading-screen">Cargando Dashboard...</div>;

    return (
        <div className='DashboardAdmin'>
            <Header />
            <main className='main-content'>
                <h1>Dashboard Admin</h1>

                {/* Tarjetas de Resumen */}
                <section className='cards'>
                    <ul>
                        <li>Usuarios Registrados: <span>{usuarios.length}</span></li>
                        <li>Órdenes Totales: <span>{allOrders.length}</span></li>
                        <li>Ingresos Totales: <span> S/ {totalIngresos}</span></li>
                    </ul>
                </section>

                <div className="dashboard-layout">
                    {/* FILA SUPERIOR: Tabla Usuarios (Izquierda) + Detalle (Derecha) */}
                    <div className="top-row">
                        <div className="column-left">
                            <div className="column-header">
                                <h2>Gestión de Usuarios</h2>
                                <Link to="/ListadoUsuariosAdmin">
                                    <button className='btn-ver-todos'>Ver Todos</button>
                                </Link>
                            </div>

                            {/* SOLUCIÓN: Wrapper para controlar el ancho de la tabla en Flexbox */}
                            <div className="user-table-wrapper">
                                <TableComponent
                                    columns={userColumns}
                                    data={usuarios}
                                    onRowClick={setSelectedUser}
                                    rowClassName={(user) => selectedUser?.id === user.id ? 'selected-row' : ''}
                                    itemsPerPage={5}
                                />
                            </div>
                        </div>

                        <div className="column-right">
                            <div className="column-header">
                                <h2>Detalles</h2>
                            </div>
                            <UserDetail user={selectedUser} />
                        </div>
                    </div>

                    {/* FILA INFERIOR: Tabla Órdenes (Ancho completo) */}
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
                            data={allOrders}
                            emptyMessage="No hay órdenes para mostrar."
                            itemsPerPage={5}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardAdmin;