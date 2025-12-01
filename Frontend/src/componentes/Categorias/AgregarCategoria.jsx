import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Usar las APIs y Contextos correctos
import categoriasApi from '../../api/categoriasApi'; // ✅ USAR CATEGORIAS API
import { useUser } from '../../api/context/UserContext.jsx'; // ✅ USAR EL CONTEXTO DE USUARIO

import FormAgregarCategoria from './Formularios/FormAgregarCategoria';
import FormPopUp from './Formularios/FormPopUp';
import '../gridContainer.css'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AgregarCategoria = () => {
    // 2. Obtener estado de usuario y token del Context
    const { user, token, isAuthenticated, loading } = useUser();
    const navigate = useNavigate();

    // Estado local para la categoría a crear
    const [cat, setCat] = useState({});

    // Estado para manejar el PopUp
    const [showPopUp, setShowPopUp] = useState(false);
    const [error, setError] = useState(null); // Estado para manejar errores

    // 3. Verificación de Administrador
    // El Context ya se encarga de cargar el usuario.
    const isAdmin = isAuthenticated && user && user.rol === "admin";

    // 4. Redirección si no es administrador (se ejecuta después de que el Context cargue)
    useEffect(() => {
        if (!loading && !isAdmin) {
            // Se puede usar alert o una notificación más elegante
            alert("¡Acceso denegado! Debe ser administrador para ver esta página.");
            navigate("/");
        }
    }, [loading, isAdmin, navigate]);

    // 5. Función de manejo de la creación (Llamada final a la API)
    const crearCategoria = async () => {
        setError(null);
        try {
            if (!token) throw new Error("Token no disponible. Inicie sesión nuevamente.");

            // LLAMADA ASÍNCRONA AL BACKEND
            await categoriasApi.create(cat, token);

            // Si tiene éxito:
            alert(`Categoría "${cat.nombre}" creada con éxito.`);
            cerrarPopUp(); // Cerrar modal
            navigate("/Categoria"); // Navegar a la lista de categorías

        } catch (err) {
            console.error("Error al crear categoría:", err);
            setError(err.message || "Error desconocido al comunicarse con el servidor.");
            cerrarPopUp(); // Cerrar modal tras error
        }
    };

    // 6. Validación y apertura del PopUp
    const handleSubmit = (categoria) => {
        if (categoria.nombre === "") {
            alert("Debe colocar un nombre para la categoría.");
        } else {
            setCat(categoria);
            abrirPopUp();
        }
    };

    // 7. Funciones de control de PopUp y navegación
    const abrirPopUp = () => { document.body.style.backgroundColor = 'rgba(125, 124, 124, 0.87)'; setShowPopUp(true); }
    const cerrarPopUp = () => { document.body.style.backgroundColor = 'whitesmoke'; setShowPopUp(false); setError(null); }
    const handleCancel = () => navigate("/Categoria");


    // 8. Renderizado
    if (loading) {
        return <><Header /><h1>Cargando permisos...</h1><Footer /></>;
    }

    if (!isAdmin) {
        // Redirección manejada en useEffect, pero se renderiza este mensaje
        return (
            <>
                <Header />
                <h1 style={{ textAlign: 'center', margin: '50px' }}>No tienes permiso para ver esta página.</h1>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="admin-content-container">
                {error && <div className="error-alert">Error: {error}</div>}

                {/* ⚠️ Nota: Hemos eliminado la lógica de prods innecesaria */}
                {!showPopUp && (
                    <FormAgregarCategoria
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )}

                {showPopUp && (
                    <FormPopUp
                        cancelar={cerrarPopUp}
                        categoria={cat}
                        confirmar={crearCategoria} // 👈 Función asíncrona real
                        productos={[]} // ⚠️ Ya no necesitamos cargar productos aquí
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default AgregarCategoria;