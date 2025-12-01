import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../../api/context/UserContext.jsx";
import usuariosApi from "../../api/usuariosApi";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TableComponent from "./TableComponent.jsx"; // Asegúrate de la ruta correcta
import "./DetalleOrden.css";

const DetalleOrden = () => {
  const { orderId, userId } = useParams();
  const { token } = useUser();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const cargarOrden = async () => {
      try {
        if (!token) return;

        // Traer usuario con sus órdenes y detalles
        const response = await usuariosApi.findById(userId, token);
        const user = response.data;

        if (!user || !user.ordenes) {
          setErrorMsg("Usuario no tiene órdenes.");
          setLoading(false);
          return;
        }

        // Buscar orden específica
        const order = user.ordenes.find(o => Number(o.id) === Number(orderId));

        if (!order) {
          setErrorMsg("No se encontró la orden solicitada.");
          setLoading(false);
          return;
        }

        // Transformar detalles a productos
        const productos = (order.detalles || []).map(d => ({
          id: d.producto.id,
          nombre: d.producto.nombre,
          categoria: d.producto.categoria?.nombre || "Sin categoría", // Trae nombre desde BD
          cantidad: d.cantidad,
          total: Number(d.subtotal),
          img: d.producto.img
        }));

        setOrderData({
          ...order,
          productos,
          user: {
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo
          }
        });

      } catch (error) {
        console.error("Error cargando la orden:", error);
        setErrorMsg("Ocurrió un error al cargar la orden.");
      } finally {
        setLoading(false);
      }
    };

    cargarOrden();
  }, [orderId, userId, token]);

  const totalAmount = useMemo(() => {
    if (!orderData || !orderData.productos) return 0;
    return orderData.productos.reduce((acc, p) => acc + (Number(p.total) || 0), 0);
  }, [orderData]);

  if (loading) {
    return (
      <div className="OrderDetailPage">
        <Header />
        <main className="main-content">
          <p>Cargando detalles de la orden...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="OrderDetailPage">
        <Header />
        <main className="main-content">
          <p>{errorMsg}</p>
          <Link to="/ListadoOrdenesAdmin" className="back-link">
            &larr; Volver al Listado de Órdenes
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const columns = [
    {
      header: "Id",
      render: (p) => <span>#{p.id.toString().padStart(4, "0")}</span>
    },
    {
      header: "Nombre",
      render: (p) => (
        <div className="product-cell">
          <img src={p.img} alt={p.nombre} className="product-img-small" />
          <span>{p.nombre}</span>
        </div>
      )
    },
    {
      header: "Categoría",
      accessor: "categoria"
    },
    {
      header: "Cantidad",
      accessor: "cantidad"
    },
    {
      header: "Total",
      render: (p) => <span>S/ {Number(p.total).toFixed(2)}</span>
    }
  ];

  return (
    <div className="OrderDetailPage">
      <Header />
      <main className="main-content">
        <Link to="/ListadoOrdenesAdmin" className="back-link">
          &larr; Volver al Listado de Órdenes
        </Link>

        <div className="order-detail-header">
          <h1>Orden #{orderData.id.toString().padStart(4, "0")}</h1>
          <div className="order-summary">
            <p>
              <strong>Estado:</strong>{" "}
              <span className={orderData.estado?.toLowerCase() === "entregado"
                ? "status-entregado"
                : "status-por-entregar"}>
                {orderData.estado}
              </span>
            </p>
            <p>
              <strong>Monto total:</strong> S/ {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="product-list-container">
          <h2>Productos ordenados ({orderData.productos.length})</h2>
          <TableComponent
            columns={columns}
            data={orderData.productos}
            emptyMessage="No hay productos en esta orden."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetalleOrden;
