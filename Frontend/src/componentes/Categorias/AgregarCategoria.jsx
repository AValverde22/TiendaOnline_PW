import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Usar las APIs y Contextos correctos
import categoriasApi from '../../api/categoriasApi'; 
import { useUser } from '../../api/context/UserContext.jsx'; 

import FormAgregarCategoria from './Formularios/FormAgregarCategoria';
import FormPopUp from './Formularios/FormPopUp';
// Asegúrate de que este CSS tenga los estilos del overlay que te daré abajo
import '../gridContainer.css'; 

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './gridContainer.css';

const AgregarCategoria = () => {
    // 2. Obtener estado de usuario y token del Context
    const { user, token, isAuthenticated, loading } = useUser();
    const navigate = useNavigate();

    // Estado local
    const [cat, setCat] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Para evitar doble clic

    // 3. Verificación de Administrador (Compatible con mayúsculas/minúsculas)
    const isAdmin = isAuthenticated && user && (user.rol === "admin" || user.rol === "ADMIN");

    // 4. Redirección de seguridad
    useEffect(() => {
        if (!loading && !isAdmin) {
            alert("¡Acceso denegado! Debe ser administrador para ver esta página.");
            navigate("/");
        }
    }, [loading, isAdmin, navigate]);

    // 5. Función de manejo de la creación (Llamada final a la API)
    const crearCategoria = async () => {
        if (isSubmitting) return; // Evita envíos múltiples
        setIsSubmitting(true);

        try {
            if (!token) throw new Error("Sesión expirada. Inicie sesión nuevamente.");

            // LLAMADA ASÍNCRONA AL BACKEND
            await categoriasApi.create(cat, token);

            // Éxito
            alert(`Categoría "${cat.nombre}" creada con éxito.`);
            setShowPopUp(false);
            navigate("/ListarCategorias"); 

        } catch (err) {
            console.error("Error al crear categoría:", err);
            const mensajeError = err.response?.data?.message || err.message || "Error desconocido.";
            alert(`Error: ${mensajeError}`);
            setIsSubmitting(false); // Permitimos intentar de nuevo si falló
        }
    };

    // 6. Validación inicial (viene del hijo FormAgregarCategoria)
    const handleSubmit = (categoriaData) => {
        if (!categoriaData.nombre || categoriaData.nombre.trim() === "") {
            alert("Debe colocar un nombre para la categoría.");
            return;
        }
        setCat(categoriaData);
        setShowPopUp(true); // Solo mostramos el modal, no cambiamos el body
    };

    const handleCancel = () => navigate("/ListarCategorias");
    const cerrarPopUp = () => { setShowPopUp(false); setIsSubmitting(false); };

    // 7. Renderizado
    if (loading) {
        return <div style={{padding:'50px', textAlign:'center'}}>Verificando permisos...</div>;
    }

    if (!isAdmin) return null; // El useEffect redirige, retornamos null para evitar parpadeos

    return (
        <div className="page-container">
            <Header />
            <div className="admin-content-container" style={{ position: 'relative', minHeight: '80vh' }}>
                
                <h1 style={{textAlign: 'center', marginTop: '30px'}}>Crear Nueva Categoría</h1>

                {/* Formulario Principal */}
                <FormAgregarCategoria
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />

                {/* PopUp Modal (Overlay) */}
                {/* Se renderiza POR ENCIMA del formulario usando CSS */}
                {showPopUp && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <FormPopUp
                                cancelar={cerrarPopUp}
                                categoria={cat}
                                confirmar={crearCategoria}
                                isProcessing={isSubmitting} // Pasamos estado de carga para deshabilitar botones
                            />
                        </div>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default AgregarCategoria;