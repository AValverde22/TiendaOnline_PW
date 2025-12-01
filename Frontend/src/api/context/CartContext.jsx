import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import CarritoApi from '../CarritoApi.js';
import { useUser } from './UserContext.jsx';
// ELIMINADO: import { toast } from 'react-toastify'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Estado donde guardamos los items del carrito (estructura del Backend)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // Estado para guardar mensajes de error de la última operación
    const [cartError, setCartError] = useState(null);

    const { user, token, isAuthenticated, logout } = useUser();

    // Función de notificacion simple (reemplazo de toast)
    const notify = (message, type = 'error') => {
        setCartError({ message, type });
        console.warn(`[Carrito Notificación ${type.toUpperCase()}]: ${message}`);
        // Opcional: Podrías usar 'alert(message)' aquí si quieres una ventana emergente.
    };

    // Función para recargar el carrito desde el Backend
    const fetchCart = useCallback(async () => {
        setCartError(null); // Limpiar errores antes de intentar
        if (!isAuthenticated) {
            setItems([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await CarritoApi.obtenerCarrito(user.id, token);
            setItems(data);
        } catch (error) {
            // Manejo de error si el token expiró o hay problema de conexión
            console.error("Error al cargar el carrito:", error);
            if (error.status === 401) {
                notify("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.", 'info');
                logout();
            } else {
                notify(error.message || "Error de conexión al cargar el carrito.", 'error');
            }
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user, token, logout]);

    // 1. Efecto: Cargar carrito al iniciar o cuando el usuario cambie/autentique
    useEffect(() => {
        if (user || !isAuthenticated) {
            fetchCart();
        }
    }, [user, isAuthenticated, fetchCart]);

    // 2. Operaciones CRUD (conectadas al API)

    // Función central que realiza la acción y luego recarga la data
    const executeActionAndFetch = async (actionPromise) => {
        setCartError(null); // Limpiar errores antes de la acción
        try {
            // La promesa se ejecuta y espera
            await actionPromise;

            // Recargamos la lista completa para reflejar los cambios
            await fetchCart();
            return true;
        } catch (error) {
            console.error("Error en operación del carrito:", error);
            const msg = error.message || "Ocurrió un error en el servidor.";
            notify(msg, 'error');
            return false;
        }
    };

    const agregarProducto = async (producto, cantidad = 1) => {
        if (!isAuthenticated) {
            notify("Debes iniciar sesión para agregar productos al carrito.", 'info');
            return;
        }
        const action = CarritoApi.agregarProducto(user.id, token, producto, cantidad);
        const success = await executeActionAndFetch(action);
        if (success) {
            // Notificación de éxito simple
            notify(`${producto.nombre} agregado con éxito.`, 'success');
        }
    };

    const actualizarCantidad = async (idItem, cantidad) => {
        if (!isAuthenticated) return;
        const action = CarritoApi.actualizarCantidad(token, idItem, cantidad);
        await executeActionAndFetch(action);
    };

    const eliminarProducto = async (idItem) => {
        if (!isAuthenticated) return;
        const action = CarritoApi.eliminarProducto(token, idItem);
        await executeActionAndFetch(action);
    };

    const vaciarCarrito = async () => {
        // En este flujo, se vacía al completar la compra. 
        setItems([]);
    };

    // 3. Cálculos derivados
    const total = CarritoApi.calcularTotal(items);
    const count = items.reduce((sum, item) => sum + item.cantidad, 0);

    return (
        <CartContext.Provider value={{
            items,
            total,
            count,
            loading,
            cartError, // Exportamos el error para que los componentes lo puedan mostrar
            agregarProducto,
            actualizarCantidad,
            eliminarProducto,
            vaciarCarrito
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