import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import './ListadoOrdenes.css';
const AllOrdersTable = ({ orders }) => {
    return (
        <div className="all-orders-table-container">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>#ORDEN</th>
                        <th>Usuario</th>
                        <th>Fecha de orden</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={`${order.userId}-${order.id}`}>
                            <td className="order-id">#{order.id.toString().padStart(4, '0')}</td>
                            <td className="user-cell">
                                <img src={order.userImg || `https://i.pravatar.cc/150?u=${order.userId}`} alt={`Avatar de ${order.username}`} />
                                <span>{order.username}</span>
                            </td>
                            <td>{new Date(order.fecha).toLocaleDateString()}</td>
                            <td>S/ {order.total.toFixed(2)}</td>
                            <td>
                                <span className={order.estado === 'entregado' ? 'status-entregado' : 'status-por-entregar'}>
                                    {order.estado}
                                </span>
                            </td>
                            <td className="action-buttons">
                                {/* 2. ENVUELVE EL BOTÓN EN UN LINK DINÁMICO */}
                                <Link to={`/admin/orders/${order.userId}/${order.id}`}>
                                    <button className="btn-ver-detalle-orden">Ver detalle</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const ListadoOrdenes = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const todosLosUsuarios = usuariosApi.get();
        // Aplanar todas las órdenes de todos los usuarios en una sola lista
        const flattenedOrders = todosLosUsuarios.flatMap(user => 
            user.ordenes.map(orden => ({
                ...orden,
                userId: user.id,
                username: user.username,
                userImg: user.img,
                total: orden.productos.reduce((acc, p) => acc + p.total, 0)
            }))
        );
        setAllOrders(flattenedOrders);
    }, []);

    // Filtra las órdenes basándose en el término de búsqueda
    const filteredOrders = useMemo(() => {
        if (!searchTerm) {
            return allOrders;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return allOrders.filter(order =>
            order.username.toLowerCase().includes(lowercasedFilter) ||
            order.id.toString().includes(lowercasedFilter)
        );
    }, [searchTerm, allOrders]);

    // Lógica de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='AllOrdersPage'>
            <Header/>
            <main className='main-content'>
                <div className="page-header">
                    <h1>Listado de órdenes</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar una órden por ID o usuario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-button">Buscar</button>
                    </div>
                </div>
                
                {currentOrders.length > 0 ? (
                    <>
                        <AllOrdersTable orders={currentOrders} />
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="no-results">No se encontraron órdenes que coincidan con la búsqueda.</p>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default ListadoOrdenes;