import { createContext, useState, useContext, useEffect } from 'react';
import base from '../base.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1. Verificar sesión al recargar
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('usuario');

        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Error al leer sesión");
                logout();
            }
        }

        setLoading(false);
    }, []);

    // 2. Login centralizado
    const login = async (credenciales) => {
        try {
            const data = await base.post('usuarios/login', credenciales);

            if (data.success) {
                const usuarioData = data.usuario;

                // Actualiza estados globales
                setUser(usuarioData);
                setToken(data.token);
                setIsAuthenticated(true);

                // Guarda en localStorage
                localStorage.setItem('usuario', JSON.stringify(usuarioData));
                localStorage.setItem('token', data.token);

                return { success: true, usuario: usuarioData };
            }

            return { success: false, message: data.message || "Credenciales incorrectas" };

        } catch (err) {
            console.error("Error crítico en login:", err);
            return { success: false, message: "Error de conexión" };
        }
    };

    // 3. Logout limpio
    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);

        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{
            user,
            token,
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
    if (!context) throw new Error("useUser debe usarse dentro de un UserProvider");
    return context;
};
