import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import './DetalleUsuario.css'; 

const DetalleUsuario = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = usuariosApi.findById(parseInt(userId));
        setUser(userData);
    }, [userId]);

    if (!user) {
        return (
            <div className='UserProfilePage'>
                <Header/>
                <main className='main-content'>
                    <p>Cargando perfil del usuario...</p>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className='UserProfilePage'>
            <Header/>
            <main className='main-content'>
                <div className="profile-header">
                    <Link to="/ListadoUsuariosAdmin" className="back-link">&larr; Volver a la lista</Link>
                    <h1>Perfil del Usuario</h1>
                </div>

                <div className="profile-layout">
                    <div className="profile-card">
                        <div className="profile-card-header">
                            <img 
                                src={user.img || `https://i.pravatar.cc/150?u=${user.id}`} 
                                alt={`Avatar de ${user.nombre}`}
                                className="profile-avatar"
                            />
                            <div className="profile-name">
                                <h2>{user.nombre} {user.apellido}</h2>
                                <p>@{user.username}</p>
                                <span className={user.estado === 'activo' ? 'estado-activo' : 'estado-inactivo'}>{user.estado}</span>
                            </div>
                        </div>
                        <div className="profile-card-body">
                            <h3>Información de Contacto</h3>
                            <p><strong>Correo Electrónico:</strong> {user.correo}</p>
                            <p><strong>Teléfono:</strong> {user.telefono || 'No especificado'}</p>
                            <h3>Información de Envío</h3>
                            <p><strong>Dirección:</strong> {user.direccion || 'No especificado'}</p>
                            <p><strong>Distrito:</strong> {user.distrito || 'No especificado'}</p>
                        </div>
                    </div>

                    <div className="order-history-container">
                        <h3>Historial de Órdenes ({user.ordenes.length})</h3>
                        {user.ordenes.length > 0 ? (
                            <table className="order-history-table">
                                <thead>
                                    <tr>
                                        <th>#Orden</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.ordenes.map(orden => (
                                        <tr key={orden.id}>
                                            <td className="order-id">#{orden.id.toString().padStart(4, '0')}</td>
                                            <td>{new Date(orden.fecha).toLocaleDateString()}</td>
                                            <td><span className={orden.estado === 'entregado' ? 'status-entregado' : 'status-por-entregar'}>{orden.estado}</span></td>
                                            <td>S/ {orden.productos.reduce((acc, p) => acc + p.total, 0).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Este usuario no tiene un historial de órdenes.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default DetalleUsuario;
