import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrdenesApi from "../../api/OrdenesApi.js"; // Tu archivo API
import { useUser } from "../../api/context/UserContext.jsx";
import Header from "../Header/Header.jsx";
import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ID de la URL (ej: 125)
  const { token, isAuthenticated } = useUser();

  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Validación de sesión
    if (!isAuthenticated || !token) {
        navigate("/login");
        return;
    }

    const cargarOrden = async () => {
      try {
        // 2. CORRECCIÓN CLAVE: Usamos 'findById' tal como está en tu API
        const data = await OrdenesApi.findById(id, token);
        
        // Manejo robusto de la respuesta (por si viene anidada o directa)
        setOrden(data.orden || data);
      } catch (err) {
        console.error("Error al cargar orden:", err);
        setError("No pudimos cargar los detalles de tu orden.");
      } finally {
        setLoading(false);
      }
    };

    if (id) cargarOrden();
  }, [id, token, isAuthenticated, navigate]);

  const handleVolverTienda = () => {
    navigate("/"); 
  };

  // --- Helpers de visualización (CORREGIDOS) ---
  
  const getDireccion = () => {
      try {
          // CORRECCIÓN: Accedemos a orden.direccion_envio
          const dirData = orden.direccion_envio; 
          console.log(dirData)
          console.log(JSON.parse(dirData))

          if (!dirData) return "Dirección no registrada";
          
          // Caso 1: Viene como string JSON (común en PostgreSQL text)
          if (typeof dirData == 'string') {
              const dir = JSON.parse(dirData);
              return `${dir.direccion}, ${dir.ciudad}`;
          }
          // Caso 2: Viene como objeto JSONB
          return `${dirData.direccion}, ${dirData.ciudad}`;
      } catch (e) {
          return "Dirección no disponible";
      }
  };

  const getMetodoPago = () => {
      // CORRECCIÓN: Accedemos a orden.metodo_pago
      const metodo = orden.metodo_pago || "";
      
      // Lógica visual simple
      if (metodo.includes("QR") || metodo.includes("Yape") || metodo.includes("Plin")) {
          return "Yape / Plin (QR)";
      }
      return "Tarjeta de Crédito/Débito";
  };

  // --- Renderizado de Estados ---
  if (loading) return (
    <>
      <Header />
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Generando tu recibo...</p>
      </div>
    </>
  );

  if (error) return (
    <>
        <Header />
        <div className="error-container">
            <h2 style={{color: "#dc3545"}}>⚠️ Hubo un problema</h2>
            <p>{error}</p>
            <button className="btn-primary" onClick={handleVolverTienda}>Volver al Inicio</button>
        </div>
    </>
  );

  if (!orden) return null;

  // Normalizamos items (backend agnostic)
  const listaItems = orden.items || orden.productos || [];

  return (
    <div className="checkout-success-page">
      <Header />
      
      <div className="container">
        <div className="success-layout">
            
            {/* IZQUIERDA: CONFIRMACIÓN */}
            <main className="success-left">
                <div className="success-card center-content">
                    <div className="success-icon">🎉</div>
                    <h1>¡Orden completada con éxito!</h1>
                    <p className="order-id">Orden #{orden.id}</p>
                    
                    <p className="success-message">
                        Gracias por tu compra. Hemos enviado un correo de confirmación a <strong>{orden.usuario?.correo || "tu email"}</strong>.
                    </p>

                    <div className="order-details-box">
                        <h3>Detalles de la transacción</h3>
                        <p><strong>Estado:</strong> <span className="status-badge">{orden.estado || "Procesado"}</span></p>
                        <p><strong>Fecha:</strong> {new Date(orden.createdAt || Date.now()).toLocaleDateString()}</p>
                        
                        {/* Usamos los helpers corregidos */}
                        <p><strong>Método de pago:</strong> {getMetodoPago()}</p>
                        <p><strong>Dirección de envío:</strong> {getDireccion()}</p>
                    </div>

                    <button className="btn-primary" onClick={handleVolverTienda} style={{marginTop: 30}}>
                        Volver a la Tienda
                    </button>
                </div>
            </main>

            {/* DERECHA: RECIBO */}
            <aside className="success-right">
                <div className="receipt-card">
                    <h3>Resumen del Pedido</h3>
                    
                    <div className="receipt-items">
                        {listaItems.map((item, index) => {
                            const nombre = item.producto?.nombre || item.nombre || "Producto";
                            const precio = Number(item.precio_unitario || item.precio || 0);
                            const cantidad = item.cantidad || 1;

                            return (
                                <div key={index} className="receipt-item">
                                    <div className="item-info">
                                        <span className="qty">{cantidad}x</span>
                                        <span>{nombre}</span>
                                    </div>
                                    <span className="price">S/ {(precio * cantidad).toFixed(2)}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="receipt-total">
                        <span>Total Pagado</span>
                        <span className="total-amount">S/ {Number(orden.total).toFixed(2)}</span>
                    </div>
                </div>
            </aside>

        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;