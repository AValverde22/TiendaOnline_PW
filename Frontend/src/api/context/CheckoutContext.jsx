import React, { createContext, useContext, useState } from 'react';

// 1. Crear el Contexto
const CheckoutContext = createContext();

// 2. Hook para usar el Contexto de forma sencilla
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout debe usarse dentro de un CheckoutProvider");
  }
  return context;
};

// 3. Proveedor del Contexto
export const CheckoutProvider = ({ children }) => {
  
  // -------------------------------------------------------------------------
  // 1. Datos del Paso de Dirección/Envío (Checkout 1)
  // -------------------------------------------------------------------------
  // Objeto que contendrá la dirección de envío seleccionada o introducida.
  // Ejemplo: { calle: 'Av. Sol 123', ciudad: 'Lima', codigoPostal: '15001' }
  const [shippingAddress, setShippingAddress] = useState(null); 
  
  // -------------------------------------------------------------------------
  // 2. Datos del Paso de Pago (Checkout 2)
  // -------------------------------------------------------------------------
  // String que identifica el método elegido: 'tarjeta', 'efectivo', 'paypal', etc.
  const [paymentMethod, setPaymentMethod] = useState(null); 
  
  // Estado para guardar datos de la tarjeta (temporal, NO para producción real)
  // En producción, solo guardarías un token devuelto por Stripe/MercadoPago.
  const [cardDetails, setCardDetails] = useState(null);

  // -------------------------------------------------------------------------
  // 3. Otros Datos Opcionales
  // -------------------------------------------------------------------------
  const [orderNotes, setOrderNotes] = useState('');

  /**
   * Limpia todos los datos temporales de checkout.
   * Se llama DESPUÉS de que la orden es exitosa o al salir del flujo.
   */
  const clearCheckoutData = () => {
    setShippingAddress(null);
    setPaymentMethod(null);
    setCardDetails(null);
    setOrderNotes('');
  };

  const contextValue = {
    // Estados
    shippingAddress,
    paymentMethod,
    cardDetails,
    orderNotes,
    
    // Setters
    setShippingAddress,
    setPaymentMethod,
    setCardDetails,
    setOrderNotes,
    
    // Acciones
    clearCheckoutData,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};