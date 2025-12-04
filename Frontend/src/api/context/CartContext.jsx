import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import CarritoApi from '../carritoApi.js'; // Ajusta la ruta si es necesario
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Estado del carrito
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartError, setCartError] = useState(null);

    // Datos del Usuario
    const { user, token, isAuthenticated, logout } = useUser();

    // --- Notificaciones Internas ---
    const notify = useCallback((message, type = 'error') => {
        setCartError({ message, type });
        if (type === 'error') console.error(`[Carrito Error]: ${message}`);
    }, []);

    // --- Lógica de Carga (Fetch) ---
    const fetchCart = useCallback(async () => {
        if (!isAuthenticated || !user?.id) {
            setItems([]);
            return;
        }

        setLoading(true);
        setCartError(null);

        try {
            const data = await CarritoApi.obtenerCarrito(user.id, token);
            setItems(data || []); 
        } catch (error) {
            console.error("Error fetchCart:", error);
            if (error.response && error.response.status === 401) {
                notify("Tu sesión ha expirado.", 'info');
                logout();
            } else {
                console.warn("No se pudo sincronizar el carrito.");
            }
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user, token, logout, notify]);

    // --- EFECTO DE SINCRONIZACIÓN Y LIMPIEZA ---
    // Este efecto maneja el Ciclo de Vida: Login -> Carga, Logout -> Limpieza
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchCart();
        } else {
            // AL CERRAR SESIÓN: Limpieza inmediata de datos sensibles
            setItems([]);   
            setCartError(null);
        }
    }, [isAuthenticated, user, fetchCart]);

    // --- Helper para Operaciones CRUD ---
    const executeActionAndFetch = async (actionPromise, successMsg = null) => {
        setCartError(null);
        try {
            setLoading(true);
            await actionPromise; 
            await fetchCart(); // Single Source of Truth: Recargamos de BD
            
            if (successMsg) notify(successMsg, 'success');
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || error.message || "Error al procesar la solicitud.";
            notify(msg, 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // --- Acciones Públicas ---
    
    const agregarProducto = async (producto, cantidad = 1) => {
        if (!isAuthenticated) {
            notify("Inicia sesión para comprar.", 'info');
            return;
        }
        // Validación optimista de stock (opcional)
        if (producto.stock < cantidad) {
            notify(`Solo quedan ${producto.stock} unidades.`, 'error');
            return;
        }

        const action = CarritoApi.agregarProducto(user.id, token, producto, cantidad);
        await executeActionAndFetch(action, `Agregado: ${producto.nombre}`);
    };

    const actualizarCantidad = async (idItem, cantidad) => {
        if (!isAuthenticated) return;
        if (cantidad < 1) return; 

        // Aquí se llama al endpoint PUT
        const action = CarritoApi.actualizarCantidad(token, idItem, cantidad);
        await executeActionAndFetch(action);
    };

    const eliminarProducto = async (idItem) => {
        if (!isAuthenticated) return;
        const action = CarritoApi.eliminarProducto(token, idItem);
        await executeActionAndFetch(action, "Producto eliminado.");
    };

    // Función para vaciar BD y Frontend
    const vaciarCarritoCompleto = async () => {
        if (!user || !token) return;

        try {
            setLoading(true);
            // 1. Backend: Borra en PostgreSQL
            await CarritoApi.vaciarCarrito(user.id, token);
            
            // 2. Frontend: Limpia estado visual inmediatamente
            setItems([]); 
            notify("Tu carrito ha sido vaciado.", "success");
        } catch (error) {
            console.error(error);
            notify("Error al vaciar el carrito.", "error");
        } finally {
            setLoading(false);
        }
    };

    // --- Cálculos Derivados (Math Safe) ---
    const cartTotals = useMemo(() => {
        if (!items || items.length === 0) return { total: 0, count: 0 };
        
        const totalCalculado = items.reduce((acc, item) => {
            // Protección contra datos nulos y conversión de string a número
            const precio = Number(item.producto?.precio) || 0;
            const cantidad = item.cantidad || 1;
            return acc + (precio * cantidad);
        }, 0);

        const countCalculado = items.reduce((acc, item) => acc + (item.cantidad || 1), 0);
        
        return { total: totalCalculado, count: countCalculado };
    }, [items]);

    return (
        <CartContext.Provider value={{
            items,
            loading,
            cartError,
            total: cartTotals.total,
            count: cartTotals.count,
            agregarProducto,
            actualizarCantidad,
            eliminarProducto,
            vaciarCarritoCompleto, // Nombre exportado consistente
            recargarCarrito: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};