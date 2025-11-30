import { createContext, useState, useContext, useEffect } from 'react';
import base from '../base.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1. VERIFICAR SESIÓN AL RECARGAR
    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem('token');
            // CAMBIO: Usamos 'usuario' para estandarizar
            const usuarioGuardado = localStorage.getItem('usuario'); 

            if (token && usuarioGuardado) {
                try {
                    setUser(JSON.parse(usuarioGuardado));
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error al leer sesión");
                    logout();
                }
            }
            setLoading(false);
        };

        checkLogin();
    }, []);

    // 2. LOGIN CENTRALIZADO
    const login = async (credenciales) => {
        try {
            const data = await base.post('usuarios/login', credenciales);

            if (data.success) {
                const usuarioData = data.usuario || data; 

                // Actualizamos el estado de React
                setUser(usuarioData);
                setIsAuthenticated(true);

                // CAMBIO: Guardamos en localStorage con la clave 'usuario'
                localStorage.setItem('usuario', JSON.stringify(usuarioData));
                
                if (data.token) localStorage.setItem('token', data.token);

                // Devolvemos el usuario para que el Login sepa qué rol tiene
                return { success: true, usuario: usuarioData }; 
            } else {
                return { success: false, message: data.message || 'Credenciales incorrectas' };
            }

        } catch (error) {
            console.error("Error crítico en login:", error);
            return { success: false, message: "Error de conexión" };
        }
    };

    // 3. LOGOUT
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('usuario'); // Borramos 'usuario'
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser debe usarse dentro de un UserProvider');
    return context;
};