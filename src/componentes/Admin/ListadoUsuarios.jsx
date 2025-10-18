import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import './ListadoUsuarios.css';


const AllUsersTable = ({ users }) => {
    return (
        <div className="all-users-table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Fecha de Registro</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="user-cell">
                                <img src={user.img || `https://i.pravatar.cc/150?u=${user.id}`} alt={`Avatar de ${user.nombre}`} />
                                <div className="user-cell-info">
                                    <span>{`${user.nombre} ${user.apellido}`}</span>
                                    <small>{user.correo}</small>
                                </div>
                            </td>
                            <td>{user.fechaRegistro}</td>
                            <td><span className={user.estado === 'activo' ? 'estado-activo' : 'estado-inactivo'}>{user.estado}</span></td>
                            <td className="action-buttons">
                                <button className={`btn-action ${user.estado === 'activo' ? 'btn-deactivate' : 'btn-activate'}`}>
                                    {user.estado === 'activo' ? 'Desactivar' : 'Activar'}
                                </button>
                                
                                <Link to={`/admin/users/${user.id}`}>
                                    <button className="btn-detalles">Ver Perfil</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ListadoUsuarios = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const simulateRegistrationDate = (userId) => {
        const startDate = new Date(2023, 0, 1).getTime();
        const endDate = new Date().getTime();
        const randomTime = startDate + Math.random() * (endDate - startDate);
        const randomDate = new Date(randomTime);

        return randomDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    useEffect(() => {
        const todosLosUsuarios = usuariosApi.get();
        const usuariosFiltrados = todosLosUsuarios
            .filter(user => user.rol !== 'admin')
            .map(user => ({
                ...user,

                fechaRegistro: simulateRegistrationDate(user.id)
            }));
        setAllUsers(usuariosFiltrados);
    }, []);
    
    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return allUsers;
        }
        return allUsers.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allUsers]);


    return (
        <div className='AllUsersPage'>
            <Header/>
            <main className='main-content'>
                <div className="page-header">
                    <h1>Gestión de Usuarios</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar por nombre, correo o username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                {filteredUsers.length > 0 ? (
                    <AllUsersTable users={filteredUsers} />
                ) : (
                    <p className="no-results">No se encontraron usuarios que coincidan con la búsqueda.</p>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default ListadoUsuarios;
