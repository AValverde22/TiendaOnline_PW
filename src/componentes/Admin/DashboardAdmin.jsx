import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import "./DashboardAdmin.css";

const handleToggleStatus = async (user) => {
        const newStatus = user.estado === 'activo' ? 'inactivo' : 'activo';

        try {
            await usuariosApi.put(`/usuarios/${user.id}`, {
                ...user, // Envía el resto de los datos del usuario
                estado: newStatus // Envía el nuevo estado
            });


            setCurrentUsers(currentUsers.map(u => 
                u.id === user.id ? { ...u, estado: newStatus } : u
            ));

        } catch (error) {
            console.error("Error al actualizar el estado del usuario:", error);
            alert("No se pudo cambiar el estado del usuario. Inténtalo de nuevo.");
        }}
        
const UserDetail = ({ user }) => {
    if (!user) {
        return <p className="user-detail-placeholder">Selecciona un usuario para ver sus detalles.</p>;
    }
    
    return (
        <div className="user-detail-card">
            <div className="user-info">
                <div className="user-text">
                    <h2>{user.nombre} {user.apellido}</h2>
                    <p><strong>Correo:</strong> {user.correo}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Estado:</strong> <span className={user.estado === 'activo' ? 'estado-activo' : 'estado-inactivo'}>{user.estado}</span></p>
                </div>
                <img 
                    src={user.img || `https://i.pravatar.cc/150?u=${user.id}`} 
                    alt={`Avatar de ${user.nombre}`}
                    className="user-avatar" 
                />
            </div>
            <div className="order-history">
                <h3>Historial de Órdenes</h3>
                {user.ordenes.length > 0 ? (
                    <table className="order-history-table">
                        <thead>
                            <tr>
                                <th>#ID Orden</th>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.ordenes.map(orden => (
                                <tr key={orden.id}>
                                    <td>#{orden.id.toString().padStart(4, '0')}</td>
                                    <td>{new Date(orden.fecha).toLocaleDateString()}</td>
                                    <td>S/ {orden.productos.reduce((acc, p) => acc + p.total, 0).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p>Este usuario no tiene órdenes.</p>}
            </div>
        </div>
    );
};

const UserTable = ({ users, onUserSelect, selectedUser }) => { 
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
                    {users.map(user => (
                        <tr 
                            key={user.id} 
                            className={selectedUser?.id === user.id ? 'selected-row' : ''}
                        >
                            <td className="user-cell">
                                <img src={user.img || `https://i.pravatar.cc/150?u=${user.id}`} alt={`Avatar de ${user.nombre}`} />
                                <span>{`${user.nombre} ${user.apellido}`}</span>
                            </td>
                            <td><span className={user.estado === 'activo' ? 'estado-activo' : 'estado-inactivo'}>{user.estado}</span></td>
                            <td className="action-buttons">
                                <button 
                                className={`btn-action ${user.estado === 'activo' ? 'btn-deactivate' : 'btn-activate'}`}
                                onClick={() => handleToggleStatus(user)}>
                                {user.estado === 'activo' ? 'Desactivar' : 'Activar'}
                                </button>
                                <button className="btn-detalles" onClick={(e) => { e.stopPropagation(); onUserSelect(user); }}>Ver Detalles</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const OrderTable = ({ orders }) => {
    if (!orders || orders.length === 0) {
        return <div className="tabla-container"><p>No hay órdenes para mostrar en esta página.</p></div>;
    }
    return (
        <div className="tabla-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>#ID Orden</th>
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
                                <img src={order.userImg || `https://i.pravatar.cc/150?u=${order.userId}`} alt={`Avatar de ${order.username}`} />
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

const DashboardAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [orderCurrentPage, setOrderCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const todosLosUsuarios = usuariosApi.get();
        const usuariosFiltrados = todosLosUsuarios.filter(user => user.rol !== 'admin');
        setUsuarios(usuariosFiltrados);

        if (usuariosFiltrados.length > 0) {
            setSelectedUser(usuariosFiltrados[0]);
        }
    }, []);

    const allOrders = useMemo(() => {
        return usuarios.flatMap(user => 
            user.ordenes.map(orden => ({
                ...orden,
                userId: user.id,
                username: user.username,
                userImg: user.img,
                total: orden.productos.reduce((acc, p) => acc + p.total, 0)
            }))
        );
    }, [usuarios]);

    const indexOfLastUser = userCurrentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);
    const totalUserPages = Math.ceil(usuarios.length / itemsPerPage);

    const indexOfLastOrder = orderCurrentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalOrderPages = Math.ceil(allOrders.length / itemsPerPage);

    return (
        <div className='DashboardAdmin'>
            <Header/>
            <main className='main-content'>
                <h1>Dashboard Admin</h1>
                <section className='cards'>
                    <ul>
                        <li>Usuarios Registrados: <span>{usuarios.length}</span></li>
                        <li>Órdenes Realizadas: <span>{allOrders.length}</span></li>
                        <li>Ingresos totales: 
                            <span>
                            S/ {
                                allOrders.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)
                            }
                            </span>
                        </li>
                    </ul>
                </section>

                <div className="dashboard-layout">
                    
                    <div className="top-row">
                        <div className="column-left">
                            <div className="column-header">
                                <div>
                                    <h2>Usuarios Registrados</h2>
                                </div>
                                <div>
                                    <Link to= "/ListadoUsuariosAdmin">
                                        <button className='btn-ver-todos'>Ver Todos los Usuarios</button>
                                    </Link>
                                </div>
                            </div>
                            <UserTable users={currentUsers} onUserSelect={setSelectedUser} selectedUser={selectedUser} />
                            <div className="pagination">
                                {Array.from({ length: totalUserPages }, (_, i) => (
                                    <button key={`user-page-${i}`} onClick={() => setUserCurrentPage(i + 1)} className={userCurrentPage === i + 1 ? 'active' : ''}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="column-right">
                            <div className="column-header">
                                <h2>Detalles del Usuario</h2>
                            </div>
                            <div>
                                <UserDetail user={selectedUser} />
                            </div>
                        </div>
                    </div>

                    <div className="bottom-row">
                        <div className="column-header">
                            <div>
                                <h2>Historial de Órdenes</h2>
                            </div>
                            <div className = "separation">
                                <Link to = "/ListadoProductos">
                                    <button className='btn-ver-todos'>Ver Productos</button>
                                </Link>
                                <Link to = "/ListadoOrdenesAdmin">
                                    <button className='btn-ver-todos'>Ver Todos las Órdenes</button>
                                </Link>
                            </div>
                        </div>
                        <OrderTable orders={currentOrders} />
                        <div className="pagination" id='abajo'>
                             {Array.from({ length: totalOrderPages }, (_, i) => (
                                <button key={`order-page-${i}`} onClick={() => setOrderCurrentPage(i + 1)} className={orderCurrentPage === i + 1 ? 'active' : ''}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
            <Footer/>
        </div>
    );
};

export default DashboardAdmin;