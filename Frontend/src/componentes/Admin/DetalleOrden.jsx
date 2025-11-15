import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import usuariosApi from '../../api/usuariosApi';
import './DetalleOrden.css'; 
const DetalleOrden = () => {

    const { orderId, userId } = useParams(); 
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {

        const user = usuariosApi.findById(parseInt(userId));
        if (user) {

            const order = user.ordenes.find(o => o.id === parseInt(orderId));
            if (order) {

                setOrderData({
                    ...order,
                    user: {
                        nombre: user.nombre,
                        apellido: user.apellido,
                        correo: user.correo
                    }
                });
            }
        }
    }, [orderId, userId]);

    const totalAmount = useMemo(() => {
        if (!orderData) return 0;
        return orderData.productos.reduce((acc, p) => acc + p.total, 0);
    }, [orderData]);


    if (!orderData) {
        return (
            <div className='OrderDetailPage'>
                <Header/>
                <main className='main-content'>
                    <p>Cargando detalles de la orden...</p>
                </main>
                <Footer/>
            </div>
        );
    }


    return (
        <div className='OrderDetailPage'>
            <Header/>
            <main className='main-content'>
                <Link to="/ListadoOrdenesAdmin" className="back-link">&larr; Volver al Listado de Órdenes</Link>

                <div className="order-detail-header">
                    <h1>Orden #{orderData.id.toString().padStart(4, '0')}</h1>
                    <div className="order-summary">
                        <p><strong>Estado:</strong> <span className={orderData.estado === 'entregado' ? 'status-entregado' : 'status-por-entregar'}>{orderData.estado}</span></p>
                        <p><strong>Monto total:</strong> S/ {totalAmount.toFixed(2)}</p>
                    </div>
                </div>

                <div className="product-list-container">
                    <h2>Productos ordenados ({orderData.productos.length})</h2>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.productos.map(producto => (
                                <tr key={producto.id}>
                                    <td className="product-id">#{producto.id.toString().padStart(4, '0')}</td>
                                    <td className="product-cell">
                                        <img src={`https://placehold.co/100x100/f0f0f0/333?text=${producto.nombre.charAt(0)}`} alt={producto.nombre} />
                                        <span>{producto.nombre}</span>
                                    </td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>S/ {producto.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default DetalleOrden;

