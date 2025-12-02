import React, { createContext, useContext, useState, useEffect } from 'react';
// import OrdenesApi from '../api/OrdenesApi'; // Tu API de backend para crear orden

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  
  // 1. Estado: Dirección (Con persistencia en SessionStorage)
  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const saved = sessionStorage.getItem('checkout_address');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  // 2. Estado: Método de Pago (Con persistencia)
  const [paymentMethod, setPaymentMethod] = useState(() => {
     return sessionStorage.getItem('checkout_payment_method') || null;
  });

  // 3. Estado: Datos de Tarjeta (SOLO MEMORIA - Por seguridad PCI)
  // Nunca guardar esto en localStorage/sessionStorage
  const [cardDetails, setCardDetails] = useState(null); 
  
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Efecto para guardar en SessionStorage cambios en dirección/método
  useEffect(() => {
    if (shippingAddress) {
      sessionStorage.setItem('checkout_address', JSON.stringify(shippingAddress));
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (paymentMethod) {
      sessionStorage.setItem('checkout_payment_method', paymentMethod);
    }
  }, [paymentMethod]);

  // --- Acciones ---

  const clearCheckoutData = () => {
    setShippingAddress(null);
    setPaymentMethod(null);
    setCardDetails(null);
    setOrderNotes('');
    // Limpiar storage
    sessionStorage.removeItem('checkout_address');
    sessionStorage.removeItem('checkout_payment_method');
  };

  /**
   * Función Maestra para Finalizar Compra
   * @param {Object} cartData - Datos del CartContext (items, total)
   * @param {string} token - Token de autenticación del usuario
   * @param {Function} apiCall - Función real que llama al Backend
   */
  const procesarOrden = async (cartData, token, apiCall) => {
    if (!shippingAddress || !paymentMethod) {
        throw new Error("Faltan datos de envío o método de pago.");
    }

    setIsProcessing(true);
    
    // Construcción del Payload para PostgreSQL (JSONB o Tablas Relacionales)
    const orderPayload = {
        direccion_envio: shippingAddress,
        metodo_pago: paymentMethod,
        notas: orderNotes,
        items: cartData.items.map(i => ({ 
            id_producto: i.id, 
            cantidad: i.cantidad, 
            precio_unitario: i.precio 
        })),
        total: cartData.total,
        // Si es tarjeta, enviamos token de pasarela, NO la tarjeta cruda
        payment_token: cardDetails?.token || null 
    };

    try {
        // Llamada al Backend (Transactional Insert en PostgreSQL)
        const response = await apiCall(orderPayload, token);
        
        // Si todo sale bien, limpiamos
        clearCheckoutData();
        return response; // Retornamos la orden creada (ID, etc.)
    } catch (error) {
        console.error("Error procesando orden:", error);
        throw error; // Re-lanzamos para que la UI maneje el mensaje
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <CheckoutContext.Provider value={{
      shippingAddress, setShippingAddress,
      paymentMethod, setPaymentMethod,
      cardDetails, setCardDetails,
      orderNotes, setOrderNotes,
      isProcessing,
      procesarOrden,
      clearCheckoutData
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout debe usarse dentro de un CheckoutProvider");
  return context;
};