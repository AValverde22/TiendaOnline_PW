import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../../api/context/UserContext.jsx";
import usuariosApi from "../../api/usuariosApi";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TableComponent from "./TableComponent.jsx"; 
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

        const response = await usuariosApi.findById(userId, token);
        const user = response.data;

        if (!user || !user.ordenes) {
          setErrorMsg("Usuario no tiene órdenes.");
          setLoading(false);
          return;
        }

        const order = user.ordenes.find(o => Number(o.id) === Number(orderId));

        if (!order) {
          setErrorMsg("No se encontró la orden solicitada.");
          setLoading(false);
          return;
        }

        const productos = (order.detalles || []).map(d => ({
          id: d.producto.id,
          nombre: d.producto.nombre,
          categoria: d.producto.categoriaProducto?.nombre || "Sin categoría",
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
        <main className="main-content loading-container">
          <div className="spinner"></div>
          <p>Cargando detalles...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="OrderDetailPage">
        <Header />
        <main className="main-content error-container">
          <p>{errorMsg}</p>
          <Link to="/ListadoOrdenesAdmin" className="back-link">
            &larr; Volver
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Definición de columnas ajustada al diseño visual
  const columns = [
    {
      header: "Id",
      width: "10%",
      render: (p) => <span className="id-cell">#{p.id.toString().padStart(4, "0")}</span>
    },
    {
      header: "Nombre",
      width: "40%",
      render: (p) => (
        <div className="product-cell">
          <img src={p.img} alt={p.nombre} className="product-img-small" />
          <span className="product-name">{p.nombre}</span>
        </div>
      )
    },
    {
      header: "Categoria", // Sin tilde para matchear estilo visual simple
      width: "20%",
      accessor: "categoria",
      render: (p) => <span className="category-text">{p.categoria}</span>
    },
    {
      header: "Cantidad",
      accessor: "cantidad",
      render: (p) => <span className="qty-text">{p.cantidad}</span>
    },
    {
      header: "Total",
      render: (p) => <span className="total-text">S/{Number(p.total).toFixed(2)}</span>
    }
  ];

  const isEntregado = orderData.estado?.toLowerCase() === "entregado";

  return (
    <div className="OrderDetailPage">
      <Header />
      
      <main className="main-content2">
        {/* Breadcrumb / Link de retorno */}
        <div className="top-nav">
             {/* Puedes agregar breadcrumbs aquí si deseas */}
        </div>

        {/* TARJETA DE CABECERA DE LA ORDEN */}
        <div className="order-header-card">
          <div className="order-title-section">
            <h1>Orden #{orderData.id.toString().padStart(4, "0")}</h1>
            <Link to="/ListadoOrdenesAdmin" className="back-link-modern">
               Volver al listado
            </Link>
          </div>

          <div className="order-meta-section">
            <div className="meta-item">
              <span className="meta-label">Estado:</span>
              <span className={`status-pill ${isEntregado ? "entregado" : "pendiente"}`}>
                {orderData.estado}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Monto total:</span>
              <span className="total-amount-display">S/{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE PRODUCTOS */}
        <div className="products-section">
          <h2 className="section-title">Productos ordenados</h2>
          
          <div className="table-card">
            <TableComponent
              columns={columns}
              data={orderData.productos}
              emptyMessage="No hay productos en esta orden."
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetalleOrden;