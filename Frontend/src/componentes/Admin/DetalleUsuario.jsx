import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import usuariosApi from "../../api/usuariosApi";
import { useUser } from "../../api/context/UserContext.jsx";
import TableComponent from "../Admin/TableComponent.jsx";
import "./DetalleUsuario.css";

const DetalleUsuario = () => {
    const { id } = useParams();
    const { token } = useUser();
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await usuariosApi.findById(id, token);
                setUsuario(response.data || null);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
                setUsuario(null);
            } finally {
                setCargando(false);
            }
        };
        if (token) fetchUser();
    }, [id, token]);

    if (cargando) return <div className="loading-screen">Cargando usuario...</div>;
    if (!usuario) return <div className="loading-screen">No se encontró el usuario con ID {id}</div>;

    // Preparar los datos de órdenes para la tabla
    const ordersData = (usuario.ordenes || []).map((orden) => ({
        ...orden,
    }));

    // Columnas para la tabla
    const columns = [
        {
            header: "#Orden",
            render: (order) => <span>#{order.id.toString().padStart(4, '0')}</span>
        },
        {
            header: "Fecha",
            render: (order) => new Date(order.fecha).toLocaleDateString()
        },
        {
            header: "Estado",
            render: (order) => (
                <span className={order.estado === 'entregado' ? 'status-entregado' : 'status-p-entregar'}>
                    {order.estado}
                </span>
            )
        },
        {
            header: "Total",
            render: (order) => <span>S/ {order.total}</span>
        }
    ];

    return (
        <div className="UserProfilePage">
            <Header />
            <main className="main-content">
                <div className="page-header">
                    <Link to="/admin/users" className="back-link">&larr; Volver a la lista</Link>
                    <h1>Perfil del Usuario</h1>
                </div>

                <div className="profile-layout">
                    <div className="profile-card">
                        <div className="profile-card-header">
                            <img
                                src={usuario.img || `https://i.pravatar.cc/150?u=${usuario.id}`}
                                alt={`Avatar de ${usuario.nombre}`}
                                className="profile-avatar"
                            />
                            <div className="profile-name">
                                <h2>{usuario.nombre} {usuario.apellido}</h2>
                                <p>@{usuario.username}</p>
                                <span className={usuario.estado?.toLowerCase() === 'activo' ? 'estado-activo' : 'estado-inactivo'}>
                                    {usuario.estado || 'desconocido'}
                                </span>
                            </div>
                        </div>

                        <div className="profile-card-body">
                            <h3>Información de Contacto</h3>
                            <p><strong>Correo:</strong> {usuario.correo}</p>
                            <p><strong>Teléfono:</strong> {usuario.telefono || 'No especificado'}</p>

                            <h3>Información de Envío</h3>
                            <p><strong>Dirección:</strong> {usuario.direccion || 'No especificado'}</p>
                            <p><strong>Distrito:</strong> {usuario.distrito || 'No especificado'}</p>
                        </div>
                    </div>

                    <div className="order-history-container">
                        <h3>Historial de Órdenes ({ordersData.length})</h3>
                        <TableComponent
                            columns={columns}
                            data={ordersData}
                            emptyMessage="Este usuario no tiene órdenes."
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DetalleUsuario;
