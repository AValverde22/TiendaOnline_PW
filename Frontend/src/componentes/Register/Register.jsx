import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FormularioUsuario from './RegisterForm/RegisterFormulario';
import './Register.css';
import usuariosApi from '../../api/usuariosApi';

const Register = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    // No necesitamos traer todos los usuarios para registrar uno nuevo.
    // Eso era de la versión anterior (mock).

    const handleSubmit = async (usuario) => {
        try {
            const respuesta = await usuariosApi.registrar(usuario);

            if (respuesta.success) {
                alert(`Registro completado: ${respuesta.usuario.username}`);
                navigate('/Login');
            } else {
                alert(respuesta.message || 'Error al registrar usuario');
            }
        } catch (err) {
            console.error(err);
            alert('Error al registrar usuario');
        }
    };

    return (
        <div className="registerContenedor">
            <Header />

            <main className="registerMain">
                <FormularioUsuario onSubmit={handleSubmit} />
            </main>

            <Footer />
        </div>
    );
};

export default Register;
