import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import usuariosApi from '../../api/usuariosApi'

import FormCambiarPassword from './Formularios/FormCambiarPassword';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CambiarPassword = () => {
    const usuarioPrueba = {
        id: 2,
        username: "usuario",
        password: "usuario123",
        nombre: "Nombre",
        apellido: "Apellido",
        correo: "correo@example.com",
        img: "https://ih1.redbubble.net/image.2758100916.0157/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
        rol: "user"
    };

    const [ usuario, setUsuario ] = useState(usuarioPrueba);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if(user && user.rol == "user") setUsuario(user);
        else{
            alert("¡No es usuario!");
            navigate("/");
        } 
    }, [])

    const navigate = useNavigate();
    const handleCancel = () => navigate("/");

    const handleSubmit = async (user) => {
        await usuariosApi.update(user);
        console.log("Contraseña actualizada.");

        localStorage.setItem('usuarioLogueado', JSON.stringify(user));
        navigate("/");
    }
    
    return (
        <>
            {(!usuario || usuario.rol !== "user") ? 
            <>
                <Header />
                <><h1>No tienes permiso para ver esta página.</h1></>
                <Footer />
            </>
            :
            <>
                <Header/>
                {<FormCambiarPassword onSubmit = { handleSubmit } user = { usuario } onCancel = { handleCancel }/>}
                <Footer/>
            </>}
        </>
    );
};

export default CambiarPassword;