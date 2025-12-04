import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usuariosApi from '../../api/usuariosApi';
import { useUser } from '../../api/context/UserContext'; 

import FormCambiarPassword from './Formularios/FormCambiarPassword';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CambiarPassword = () => {
    const navigate = useNavigate();

    // 1. OBTENER TOKEN Y USUARIO DEL CONTEXTO
    // Asumo que tu useUser expone 'token' además de 'user', tal como indicaste.
    const { user, token, isAuthenticated, logout } = useUser();

    // 2. PROTECCIÓN DE RUTA
    useEffect(() => {
        // Si no está autenticado o no hay datos de usuario
        if (!isAuthenticated || !user) {
            alert("Debes iniciar sesión.");
            navigate("/");
            return;
        } 
        
        // Validación de rol (opcional, según tu lógica de negocio)
        if (user.rol !== "USER") {
            alert("No tienes permiso para ver esta página.");
            navigate("/");
        }
    }, [isAuthenticated, user, navigate]);

    // 3. MANEJAR EL SUBMIT
    // Recibimos solo la 'nuevaPassword' del Formulario (string)
    const handleSubmit = async (nuevaPassword) => {
        try {
            if (!user || !user.id || !token) {
                alert("Error de sesión: No se identificó el usuario o el token.");
                return;
            }

            // Preparamos el payload.
            // NOTA: Como tu formulario UI actual no pide la contraseña anterior,
            // enviamos solo la nueva. Asegúrate de que tu backend lo soporte.
            const datosParaActualizar = {
                password: nuevaPassword
            };

            // 4. LLAMADA A LA API CON LA FIRMA EXPLÍCITA QUE DEFINISTE
            // update(id, datos, token)
            await usuariosApi.update(user.id, datosParaActualizar, token);
            
            console.log("Contraseña actualizada correctamente.");
            alert("✅ Contraseña cambiada con éxito. Por seguridad, inicia sesión nuevamente.");

            // 5. CERRAR SESIÓN Y REDIRIGIR
            logout(); 
            navigate("/");

        } catch (error) {
            console.error("Error al actualizar password:", error);
            // Manejo de error seguro (evita mostrar errores de código al usuario)
            const mensaje = error.response?.data?.message || "Hubo un error al conectar con el servidor.";
            alert(`Error: ${mensaje}`);
        }
    };

    const handleCancel = () => {
        navigate("/MainPageUser"); 
    };

    // Evitamos renderizar nada si la redirección está por ocurrir
    if (!isAuthenticated || !user) return null;

    return (
        <>
            <Header />
            {/* El wrapper del formulario se encarga del diseño.
                Aquí solo pasamos la lógica.
            */}
            <FormCambiarPassword 
                onSubmit={handleSubmit} 
                onCancel={handleCancel}
            />
            <Footer />
        </>
    );
};

export default CambiarPassword;