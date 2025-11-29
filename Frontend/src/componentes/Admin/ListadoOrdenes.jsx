import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import TableComponent from './TableComponent';
import './ListadoOrdenes.css';

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

    // --- CONFIGURACIÓN DE COLUMNAS ---
    const columns = [
        { header: '#ORDEN', className: 'order-id', render: (order) => `#${order.id.toString().padStart(4, '0')}` },
        {
            header: 'Usuario',
            className: 'user-cell',
            render: (order) => (
                <>
                    <img src={order.userImg || `https://i.pravatar.cc/150?u=${order.userId}`} alt={`Avatar de ${order.username}`} />
                    <span>{order.username}</span>
                </>
            )
        },
        { header: 'Fecha de orden', render: (order) => new Date(order.fecha).toLocaleDateString() },
        { header: 'Total', render: (order) => `S/ ${order.total.toFixed(2)}` },
        {
            header: 'Estado',
            render: (order) => (
                <span className={order.estado === 'entregado' ? 'status-entregado' : 'status-por-entregar'}>
                    {order.estado}
                </span>
            )
        },
        {
            header: 'Acciones',
            className: 'action-buttons',
            render: (order) => (
                <Link to={`/admin/orders/${order.userId}/${order.id}`}>
                    <button className="btn-ver-detalle-orden">Ver detalle</button>
                </Link>
            )
        }
    ];

    return (
        <div className='AllOrdersPage'>
            <Header />
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
                        <TableComponent
                            columns={columns}
                            data={currentOrders}
                        />
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
            <Footer />
        </div>
    );
};

export default ListadoOrdenes;