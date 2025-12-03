import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './DetallesDeOrden.css';

// Importamos la API y los Contextos
import OrdenesApi from '../../api/OrdenesApi';
import { useCart } from '../../api/context/CartContext';
import { useCheckout } from '../../api/context/CheckoutContext';
import { useUser } from '../../api/context/UserContext';

const DetallesDeOrden = () => {
    const navigate = useNavigate();
    
    // 1. Datos de MEMORIA (Contextos)
    const { items, total, count, vaciarCarritoCompleto } = useCart();
    const { shippingAddress, paymentMethod, cardDetails } = useCheckout(); // cardDetails si lo guardaste en el paso anterior
    const { user, token, isAuthenticated } = useUser();

    const [loading, setLoading] = useState(false);

    // 2. Validación de Seguridad
    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
        if (!shippingAddress) navigate("/Checkout1");
        if (!paymentMethod) navigate("/Checkout2");
    }, [items, shippingAddress, paymentMethod, isAuthenticated, navigate]);

    // 3. Acción de CONFIRMAR (Aquí se crea la orden)
// 3. Acción de CONFIRMAR (Aquí se crea la orden)
    const handleConfirmarOrden = async () => {
        setLoading(true);
        try {
            // Construimos el objeto final para el Backend
            const payload = {
                usuarioId: user.id,
                total: total,
                metodoPago: paymentMethod, 
                direccion_envio: shippingAddress, 
                
                // --- CORRECCIÓN CRÍTICA 1: Mapeo de IDs ---
                items: items.map(i => ({
                    productoId: i.producto?.id || i.id, 
                    cantidad: i.cantidad,
                    precioUnitario: Number(i.precio || i.producto?.precio)
                })),
                // ------------------------------------------

                datosPagoExtra: cardDetails || null 
            };

            console.log("Enviando Payload:", payload); // Para depurar

            // A. Llamada al Backend
            const respuesta = await OrdenesApi.crearOrden(payload, token);
            
            // B. Obtenemos el ID de la orden creada
            const nuevaOrdenId = respuesta.id || respuesta.orden?.id; 

            // C. Limpiamos el carrito
            await vaciarCarritoCompleto();

            navigate(`/Checkout5/${nuevaOrdenId}`); 
            // -------------------------------------------

        } catch (error) {
            console.error("Error al crear orden:", error);
            // Mensaje de error más detallado
            const msg = error.response?.data?.message || "Error al procesar la compra.";
            alert(`Hubo un error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    // 4. Acción de CANCELAR
    const handleCancelarOrden = () => {
        if (window.confirm("¿Estás seguro de cancelar? Volverás al inicio pero tus productos seguirán en el carrito.")) {
            navigate("/");
        }
    };

    // Helpers de visualización
    const fechaActual = new Date().toLocaleDateString();

    return (
        <>
            <Header/>
            <div className="DetallesDeOrdenParent">
                <div className="DetallesDeOrden">
                    <h1>Revisa tu Pedido</h1>
                    <p className="subtitulo">Por favor verifica que todo esté correcto antes de confirmar.</p>

                    {/* SECCIÓN SUPERIOR: DATOS GENERALES */}
                    <div className="resumen-info-grid">
                        <div className="info-bloque">
                            <h3>📦 Envío</h3>
                            <p><strong>Nombre:</strong> {shippingAddress?.nombre} {shippingAddress?.apellido}</p>
                            <p><strong>Dirección:</strong> {shippingAddress?.direccion}</p>
                            <p><strong>Ciudad:</strong> {shippingAddress?.ciudad}</p>
                            <p><strong>Teléfono:</strong> {shippingAddress?.telefono}</p>
                        </div>
                        <div className="info-bloque">
                            <h3>💳 Pago</h3>
                            <p><strong>Método:</strong> {paymentMethod === 'qr' ? 'Yape / Plin' : 'Tarjeta Crédito/Débito'}</p>
                            <p><strong>Fecha:</strong> {fechaActual}</p>
                        </div>
                    </div>

                    {/* SECCIÓN MEDIA: TABLA DE PRODUCTOS */}
                    <div className="tabla-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th style={{textAlign:'center'}}>Cant.</th>
                                    <th style={{textAlign:'right'}}>Total</th>                          
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((p) => {
                                    const nombre = p.producto?.nombre || p.nombre;
                                    const precio = Number(p.precio || p.producto?.precio);
                                    return (
                                        <tr key={p.id}>
                                            <td>{nombre}</td>
                                            <td style={{textAlign:'center'}}>{p.cantidad}</td>
                                            <td style={{textAlign:'right'}}>S/ {(precio * p.cantidad).toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2" className="total-label">TOTAL A PAGAR</td>
                                    <td className="total-value">S/ {total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* SECCIÓN INFERIOR: BOTONES DE ACCIÓN */}
                    <div className="acciones-finales">
                        <button 
                            className="btn-cancelar" 
                            onClick={handleCancelarOrden}
                            disabled={loading}
                        >
                            Cancelar Orden
                        </button>
                        <button 
                            className="btn-confirmar" 
                            onClick={handleConfirmarOrden}
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : 'Confirmar Compra'}
                        </button>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    );  
}

export default DetallesDeOrden;