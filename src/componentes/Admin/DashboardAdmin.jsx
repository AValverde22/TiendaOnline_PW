import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import "./DashboardAdmin.css";

// Componente para mostrar los detalles del usuario seleccionado
const UserDetail = ({ user }) => {
    if (!user) {
        return (
            <div className="user-detail-placeholder">
                <h2>Selecciona un usuario</h2>
                <p>Haz clic en una fila de la tabla para ver sus detalles.</p>
            </div>
        );
    }

    return (
        <div className="user-detail-card">
            <div className="user-info">
                <div className="user-text">
                    <h2>{user.nombre} {user.apellido}</h2>
                    <p><strong>Correo:</strong> {user.correo}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    {/* Para que esto sea dinámico, el objeto 'user' debería tener una propiedad 'estado' */}
                    <p><strong>Estado:</strong> <span className="estado-activo">Activo</span></p>
                </div>
                <img 
                    src={`https://i.pravatar.cc/150?u=${user.id}`} 
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
                ) : (
                    <p>Este usuario aún no ha realizado ninguna orden.</p>
                )}
            </div>
        </div>
    );
};

// Componente principal del Dashboard
const DashboardAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const todosLosUsuarios = usuariosApi.get();
        setUsuarios(todosLosUsuarios);
        if (todosLosUsuarios.length > 0) {
            setSelectedUser(todosLosUsuarios[0]);
        }
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(usuarios.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    const prevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    const handleUserSelect = (user) => setSelectedUser(user);

    return (
        <div className='DashboardAdmin'>
            <Header/>
            <main className='main-content'>
                <h1>Dashboard Admin</h1>
                <section className='cards'>
                     <ul>
                        <li>Usuarios Registrados: <span>{usuarios.length}</span></li>
                        <li>Órdenes Realizadas: <span>{usuarios.flatMap(user => user.ordenes).length}</span></li>
                        <li>Ingresos totales: 
                            <span>
                            $ {
                                usuarios.flatMap(user => user.ordenes)
                                    .flatMap(order => order.productos)
                                    .reduce((acc, curr) => acc + curr.total, 0)
                                    .toFixed(2)
                            }
                            </span>
                        </li>
                     </ul>
                </section>

                <div className="dashboard-content">
                    <section className="tabla-container">
                        <h2>Usuarios Registrados</h2>
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr 
                                      key={user.id} 
                                      className={selectedUser?.id === user.id ? 'selected-row' : ''}
                                      // Al hacer clic en cualquier parte de la fila se selecciona el usuario
                                      onClick={() => handleUserSelect(user)}
                                    >
                                        <td>
                                            <div className="user-cell">
                                                <img src={`https://i.pravatar.cc/40?u=${user.id}`} alt="avatar" />
                                                <span>{`${user.nombre} ${user.apellido}`}</span>
                                            </div>
                                        </td>
                                        <td><span className="estado-activo">Activo</span></td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-desactivar">Desactivar</button>
                                                {/* Este botón ahora es visual, la selección ocurre en la fila */}
                                                <button className="btn-detalles">Ver detalle</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                           <button onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
                           {Array.from({ length: totalPages }, (_, i) => (
                               <button
                                   key={i + 1}
                                   onClick={() => paginate(i + 1)}
                                   className={currentPage === i + 1 ? 'active' : ''}
                               >
                                   {i + 1}
                               </button>
                           ))}
                           <button onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
                        </div>
                    </section>
                    
                    <section className="detalle-container">
                        <UserDetail user={selectedUser}/>
                    </section>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default DashboardAdmin;

