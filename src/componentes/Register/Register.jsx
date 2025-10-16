import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Register.css';
import usuariosApi from '../../api/usuariosApi';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        username: '',
        correo: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar errores cuando el usuario empiece a escribir
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Crear el objeto userData para la API
            const userData = {
                username: formData.username,
                password: formData.password,
                correo: formData.correo,
                nombre: formData.nombre,
                apellido: formData.apellido,
                rol: "user" // Por defecto todos son usuarios normales
            };

            // Llamar a la API para crear el usuario
            const nuevoUsuario = usuariosApi.add(userData);
            
            // Mostrar en consola todos los usuarios para verificar
            console.log('=== NUEVO USUARIO CREADO ===');
            console.log(nuevoUsuario);
            usuariosApi.debugGetAll(); // Mostrar todos los usuarios
            
            // Mostrar información del LocalStorage
            const storageInfo = usuariosApi.getStorageInfo();
            console.log('=== LOCALSTORAGE INFO ===');
            console.log('Datos guardados:', storageInfo.hasData);
            console.log('Tamaño:', storageInfo.size + ' bytes');
            console.log('Total usuarios:', storageInfo.userCount);
            
            setSuccess(`Usuario ${nuevoUsuario.username} registrado exitosamente!`);
            
            // Limpiar el formulario
            setFormData({
                nombre: '',
                apellido: '',
                username: '',
                correo: '',
                password: ''
            });

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/Login');
            }, 2000);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="loginContenedor">
            <Header />

            <Footer />
        </div>
    );
};

export default Register;