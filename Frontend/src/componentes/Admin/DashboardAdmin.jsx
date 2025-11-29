import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi'; // Asegúrate de que este archivo use base.js correctamente
import "./DashboardAdmin.css";

// 1. Componente de Detalle (Lo dejamos igual, solo ajustes visuales)
const UserDetail = ({ user }) => {
    if (!user) {
        return <p className="user-detail-placeholder">Selecciona un usuario para ver sus detalles.</p>;
    }

    // Normalizamos estado para CSS (ACTIVO -> activo)
    const estadoClass = user.estado?.toLowerCase() === 'activo' ? 'estado-activo' : 'estado-inactivo';

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
                {user.ordenes && user.ordenes.length > 0 ? (
                    <table className="order-history-table">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.ordenes.map(orden => (
                                <tr key={orden.id}>
                                    <td>#{orden.id.toString().padStart(4, '0')}</td>
                                    <td>{new Date(orden.fecha).toLocaleDateString()}</td>
                                    {/* Validamos que productos exista antes de reducir */}
                                    <td>S/ {(orden.productos?.reduce((acc, p) => acc + p.total, 0) || orden.total || 0).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p>Este usuario no tiene órdenes.</p>}
            </div>
        </div>
    );
};

// 2. Componente Tabla de Usuarios (Recibe handleToggleStatus como Prop)
const UserTable = ({ users, onUserSelect, selectedUser, onToggleStatus }) => {
    return (
        <div className="tabla-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        const estadoClass = user.estado?.toLowerCase() === 'activo' ? 'estado-activo' : 'estado-inactivo';
                        return (
                            <tr
                                key={user.id}
                                className={selectedUser?.id === user.id ? 'selected-row' : ''}
                                onClick={() => onUserSelect(user)} // UX: Click en la fila selecciona
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="user-cell">
                                    <img src={user.img || `https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" />
                                    <span>{`${user.nombre} ${user.apellido}`}</span>
                                </td>
                                <td><span className={estadoClass}>{user.estado}</span></td>
                                <td className="action-buttons">
                                    <button
                                        className={`btn-action ${user.estado === 'ACTIVO' ? 'btn-deactivate' : 'btn-activate'}`}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evitar seleccionar fila al hacer click en botón
                                            onToggleStatus(user);
                                        }}
                                    >
                                        {user.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// 3. Componente Tabla de Ordenes (Sin cambios mayores)
const OrderTable = ({ orders }) => {
    if (!orders || orders.length === 0) {
        return <div className="tabla-container"><p>No hay órdenes para mostrar.</p></div>;
    }
    return (
        <div className="tabla-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Usuario</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={`${order.userId}-${order.id}`}>
                            <td>#{order.id.toString().padStart(4, '0')}</td>
                            <td className="user-cell">
                                <img src={order.userImg || `https://i.pravatar.cc/150?u=${order.userId}`} alt="avatar" />
                                <span>{order.username}</span>
                            </td>
                            <td>{new Date(order.fecha).toLocaleDateString()}</td>
                            <td>S/ {order.total.toFixed(2)}</td>
                            <td>
                                <span className={`status-action ${order.estado === 'entregado' ? 'status-entregado' : 'status-p-entregar'}`}>{order.estado}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// 4. COMPONENTE PRINCIPAL (DashboardAdmin)
const DashboardAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [orderCurrentPage, setOrderCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true); // Estado de carga

    // CORRECCIÓN 1: useEffect Asíncrono
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                // Asumo que usuariosApi.get llama a la BD
                // IMPORTANTE: Asegúrate de que tu Backend envíe las órdenes dentro del usuario (include: Ordenes)
                const todosLosUsuarios = await usuariosApi.findAll();

                // Filtramos admins para no auto-eliminarnos
                const usuariosFiltrados = todosLosUsuarios.filter(user => user.rol !== 'ADMIN'); // 'ADMIN' mayúscula según BD

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

    // CORRECCIÓN 2: Función handleToggleStatus DENTRO del componente
    const handleToggleStatus = async (user) => {
        // Lógica Mayúscula/Minúscula para PostgreSQL
        const nuevoEstado = user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

        // Actualización Optimista (UI primero, luego Backend)
        const usuariosActualizados = usuarios.map(u =>
            u.id === user.id ? { ...u, estado: nuevoEstado } : u
        );
        setUsuarios(usuariosActualizados);

        // Si el usuario seleccionado es el que modificamos, actualizarlo también
        if (selectedUser && selectedUser.id === user.id) {
            setSelectedUser({ ...selectedUser, estado: nuevoEstado });
        }

        try {
            // Llamada al Backend
            // Asumo que tienes un endpoint PUT /usuarios/:id
            // No envíes todo el objeto user, solo lo que cambias para ahorrar datos
            await usuariosApi.put(user.id, { estado: nuevoEstado });

        } catch (error) {
            console.error("Error al actualizar en servidor:", error);
            alert("Error al guardar cambios. Reversando...");
            // Revertir cambios si falla (opcional)
        }
    };

    // Cálculos de Memoización (Correctos)
    const allOrders = useMemo(() => {
        return usuarios.flatMap(user => {
            // Validación defensiva por si user.ordenes no viene del backend
            if (!user.ordenes) return [];

            return user.ordenes.map(orden => ({
                ...orden,
                userId: user.id,
                username: user.username,
                userImg: user.img,
                // Si el backend ya manda el total, úsalo, si no, calcúlalo
                total: orden.total || (orden.productos ? orden.productos.reduce((acc, p) => acc + p.total, 0) : 0)
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

    if (loading) return <div className="loading-screen">Cargando Dashboard...</div>;

    return (
        <div className='DashboardAdmin'>
            <Header />
            <main className='main-content'>
                <h1>Dashboard Admin</h1>

                {/* Métricas */}
                <section className='cards'>
                    <ul>
                        <li>Usuarios Registrados: <span>{usuarios.length}</span></li>
                        <li>Órdenes Totales: <span>{allOrders.length}</span></li>
                        <li>Ingresos Totales:
                            <span> S/ {allOrders.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}</span>
                        </li>
                    </ul>
                </section>

                <div className="dashboard-layout">
                    {/* Fila Superior: Usuarios y Detalles */}
                    <div className="top-row">
                        <div className="column-left">
                            <div className="column-header">
                                <h2>Gestión de Usuarios</h2>
                                <Link to="/ListadoUsuariosAdmin">
                                    <button className='btn-ver-todos'>Ver Todos</button>
                                </Link>
                            </div>

                            {/* Pasamos handleToggleStatus como prop */}
                            <UserTable
                                users={currentUsers}
                                onUserSelect={setSelectedUser}
                                selectedUser={selectedUser}
                                onToggleStatus={handleToggleStatus}
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

                    {/* Fila Inferior: Órdenes */}
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
                        <OrderTable orders={currentOrders} />

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