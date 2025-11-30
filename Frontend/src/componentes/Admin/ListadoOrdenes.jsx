import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import TableComponent from './TableComponent';
import './ListadoOrdenes.css'; // Asegúrate de actualizar el CSS también

const ListadoOrdenes = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // 1. CORRECCIÓN: Llamada asíncrona correcta
                const respuesta = await usuariosApi.findAll();
                const usuarios = Array.isArray(respuesta) ? respuesta : (respuesta.data || []);

                // 2. Lógica para extraer las órdenes de los usuarios
                const flattenedOrders = usuarios.flatMap(user => {
                    // Validación de seguridad: Si el usuario no tiene órdenes, devolvemos array vacío
                    const ordenesDelUsuario = user.ordenes || [];
                    
                    return ordenesDelUsuario.map(orden => ({
                        ...orden,
                        userId: user.id,
                        username: user.username || user.nombre, // Fallback al nombre si no hay username
                        userImg: user.img,
                        // Si el backend ya trae el total, úsalo. Si no, calcúlalo.
                        totalCalculado: orden.total || (orden.productos ? orden.productos.reduce((acc, p) => acc + p.total, 0) : 0)
                    }));
                });

                // Ordenamos por fecha (las más recientes primero)
                flattenedOrders.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

                setAllOrders(flattenedOrders);
            } catch (error) {
                console.error("Error al cargar órdenes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Filtra las órdenes
    const filteredOrders = useMemo(() => {
        if (!searchTerm) return allOrders;
        const lowercasedFilter = searchTerm.toLowerCase();
        return allOrders.filter(order =>
            (order.username || '').toLowerCase().includes(lowercasedFilter) ||
            order.id.toString().includes(lowercasedFilter)
        );
    }, [searchTerm, allOrders]);

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // --- CONFIGURACIÓN DE COLUMNAS (Estilo Consistente) ---
    const columns = [
        { 
            header: '#ORDEN', 
            // Usamos render para darle estilo de ID
            render: (order) => <span style={{fontWeight: 'bold', color: '#555'}}>#{order.id.toString().padStart(4, '0')}</span> 
        },
        {
            header: 'Usuario',
            className: 'user-col', // Reutilizamos la clase de ListadoUsuarios
            render: (order) => (
                <div className="user-cell-content"> {/* Reutilizamos estructura Flex */}
                    <img 
                        src={order.userImg || `https://i.pravatar.cc/150?u=${order.userId}`} 
                        alt="avatar" 
                        className="user-avatar-small"
                    />
                    <div className="user-info-text">
                        <span className="user-name">{order.username}</span>
                    </div>
                </div>
            )
        },
        { 
            header: 'Fecha', 
            className: 'date-col',
            render: (order) => new Date(order.fecha).toLocaleDateString() 
        },
        { 
            header: 'Total', 
            render: (order) => <span style={{fontWeight: 'bold'}}>S/ {Number(order.totalCalculado).toFixed(2)}</span> 
        },
        {
            header: 'Estado',
            className: 'status-col', // Ancho fijo
            render: (order) => {
                // Definimos clases según el estado de la orden
                const estado = order.estado?.toLowerCase();
                let badgeClass = 'inactive'; // Color por defecto (rojo/gris)
                
                if (estado === 'entregado' || estado === 'completado') badgeClass = 'active'; // Verde
                if (estado === 'pendiente' || estado === 'en proceso') badgeClass = 'pending'; // Amarillo (si lo defines)

                return (
                    <span className={`status-badge ${badgeClass}`}>
                        {order.estado}
                    </span>
                );
            }
        },
        {
            header: 'Acciones',
            className: 'actions-col', // Ancho fijo
            render: (order) => (
                <div className="action-buttons-wrapper">
                    <Link to={`/admin/orders/${order.userId}/${order.id}`}>
                        <button className="btn-view-profile">Ver Detalle</button>
                    </Link>
                </div>
            )
        }
    ];

    if (loading) return <div className="loading-screen">Cargando órdenes...</div>;

    return (
        <div className='AllOrdersPage'> {/* Usamos la misma clase base si quieres estilos compartidos */}
            <Header />
            <main className='main-content'>
                <div className="page-header">
                    <h1>Listado de órdenes</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar por ID o usuario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    {currentOrders.length > 0 ? (
                        <TableComponent
                            columns={columns}
                            data={currentOrders}
                        />
                    ) : (
                        <p className="no-results">No se encontraron órdenes.</p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button 
                                key={i + 1} 
                                onClick={() => paginate(i + 1)} 
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ListadoOrdenes;