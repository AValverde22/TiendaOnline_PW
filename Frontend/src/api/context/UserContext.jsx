import { createContext, useState, useContext, useEffect } from 'react';
import base from '../base.js'; // <--- Importamos TU archivo base

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1. Efecto para verificar sesión al recargar (F5)
    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('token');
            const usuarioGuardado = localStorage.getItem('tienda_usuario'); // Usamos tu clave

            if (token && usuarioGuardado) {
                try {
                    // Opcional: Validar token con backend
                    // Nota: base.get requiere el token como segundo parámetro según tu código
                    // await base.get('usuarios/verify', token); 

                    setUser(JSON.parse(usuarioGuardado));
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Sesión inválida o expirada");
                    logout();
                }
            }
            setLoading(false);
        };

        checkLogin();
    }, []);

    // 2. Función de Login
    const login = async (credenciales) => {
        try {
            // USANDO TU BASE.JS
            // Nota: Como base.js ya tiene 'http://localhost:3005/api/', 
            // solo pasamos 'usuarios/login' (sin barra al inicio para evitar //)
            const data = await base.post('usuarios/login', credenciales);

            // Validamos la respuesta lógica del backend
            if (data.success) {
                const usuarioData = data.usuario || data; // Ajuste por si el backend varía estructura

                setUser(usuarioData);
                setIsAuthenticated(true);

                // Guardar en localStorage
                localStorage.setItem('tienda_usuario', JSON.stringify(usuarioData));
                if (data.token) localStorage.setItem('token', data.token);

                return { success: true };
            } else {
                // El backend respondió (ej: 401), pero con success: false
                return {
                    success: false,
                    message: data.message || 'Credenciales incorrectas'
                };
            }

        } catch (error) {
            console.error("Error crítico en login:", error);
            // Esto captura errores de red (servidor apagado) o fallos de JSON
            return {
                success: false,
                message: "Error de conexión con el servidor"
            };
        }
    };

    // 3. Función de Logout
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('tienda_usuario');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            logout
        }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe usarse dentro de un UserProvider');
    }
    return context;
};