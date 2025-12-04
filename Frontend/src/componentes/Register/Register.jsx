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

    useEffect(() => {
        const todosUsuarios = usuariosApi.get();
        setUsuarios(todosUsuarios);
    }, []);

    const handleSubmit = async (usuario) => {
        try {
            const response = await usuariosApi.registrar(usuario);
            if (response.success) {
                alert(`Registro completado: ${response.usuario.username}`);
                navigate('/Login');
            } else {
                alert(response.message || 'Error al registrar usuario');
            }
        } catch (err) {
            console.error("Error en registro:", err);
            alert(err.message || 'Error al registrar usuario');
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
