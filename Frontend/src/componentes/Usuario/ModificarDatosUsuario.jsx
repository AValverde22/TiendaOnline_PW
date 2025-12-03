import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usuariosApi from '../../api/usuariosApi';
import { useUser } from '../../api/context/UserContext'; 

import FormModificarDatos from './Formularios/FormModificarDatos';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ModificarDatosUsuario = () => {
    const navigate = useNavigate();
    
    // Ahora sí funcionará setUser porque lo expusimos en el provider
    const { user, token, isAuthenticated, setUser } = useUser();

    // Protección de Ruta
    useEffect(() => {
        if (!isAuthenticated || !user) {
            alert("Debes iniciar sesión.");
            navigate("/");
            return;
        } 
        
        // Validación de rol (asegurando minúsculas/mayúsculas)
        const rol = user.rol ? String(user.rol).toLowerCase() : "";
        if (rol !== "user") {
            alert("No tienes permiso.");
            navigate("/");
        }
    }, [isAuthenticated, user, navigate]);

    const handleCancel = () => navigate("/");

    const handleSubmit = async (datosEditados) => {
        try {
            if (!user.id || !token) {
                alert("Error de sesión.");
                return;
            }

            const payload = {
                nombre: datosEditados.nombre,
                apellido: datosEditados.apellido,
                correo: datosEditados.correo,
                img: datosEditados.img
            };

            // 1. Actualizar en Base de Datos
            await usuariosApi.update(user.id, payload, token);
            
            // 2. Crear el objeto usuario actualizado
            const usuarioActualizado = { ...user, ...payload };
            
            // 3. Actualizar ESTADO GLOBAL (React)
            // Esto hace que el Header cambie la foto/nombre INSTANTÁNEAMENTE
            setUser(usuarioActualizado); 
            
            // 4. Actualizar LOCAL STORAGE (Persistencia)
            // Usamos la clave 'usuario' como vi en tu Context
            localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

            alert("✅ Perfil actualizado con éxito.");
            navigate("/");

        } catch (error) {
            console.error("Error al actualizar:", error);
            const msg = error.message || "Error desconocido";
            alert("Hubo un error: " + msg);
        }
    }

    if (!isAuthenticated || !user) return null;

    return (
        <> 
            <Header />
            <div style={{ minHeight: '80vh', padding: '20px' }}>
                <FormModificarDatos 
                    user={user} 
                    onSubmit={handleSubmit} 
                    onCancel={handleCancel}
                />
            </div>
            <Footer />
        </>
    );
};

export default ModificarDatosUsuario;