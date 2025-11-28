import { createContext, useState, useContext, useEffect } from 'react';
import usuariosApi from '../usuariosApi'; // Verifica tu ruta de importación

// === CAMBIO CRÍTICO: Quitamos el 'export' ===
// Ahora UserContext es "privado" en este archivo.
// Esto hace feliz a Vite porque ya no exportas un objeto, solo Componentes y Hooks.
const UserContext = createContext();

// Este SÍ se exporta (es un Componente)
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('tienda_usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (credenciales) => {
        try {
            const data = await usuariosApi.login(credenciales);
            const usuarioData = data.usuario || data;

            setUser(usuarioData);
            setIsAuthenticated(true);

            localStorage.setItem('tienda_usuario', JSON.stringify(usuarioData));
            if (data.token) localStorage.setItem('token', data.token);

            return { success: true };
        } catch (error) {
            console.error("Error Login:", error);
            return {
                success: false,
                message: error.message || 'Error al iniciar sesión'
            };
        }
    };

    const register = async (datos) => {
        try {
            await usuariosApi.registrar(datos);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error al registrarse'
            };
        }
    };

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
            register,
            logout
        }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

// Este SÍ se exporta (es un Hook / Función)
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser usado dentro de un UserProvider');
    }
    return context;
};

// Y asegúrate de NO tener 'export default' al final.